/* eslint-disable class-methods-use-this */
/**
 *      Master del Ecommerce - Promociones Class
 *      @version 0.0.1
 *      @copyright https://masterdelecommerce.com/
 *      @author Marco Villegas
 *
 * */

 import Swal from 'sweetalert2';

 export default class Promociones {
    constructor() {
        this.init();
    }

    init() {
        console.log("Promociones");
        this.sliders();
        this.initializePopups();
    }

    sliders() {
        if ($('.slider .boxBanner figure').length > 1)
            $('.slider .boxBanner').slick({
                arrows: true,
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4000,
                speed: 700,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
    }

    initializePopups() {
        $(document).on('click', '.item img, .item .text-hover-banner', function(e) {
            const target = $(this).parents('.promo-container');
            const promoHTML = target.find('.promo-content').html();
            const promoTitle = $.trim(target.find('.text-hover-banner').text());

            Swal.fire({
                title: promoTitle,
                html: promoHTML,
                showDenyButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    container: 'promociones',
                    popup: 'promociones'
                }
            })
        });
    }
}
