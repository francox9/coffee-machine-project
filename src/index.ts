import { EmailNotifier, BeverageQuantityChecker } from './services'
const { notifyMissingDrink } = EmailNotifier
const { isEmpty } = BeverageQuantityChecker

type OrderType = 'coffee' | 'tea' | 'chocolate' | 'message' | 'orange'
interface DailyReport {
    money: number
    coffeeAmount: number
    teaAmount: number
    chocolateAmount: number
    orangeAmount: number
}
const defaultReport: DailyReport = {
    money: 0,
    coffeeAmount: 0,
    teaAmount: 0,
    chocolateAmount: 0,
    orangeAmount: 0
}
export class Order {
    static Report: DailyReport = { ...defaultReport }
    static resetReport() {
        this.Report = { ...defaultReport }
    }

    type: OrderType
    sugar: number
    stick: number
    value: number
    extraHot = false
    constructor(description: string, payment: number) {
        const [drinkDesc, ...amounts] = description.split(':')
        if (/^\wh$/.test(drinkDesc)) this.extraHot = true
        const type = drinkDesc[0]
        
        /**
         * this part can/should be optimised
         */
        switch (type) {
            case 'M': {
                this.value = 0
                this.type = 'message'
                this.stick = 0
                this.sugar = 0
                break;
            }
            case 'T': {
                if (payment < 0.4) throw new Error('payment-insufficient')
                this.value = 0.4
                this.type = 'tea'
                if (isEmpty(this.type)) throw new Error('tea_run-out')
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0? 1: 0
                Order.Report.teaAmount++
                break;
            }
            case 'H': {
                if (payment < 0.5) throw new Error('payment-insufficient')
                this.value = 0.5
                this.type = 'chocolate'
                if (isEmpty(this.type)) throw new Error('chocolate_run-out')
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0? 1: 0
                Order.Report.chocolateAmount++
                break;
            }
            case 'C': {
                if (payment < 0.6) throw new Error('payment-insufficient')
                this.value = 0.6
                this.type = 'coffee'
                if (isEmpty(this.type)) throw new Error('coffee_run-out')
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0? 1: 0
                Order.Report.coffeeAmount++
                break;
            }
            case 'O': {
                if (payment < 0.6) throw new Error('payment-insufficient')
                this.value = 0.6
                this.type = 'orange'
                if (isEmpty(this.type)) throw new Error('orange_run-out')
                this.sugar = parseInt(amounts[0]) || 0
                this.stick = this.sugar > 0 ? 1 : 0
                Order.Report.orangeAmount++
                break;
            }
            default: throw new Error('undefined-drink')
        }

        Order.Report.money += this.value
    }
}

export class DrinkMaker {
    static message: string

    order(instruction: string, payment: number): Order {
        let order = null
        try {
            order = new Order(instruction, payment)
            DrinkMaker.message = instruction
        }
        catch(e) {
            let message = null
            if (e.message === 'payment-insufficient') message = 'Payment not enough'
            else if (e.message === 'undefined-drink') message = 'Undefined drink type'
            else if (e.message.endsWith('_run-out') ) {
                const drink = e.message.slice(0, -8)
                message = 'Run out of ' + drink
                notifyMissingDrink(drink)
            }
            DrinkMaker.message = message || 'Unknown error'
        }
        return order
    }
}

