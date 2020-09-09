export class DrinkMaker {
    static message: string
    // constructor() {

    // }
    
    order(instruction: string) {
        DrinkMaker.message = instruction
    }
}

