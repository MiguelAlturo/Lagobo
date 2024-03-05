/**
 *      Footer Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */

import Swal from 'sweetalert2';
import Globales from './General';

export default class Footer {
    init() {
        this.linksFooter();
        this.initNewsletter();
    }

    linksFooter() {
        document.querySelectorAll('.tab .title').forEach((element) => {
            element.addEventListener('click', (e) => {
                const { target } = e;
                console.log(target.nextSibling);
                target.classList.toggle('active');
                target.nextSibling.classList.toggle('active');
            });
        });
    }

    initNewsletter() {
        $('.newsletter form .principal').on('click', (e) => {
            e.preventDefault();
            const globales = new Globales();
            const emailSelector = $('.newsletter form [name=news-email]');
            const email = emailSelector.val();
            const termsChecked = document.querySelector('.newsletter form [name=news-terms]').checked;
            if (termsChecked) {
                if (globales.isValidEmail(email)) {
                    $('.error-newsletter').remove();
                    emailSelector.removeClass('input-error');
                    $.ajax({
                        url: '/api/dataentities/CL/documents',
                        type: 'PATCH',
                        headers: {
                            accept: 'application/vnd.vtex.ds.v10+json',
                            'content-type': 'application/json',
                            'X-VTEX-API-AppKey': 'vtexappkey-lagobo-YBIYRD',
                            'X-VTEX-API-AppToken' : 'ZDUKSOKSNSVZUTTCWSOOUHBHYFOCPBLEVYNSQGYIGJVKBIBSMYEVAEVSCMLNAHDMGRDVFBLQTFHKMRGQDVQRWPERCVPDVLIZGJDKEFMLMOCVWLFLGUKERMPRNMSJLHUI'
                        },
                        data: JSON.stringify({
                            email,
                            isNewsletterOptIn: true,
                        }),
                    }).done((data, xhr, status) => {
                        if (status.status < 300) {
                            Swal.fire({
                                title: '¡Te has registrado con éxito al newsletter!',
                                showCancelButton: false,
                                confirmButtonText: '¡Genial!',
                            }).then(() => {
                                emailSelector.val('');
                            });
                        } else if (status.status >= 300 && status.status < 400) {
                            Swal.fire({
                                title: '¡Ya estás registrado a nuestro newsletter!',
                                showCancelButton: false,
                                confirmButtonText: '¡Genial!',
                            }).then(() => {
                                emailSelector.val('');
                            });
                        } else {
                            Swal.fire({
                                title: 'Hubo un error con el registro, inténtalo nuevamente.',
                                showCancelButton: false,
                                confirmButtonText: 'Vale',
                            }).then(() => {
                                emailSelector.val('');
                            });
                        }
                    }).fail((err) => {
                        Swal.fire({
                            title: '¡Hubo un error!',
                            showCancelButton: true,
                            showConfirmButton: false
                        }).then(() => {
                            
                        });
                    });
                } else {
                    $('.error-newsletter').remove();
                    emailSelector.parent().append('<label class="error error-newsletter">Debes ingresar un email válido</label>');
                    emailSelector.addClass('input-error');
                }
            } else {
                $('.error-newsletter').remove();
                emailSelector.parent().append('<label class="error error-newsletter">Debes aceptar los términos y condiciones</label>');
                emailSelector.addClass('input-error');
            }
        });
    }
}
