/*if (window.location.hostname == "www.oportunidades.com.co" || window.location.hostname == "oportunidades.com.co") {
  location.href = '/mantenimiento';
}*/

window.onhashchange = function () {
    if (location.hash == '#/cart') {
        if(!document.querySelector('.info-client')){
            changeTextInfo()
        }
    }
}




var dmlscript = document.createElement('script');
dmlscript.src = 'https://http2.mlstatic.com/storage/bmsdk/js/dml-0.0.7.min.js';
dmlscript.onload = () => {
    new DMLSDK({
        publicKey: 'APP_USR-6b685f7c-5e32-40c8-a426-02cf8990e3eb',
        out: 'vtex.deviceFingerprint',
    });
};
document.body.appendChild(dmlscript);
//NO ELIMINAR NADA DE AQUI ARRIBA SOLO MODIFICAR EL RESTO
//ALEEEEERRRRRTAAAA

addiAllySlug = 'oportunidades-ecommerce';
$.getScript('https://s3.amazonaws.com/statics.addi.com/vtex/js/vtex-checkout-co.bundle.min.js');
function startTimer() {
    setTimeout(stopTimer, 2e3);
}
function stopTimer() {
    (window.vtex.deviceFingerprint = document.getElementById('deviceId').value), console.log('MP-deviceId : ' + document.getElementById('deviceId').value);
}
function quitaacentos(s) {
    var r = s.toLowerCase();
    return (
        (r = r.replace(new RegExp(/[àáâãäå]/g), 'a')),
        (r = r.replace(new RegExp(/[èéêë]/g), 'e')),
        (r = r.replace(new RegExp(/[ìíîï]/g), 'i')),
        (r = r.replace(new RegExp(/[òóôõö]/g), 'o')),
        (r = r.replace(new RegExp(/[ùúûü]/g), 'u'))
    );
}
function Text(string) {
    var valor = string.value;
    valor = quitaacentos(valor);
    for (var out = '', filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ', i = 0; i < valor.length; i++)
        ' ' != valor.charAt(i) ? filtro.indexOf(valor.charAt(i)) != -1 && (out += valor.charAt(i)) : (out += valor.charAt(i));
    $(string).val(out.toUpperCase());
}
function chat() {
    window.$zopim ||
        (function (d, s) {
            var z = ($zopim = function (c) {
                    z._.push(c);
                }),
                $ = (z.s = d.createElement(s)),
                e = d.getElementsByTagName(s)[0];
            (z.set = function (o) {
                z.set._.push(o);
            }),
                (z._ = []),
                (z.set._ = []),
                ($.async = !0),
                $.setAttribute('charset', 'utf-8'),
                ($.src = 'https://v2.zopim.com/?5irldrhwTLspCbuv4vkGq5S3wX4aXwFy'),
                (z.t = +new Date()),
                ($.type = 'text/javascript'),
                e.parentNode.insertBefore($, e);
        })(document, 'script');
}
function setBuyButton() {
    var buyButton = $('#cart-to-orderform');
    buyButton.length > 0 && buyButton.appendTo('.summary-totalizers .accordion-inner'), jQuery('#cart-to-orderform').text('INICIAR PAGO');
}
function fingerPrintMP() {
    function startTimer() {
        setTimeout(stopTimer, 2e3);
    }
    function stopTimer() {
        (window.vtex.deviceFingerprint = document.getElementById('deviceId').value), console.log('MP-deviceId : ' + document.getElementById('deviceId').value);
    }
    $('body').append('<form><input type="hidden" id="deviceId" name="deviceId" /></form>'),
        $.getScript('https://resources.mlstatic.com/device/meli-metrix.min.js', function () {}),
        (window.onload = startTimer);
}
function changeInfo() {
    jQuery('.cart-template:not(.mini-cart) .cart .table.cart-items th.product-price').text('PRECIO UNITARIO');
    jQuery('.cart-template:not(.mini-cart) .cart .table.cart-items th.quantity-price').text('SUBTOTAL');
}
function termConditions() {
    jQuery(
        '<p class="terms-conditions"><input type="checkbox" id="terms-conditions-check" name="terms-conditions-check" checked="checked"><span class="active" for="terms-conditions-check">He leído y acepto las <a href="/proteccion-de-datos-personales" target="_blank">políticas de privacidad</a> y <a href="/terminos-y-condiciones" target="_blank">términos y condiciones</a>.</span></p>'
    ).appendTo('.client-profile-data .form-step .box-client-info'),
        jQuery('#terms-conditions-check').prop('checked', !1),
        jQuery('#go-to-shipping').hide(),
        jQuery('#terms-conditions-check').click(function () {
            var checked = jQuery(this).prop('checked');
            checked ? jQuery('#go-to-shipping').show() : jQuery('#go-to-shipping').hide();
        });
}
function politicaSagrilaft() {
    jQuery(
        '<p class="sagrilaft"><input type="checkbox" id="sagrilaft-check" name="sagrilaft-check" checked="checked"><span class="active" for="sagrilaft-check">He leído y acepto las <a href="/politica-sagrilaft" target="_blank">políticas sagrilaft</a>.</span></p>'
    ).appendTo('.client-profile-data .form-step .box-client-info'),
        jQuery('#sagrilaft-check').prop('checked', !1),
        jQuery('#go-to-shipping').hide(),
        jQuery('#sagrilaft-check').click(function () {
            var checked = jQuery(this).prop('checked');
            checked ? jQuery('#go-to-shipping').show() : jQuery('#go-to-shipping').hide();
        });
}
function imagenCarritoVacio() {
    console.log('esta es una prueba'),
        0 == jQuery('.cart-template:not(.mini-cart) .empty-cart-content .imagen-carrito-vacio').length &&
            jQuery('.cart-template:not(.mini-cart) .empty-cart-content').prepend(
                "<div class='imagen-carrito-vacio'><img src='/arquivos/icon_empty-cart.png' />"
            );
}
$(document).ajaxStop(function () {
    changeTaxName();
});
$('body').append('<form><input type="hidden" id="deviceId" name="deviceId" /></form>'),
    $.getScript('https://resources.mlstatic.com/device/meli-metrix.min.js', function () {}),
    (window.onload = startTimer),
    $(document).ajaxStop(function () {
        setTimeout(function () {
            $('#client-first-name').attr('onKeyUp', 'Text(this);'), $('#client-last-name').attr('onKeyUp', 'Text(this);');
        }, 400);
    }),
    jQuery(document).ready(function () {
        jQuery('#no-phone-key').click(),
            termConditions(),
            politicaSagrilaft(),
            //chat(),
            console.log('esta es una prueba'),
            0 == jQuery('.cart-template:not(.mini-cart) .empty-cart-content .imagen-carrito-vacio').length &&
                jQuery('.cart-template:not(.mini-cart) .empty-cart-content').prepend(
                    "<div class='imagen-carrito-vacio'><img src='/arquivos/icon_empty-cart.png' />"
                );
    }),
    jQuery(document).on('ajaxStop', function () {
        console.log('DOMContentLoaded');
        jQuery('#no-phone-key').click();
        setTimeout(function () {
            changeInfo();
            fingerPrintMP();
        }, 1e3);
    });

$(document).ready(function () {
    console.log('Día sin iva');
    $(window).on('orderFormUpdated.vtex', function (evt, orderForm) {
        calculatePromotions(orderForm);
        changeTaxName();
    });
});

$(window).on('hashchange load', function () {
    changeTaxName();
    if (location.hash == '#/cart') {
        if(!document.querySelector('.info-client')){
            changeTextInfo()
        }
    }
});

const changeTaxName = () => {
    $('.Tax .info').html('Costo de Transacción');
};

const calculatePromotions = (orderForm) => {
    let e = '',
        n = '',
        discount = 0,
        currencySymbol = orderForm.storePreferencesData.currencySymbol,
        rateAndBenefitsIdentifiers = orderForm.ratesAndBenefitsData.rateAndBenefitsIdentifiers,
        items = orderForm.items,
        discounts = orderForm.totalizers.find((t) => t.name.toLowerCase().indexOf('descuentos') !== -1)?.value || '';
    for (let t = 0; t < rateAndBenefitsIdentifiers.length; t++) {
        if (rateAndBenefitsIdentifiers[t].name.toLowerCase().indexOf('iva') !== -1) {
            discount = 0;
            for (let e = 0; e < items.length; e++)
                for (let n = 0; n < items[e].priceTags.length; n++)
                    items[e].priceTags[n].identifier == rateAndBenefitsIdentifiers[t].id && (discount += items[e].priceTags[n].value);
            e = discount.toString().substr(0, discount.toString().length - 2);
            discounts -= discount;
            discount = new Intl.NumberFormat('es-CO').format(e);
            n += `
            <tr class="promotion-row">
                <td class="info">${rateAndBenefitsIdentifiers[t].name}</td>
                <td class="space"></td>
                <td class="monetary">${currencySymbol} ${discount}</td>
                <td class="empty"></td>
            </tr>`;
        }
    }
    if (discounts === '') return;
    const discountsFormated = discounts.toString().substr(0, discounts.toString().length - 2);
    discounts = new Intl.NumberFormat('es-CO').format(discountsFormated);
    setTimeout(function () {
        $('.promotion-row').remove();
        $('.totalizers-list .Discounts').after(n);
        if (discounts !== '' && discounts !== 0) {
            if (discounts !== '0') $('.totalizers-list .Discounts .monetary').text(`$ ${discounts}`);
            else $('.totalizers-list .Discounts').hide();
        }
    }, 1e3);
};

// MODIFICAR TEXTO FLETE  #/CART

const changeTextInfo=()=>{
    var containerCart = document.querySelector('.cart-more-options')
    containerCart.insertAdjacentHTML("beforeend", '<p class="info-client">Recuerda verificar que el producto haya llegado en buen estado antes de confirmar el recibido, si presentas alguna novedad deja la observacion al momento de firmar la guia.</p>');
}