export default class OrderPlaced {
    constructor () {
        this.makeAccordion();
    }

    makeAccordion() {
        $('.drop_container .drop_title').on('click', (event) => {
            event.preventDefault();
            $(event.target).toggleClass('active');
            $(event.target).parent().next().toggleClass('active');
        })
    }
}