import { DrinkMaker } from '../src/index'

describe('Order', () => {
    let drinkMaker
    beforeEach(() => {
        drinkMaker = new DrinkMaker()
    })

    it('should store the order instruction', () => {
        const instruction = 'T:1:0'
        drinkMaker.order(instruction)
        expect(DrinkMaker.message).toEqual(instruction)
    })
})