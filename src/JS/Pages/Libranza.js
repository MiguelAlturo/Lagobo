/* eslint-disable class-methods-use-this */
/**
 *      Category Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */

const axios = require('axios').default;
import Globales from '../Global/General';
import Swal from 'sweetalert2';

const globales = new Globales();

export default class Libranza {
    constructor() {
        this.init();
    }

    init() {
        console.log("Libranza");
        const self = this;
        self.carrusel();
        self.initForm(self);
    }

    carrusel() {
        if ($('.slider .boxBanner').length > 1)
            $('.slider').slick({
                arrows: true,
                dots: false,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 4000,
                speed: 700,
                slidesToShow: 1,
                slidesToScroll: 1,
            });

        $.each($('input[type=range]'),function(){
            const slider = this;
            const min = slider.min;
            const max = slider.max;
            const value = slider.value;
            slider.style.background = 'linear-gradient(to right, rgb(198, 198, 198) 0%, rgb(198, 198, 198) '+((value-min)/(max-min)*100)+'%, #DEE2E6 '+((value-min)/(max-min)*100)+'%, #DEE2E6 100%)';
        });

        $('input[type=range]').on('input',function(){
            this.style.background = 'linear-gradient(to right, rgb(198, 198, 198) 0%, rgb(198, 198, 198) '+((this.value-this.min)/(this.max-this.min)*100)+'%, #DEE2E6 '+((this.value-this.min)/(this.max-this.min)*100)+'%, #DEE2E6 100%)';
            $('.monto-value').text(globales.formatNumber(this.value));
        });

        $('.input-field input').on('change', function(){
            if($(this).val()!=="")
                $(this).addClass("not_empty");
            else
                $(this).removeClass("not_empty");
        });

        $('.monto-value').text(globales.formatNumber(0));
        $('.carrusel-container li.helperComplement').remove();
        $('.carrusel-container .showcases ul > a').remove();

        if ($('.carrusel-container .showcases > ul > li').length > 3)
            $('.carrusel-container .showcases > ul').slick({
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
        else {
            if (window.innerWidth < 768) {
                if ($('.carrusel-container .showcases > ul > li').length > 2)
                    $('.carrusel-container .showcases > ul').slick({
                        arrows: true,
                        dots: true,
                        infinite: true,
                        slidesToShow: 2,
                        slidesToScroll: 1
                    });
                else
                    $('.carrusel-container .showcases ul').addClass('centered');
            }
            else
                $('.carrusel-container .showcases ul').addClass('centered');
        }
    }

    initForm(self) {
        $('.validateData').on('click', function(e) {
            e.preventDefault();
            const formSelector = $(this).parents('form').first();
            const filledForm = self.isValidForm(formSelector, self);
            if (filledForm) {
                axios.request({
                    url:'/api/dataentities/LO/documents',
                    method: 'POST',
                    headers: {
                        'accept':'application/vnd.vtex.ds.v10+json',
                        "content-type" : "application/json"
                    },
                    data: JSON.stringify(filledForm)
                }).then((data) => {
                    if (typeof data != "undefined" && data.Id != "") {
                        Swal.fire({
                            title: '¡Hemos registrado correctamente tus datos!',
                            showCancelButton: false,
                            confirmButtonText: '¡Genial!',
                        }).then((result) => {
                            location.href = "/";
                        });
                    }
                }).catch((error) => {
                    Swal.fire({
                        title: 'No hemos podido guardar tu información, por favor reinténtalo nuevamente.',
                        showCancelButton: false,
                        confirmButtonText:'Ok',
                    }).then((result) => {
                    });
                });
            } else {
                const element = document.querySelector('.error');
                element.scrollIntoView({ behavior: 'smooth', block: 'center'});
            }
        })
    }

    isValidForm(formSelector, self) {
        let formData = formSelector.serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        let formValidate = true;
        const messages = {
            "email" : 'Ingresa un email válido',
            "nombre" : 'Ingresa tu nombre',
            "apellido" : 'Ingresa tus apellidos',
            "documento" : 'Ingresa tu número de documento',
            "celular" : 'Ingresa un número de celular',
            "entidad" : 'Selecciona el nombre de la entidad',
            "monto" : 'Selecciona el monto a financiar',
            "tyc" : 'Debe aceptar los términos y condiciones',
            "tdatos" : 'Debe aceptar los TyC de tratamiento de datos',
            "tipoCliente": "Selecciona el tipo de cliente",
            "ciudad": "Ingresa la ciudad"
        }
        const keysMessage = Object.keys(messages);
        keysMessage.forEach((v) => {
            if (typeof formData[v] == "undefined" || formData[v] === "" || $.trim(formData[v]) === "" ) {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                $(`[name=${v}]`).parents('.content-field').append(`<em class="error alert alert-info">${messages[v]}</em>`);
                formValidate = false;
            } else {
                if ($(`[name=${v}]`).parents('.content-field').find('.alert').length > 0)
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
                else
                    $(`[name=${v}]`).parents('.content-field').find('.alert').remove();
            }
        });
        formData["tdatos"] = formData["tdatos"] === "true" ? true : false;
        formData["tyc"] = formData["tyc"] === "true" ? true : false;

        if (!formData["tdatos"] || !formData["tyc"])
            formValidate = false;

        if (!self.isValidEmail(formData["email"]) || formData["email"] === "") {
            formValidate = false;
            $('[name=email]').parents('.content-field').find('.alert').remove();
            $('[name=email]').parents('.content-field').append(`<em class="error alert alert-info">${messages['email']}</em>`);
        }

        if (!self.isValidText2(formData["nombre"]) || formData["nombre"] === "") {
            formValidate = false;
            $('[name=nombre]').parents('.content-field').find('.alert').remove();
            $('[name=nombre]').parents('.content-field').append(`<em class="error alert alert-info">${messages['nombre']}</em>`);
        }

        if (!self.isValidText2(formData["apellido"]) || formData["apellido"] === "") {
            formValidate = false;
            $('[name=apellido]').parents('.content-field').find('.alert').remove();
            $('[name=apellido]').parents('.content-field').append(`<em class="error alert alert-info">${messages['apellido']}</em>`);
        }

        if (!self.isValidDocument(formData["documento"]) || formData["documento"] === "") {
            formValidate = false;
            $('[name=documento]').parents('.content-field').find('.alert').remove();
            $('[name=documento]').parents('.content-field').append(`<em class="error alert alert-info">${messages['documento']}</em>`);
        }

        if (formData["entidad"] === "") {
            formValidate = false;
            $('[name=entidad]').parents('.content-field').find('.alert').remove();
            $('[name=entidad]').parents('.content-field').append(`<em class="error alert alert-info">${messages['entidad']}</em>`);
        }

        if (!self.isValidNumber(parseInt(formData["monto"])) || parseInt(formData["monto"]) <= 0) {
            formValidate = false;
            $('[name=monto]').parents('.content-field').find('.alert').remove();
            $('[name=monto]').parents('.content-field').append(`<em class="error alert alert-info">${messages['monto']}</em>`);
        }

        if (!self.isValidText(formData["tipoCliente"]) || formData["tipoCliente"] === "") {
            formValidate = false;
            $('[name=tipoCliente]').parents('.content-field').find('.alert').remove();
            $('[name=tipoCliente]').parents('.content-field').append(`<em class="error alert alert-info">${messages['tipoCliente']}</em>`);
        }

        if (!self.isValidPhone(formData["celular"]) || formData["celular"] < 0 || formData["celular"] === "") {
            formValidate = false;
            $('[name=celular]').parents('.content-field').find('.alert').remove();
            $('[name=celular]').parents('.content-field').append(`<em class="error alert alert-info">${messages["celular"]}</em>`);
        }

        if (formValidate) {
            formData["celular"] = `57${formData["celular"]}`;
            formData["monto"] = globales.formatNumber(formData["monto"]);
            return formData;
        }
        return formValidate;
    }

    isValidEmail(email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(String(email).toLowerCase());
    }

    isValidPhone(phone) {
        const phoneRegex = new RegExp("^[0-9]{10}$");
        return phoneRegex.test(phone);
    }

    isValidNumber(number) {
        const numberRegex = new RegExp("^[0-9]{1,}$");
        return numberRegex.test(number);
    }

    isValidDocument(document) {
        const documentRegex = new RegExp("^[0-9]{6,}$");
        return documentRegex.test(document);
    }

    isValidText(text) {
        const letters = /^[A-Za-z]+$/;
        return letters.test(text);
    }

    isValidText2(text) {
        const letters = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
        return letters.test(text);
    }

    getRandomVersion() {
        var min = 0;
        var max = 1000;
        min = Math.ceil(min);
        max = Math.floor(max);
        var version = Math.floor(Math.random() * (max - min + 1)) + min;
        return '&v=' + version;
    }
}
