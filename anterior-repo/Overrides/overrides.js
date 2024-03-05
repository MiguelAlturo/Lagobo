const overrides = {
    init: () => {
        if (document.getElementById('product-page')){
            overrides.pichinchaFlag(true);
            overrides.banksWithoutTaxes(true);
        } else {
            overrides.pichinchaFlag();
            overrides.banksWithoutTaxes();
        }
        overrides.pdpAgotado();
    },

    pichinchaFlag: (isPDP = false) => {
        const promoPichincha = document.querySelectorAll('[class*="-pichincha"]');
        if (promoPichincha.length)
            promoPichincha.forEach((element) => {
                let elementFather = null;
                if (!isPDP)
                    elementFather = $(element).parents('.box-item');
                else
                    elementFather = $(element).parents('.product-details');
                const bestPrice = overrides.makeaNum(elementFather.find('.bestPrice').text());
                const promo = bestPrice - 250000;
                const promoHtml = `<div class="promo-img">
                                        <img src="/arquivos/banco-pichincha-logo.png" alt="Promo Pichincha" title="Promo pagando con la tarjeta del Banco Pichincha" />
                                    </div>
                                    <div class="promo-price">
                                        <p class="third-price">${overrides.numFormat(promo)}</p>
                                        <a href="https://bit.ly/3w8Nlyl" target="_blank">Aplican TyC ></a>
                                    </div>`;
                elementFather.find('.product-third-price').empty().html(promoHtml);
                elementFather.find('.product-third-price').show();
            });
    },

    banksWithoutTaxes: (isPDP = false) => {
        const promoTaxes = document.querySelectorAll('[class*="-sin-interes"]');
        if (promoTaxes.length)
            promoTaxes.forEach((element) => {
                let bancoPromo = "";
                element.classList.forEach((item) => {
                    if (item.indexOf('-sin-interes') !== -1)
                        bancoPromo = item.split('-sin-interes')[0];
                });
                let elementFather = null;
                if (!isPDP)
                    elementFather = $(element).parents('.box-item');
                else
                    elementFather = $(element).parents('.product-details');
                const promo = 'Compra sin intereses';
                const promoHtml = `<div class="promo-img">
                                        <img src="/arquivos/banco-${bancoPromo}-logo.png" alt="Paga con la tarjeta de ${bancoPromo.replaceAll('-',' ')} y recibe la promo" title="Paga con la tarjeta de ${bancoPromo.replaceAll('-',' ')} y recibe la promo" />
                                    </div>
                                    <div class="promo-price">
                                        <p class="third-price">${promo}</p>
                                        <a href="/campana/febrero" target="_blank">Aplican TyC ></a>
                                    </div>`;
                elementFather.find('.product-third-price').empty().html(promoHtml);
                elementFather.find('.product-third-price').show();
            });
    },

    makeaNum: (theNum) => {
        let n = $.trim(theNum),
            nsplt = n.split(',');
        nsplt = nsplt[0].replace(/[^0-9\,]+/g,"").replace(/[^0-9\.]+/g,"");
        const price_show = parseInt(nsplt);
        if (nsplt.length > 1)
            return price_show;
    },

    numFormat: (theNum) => {
        var n = $.trim(theNum),
            nsplt = n.split('.'),
            nsplt = nsplt[0].replace(/[^0-9\,]+/g,"").replace(/[^0-9\.]+/g,""),
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 0 : decPlaces,
            thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
            sign = nsplt < 1 ? "-" : "$",

            i = parseInt(nsplt = Math.abs(+nsplt || 0).toFixed(decPlaces)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        const price_show = sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? "," + Math.abs(nsplt - i).toFixed(decPlaces).slice(2) : "");

        if (nsplt.length > 2 )
            return price_show;
    },

    pdpAgotado: () => {
        if (typeof skuJson !== 'undefined' && !skuJson.available) {
            $('.product-info .sku-selector-box, .product-info .buy-button-box').remove();
            $('.product-info .price-box').html('<p>AGOTADO<p>');
        }
    }
};

$(document).ready(function(){
    overrides.init();
});