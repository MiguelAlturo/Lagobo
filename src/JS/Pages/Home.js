/* eslint-disable class-methods-use-this */
/**
 *      Master del Ecommerce - Home Class
 *      @version 0.0.1
 *      @copyright https://masterdelecommerce.com/
 *      @author Edwin Obando
 *
 * */

export default class Home {
    constructor() {
        this.init();
    }

    init() {
        console.log('Home');
        this.sliders();
        this.categoryTabs();
        this.contador();
    }

    sliders() {
        $('.slider .boxBanner').slick({
            arrows: true,
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1,
            //adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        infinite: true,
                        //autoplay: false
                    },
                },
            ],
        });

        $.each($('.showcases ul'), function () {
            if ($(this).find('> li:not(.helperComplement)').length > 4 && window.innerWidth > 1200) {
                $(this).slick({
                    arrows: true,
                    dots: false,
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
            } else if ($(this).find('> li:not(.helperComplement)').length > 2 && window.innerWidth > 768 && window.innerWidth < 1200) {
                $(this).slick({
                    arrows: true,
                    dots: false,
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
            } else if ($(this).find('>li:not(.helperComplement)').length > 2 && window.innerWidth <= 768) {
                $(this).slick({
                    arrows: true,
                    dots: false,
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
            } else $(this).addClass('centered');
        });

        $('.slider_marcas .container').slick({
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            slidesToShow: 7,
            slidesToScroll: 7,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: false,
                    },
                },
            ],
        });

        const sliders = document.querySelectorAll('.slider_banner .container');

        const slider3Config = {
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        const slider4Config = {
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplaySpeed: 4000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                    },
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: false,
                    },
                },
            ],
        };

        sliders.forEach((slider, index) => {
            if (slider.parentElement.classList.contains('banner-3')) {
                $(slider).slick(slider3Config);
            } else {
                $(slider).slick(slider4Config);
            }
        });

        if (window.innerWidth < 1366) {
            $('.categories .mainContainer').slick({
                arrows: true,
                dots: false,
                infinite: true,
                autoplay: false,
                slidesToShow: 6,
                slidesToScroll: 2,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                            infinite: true,
                        },
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            dots: false,
                        },
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            dots: false,
                        },
                    },
                ],
            });
        }

        /*if (window.innerWidth < 1024) {
            $('iframe').attr('height', window.innerHeight*.30);
            $('iframe').attr('width', "100%");
        }*/
    }

    categoryTabs() {
        $(document).on('click', '.categoriesTabs .categoryTab', (e) => {
            let self = $(e.target);
            if (!self.is('.categoryTab')) {
                self = self.parents('.categoryTab');
            }
            if (!self.is('.active')) {
                self.parents('.showcasesContainer').find('.categoryTab.active').removeClass('active');
                self.addClass('active');
                const dataTab = self.data('tab');
                self.parents('.showcasesContainer').find('.showcases.active').removeClass('active');
                self.parents('.showcasesContainer').find('.showcases')[dataTab]?.classList.add('active');
                this.slickShowcases(self.parents('.showcasesContainer').find('.showcases.active ul').first());
            }
        });
        $('.categoriesTabs .categoryTab:first-child').trigger('click');
    }

    slickShowcases(selector) {
        if (selector.is('.slick-initialized')) $(selector).slick('unslick');
        if ($(selector).find('> li:not(.helperComplement)').length > 4 && window.innerWidth > 1200) {
            $(selector).slick({
                arrows: true,
                dots: false,
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
        } else if ($(selector).find('> li:not(.helperComplement)').length > 2 && window.innerWidth > 768 && window.innerWidth < 1200) {
            $(selector).slick({
                arrows: true,
                dots: false,
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
        } else if ($(selector).find('>li:not(.helperComplement)').length > 2 && window.innerWidth <= 768) {
            $(selector).slick({
                arrows: true,
                dots: false,
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
        } else $(selector).addClass('centered');
    }

    contador() {
        const contador = $('.contador');
        if (contador.length > 0) {
            const finishDate = new Date(contador.parent().data('date')?.replaceAll('-', '/')).getTime();
            if (typeof finishDate !== 'undefined') {
                let interval = setInterval(() => {
                    const now = new Date().getTime();
                    const diffTime = finishDate - now > 0 ? finishDate - now : 0; // In order to get days, we divide miliseconds in this way 1000 - seconds, 60 - minutes, 60 - hours, 24 - days
                    const days = Math.floor(diffTime / 1000 / 60 / 60 / 24);
                    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
                    if (diffTime === 0) {
                        clearInterval(interval);
                    } else {
                        contador.parent().addClass('active');
                        contador.find('.days').html(days > 9 ? days : `0${days}`);
                        contador.find('.hours').html(hours > 9 ? hours : `0${hours}`);
                        contador.find('.minutes').html(minutes > 9 ? minutes : `0${minutes}`);
                        contador.find('.seconds').html(seconds > 9 ? seconds : `0${seconds}`);
                    }
                }, 1000);
            }
        }
    }
}
