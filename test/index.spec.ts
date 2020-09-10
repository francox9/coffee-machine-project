import { DrinkMaker } from '../src/index'

describe('Order', () => {
    let drinkMaker
    beforeEach(() => {
        drinkMaker = new DrinkMaker()
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
        })
        it('should work for hot chocolate', () => {
            const instruction = 'Hh:1:0'
            const payment = 0.5
            const order = drinkMaker.order(instruction, payment)
            expect(DrinkMaker.message).toEqual(instruction)
            expect(order.extraHot).toEqual(true)
        })
        it('should work for tea', () => {
            const instruction = 'Th:2:0'
            const payment = 0.4
            const order = drinkMaker.order(instruction, payment)
            expect(DrinkMaker.message).toEqual(instruction)
            expect(order.extraHot).toEqual(true)
        })
    })

})