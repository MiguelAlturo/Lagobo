import Header from '../Global/Header';
import Shelf from '../Global/Vitrinas';
import Footer from '../Global/Footer';

const init = () => {
    const header = new Header();
    header.init();
    const shelf = new Shelf();
    shelf.init();
    const footer = new Footer();
    footer.init();

    // unique call to orderForm, if you need the information of the orderForm please use the 'orderFormUpdated.vtex' event
    vtexjs.checkout.getOrderForm();
};

$(document).ready(init);
