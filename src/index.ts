export class DrinkMaker {
    static message: string

    orderValue(instruction: string): number {
        const [ type, ...amounts ] = instruction.split(':')
        switch (type) {
            case 'M': return 0
            case 'T': return 0.4
            case 'H': return 0.5
            case 'C': return 0.6
            default: throw new Error('Undefined drink type')
        }
    }
    
    order(instruction: string, payment: number) {
        const value = this.orderValue(instruction)

        if (value > payment) DrinkMaker.message = 'Payment not enough'
        else DrinkMaker.message = instruction
    }
}

