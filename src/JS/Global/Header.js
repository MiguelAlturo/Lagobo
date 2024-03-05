/**
 *      Header Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */
import Menu from './Menu';
import Buscador from './Buscador';
import Minicart from './Minicart';

export default class Header {
    init() {
        const menu = new Menu();
        const buscador = new Buscador();
        buscador.init();
        const minicart = new Minicart();
        window.addEventListener('scroll', this.fixedHeader);
        this.carruselHeader();
    }

    fixedHeader() {
        const headerHeight = $('header').outerHeight();
        if (window.scrollY > headerHeight + 10)
            $('.mainHeader, body').addClass('fixed-header');
        else
            $('.mainHeader, body').removeClass('fixed-header');
    }

    carruselHeader() {
        if ($('.preHeader .mainContainer').length > 1)
            $('.preHeader').slick({
                arrows: true,
                dots: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
            });
    }
}
