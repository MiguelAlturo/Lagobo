/* eslint-disable class-methods-use-this */
/**
 *      Category Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */

import Globales from '../Global/General';
import Swal from 'sweetalert2';
import axios from 'axios';

let imagesSkuActual = {};
let skuSelectedHasFired = 1;
const globales = new Globales();
export default class Product {
    constructor() {
        this.productData = {};
        this.init();
    }

    async init() {
        const self = this;

        self.productData = await axios
            .get(`/api/catalog_system/pub/products/search${location.pathname}`, {
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            })
            .then((data) => data.data[0]);

        console.log(self.productData);

        $(window).on('skuSelected.vtex', (eventData, prodID, skuData) => {
            self.processSkuPrice(skuData);
            $('.buy-in-page-button').attr('id-sku', skuData.sku);
        });
        $(window).on('skuDimensionChanged.vtex', (eventData, prodID, name, value) => {
            if (name === 'Color') {
                const skuSelected = skuJson.skus.filter((i) => i.dimensions.Color === value)[0];
                if (typeof skuSelected !== 'undefined') self.buscarImagenes(skuSelected.sku);
            }
        });
        self.buscarImagenes(skuJson.skus[0].sku);
        self.processSkuPrice(skuJson.skus[0]);
        self.todosLosEnvios();
        self.changeInputQuantity();
        self.addBrandImage();
        self.buyButton();
        self.tabs();
        self.relatedProducts();
        globales.pichinchaFlag(true);
        globales.banksWithoutTaxes(true);
        self.implementsSyndigo();
        self.implementsFlixMedia();
        self.mabeInpage();
        self.libranzaButton();
        self.addMudi3D();
    }

    buscarImagenes(skuId) {
        $.ajax({
            url: `/produto/sku/${skuId}`,
            type: 'get',
        })
            .done((data) => {
                if (typeof data !== 'undefined' && data.length > 0) {
                    const imagesArray = data[0].Images;
                    imagesSkuActual[data[0].Id] = imagesArray;
                    this.fillProductImages(imagesArray);
                }
            })
            .fail((error) => {
                console.log(error);
            });
    }

    fillProductImages(jsonImages) {
        let aryImagesProduct = new Array();

        $.each(jsonImages, function (index, objImages) {
            let aryImagesProductByType = {
                mainImage: '',
                zoomImage: '',
                QuickviewImage: '',
                thumbImage: '',
            };
            $.each(objImages, function (index, image) {
                switch (image.ArchiveTypeId) {
                    case 2:
                        aryImagesProductByType.mainImage = image.Path;
                        break;
                    case 3:
                        aryImagesProductByType.thumbImage = image.Path;
                        break;
                    case 30:
                        aryImagesProductByType.QuickviewImage = image.Path;
                        break;
                    case 10:
                        aryImagesProductByType.zoomImage = image.Path;
                }
            });
            aryImagesProduct.push(aryImagesProductByType);
            imagesSkuActual = aryImagesProduct;
        });

        this.slickImages(aryImagesProduct);
    }

    slickImages(aryImages) {
        if (!$('.image-container').is(':empty') && !$('.thumbs-container').is(':empty')) {
            $('.image-container.slick-initialized').slick('unslick');
            $('.thumbs-container.slick-initialized').slick('unslick');

            $('.product-image .image-container').empty();
            $('.product-image .thumbs-container').empty();
        }
        const aryOptionsSlickFull = {
                autoplay: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                dots: false,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: true,
                        },
                    },
                ],
            },
            aryOptionsSlickThumbs = {
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
                focusOnSelect: true,
                vertical: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 5,
                            arrows: true,
                            vertical: false,
                        },
                    },
                ],
            };

        $.each(aryImages, function (index, image) {
            $('.product-image .thumbs-container').append(
                `<div class="thumb--slide"><img src="${image.thumbImage}" title="${skuJson.name}" class="product--gallery__image" /></div>`
            );
            $('.product-image .image-container').append(
                `<div class="easyzoom zoomFly"><a data-zoomimage="${image.zoomImage}"><img src="${image.mainImage}" title="${skuJson.name}" class="product--gallery__image" /></a></div>`
            );
        });

        aryOptionsSlickFull.asNavFor = '.product-image .thumbs-container';
        aryOptionsSlickThumbs.asNavFor = '.product-image .image-container';

        $('.product-image .image-container').on('init', function (event, slick) {
            setTimeout(() => {
                $('.thumbs-container.slick-initialized').slick('unslick');
                $('.product-image .thumbs-container').slick(aryOptionsSlickThumbs);
            }, 150);
        });

        const mainSlick = $('.product-image .image-container').slick(aryOptionsSlickFull);

        mainSlick.on('afterChange', function (event, slick, currentSlide, nextSlide) {});
        mainSlick.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.thumbs-container .slick-current.slick-active').removeClass('slick-current');
            $('.thumbs-container .slick-active[data-slick-index=' + nextSlide + ']').addClass('slick-current');
        });
        if ($(window).width() > 992)
            $('.easyzoom').easyZoom({
                linkAttribute: 'data-zoomimage',
                // errorNotice   :'Lo sentimos ha ocurrido un error al intentar cargar la imagen',
                // loadingNotice :'Cargando la imagen'
            });
    }

    processSkuPrice(skuData) {
        let discount, cleanBestPrice, cleanListPrice;
        if (skuJson.available) {
            if (skuSelectedHasFired > 0) {
                if (($('.cleaned-price span').text(''), skuData.available)) {
                    cleanBestPrice = skuData.bestPriceFormated.replace(/\s/, '').replace(',00', '').replace(',0', '');
                    (document.querySelector('.cleaned-price .bestPrice').innerText = cleanBestPrice),
                        skuData.listPrice &&
                            skuData.listPrice > 0 &&
                            ((cleanListPrice = skuData.listPriceFormated.replace(/\s/, '').replace(',00', '').replace(',0', '').replace('$0', '')),
                            (document.querySelector('.cleaned-price .listPrice').innerText = cleanListPrice),
                            $('.cleaned-price .bestPrice').addClass('sale'),
                            (discount = ((skuData.listPrice - skuData.bestPrice) / skuData.listPrice) * 100),
                            (discount = discount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]),
                            (discount = Math.round(discount)),
                            discount > 0 && $('.cleaned-price').append(`<div class="percent">${discount}% OFF</div>`)),
                        'undefined' == typeof discount &&
                            $('.product-image .cleaned-price').css({
                                display: 'none',
                            }),
                        (skuSelectedHasFired = 0);
                }
            } else skuSelectedHasFired += 1;
            this.setThirdPriceIVA(skuData.bestPrice);
        } else
            $('.product-image .cleaned-price').css({
                display: 'none',
            });
    }

    todosLosEnvios() {
        let zonesJson;
        const init = () => {
            if ($('#tablaEnvios .tabla').length > 0) {
                const text = $('#tablaEnvios .tabla').text();
                zonesJson = $.parseJSON(text);
                createBasStructure();
            }
        };

        const departmentChange = () => {
            $('p#tituloPrecioEnvio').length > 0 && $('p#tituloPrecioEnvio').remove();
            let dropdown = $('select#departamentos'),
                dropdownCiudades = $('select#ciudades');
            dropdownCiudades.empty(),
                dropdownCiudades.append("<option value=''>Ciudad</option>"),
                $.each(zonesJson, (i, val) => {
                    dropdown.val() == i &&
                        $.each(val, (j, h) => {
                            dropdownCiudades.append(`<option value="${h}">${j}</option>`);
                        });
                });
        };

        const simulateShippingSku = (skuId, skuQTY, skuSeller, municipioDaneSelected) => {
            const items = [
                {
                    id: skuId,
                    quantity: skuQTY,
                    seller: skuSeller,
                },
            ];

            const postalCode = municipioDaneSelected;
            const country = 'COL';

            vtexjs.checkout.simulateShipping(items, postalCode, country).done((result) => {
                console.log(result);
                if (
                    result.logisticsInfo[0].slas.length &&
                    result.logisticsInfo[0].slas[0].deliveryChannel != 'undefined' &&
                    result.logisticsInfo[0].slas[0].deliveryChannel == 'delivery'
                ) {
                    const priceShipping = result.logisticsInfo[0].slas[0].price / 100;
                    if (priceShipping == 0) {
                        $('#tablaEnvios').append("<p id='tituloPrecioEnvio'>El envío es gratis</p>");
                    } else {
                        const precioFinal = globales.formatNumber(priceShipping);
                        $('#tablaEnvios').append(`<p id='tituloPrecioEnvio'>El precio de envío es ${precioFinal}</p>`);
                    }
                } else {
                    console.info('No tiene precio configurado');
                    $('#tablaEnvios').append("<p id='tituloPrecioEnvio'>Lo sentimos, no tenemos cobertura a esa área</p>");
                }
            });
        };

        const citychanges = function () {
            const zipCodec = $('select#ciudades option:selected').attr('value');
            $('p#tituloPrecioEnvio').length > 0 && $('p#tituloPrecioEnvio').remove();
            simulateShippingSku(skuJson.skus[0].sku, parseInt($('.quantitySelector input').val()), 1, zipCodec);
        };

        const createBasStructure = function () {
            $('#tablaEnvios').append("<select id='departamentos'><option value=''>Departamento</option></select><select id='ciudades'></select>");
            const dropdown = $('select#departamentos');
            $.each(zonesJson, function (i, val) {
                dropdown.append(`<option value="${i}">${i}</option>`);
            });
            $('select#departamentos').change(departmentChange);
            $('select#ciudades').change(citychanges);
        };

        init();
    }

    changeInputQuantity() {
        $('<div class="quantity-button quantity-down">-</div>').insertBefore('.quantity-selector-container input'),
            $('<div class="quantity-button quantity-up">+</div>').insertAfter('.quantity-selector-container input'),
            $('.quantity-selector-container .unitSelector').length && $('.quantity-selector-container .quantitySelector').css('display', 'none'),
            $('.quantity-selector-container').each(function () {
                const spinner = $(this),
                    input = spinner.find('input'),
                    btnUp = spinner.find('.quantity-up'),
                    btnDown = spinner.find('.quantity-down');
                let min = input.attr('min'),
                    max = input.attr('max');
                btnUp.click(function () {
                    const oldValue = parseFloat(input.val());
                    if (((min = input.attr('min')), (min = Number(min)), oldValue >= max)) var newVal = oldValue;
                    else var newVal = oldValue + min;
                    spinner.find('input').val(newVal), spinner.find('input').trigger('change');
                }),
                    btnDown.click(function () {
                        var oldValue = parseFloat(input.val());
                        if (((min = input.attr('min')), (min = Number(min)), oldValue <= min)) var newVal = oldValue;
                        else var newVal = oldValue - min;
                        spinner.find('input').val(newVal), spinner.find('input').trigger('change');
                    });
            });
    }

    addBrandImage() {
        if ($('.product-brand .brandName').length > 0) {
            const brand = $('.product-brand .brandName a').first().text().replace(' ', '').toLowerCase();
            0 == $('.product-brand .brandName img').length && $('.product-brand .brandName').append(`<img src="/arquivos/${brand}_br.png" alt="brand">`);
        }
    }

    buyButton() {
        $('.buy-in-page-button').attr('id-sku', skuJson.skus[0].sku);
        if (skuJson.available) {
            $('.buy-in-page-button').on('click', (e) => {
                const target = $(e.target);
                if (skuJson.available) {
                    const idSku = target.attr('id-sku');
                    const qty = parseInt($('.quantitySelector input').val());
                    const sellerId =
                        typeof skuJson.skus.filter((i) => i.sku === idSku && i)[0] !== 'undefined'
                            ? skuJson.skus.filter((i) => i.sku === idSku && i)[0].sellerId
                            : '1';
                    const { salesChannel } = skuJson;
                    const item = {
                        id: idSku,
                        quantity: qty,
                        seller: sellerId,
                    };
                    vtexjs.checkout.addToCart([item], null, salesChannel).done(function (orderForm) {
                        if ($('body').is('.quickview')) window.parent.location.href = '/checkout';
                        $('#minicart').toggleClass('active');
                    });
                } else
                    Swal.fire({
                        icon: 'error',
                        title: 'Producto no agregado',
                        text: 'El producto actualmente no se encuentra disponible.',
                    });
            });
        } else {
            $('.buy-in-page-button, .cuotas-button, .qty').css('display', 'none');
            $('.product-unavailable').css('display', 'block');
        }
    }

    tabs() {
        $('.nav-tabs li').on('click', (e) => {
            e.preventDefault();
            const target = e.target.nodeName.toLowerCase() == 'li' ? e.target.firstChild : e.target;
            const data = target.href.split('#')[1];
            if (!document.querySelector(`.tab-pane#${data}`).classList.contains('active')) {
                document.querySelectorAll('.tab-pane, .nav-tabs li').forEach((element) => {
                    element.classList.remove('active');
                });
                document.querySelector(`.tab-pane#${data}`).classList.add('active');
                target.parentElement.classList.add('active');
            }
        });
        const caracteristicas = $('#caracteristicas').find('tr');
        if (caracteristicas.length > 0) {
            const heightEnd = `${parseInt(caracteristicas.length / 2 + 1) * 70}px`;
            caracteristicas.parent('tbody').css({
                'max-height': heightEnd,
            });
        }
    }

    relatedProducts() {
        $('#product-related .showcases ul').slick({
            arrows: true,
            dots: true,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: false,
                    },
                },
            ],
        });
    }

    setThirdPriceIVA(price) {
        if ($('p.flag[class*="dia-sin-iva"]').length > 0) {
            const pricesSelector = $('.product-details').find('.product-data .cleaned-price');
            const promoPrice = globales.formatNumber(price / 100 / 1.19);
            pricesSelector.addClass('set-flex');
            pricesSelector.find('p.sinIva').remove();
            pricesSelector.append(`<p class="thirdPrice-flex sinIva">Precio sin IVA <span class="thirdPrice">${promoPrice}</span></p>`);
        }
    }

    implementsSyndigo() {
        const productId = this.productData.productReference;
        if (this.productData.brand.toLowerCase() === 'haceb') {
            let interval = setInterval(() => {
                window.SYNDI = window.SYNDI || null;
                if (window.SYNDI !== null) {
                    SYNDI.push(productId);
                    $('syndigo-powerpage').attr('pageid', productId);
                    clearInterval(interval);
                }
            }, 100);
        }
    }

    implementsFlixMedia() {
        if (this.productData.brand.toLowerCase() === 'lg' || this.productData.brand.toLowerCase() === 'samsung') {
            const product_mpn = '';
            const product_ean = this.productData.items[0].ean;
            const product_brand = this.productData.brand.toLowerCase();
            const distributor = '11526';
            const language = 'f5';

            const headID = document.getElementsByTagName('head')[0];
            const flixScript = document.createElement('script');
            flixScript.type = 'text/javascript';
            flixScript.async = true;
            flixScript.src = '//media.flixfacts.com/js/loader.js';
            flixScript.setAttribute('data-flix-distributor', distributor);
            flixScript.setAttribute('data-flix-language', language);
            flixScript.setAttribute('data-flix-brand', product_brand);
            flixScript.setAttribute('data-flix-ean', product_ean);
            flixScript.setAttribute('data-flix-mpn', product_mpn);
            flixScript.setAttribute('data-flix-button', '');
            flixScript.setAttribute('data-flix-inpage', 'flix-inpage');
            flixScript.setAttribute('data-flix-fallback-language', '');
            flixScript.setAttribute('data-flix-price', '');
            headID.appendChild(flixScript);
        }
    }

    mabeInpage() {
        $('.name-field.MABE--INPAGE').parent().hide();
        const { 'MABE - INPAGE': mabeInpage } = this.productData;
        if (mabeInpage && mabeInpage.length) {
            $('#mabe-inpage').empty().html(mabeInpage[0]);
        }
    }

    libranzaButton() {
        const self = this;
        $(document).on('click', '.cuotas-button a', function (evt) {
            evt.preventDefault();
            const href = $(this).attr('href');
            const text =
                encodeURIComponent(`Hola, soy pensionado y estoy interesado en adquirir por el crédito libranzas Oportunidades este producto: `) +
                self.productData.link;
            const a = document.createElement('a');
            a.target = '_blank';
            a.href = `${href}&text=${text}`;
            a.click();
        });
    }

    addMudi3D() {
        if (MudiExperience && this.productData?.SKU) {
            MudiExperience({
                tokenApi: '7VtxREtMtUt9CHL9zwbF',
                skuNumber: this.productData?.SKU[0],
                containerBtns: document.querySelector('.image-container'),
                idCompanyMudi: 393,
                color: ' #00c4ff  ',
            });
        }
    }
}
