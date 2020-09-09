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
})