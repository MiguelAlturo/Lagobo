/* eslint-disable no-console */
/**
 *      Minicart Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */
import Globales from './General';

export default class Minicart {

    constructor() {
        this.init();
    }

    init() {
        const self = this;

        // Events
        $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
            self.printCart(orderForm);
        });

        $('.headerIconItem.minicart').on('click', (e) => {
            if ($(e.target).parents('#minicart').length === 0) {
                if ($('#minicart').hasClass('active')) {
                    self.closeMinicart();
                } else {
                    self.openMinicart();
                }
            }
        });

        this.triggers();
    }

    events() {
        const self = this;

        $(document).on('click', (e) => {
            if (!$(e.target).hasClass('minicart')) {
                if ($(e.target).parents('#minicart').length === 0 && $(e.target).parents('.minicart').length === 0) {
                    self.closeMinicart();
                }
            }
        });

        $('#minicart')
            .off()
            .on('click', '#close-minicart', () => {
                self.closeMinicart();
            })
            .on('click', '.OPIcon-trash', (e) => {
                const itemToRemove = $(e.target).parents('.ItemContainer').attr('item-index');
                self.removeItemsFromCart(itemToRemove);
            });

        self.qtyButtons();
    }

    triggers() {
        const self = this;
        vtexjs.checkout.getOrderForm().then((orderForm) => {
            self.printCart(orderForm);
        });
        $(window).on('orderFormUpdated.vtex', (evt, orderForm) => {
            self.printCart(orderForm);
        });
        $(document)
            .on('minicartController:reloadCart', (context, open = false, orderform = '') => {
                try {
                    $('#cart-loader').addClass('active');
                    self.Cart.printCart(orderform);
                    if (open) {
                        self.openMinicart();
                    }
                } catch (error) {
                    console.error('❌ Error: (reloadCart)', error);
                }
            })
            .on('minicartController:cartCompiled', () => {
                try {
                    self.events();
                } catch (error) {
                    console.error('❌ Error: (cartRendered)', error);
                }
            })
            .on('minicartController:openMinicart', () => {
                self.openMinicart();
            })
            .on('minicartController:closeMinicart', () => {
                self.closeMinicart();
            });
        self.events();
    }

    qtyButtons() {
        $(document).on('click', '.changeQuantity', (e) => {
            const qtyInput = $(e.target);
            const qtySelector = qtyInput.parent().find('input');
            let qty = typeof qtySelector.val() !== 'undefined' ? parseInt(qtySelector.val()) : 0;
            const isCart = qtyInput.parents('.minicart').length > 0;
            if (qtyInput.is('.decrease')) {
                if (qty > 0) qty -= 1;
            } else qty += 1;
            if (isCart) {
                qtyInput.attr('disabled', 'disabled');
                qtyInput.siblings().find('[class*=changeQuantity]').attr('disabled', 'disabled');
                const itemIndex = qtyInput.parents('.ItemContainer').attr('item-index');
                const updateItem = {
                    index: itemIndex,
                    quantity: qty,
                };
                let total = 0;
                const cartQtySelector = qtyInput.parents('.QuantityContainer');
                vtexjs.checkout.getOrderForm().then((orderForm) => {
                    total = orderForm.value;
                    vtexjs.checkout.updateItems([updateItem], null, 1).done((orderForm2) => {
                        if (total !== orderForm2.value) {
                            qtyInput.removeAttr('disabled', 'disabled');
                            qtyInput.siblings().find('[class*=changeQuantity]').removeAttr('disabled', 'disabled');
                            this.printCart(orderForm2);
                        } else {
                            cartQtySelector.append('<p class="qty-no-disponible">Cantidad no disponible</p>');
                            qtyInput.removeAttr('disabled', 'disabled');
                            qtyInput.siblings().find('[class*=changeQuantity]').removeAttr('disabled', 'disabled');
                            setTimeout(() => {
                                $('.qty-no-disponible').remove();
                            }, 1000);
                        }
                    });
                });
            }
        });
    }

    addToCart(skuId, quantity) {
        const item = {
            id: skuId,
            quantity: parseInt(quantity),
            seller: '1',
        };
        vtexjs.checkout.getOrderForm().then(() => {
            vtexjs.checkout.addToCart([item], null, 1).done((orderForm) => {
                this.printCart(orderForm, true, true);
            });
        });
    }

    printCart(orderForm, openModal = false) {
        const globales = new Globales();
        $('.MainContainer .ItemsContainer').empty();
        if (orderForm.items.length > 0) {
            $('.MainContainer').removeClass('no-products');
            $('.MainContainer .ItemsContainer').empty();
            // let totalQty = 0;
            let discounts = 0;
            $.each(orderForm.items, (index, item) => {
                discounts += item.listPrice > item.sellingPrice ? (item.listPrice - item.sellingPrice) * item.quantity : 0;
                let cartRow = '';
                cartRow += `<div class="ItemContainer" id="cart-item-${item.id}" item-index="${index}">`;
                cartRow += '<div class="SectionContainer">';
                cartRow += '<span class="OPIcon-trash"></span>';
                cartRow += '</div>';
                cartRow += '<div class="SectionContainer">';
                cartRow += `<img src="${item.imageUrl.replace('http', 'https').replace('55-55', '70-70')}" alt="${item.name}" class="ItemImage">`;
                cartRow += '</div>';
                cartRow += '<div class="NamePricesContainer SectionContainer">';
                cartRow += `<span class="ItemName">${item.name}</span>`;
                cartRow += '<div class="PricesContainer">';
                cartRow += `${
                    item.listPrice > item.sellingPrice
                        ? `<p class="ListPrice">${globales.formatNumber(((item.listPrice + item.tax) * item.quantity) / 100)}</p>`
                        : ''
                }`;
                cartRow += `<p class="BestPrice">${globales.formatNumber(((item.sellingPrice + item.tax) * item.quantity) / 100)}</p>`;
                cartRow += '</div>';
                cartRow += '</div>';
                cartRow += '<div class="QuantityContainer SectionContainer">';
                cartRow += '<div class="changeQuantity decrease">-</div>';
                cartRow += '<div>';
                cartRow += `<input type="number" value="${item.quantity}"/>`;
                cartRow += '</div>';
                cartRow += '<div class="changeQuantity increase">+</div>';
                cartRow += '</div>';
                cartRow += '</div>';
                $('.MainContainer .ItemsContainer').append(cartRow);
                // totalQty += item.quantity;
            });
            const subTotalCart =
                typeof orderForm.totalizers.filter((i) => i.id === 'Items')[0] !== 'undefined'
                    ? orderForm.totalizers.filter((i) => i.id === 'Items')[0].value + discounts
                    : 0;
            const total = typeof orderForm.totalizers[0] !== 'undefined' && orderForm.totalizers[0].value > 0 ? orderForm.totalizers[0].value : 'No disponible';

            const totalTaxes =
                typeof orderForm.totalizers.filter((i) => i.id === 'Tax')[0] !== 'undefined' ? orderForm.totalizers.filter((i) => i.id === 'Tax')[0].value : 0;

            const totalShipping =
                typeof orderForm.totalizers.filter((i) => i.id === 'Shipping')[0] !== 'undefined'
                    ? orderForm.totalizers.filter((i) => i.id === 'Shipping')[0].value
                    : 0;

            if (subTotalCart > 0) $('.totalizerItem.subtotal span').text(globales.formatNumber((subTotalCart + totalTaxes) / 100));
            else $('.totalizerItem.subtotal span').text('No disponible');

            if (totalShipping > 0) {
                $('.totalizerItem.shipping').show();
                $('.totalizerItem.shipping span').text(globales.formatNumber(totalShipping / 100));
            } else $('.totalizerItem.shipping').hide();

            if (discounts > 0) {
                $('.totalizerItem.discounts').show();
                $('.totalizerItem.discounts span').text(`- ${globales.formatNumber(discounts / 100)}`);
            } else $('.totalizerItem.discounts').hide();

            if (total > 0) $('.totalizerItem.total span').text(globales.formatNumber((total + totalTaxes) / 100));
            else $('.totalizerItem.total span').text('No disponible');

            if (openModal) {
                $('.MainContainer').addClass('active');
                setTimeout(() => {
                    $('.MainContainer').removeClass('active');
                }, 2000);
            }
        } else {
            $('.MainContainer').addClass('no-products');
            $('.MainContainer .ItemsContainer').append('<div class="emptyCart"><p>Carrito vacío</p><p>Agrega los mejores productos</p></div>');
        }
    }

    removeItemsFromCart(itemIndex) {
        vtexjs.checkout
            .getOrderForm()
            .then(() => {
                const itemsToRemove = {
                    index: itemIndex,
                    quantity: 0,
                };
                return vtexjs.checkout.removeItems([itemsToRemove]);
            })
            .done((orderForm) => {
                this.printCart(orderForm);
            });
    }

    closeMinicart() {
        $('#minicart').removeClass('active');
    }

    openMinicart() {
        $('#minicart').addClass('active');
    }
}
