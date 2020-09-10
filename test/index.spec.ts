import { DrinkMaker, Order } from '../src/index'

describe('Order', () => {
    let drinkMaker
    beforeEach(() => {
        drinkMaker = new DrinkMaker()
        Order.resetReport()
    })

    it('should display order detail', () => {
        const instruction = 'T:1:0'
        const payment = 0.4
        drinkMaker.order(instruction, payment)
        expect(DrinkMaker.message).toEqual(instruction)
    })

    it('should throw display error message if payment is lower than selling price', () => {
        const instruction = 'T:1:0'
        const payment = 0.3
        drinkMaker.order(instruction, payment)
        expect(DrinkMaker.message).toEqual('Payment not enough')
    })

    describe('Orange juice order', () => {
        it('should be handled properly when payment is correct', () => {
            const instruction = 'O::'
            const payment = 0.6
            drinkMaker.order(instruction, payment)
            expect(DrinkMaker.message).toEqual(instruction)
        })

        it('should throw error when payment is insufficient', () => {
            const instruction = 'O::'
            const payment = 0.5
            drinkMaker.order(instruction, payment)
            expect(DrinkMaker.message).toEqual('Payment not enough')
        })
    })

    describe('Extra hot order', () => {
        it('should work for coffee', () => {
            const instruction = 'Ch::'
            const payment = 0.6
            const order = drinkMaker.order(instruction, payment)
            expect(DrinkMaker.message).toEqual(instruction)
            expect(order.extraHot).toEqual(true)
            expect(order.type).toEqual('coffee')
        })
        it('should work for hot chocolate', () => {
            const instruction = 'Hh:1:0'
            const payment = 0.5
            const order = drinkMaker.order(instruction, payment)
            expect(DrinkMaker.message).toEqual(instruction)
            expect(order.extraHot).toEqual(true)
            expect(order.type).toEqual('chocolate')
        })
        it('should work for tea', () => {
            const instruction = 'Th:2:0'
            const payment = 0.4
            const order = drinkMaker.order(instruction, payment)
            expect(DrinkMaker.message).toEqual(instruction)
            expect(order.extraHot).toEqual(true)
            expect(order.type).toEqual('tea')
        })
    })

    describe('Report', () => {
        it('should work if we sold nothing', () => {
            expect(Order.Report.money).toEqual(0)
            expect(Order.Report.coffeeAmount).toEqual(0)
            expect(Order.Report.teaAmount).toEqual(0)
            expect(Order.Report.chocolateAmount).toEqual(0)
            expect(Order.Report.orangeAmount).toEqual(0)
        })

        it('should not be influenced by messages', () => {
            drinkMaker.order('C::', 0.6)
            drinkMaker.order('M:random messages 1', 0)
            drinkMaker.order('M:random messages 2', 0)

            expect(Order.Report.money).toEqual(0.6 * 1)
            expect(Order.Report.coffeeAmount).toEqual(1)
            expect(Order.Report.teaAmount).toEqual(0)
            expect(Order.Report.chocolateAmount).toEqual(0)
            expect(Order.Report.orangeAmount).toEqual(0)
        })

        it('should yield proper amount of money if orders are made', () => {
            drinkMaker.order('C::', 0.6)
            drinkMaker.order('C::', 0.6)
            drinkMaker.order('C::', 0.6)
            drinkMaker.order('H::', 0.5)
            drinkMaker.order('H::', 0.5)
            drinkMaker.order('O::', 0.6)
            drinkMaker.order('T::', 0.4)

            expect(Order.Report.money).toEqual(0.6 * 3 + 0.5 * 2 + 0.6 * 1 + 0.4 * 1)
            expect(Order.Report.coffeeAmount).toEqual(3)
            expect(Order.Report.teaAmount).toEqual(1)
            expect(Order.Report.chocolateAmount).toEqual(2)
            expect(Order.Report.orangeAmount).toEqual(1)
        })

        it('should calculate by prices, rather than payment amounts', () => {
            drinkMaker.order('C::', 1)
            drinkMaker.order('C::', 0.6)
            drinkMaker.order('C::', 2)
            drinkMaker.order('H::', 0.5)
            drinkMaker.order('H::', 0.6)
            drinkMaker.order('O::', 0.8)
            drinkMaker.order('T::', 0.4)

            expect(Order.Report.money).toEqual(0.6 * 3 + 0.5 * 2 + 0.6 * 1 + 0.4 * 1)
            expect(Order.Report.coffeeAmount).toEqual(3)
            expect(Order.Report.teaAmount).toEqual(1)
            expect(Order.Report.chocolateAmount).toEqual(2)
            expect(Order.Report.orangeAmount).toEqual(1)
        })

        it('should not include orders rejected by insufficient payment', () => {
            drinkMaker.order('C::', 0.6)
            drinkMaker.order('C::', 0.3)
            drinkMaker.order('C::', 0.6)
            drinkMaker.order('H::', 0.5)
            drinkMaker.order('H::', 0.1)
            drinkMaker.order('O::', 0.6)
            drinkMaker.order('T::', 0.35)

            expect(Order.Report.money).toEqual(0.6 * 2 + 0.5 * 1 + 0.6 * 1)
            expect(Order.Report.coffeeAmount).toEqual(2)
            expect(Order.Report.teaAmount).toEqual(0)
            expect(Order.Report.chocolateAmount).toEqual(1)
            expect(Order.Report.orangeAmount).toEqual(1)
        })
    })

})