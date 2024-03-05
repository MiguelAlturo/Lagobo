/**
 *      Shelf Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */

import Globales from '../Global/General';
import Swal from 'sweetalert2';

const globales = new Globales();
export default class Shelf {
    init() {
        this.removeCents();
        this.removeHelperComplement();
        this.initQuickview();
        this.addDiscountPrice();
        this.setThirdPriceIVA();
        globales.pichinchaFlag();
        globales.banksWithoutTaxes();
    }

    removeCents() {
        $('.productPricesContainer').each((i, e) => {
            if ($(e).find('.productListPrice').text().indexOf(',') > -1) {
                const newListPrice = $(e).find('.productListPrice').text().replace(/\s/g, '').slice(0, -3);
                $(e).find('.productListPrice').text(newListPrice);
            }

            if ($(e).find('.productBestPrice').text().indexOf(',') > -1) {
                const newBestPrice = $(e).find('.productBestPrice').text().replace(/\s/g, '').slice(0, -3);
                $(e).find('.productBestPrice').text(newBestPrice);
            }
        });
    }

    removeHelperComplement() {
        $('.helperComplement').remove();
    }

    initQuickview() {
        $('.productQuickView .thickbox').on('click',(e) => {
            e.preventDefault();
            const self = $(e.target);
            const productId = self.data('productid');
            let ifrm = document.createElement("iframe");
            ifrm.id = "quickview";
            ifrm.setAttribute("src", `${location.origin}/quick-view/?lid=f4ca1542-564f-4673-98c9-48fd9ae0b11e&idproduto=${productId}`);
            ifrm.style.width = window.innerWidth > 768 ? `${window.innerWidth*.80}px` : "100%";
            ifrm.style.height = `${window.innerHeight*.70}px`;
            Swal.fire({
                html: ifrm,
                showConfirmButton: false,
                showCloseButton: true,
                customClass: {
                    container: 'quickview',
                    popup: 'quickview',
                }
            });
            ifrm.scrollIntoView({ behavior: 'smooth', block: 'center'});
        });
    }

    addDiscountPrice() {
        $('.showcases .shelf').each(function() {
            const bestPrice = globales.makeaNum($(this).find('.productBestPrice').text());
            const listPrice = globales.makeaNum($(this).find('.productListPrice').text());
            let discount = (listPrice - bestPrice) / listPrice * 100;
            discount = Math.round(discount);
            if (discount > 0)
                $(this).find(".productDiscount").html(`<div class="percent">${discount}% OFF</div>`);
            else
                $(this).find(".productDiscount").css("display", "none");
        });
    }

    setThirdPriceIVA() {
        $.each($('p.flag[class*="dia-sin-iva"]'),function(i, v){
            if (!$('body').is('.producto')) {
                const pricesSelector = $(v).parents('.shelf').first().find('.productPricesContainer');
                const price = globales.makeaNum($.trim(pricesSelector.find('.productBestPrice').text()));
                const promoPrice = globales.formatNumber(price/1.19);
                pricesSelector.find('p.sinIva').remove();
                pricesSelector.append(`<p class="thirdPrice-flex sinIva">Precio sin IVA <span class="thirdPrice">${promoPrice}</span></p>`);
            }
        });
    }
}
