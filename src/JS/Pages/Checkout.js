/* eslint-disable class-methods-use-this */
/**
 *      Checkout Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */


export default class Checkout {
    constructor() {
        this.init();
    }
    init() {
        const self = this;
        self.textCustom()
    }

    textCustom(){
        console.log("Checkout");
    }
}
