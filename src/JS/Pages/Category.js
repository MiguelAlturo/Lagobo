/* eslint-disable class-methods-use-this */
/**
 *      Category Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */

import Vitrinas from './../Global/Vitrinas';

export default class Category {
    constructor() {
        this.init();
    }

    init() {
        const self = this;
        self.initSmartResearch();
        self.orderByChange();
        self.filters();
        self.moveFilters();
        self.openFilters();
        self.makeSliders();
    }

    initSmartResearch() {
        const vitrinas = new Vitrinas();
        if ($("#filters input[type='checkbox']").length > 0)
            $("#filters input[type='checkbox']").vtexSmartResearch({
                filtersFullWrapper: "#filters",
                loadContent: ".showcases[id^=ResultItems]",
                shelfClass: ".showcases",
                menuDepartament: ".navigation-tabs .menu-departamento",
                insertMenuAfter: ".search-multiple-navigator h3:first",
                emptySearchElem: $('<div class="vtexsr-emptySearch"></div>'),
                elemLoading: '<div id="scrollLoading">Cargando...</div>',
                returnTopText: '<span class="text">volver</span><span class="text2">ARRIBA</span>',
                emptySearchMsg: "<h3>No hay resultados para estos filtros</h3>",
                filterErrorMsg: "hubo un error al intentar filtrar.",
                callback: function(){
                    vitrinas.init();
                },
                shelfCallback:function(){
                    vitrinas.init();
                },
                ajaxCallback:function(){
                    vitrinas.init();
                },
            })
    }

    orderByChange() {
        $(".orderBy").first().find("select option").first().text("Seleccionar");
    }

    filters() {
        $(document).on('click','fieldset.refino h5,fieldset.refino-marca h5, .search-single-navigator h5, .search-single-navigator h4, .search-single-navigator h3',function(){
            $(this).toggleClass('active');
            $(this).find('+ div').toggleClass('active');
        });
    }

    moveFilters() {
        $('.filters-mobile').insertBefore($(".orderBy"));
        $('.menu-departamento').append('<a class="apply-filters">Aplicar Filtros</a><a class="close-filters">Cerrar Filtros</a>');
    }

    openFilters() {
        $(document).on('click','.filters-mobile a', function(e){
            e.preventDefault();
            $('.menu-departamento').toggleClass('active');
        });
        $(document).on('click','.apply-filters, .close-filters', function(e){
            e.preventDefault();
            $('.menu-departamento').removeClass('active');
        })
    }

    makeSliders() {
        if ($('.showcase-owl .showcases').length > 0 && window.innerWidth < 769) {
            $.each($('.showcase-owl .showcases > ul'), function(i, v) {
                if ($(this).find('>li:not(.helperComplement)').length > 2 && window.innerWidth <= 768){
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
                } else
                    $(this).addClass('centered');
            });
        }
    }
}
