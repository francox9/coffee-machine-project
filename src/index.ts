type OrderType = 'coffee' | 'tea' | 'chocolate' | 'message' | 'orange'
class Order {
    type: OrderType
    sugar: number
    stick: number
    value: number
    extraHot = false
    constructor(description: string) {
        const [drinkDesc, ...amounts] = description.split(':')
        if (/^\wh$/.test(drinkDesc)) this.extraHot = true
        const type = drinkDesc[0]
        
        switch (type) {
            case 'M': {
                this.value = 0
                this.type = 'message'
                this.stick = 0
                this.sugar = 0
                break;
            }
            case 'T': {
                this.value = 0.4
                this.type = 'tea'
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0? 1: 0
                break;
            }
            case 'H': {
                this.value = 0.5
                this.type = 'chocolate'
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0? 1: 0
                break;
            }
            case 'C': {
                this.value = 0.6
                this.type = 'coffee'
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0? 1: 0
                break;
            }
            case 'O': {
                this.value = 0.6
                this.type = 'orange'
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0 ? 1 : 0
                break;
            }
            default: throw new Error('Undefined drink type')
        }
    }
}

export class DrinkMaker {
    static message: string

    order(instruction: string, payment: number) {
        const order = new Order(instruction)

        if (order.value > payment) DrinkMaker.message = 'Payment not enough'
        else DrinkMaker.message = instruction

        return order
    }
}

