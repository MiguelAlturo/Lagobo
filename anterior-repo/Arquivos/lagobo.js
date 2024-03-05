function goToTopPage() {}
function sleep_s(secs) {
    for (secs = +new Date + 1e3 * secs; +new Date < secs; )
        ;
    return !0
}
function addCommas(nStr) {
    nStr += "";
    for (var x = nStr.split("."), x1 = x[0], x2 = x.length > 1 ? "." + x[1] : "", rgx = /(\d+)(\d{3})/; rgx.test(x1); )
        x1 = x1.replace(rgx, "$1.$2");
    return x1 + x2
}
function processSkuPrice(skuData) {
    var discount, cleanBestPrice, cleanListPrice;
    if (skuSelectedHasFired > 0) {
        if (jQuery(".cleaned-price span").text(""),
        skuData.available) {
            var cleanBestPrice = skuData.bestPriceFormated.replace(/\s/, "").replace(",00", "").replace(",0", "");
            document.querySelector(".cleaned-price .bestPrice").innerText = cleanBestPrice,
            skuData.listPrice && skuData.listPrice > 0 && (cleanListPrice = skuData.listPriceFormated.replace(/\s/, "").replace(",00", "").replace(",0", "").replace("$0", ""),
            document.querySelector(".cleaned-price .listPrice").innerText = cleanListPrice,
            jQuery(".cleaned-price .bestPrice").addClass("sale"),
            discount = (skuData.listPrice - skuData.bestPrice) / skuData.listPrice * 100,
            discount = discount.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0],
            discount = Math.round(discount),
            discount > 0 && jQuery(".cleaned-price").append('<div class="percent">' + discount + "% OFF</div>")),
            "undefined" == typeof discount && jQuery(".product-image .cleaned-price").css({
                display: "none"
            }),
            skuSelectedHasFired = 0
        }
    } else
        skuSelectedHasFired++
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date;
        date.setTime(date.getTime() + 24 * days * 60 * 60 * 1e3);
        var expires = "; expires=" + date.toGMTString()
    } else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/"
}
function readCookie(name) {
    for (var nameEQ = name + "=", ca = document.cookie.split(";"), i = 0; i < ca.length; i++) {
        for (var c = ca[i]; " " == c.charAt(0); )
            c = c.substring(1, c.length);
        if (0 == c.indexOf(nameEQ))
            return unescape(c.substring(nameEQ.length, c.length))
    }
    return ""
}
function deleteCookie(name) {
    createCookie(name, "", -1)
}
function mobileDisableClick(e) {
    e.preventDefault()
}
function setupMobile() {
    function _hamburger() {
        if (0 == jQuery("header .row .menu-link").length) {
            var menuLink = '<a href="#" class="menu-link"><span></span></a>';
            jQuery("header .row .header-nav-wrapper .box-rigth").prepend(menuLink),
            jQuery("header .row .box-rigth .menu-link").on("click", function() {
                jQuery(this).toggleClass("active"),
                jQuery("#top-menu").toggleClass("open"),
                jQuery("#top-menu").hasClass("open") || jQuery("#top-menu ul.menu li").removeClass("active")
            })
        }
    }
    function _parentCategoryToggle() {
        jQuery("#top-menu ul.menu > li > a.level0.has-children").on("click", function() {
            jQuery("#top-menu ul.menu li").removeClass("current"),
            jQuery(this).parent().addClass("current"),
            jQuery(this).parent().hasClass("active") ? jQuery(this).parent().removeClass("active") : (jQuery(this).parent().addClass("active"),
            jQuery(this).hasClass("level0") && jQuery("#top-menu ul.menu li").not(".current").removeClass("active"))
        })
    }
    isMobile = window.innerWidth <= mobileBreakpoint,
    isMobile ? (_hamburger(),
    _parentCategoryToggle(),
    jQuery("header .mini-cart .btn-mini-cart").on("click", mobileDisableClick),
    jQuery("header .container").css("opacity", 1),
    jQuery(".header-nav-wrapper .icon-search").click(function() {
        jQuery(this).find("#search").toggleClass("active")
    })) : (jQuery("header .row .menu-link").length > 0 && jQuery("header .row .menu-link").remove(),
    jQuery("header .mini-cart .btn-mini-cart").off("click", mobileDisableClick))
}
function contacto() {
    $("#master_data_store_name").val()
}
if ("grid-page" === document.body.id && "undefined" == typeof window.goToTopPage,
"undefined" == typeof window.sleep_s,
"undefined" == typeof window.addCommas,
"product-page" === document.body.id || "productQuickView" === document.body.id) {
    console.log(document.body.id);
    var skuSelectedHasFired = 1;
    processSkuPrice(skuJson.skus[0]),
    jQuery(window).on("skuSelected.vtex", function(eventData, prodID, skuData) {
        processSkuPrice(skuData)
    });
    var $altura = $(".description-block .productDescription").height()
      , swiche = !1;
    if ($(".product-details .description-block").click(function(e) {
        swiche ? ($(this).css({
            "max-height": "117px"
        }),
        $(this).find("span").removeClass("rotar"),
        $(".product-details .description-block .shadow").css({
            display: "block"
        }),
        swiche = !1) : ($(this).css({
            "max-height": "100%"
        }),
        $(this).find("span").addClass("rotar"),
        $(".product-details .description-block .shadow").css({
            display: "none"
        }),
        swiche = !0)
    }),
    $altura > 115 && ($(".product-details .description-block").css({
        cursor: "pointer"
    }),
    $(".product-details .description-block .arrowUp, .product-details .description-block .shadow").css({
        display: "block"
    })),
    $(".product-details span.brand").length > 0) {
        var brand = $("span.brand a").text().replace(" ", "").toLowerCase();
        0 == $(".product-details span.brand img").length && $("span.brand").append('<img src="/arquivos/' + brand + '_br.png" alt="brand">')
    }
}
var setEnviroment = 0;
if (0 === setEnviroment) {
    var currentUrl = window.location.href
      , devSearches = ["vtexlocal.com.br", "vtexcommercestable.com.br", ".local.com"];
    devSearches.forEach(function(item, index) {
        currentUrl.search(item) && setEnviroment++
    })
}
setEnviroment > 0 || "Dev" === setEnviroment ? console.log("====== Development Environment - Logs ON ======") : console.log = function() {}
;
var mobileBreakpoint = 991, isMobile;
setupMobile(),
jQuery(document).ready(function() {
    function newsletterPopupOpen() {
        jQuery("#newsletter-popup-wrapper").show(0, function() {
            jQuery(this).css({
                opacity: 1
            }),
            jQuery("body").css({
                overflow: "hidden"
            })
        })
    }
    function newsletterPopupClose(e) {
        function closer() {
            jQuery("#newsletter-popup-wrapper").hide(0, function() {
                jQuery(this).css({
                    opacity: ""
                })
            }),
            jQuery("body").css({
                overflow: ""
            })
        }
        return "newsletter-title" === e.target.className || "h3" === e.target.localName ? void closer() : void (jQuery("#newsletter-popup-wrapper .newsletter")[0].contains(e.target) || "btn-ok newsletter-button-ok" === e.target.className || "bt-voltar newsletter-button-back" === e.target.className || closer())
    }
    console.log("DOMContentLoaded"),
    window.addEventListener("click", function(e) {
        newsletterPopupClose(e)
    })
});
var GLOBAL = {
    init: function() {
        this.removeHelperComplement(),
        this.goToHome(),
        this.buttonToTop(),
        this.make(),
        this.newsLetter(),
        this.compararProduct(),
        this.IniMenu(),
        this.carrousellandingcategory(),
        this.cargarProductosminicart(),
        this.carrouselminicart(),
        this.adddiv(),
        this.cerrarCarrito(),
        this.searchBox(),
        this.todosLosEnvios(),
        this.countDown(),
        "not-found-page" === document.body.id && (console.log("====== not-found-page ======"),
        this.carrouselBuscavazia()),
        $(".landing-blackfriday").length > 0 && (console.log("====== landing Black Friday ======"),
        this.countDownBlackFriday(),
        this.sliderBlackFriday())
    },
    cerrarCountDown: function() {
        createCookie("contador", "true", 1),
        $("#countDown").remove(),
        GLOBAL.calculaAltosHeader()
    },
    countDown: function() {
        if ($("#countDown").hide(),
        0 == readCookie("contador").length) {
            var atributos = Array("countDown", "countDownDateFinish", "countDownUrlImage", "countDownUrl", "countDownColor", "countDownDateStart");
            GLOBAL.valorAtributoGlobal(atributos, function(returnValue) {
                if (void 0 !== returnValue && null !== returnValue && Object.keys(returnValue).length > 0) {
                    for (var i = 0; i < returnValue.length; i++)
                        switch (returnValue[i].atributo) {
                        case "countDown":
                            var countDown = returnValue[i].valor;
                            break;
                        case "countDownDateStart":
                            var countDownDateStart = returnValue[i].valor;
                            break;
                        case "countDownDateFinish":
                            var countDownDateFinish = returnValue[i].valor;
                            break;
                        case "countDownUrlImage":
                            var countDownUrlImage = returnValue[i].valor;
                            break;
                        case "countDownUrl":
                            var countDownUrl = returnValue[i].valor;
                            break;
                        case "countDownColor":
                            var countDownColor = returnValue[i].valor
                        }
                    if ("TRUE" == countDown) {
                        var date = new Date
                          , fechaActual = (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
                        new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()))
                          , var1 = countDownDateFinish.split(" ")
                          , fechasola = var1[0].split("-")
                          , horasola = var1[1].split(":")
                          , countDownDate = new Date(fechasola[0],parseInt(fechasola[1]) - 1,fechasola[2],horasola[0],horasola[1])
                          , var2 = countDownDateStart.split(" ")
                          , fechasola2 = var2[0].split("-")
                          , horasola2 = var2[1].split(":")
                          , countDownDateStart = new Date(fechasola2[0],parseInt(fechasola2[1]) - 1,fechasola2[2],horasola2[0],horasola2[1]);
                        if (fechaActual >= countDownDateStart)
                            if (fechaActual <= countDownDate) {
                                jQuery("#countDown .imagen img").attr("src", countDownUrlImage),
                                jQuery("#countDown .link a").attr("href", countDownUrl),
                                jQuery("#countDown .link a").css("color", countDownColor),
                                jQuery("#countDown").css("background-color", countDownColor);
                                var x = setInterval(function() {
                                    var now = (new Date).getTime()
                                      , distance = countDownDate - now
                                      , days = Math.floor(Number(distance) / 864e5)
                                      , hours = Math.floor(Number(distance) % 864e5 / 36e5)
                                      , minutes = Math.floor(Number(distance) % 36e5 / 6e4)
                                      , seconds = Math.floor(Number(distance) % 6e4 / 1e3);
                                    jQuery("#countDown .Days p").html(days),
                                    jQuery("#countDown .Hours p").html(hours),
                                    jQuery("#countDown .Minutes p").html(minutes),
                                    jQuery("#countDown .Seconds p").html(seconds);
                                    var isMobile, mobileBreakpoint = 991;
                                    isMobile = window.innerWidth <= mobileBreakpoint,
                                    isMobile ? jQuery("body .page").css("padding-top", "175px") : jQuery("body .page").css("padding-top", "285px"),
                                    distance < 0 && (clearInterval(x),
                                    document.getElementById("countDown").innerHTML = "EXPIRED")
                                }, 10);
                                $("#countDown").show()
                            } else
                                $("#countDown").hide(),
                                $("#countDown").remove();
                        else
                            $("#countDown").hide(),
                            $("#countDown").remove()
                    }
                } else
                    $("#countDown").remove()
            })
        } else
            $("#countDown").remove()
    },
    valorAtributoGlobal: function(atributoArray, cb_func) {
        var datos = void 0;
        if (atributoArray.length > 0) {
            var atributoString = atributoArray.join(" OR atributo=");
            return $.ajax({
                url: "/api/dataentities/AG/search?_fields=atributo,valor&_where=(atributo=" + atributoString + ")",
                type: "GET",
                success: cb_func,
                beforeSend: function(request) {
                    request.setRequestHeader("Rest-Range", "resources=0-300")
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    datos = void 0
                },
                cache: !1
            }),
            datos
        }
        return datos
    },
    cerrarCarrito: function() {
        jQuery(".mini-cart .overlay").on("click", function() {
            jQuery(".mini-cart a.skip-link").removeClass("active"),
            jQuery("#mini-cart-mobile").removeClass("active"),
            jQuery("#mini-cart").removeClass("active"),
            jQuery(".overlay").css({
                display: "none"
            })
        })
    },
    carrouselBuscavazia: function() {
        var $bz = $("#not-found-page .product-block .prateleira ul");
        $bz.length && $bz.owlCarousel({
            items: 4,
            autoPlay: !0,
            loop: !0,
            pagination: !1,
            itemsDesktopSmall: [980, 3],
            itemsTablet: [767, 2],
            itemsMobile: [479, 2],
            navigation: !0,
            navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
        })
    },
    cargarProductosminicart: function() {
        $(".mini-cart .portal-minicart-ref ").after("<div class='productos_minicart'></div>"),
        $(".mini-cart .productos_minicart ").before('<div class="title-minicart"><h2>Támbien te puede interesar</h2></div>'),
        $.ajax({
            url: "/buscapagina?sl=ef3fcb99-de72-4251-aa57-71fe5b6e149f&cc=5&sm=0&PS=5",
            type: "GET",
            dataType: "html",
            beforeSend: function(msg) {},
            success: function(data) {
                $(".mini-cart .productos_minicart").html(data)
            },
            error: function(xhr, status) {
                alert("Sorry, there was a problem!")
            }
        })
    },
    adddiv: function() {
        console.log("hola")
    },
    carrouselminicart: function() {
        setTimeout(function() {
            var $showCaseOwl_ = $(".mini-cart .productos_minicart .prateleira > ul");
            $showCaseOwl_.length && ($showCaseOwl_.find(".helperComplement").remove(),
            $showCaseOwl_.owlCarousel({
                items: 2,
                autoPlay: !0,
                stopOnHover: !0,
                pagination: !1,
                loop: !0,
                itemsDesktop: !1,
                itemsDesktopSmall: [980, 2],
                itemsTablet: [767, 2],
                itemsMobile: [0, 3],
                navigation: !0
            }))
        }, 1e3)
    },
    addTaxApi: function(priceToAdd, taxToAdd, promotion) {
        var tax, price = Number(Number.parseFloat(priceToAdd).toFixed(0));
        tax = taxToAdd ? Number(Number.parseFloat(taxToAdd).toFixed(0)) : 0;
        var priceWithTax = price + tax;
        return priceWithTax = priceWithTax.toFixed(0),
        "$" + addCommas(priceWithTax)
    },
    carrouselBuscavazia: function() {
        var $bz = $("#not-found-page .product-block .prateleira ul");
        $bz.length && ($bz.find(".helperComplement").remove(),
        $bz.owlCarousel({
            items: 4,
            stagePadding: 50,
            autoPlay: 4e3,
            lazyLoadEager: 3,
            pagination: !1,
            navigation: !0,
            navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>'],
            itemsTablet: [767, 2],
            itemsMobile: [479, 2]
        }))
    },
    searchBox: function() {
        console.log("search"),
        $("#search form, #searchMobile form").submit(function() {
            var word = $("#inputBuscador, #inputBuscadorMobile").val();
            return window.location.href = "/" + word,
            !1
        }),
        $(document).ready(function() {
            $("#inputBuscador, #inputBuscadorMobile").on("blur", function() {
                $("#box-search #buscadorBox, #box-searchMobile #buscadorBoxMobile").slideUp(200),
                setTimeout(function() {
                    $("#inputBuscador, #inputBuscadorMobile").focus()
                }, 1500)
            }),
            $("input[type=text]#inputBuscador, input[type=text]#inputBuscadorMobile").on("keypress", function(e) {
                var code = e.keyCode ? e.keyCode : e.which;
                if (13 == code) {
                    var word = $(this).val();
                    return window.location.href = "/" + word,
                    !1
                }
            }),
            $(".btn-buscar").on("click", function(e) {
                var word = $("#inputBuscador").val();
                return window.location.href = "/" + word,
                !1
            }),
            isMobile && $(".btn-buscar").on("click", function(e) {
                var word = $("#inputBuscadorMobile").val();
                return window.location.href = "/" + word,
                !1
            }),
            window.addEventListener("click", function(e) {
                $(".searchBox .produt-list ul").empty()
            }),
            $("#inputBuscador, #inputBuscadorMobile").keyup(function(event) {
                var busca = $(this).val();
                $("#buscadorBox, #buscadorBoxMobile").slideDown(800),
                busca.length > 3 && $.ajax({
                    type: "GET",
                    url: "/api/catalog_system/pub/products/search/" + busca,
                    headers: {
                        resources: "0-10"
                    },
                    beforeSend: function() {
                        $(".produt-list ul").html("<li class='loading'><img src='/arquivos/ajax-loader.gif' /></li>")
                    },
                    success: function(data) {
                        $(".loading").remove();
                        for (var search = data, container = $(".searchBox .produt-list ul"), i = 0; i < search.length; i++) {
                            products = search[i],
                            productId = products.productId,
                            productName = products.productName,
                            productLink = products.link,
                            priceList = [],
                            priceList2 = [],
                            tax = [];
                            for (var j = 0; j < products.items.length; j++) {
                                if (taxAsPercent = Number(products.items[j].sellers[0].commertialOffer.Tax / 100) / Number(products.items[j].sellers[0].commertialOffer.Price / 100),
                                productPriceValid = products.items[j].sellers[0].commertialOffer.Price,
                                productPriceValid2 = products.items[j].sellers[0].commertialOffer.ListPrice,
                                tax = products.items[j].sellers[0].commertialOffer.Tax,
                                productPriceValid == productPriceValid2)
                                    var cleanBestPrice = GLOBAL.addTaxApi(productPriceValid, tax, !1)
                                      , cleanListPrice = "";
                                else
                                    var cleanBestPrice = GLOBAL.addTaxApi(productPriceValid, tax, !0)
                                      , cleanListPrice = GLOBAL.addTaxApi(productPriceValid2, productPriceValid2 * taxAsPercent, !0);
                                priceList.push(cleanBestPrice),
                                priceList2.push(cleanListPrice),
                                console.log(products.items[j].sellers[0])
                            }
                            if (productPrice = priceList,
                            productImage = "/arquivos/ids/" + products.items[0].images[0].imageId + "-230-337/" + products.items[0].images[0].imageText + ".jpg",
                            container.find("li").length <= 9) {
                                Listpricex_ = priceList2,
                                console.log(productPrice),
                                console.log(Listpricex_);
                                var price2 = Listpricex_
                                  , price = productPrice;
                                price === price2 ? band = "none" : band = "block",
                                "0.00" == price && (price = "PRODUCTO AGOTADO"),
                                $(container).append("<li id=" + productId + "><a class='info-busca' href=" + productLink + "><span><img src=" + productImage + " alt=" + productName + ' border="0" /></span><h3 class="nombreProducto">' + productName + '</h3><p><span class="precioTachado" style="display:' + band + ';">' + price2 + '</span><span class="x-price">' + price + "</span></p><span class='btnVer'>VER</span></a></li>");
                                var isMobile, mobileBreakpoint = 991;
                                if (isMobile = window.innerWidth <= mobileBreakpoint) {
                                    var idCounts = {};
                                    $("#buscadorBoxMobile .searchBox .produt-list ul li").each(function() {
                                        "" != this.id && (idCounts[this.id] = (idCounts[this.id] || 0) + 1),
                                        idCounts[this.id] > 1 && $(this).remove()
                                    })
                                } else {
                                    var idCounts = {};
                                    $("#buscadorBox .searchBox .produt-list ul li").each(function() {
                                        "" != this.id && (idCounts[this.id] = (idCounts[this.id] || 0) + 1),
                                        idCounts[this.id] > 1 && $(this).remove()
                                    })
                                }
                            }
                        }
                    },
                    error: function(data) {
                        console.log(data),
                        console.log("Ops, ocorreu um erro."),
                        $(".x-wrapper--itens .x-search-box-wrapper").removeClass("x-not-padding")
                    }
                })
            })
        })
    },
    removeHelperComplement: function() {
        jQuery(document).on("ajaxStop ready", function() {
            jQuery("li.helperComplement").remove()
        })
    },
    IniMenu: function() {
        isMobile && ($("a.menu-link").on("click", function(event) {
            event.preventDefault(),
            $(".dl-trigger").hasClass("dl-active") ? (jQuery(".dl-trigger").removeClass("dl-active"),
            jQuery("ul.dl-menu").removeClass("dl-menuopen dl-subview dl-menuopen"),
            jQuery("ul.dl-menu li").removeClass("dl-subviewopen"),
            jQuery("body").removeClass("menuopen")) : (jQuery(".dl-trigger").addClass("dl-active"),
            jQuery("ul.dl-menu").addClass("dl-menuopen"),
            jQuery("body").addClass("menuopen"),
            jQuery("ul.dl-menu.dl-menu li ul.dl-submenu").removeClass("active"),
            jQuery("ul.dl-menu.dl-menu li").removeClass("boldAzul"))
        }),
        $(".dl-menu .wrapper-menu > li.has-son > a").on("click", function(e) {
            e.preventDefault();
            var elemnt = $(this).parent();
            $(elemnt).hasClass("boldAzul") ? ($(elemnt).removeClass("boldAzul"),
            $("ul.dl-menu li").removeClass("niveltres"),
            $(".dl-submenu .dl-submenu.active").removeClass("active")) : ($("ul.dl-menu li").removeClass("boldAzul"),
            $("ul.dl-menu li").removeClass("niveltres"),
            $(elemnt).addClass("boldAzul"),
            $(".dl-submenu .dl-submenu.active").removeClass("active")),
            $(this).parent().find(">.dl-submenu").toggleClass("active"),
            $(this).parent().siblings().find(".dl-submenu").removeClass("active")
        }),
        $(".dl-menu .dl-submenu > li > a").click(function(e) {
            var submenu = $(this).parent().find(">.dl-submenu");
            $(submenu).length > 0 ? (e.preventDefault(),
            $(this).parent().toggleClass("niveltres"),
            $(this).parent().find(">.dl-submenu").toggleClass("active")) : console.log("no tiene mas")
        }))
    },
    goToHome: function() {
        jQuery(window).load(function() {
            jQuery("#login-page .modal-header .vtexIdUI-close").on("click", function() {
                console.log("éntro"),
                window.location = "/"
            })
        })
    },
    buttonToTop: function() {
        if (jQuery("#back-to-top").length) {
            var scrollTrigger = 100
              , backToTop = function() {
                var scrollTop = $(window).scrollTop();
                scrollTop > scrollTrigger ? jQuery("#back-to-top").addClass("show") : jQuery("#back-to-top").removeClass("show")
            };
            backToTop(),
            jQuery(window).on("scroll", function() {
                backToTop()
            }),
            jQuery("#back-to-top").on("click", function(e) {
                e.preventDefault(),
                jQuery("html,body").animate({
                    scrollTop: 0
                }, 700)
            })
        }
    },
    make: function() {
        function _ifUserLoggedIn() {
            jQuery(".ajax-content-loader").find("#login").length > 0 ? jQuery("body").removeClass("logged-user").addClass("guestuser") : jQuery("body").removeClass("guestuser").addClass("logged-user")
        }
        jQuery(document).on("ajaxStop", function() {
            _ifUserLoggedIn()
        }),
        _ifUserLoggedIn()
    },

    formatearMoneda: function (numero, numDecimales, separadorMiles, separadorDecimales) {
		var n = numero,
			numDecimales = isNaN(numDecimales = Math.abs(numDecimales)) ? 2 : numDecimales,
			separadorDecimales = separadorDecimales == undefined ? "." : separadorDecimales,
			separadorMiles = separadorMiles == undefined ? "," : separadorMiles,
			s = n < 0 ? "-" : "",
			i = parseInt(n = Math.abs(+n || 0).toFixed(numDecimales)) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + separadorMiles : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + separadorMiles) + (numDecimales ? separadorDecimales + Math.abs(n - i).toFixed(numDecimales).slice(2) : "");
	},
    todosLosEnvios: function() {

        var zonesJson;
        var init= function(){
            if (jQuery("#tablaEnvios .tabla").length > 0) {
                var text = jQuery("#tablaEnvios .tabla").text();
                zonesJson = jQuery.parseJSON(text);
                createBasStructure();                
            }
        };

        var departmentChange = function(){
            $("h2#tituloPrecioEnvio").length > 0 && $("h2#tituloPrecioEnvio").remove();
            var dropdown = jQuery("select#departamentos")
              , dropdownCiudades = jQuery("select#ciudades");
            dropdownCiudades.empty(),
            dropdownCiudades.append("<option value=''>Seleccionar</option>"),
            jQuery.each(zonesJson, function(i, val) {
                dropdown.val() == i && jQuery.each(val, function(j, h) {
                    dropdownCiudades.append('<option value="' + h + '">' + j + "</option>")
                })
            })
        };


        var simulateShippingSku = function (skuId,skuQTY,skuSeller, municipioDaneSelected) {
            var items = [{
                id: skuId,
                quantity: skuQTY,
                seller: skuSeller
            }];
    
            var postalCode = municipioDaneSelected;
            var country = 'COL';
    
            vtexjs.checkout.simulateShipping(items, postalCode, country).done(function(result) {
                console.log(result);
                if (result.logisticsInfo[0].slas.length && result.logisticsInfo[0].slas[0].deliveryChannel != 'undefined' && result.logisticsInfo[0].slas[0].deliveryChannel == 'delivery') {
                    var priceShipping = result.logisticsInfo[0].slas[0].price / 100
                    if(priceShipping == 0){
                        $("#tablaEnvios").append("<h2 id='tituloPrecioEnvio'>El envío es gratis</h2>");
                    }else{
                        var precioFinal = GLOBAL.formatearMoneda(priceShipping,0,".",",");
                        $("#tablaEnvios").append("<h2 id='tituloPrecioEnvio'>El precio de envío es " + precioFinal + "</h2>");
                    }
			    }
			    else{
			    	console.info("No tiene precio configurado");
			    	$("#tablaEnvios").append("<h2 id='tituloPrecioEnvio'>Lo sentimos, no tenemos cobertura a esa área</h2>")
                }        
            });
        }


        var citychanges = function(){
            var zipCodec = $("select#ciudades option:selected").attr("value");
              
            $("h2#tituloPrecioEnvio").length > 0 && $("h2#tituloPrecioEnvio").remove();
            simulateShippingSku(skuJson.skus[0].sku, parseInt($('.quantitySelector input').val()),1,zipCodec);
        };

        var createBasStructure = function(){
            $("#tablaEnvios").append("<h2 id='tituloCalcula'>Calcula tu envío</h2><label>Departamento <select id='departamentos'><option value=''>Seleccionar</option></select></label><label id='labelCiudades'>Ciudad <select id='ciudades'></select></label>");
            var dropdown = $("select#departamentos");
            jQuery.each(zonesJson, function(i, val) {
                dropdown.append('<option value="' + i + '">' + i + "</option>")
            });
            $("select#departamentos").change(departmentChange);
            $("select#ciudades").change(citychanges);
        }

        init();
    },
    newsLetter: function() {
        console.log("holiii"),
        jQuery(".formulario-newsletter").on("submit", function(e) {
            var divNewsletter = jQuery(this).closest("div.newsletter")
              , name = jQuery(divNewsletter).find("#newsletterClientName").val()
              , phone = jQuery(divNewsletter).find("#newsletterClientPhone").val()
              , email = jQuery(divNewsletter).find("#newsletterClientEmail").val()
              , dataEntity = (jQuery(divNewsletter).find("#storeName").val(),
            jQuery(divNewsletter).find("#dataEntity").val());
            if (console.log("datos1 :" + name),
            console.log("datos1 :" + email),
            "" == email || null == email || void 0 == email)
                jQuery(divNewsletter).find("fieldset.formulario").hide(),
                jQuery(divNewsletter).find("fieldset.success").hide(),
                jQuery(divNewsletter).find("fieldset.error").show();
            else {
                var jsonCO = {
                    firstName: name,
                    phone: phone,
                    email: email,
                    isNewsletterOptIn: !0
                }
                  , urlCO = "/api/dataentities/" + dataEntity + "/documents";
                $.ajax({
                    beforeSend: function(xhrObj) {
                        xhrObj.setRequestHeader("Content-Type", "application/json")
                    },
                    data: JSON.stringify(jsonCO),
                    type: "PATCH",
                    url: urlCO,
                    dataType: "json",
                    contentType: "application/json",
                    success: function(data) {
                        console.log(data),
                        jQuery(divNewsletter).find("fieldset.formulario").hide(),
                        jQuery(divNewsletter).find("fieldset.success").show(),
                        jQuery(divNewsletter).find("fieldset.error").hide()
                    },
                    error: function(data) {
                        var obj = JSON.parse(data.responseText);
                        400 == data.status && "O documento já existe" == obj.Message ? (jQuery(divNewsletter).find("fieldset.formulario").hide(),
                        jQuery(divNewsletter).find("fieldset.success").show(),
                        jQuery(divNewsletter).find("fieldset.error").hide()) : (jQuery(divNewsletter).find("fieldset.formulario").hide(),
                        jQuery(divNewsletter).find("fieldset.success").hide(),
                        jQuery(divNewsletter).find("fieldset.error").show())
                    }
                })
            }
            e.preventDefault()
        }),
        jQuery("input.newsletter-button-back").on("click", function() {
            var divNewsletter = jQuery(this).closest("div.newsletter");
            jQuery(divNewsletter).find("fieldset.formulario").show(),
            jQuery(divNewsletter).find("fieldset.success").hide(),
            jQuery(divNewsletter).find("fieldset.error").hide()
        })
    },
    compararProduct: function() {
        $('<div class="animate"></div>').appendTo($(".vitrinas ul li")),
        $(".vitrine .comparator .compare-product-checkbox").change(function() {
            var number = $("#NumeroSuperior").text()
              , $input = $(this);
            if (number >= 1 ? ($(".container-compare").addClass("active"),
            $("#number-compare").text("( " + number + " productos)")) : ($(".container-compare").removeClass("active"),
            $("#compare-images .img_p").remove()),
            $input.prop("checked")) {
                var father = $(this).parents(".box-item")
                  , id = father.find(".productImage a img").attr("alt");
                if (id = id.toString(),
                id = id.replace(".", "-"),
                father.find(".box-product").clone().prependTo("#compare-images").attr("id", id),
                $(".box-product#" + id).length > 0) {
                    var label = father.find(".comparator label").clone();
                    $(label).prependTo(".box-product#" + id)
                } else
                    console.log("no existo" + id);
                $(this).parents(".box-item").siblings(".animate").addClass("activo"),
                setTimeout(function() {
                    $(".animate").removeClass("activo")
                }, 1e3)
            } else {
                var father = $(this).parents(".box-item .productImage")
                  , id = father.find("a img").attr("alt");
                $("#compare-images").find("#" + id).remove()
            }
            $("#clear").click(function(event) {
                location.reload()
            }),
            $("#a-compare").click(function() {
                $(".btn-comparar").trigger("click")
            })
        }).change()
    },
    carrousellandingcategory: function() {
        "brand-page" === document.body.id && ($.fn.owlCarousel && (jQuery(".contenido-category").addClass("owl-carousel"),
        jQuery(".contenido-category").owlCarousel({
            items: 4,
            autoPlay: !0,
            loop: !0,
            stopOnHover: !0,
            pagination: !0,
            itemsDesktop: !1,
            itemsDesktopSmall: [980, 3],
            itemsTablet: [767, 4],
            itemsMobile: [479, 2],
            navigation: !0,
            navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
        })),
        setTimeout(function() {
            $.fn.owlCarousel && (jQuery(".coleccion-category .prateleira >ul").addClass("owl-carousel"),
            jQuery(".coleccion-category .prateleira >ul").owlCarousel({
                items: 4,
                autoPlay: !0,
                loop: !0,
                stopOnHover: !0,
                pagination: !0,
                itemsDesktop: !1,
                itemsDesktopSmall: [980, 3],
                itemsTablet: [767, 4],
                itemsMobile: [479, 2],
                navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
            }))
        }, 1500))
    },
    countDownBlackFriday: function() {
        $("#countDownBlackFriday").hide(),
        console.log("ingresé:");
        var atributos = Array("BlackfridaycountDown", "BlackfridaycountDownDateFinish", "BlackfridayCountDownUrlImage", "BlackfridaycountDownUrl", "BlackfridaycountDownColor", "BlackfridaycountDownDateStart");
        GLOBAL.valorAtributoGlobal(atributos, function(returnValue) {
            if (void 0 !== returnValue && null !== returnValue && Object.keys(returnValue).length > 0) {
                for (var i = 0; i < returnValue.length; i++)
                    switch (returnValue[i].atributo) {
                    case "BlackfridaycountDown":
                        var countDown = returnValue[i].valor;
                        break;
                    case "BlackfridaycountDownDateStart":
                        var countDownDateStart = returnValue[i].valor;
                        break;
                    case "BlackfridaycountDownDateFinish":
                        var countDownDateFinish = returnValue[i].valor;
                        break;
                    case "BlackfridaycountDownUrlImage":
                        var countDownUrlImage = returnValue[i].valor;
                        break;
                    case "BlackfridaycountDownUrl":
                        var countDownUrl = returnValue[i].valor;
                        break;
                    case "BlackfridaycountDownColor":
                        var countDownColor = returnValue[i].valor
                    }
                if ("TRUE" == countDown) {
                    var date = new Date
                      , fechaActual = (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
                    new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()))
                      , var1 = countDownDateFinish.split(" ")
                      , fechasola = var1[0].split("-")
                      , horasola = var1[1].split(":")
                      , countDownDate = new Date(fechasola[0],parseInt(fechasola[1]) - 1,fechasola[2],horasola[0],horasola[1])
                      , var2 = countDownDateStart.split(" ")
                      , fechasola2 = var2[0].split("-")
                      , horasola2 = var2[1].split(":")
                      , countDownDateStart = new Date(fechasola2[0],parseInt(fechasola2[1]) - 1,fechasola2[2],horasola2[0],horasola2[1]);
                    if (fechaActual >= countDownDateStart)
                        if (fechaActual <= countDownDate) {
                            jQuery("#countDownBlackFriday .imagen img").attr("src", countDownUrlImage),
                            jQuery("#countDownBlackFriday .link a").attr("href", countDownUrl),
                            jQuery("#countDownBlackFriday").css("background-color", countDownColor);
                            var x = setInterval(function() {
                                var now = (new Date).getTime()
                                  , distance = countDownDate - now
                                  , days = Math.floor(Number(distance) / 864e5)
                                  , hours = Math.floor(Number(distance) % 864e5 / 36e5)
                                  , minutes = Math.floor(Number(distance) % 36e5 / 6e4)
                                  , seconds = Math.floor(Number(distance) % 6e4 / 1e3);
                                jQuery("#countDownBlackFriday .Day p").html(days),
                                jQuery("#countDownBlackFriday .Hours p").html(hours),
                                jQuery("#countDownBlackFriday .Minutes p").html(minutes),
                                jQuery("#countDownBlackFriday .Seconds p").html(seconds),
                                distance < 0 && (clearInterval(x),
                                document.getElementById("countDownBlackFriday").innerHTML = "EXPIRED")
                            }, 10);
                            $("#countDownBlackFriday").show()
                        } else
                            $("#countDownBlackFriday").hide(),
                            $("#countDownBlackFriday").remove();
                    else
                        $("#countDownBlackFriday").hide(),
                        $("#countDownBlackFriday").remove()
                }
            } else
                $("#countDownBlackFriday").remove()
        })
    },
    sliderBlackFriday: function() {
        setTimeout(function() {
            $.fn.owlCarousel && (jQuery("#box-oferta2 .content-oferta .prateleira.vitrine >ul").addClass("owl-carousel"),
            jQuery("#box-oferta2 .content-oferta .prateleira.vitrine >ul").owlCarousel({
                items: 4,
                autoPlay: !0,
                loop: !0,
                stopOnHover: !0,
                pagination: !0,
                itemsDesktop: !1,
                itemsDesktopSmall: [980, 3],
                itemsTablet: [767, 4],
                itemsMobile: [479, 2],
                navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
            }),
            jQuery("#box-oferta3 .content-oferta .prateleira.vitrine >ul").addClass("owl-carousel"),
            jQuery("#box-oferta3 .content-oferta .prateleira.vitrine >ul").owlCarousel({
                items: 2,
                autoPlay: !0,
                loop: !0,
                stopOnHover: !0,
                pagination: !0,
                itemsDesktop: !1,
                itemsDesktopSmall: [980, 2],
                itemsTablet: [767, 1],
                itemsMobile: [479, 1],
                navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
            }),
            jQuery("#box-oferta4 .content-oferta .prateleira.vitrine >ul").addClass("owl-carousel"),
            jQuery("#box-oferta4 .content-oferta .prateleira.vitrine >ul").owlCarousel({
                items: 4,
                autoPlay: !0,
                loop: !0,
                stopOnHover: !0,
                pagination: !0,
                itemsDesktop: !1,
                itemsDesktopSmall: [980, 3],
                itemsTablet: [767, 4],
                itemsMobile: [479, 2],
                navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
            }))
        }, 1500)
    }
};
jQuery(".closeMinicart").on("click", function() {
    jQuery(".mini-cart a.skip-link").removeClass("active"),
    jQuery("#mini-cart-mobile").removeClass("active"),
    jQuery("#mini-cart").removeClass("active"),
    jQuery(".overlay").css({
        display: "none"
    })
});
var HEADERFOOTER = {
    init: function() {
        this.moveElementsMobile(),
        this.toggleSkipLinks(),
        this.stickyHeader(),
        this.toggleFooter(),
        this.carritoabierto()
    },
    carritoabierto: function() {
        jQuery(".header .mini-cart .skip-link").on("click", function(event) {
            jQuery("#mini-cart").hasClass("active") ? jQuery(".overlay").css({
                display: "block"
            }) : jQuery(".overlay").css({
                display: "none"
            })
        })
    },
    moveElementsMobile: function() {
        isMobile ? (jQuery("header .top-links .sing-in").appendTo(".account-mobile"),
        jQuery("header .top-links").appendTo("#top-menu .menu"),
        jQuery(".footer .row-menus-top .column ul li.reclamos").appendTo(".footer .row-menus-top")) : jQuery("header .top-links .sing-in").appendTo(".top-links")
    },
    toggleSkipLinks: function() {
        jQuery("header .skip-link").on("click", function() {
            var target_element = jQuery(this).attr("data-id");
            jQuery("header .skip-link").not(jQuery(this)).removeClass("active"),
            jQuery(this).toggleClass("active"),
            jQuery("header .skip-content").not(target_element).hide().removeClass("active"),
            jQuery(target_element).toggle().toggleClass("active"),
            $(".dl-trigger").hasClass("dl-active") && (jQuery("a.menu-link").removeClass("active"),
            jQuery(".dl-trigger").removeClass("dl-active"),
            jQuery("ul.dl-menu").removeClass("dl-menuopen dl-subview dl-menuopen"),
            jQuery("ul.dl-menu li").removeClass("dl-subviewopen"))
        })
    },
    stickyHeader: function() {
        /*function _setStickyifScrollTop() {
            jQuery(document).ready(function() {
                var st = jQuery(window).scrollTop();
                st > 130 ? (jQuery(".header_menu").removeClass("sticky"),
                jQuery(".header_menu").addClass("sticky")) : jQuery(".header_menu").removeClass("sticky")
            })
        }
        function _setScrollUpDown() {
            var lastScrollTop = 0;
            jQuery(window).scroll(function(event) {
                var st = jQuery(this).scrollTop();
                st > 130 ? (jQuery(".header_menu").addClass("sticky"),
                st > lastScrollTop ? jQuery("body").removeClass("scrollUp") : jQuery("body").addClass("scrollUp"),
                lastScrollTop = st) : jQuery(".header_menu").removeClass("sticky")
            })
        }
        _setStickyifScrollTop(),
        _setScrollUpDown()*/
    },
    toggleFooter: function() {
        var trigger = jQuery(".footer .row-menus-top h2");
        isMobile ? (jQuery(".footer .row-menus-top .col-newsletter").insertBefore(".footer .row-menus-top .column.col-servicio"),
        jQuery(trigger).click(function() {
            jQuery(this).toggleClass("active"),
            jQuery(this).next("ul").toggle()
        })) : jQuery(".footer .row-menus-top h2 ul").show()
    }
}
  , MINICART = {
    init: function() {
        this.carritoInicial(),
        this.refreshOnBuy(),
        this.refreshOnProdRemoved(),
        this.updateMiniCarts(),
        this.contarProdsMinicart()
    },
    carritoInicial: function() {
        vtexjs.checkout.getOrderForm().done(function(orderForm) {
            if (orderForm.items.length > 0) {
                if (sleep_s(1)) {
                    var cartControl = jQuery("#mini-cart");
                    cartControl.find(".vtexsc-productList tbody tr").each(function(index) {
                        console.log(index);
                        var cantidadActual = jQuery(this).find(".vtexsc-skuQtt").html();
                        jQuery(this).append('<td class="editar"><a href="javascript:void(0);" onclick="MINICART.crearBotonesMinicart(this, ' + cantidadActual + " ,'" + index + '\')"><i class="far fa-edit"></i></a></td>');
                    }),
                    0 === $(".ver_carrito").length && jQuery(".header-nav-wrapper .mini-cart .ver_carrito").insertAfter(".portal-minicart-ref .cartFooter .cartCheckout")
                }
            } else {
                var minicart = ".mini-cart";
                jQuery(minicart).find(".portal-minicart-ref .empty").remove(),
                jQuery(minicart).find(".portal-minicart-ref .vtexsc-center").hide(),
                jQuery(minicart).find(".portal-minicart-ref").append('<div class="empty"><p>Tu carrito de compras está vacío.</p></div>'),
                jQuery(minicart).find(".ver_carrito").css({
                    display: "none"
                })
            }
        })
    },
    refreshOnBuy: function() {
        jQuery(window).on("cartProductAdded.vtex", function() {
            vtexjs.checkout.getOrderForm().done(function(orderForm) {
                if (orderForm.items.length > 0) {
                    if (sleep_s(1)) {
                        var cartControl = jQuery("#mini-cart");
                        cartControl.find(".vtexsc-productList tbody tr").each(function(index) {
                            console.log(index);
                            var cantidadActual = jQuery(this).find(".vtexsc-skuQtt").html();
                            jQuery(this).append('<td class="editar"><a href="javascript:void(0);"onclick="MINICART.crearBotonesMinicart(this, ' + cantidadActual + " ,'" + index + '\')"><i class="far fa-edit"></i></a></td>')
                        }),
                        0 === $(".ver_carrito").length && jQuery(".header-nav-wrapper .mini-cart .ver_carrito").insertAfter(".portal-minicart-ref .cartFooter .cartCheckout")
                    }
                } else {
                    var minicart = ".mini-cart";
                    jQuery(minicart).find(".portal-minicart-ref .empty").remove(),
                    jQuery(minicart).find(".portal-minicart-ref .vtexsc-center").hide(),
                    jQuery(minicart).find(".portal-minicart-ref").append('<div class="empty"><p>Tu carrito de compras está vacío.</p></div>'),
                    jQuery(minicart).find(".ver_carrito").css({
                        display: "none"
                    })
                }
            }),
            setTimeout(function() {
                MINICART.updateMiniCarts()
            }, 800)
        })
    },
    refreshOnProdRemoved: function() {
        jQuery(window).on("cartProductRemoved.vtex", function() {
            vtexjs.checkout.getOrderForm().done(function(orderForm) {
                if (orderForm.items.length > 0) {
                    if (sleep_s(1)) {
                        var cartControl = jQuery("#mini-cart");
                        cartControl.find(".vtexsc-productList tbody tr").each(function(index) {
                            console.log("hola4"),
                            console.log(index);
                            var cantidadActual = jQuery(this).find(".vtexsc-skuQtt").html();
                            jQuery(this).append('<td class="editar"><a href="javascript:void(0);" onclick="MINICART.crearBotonesMinicart(this, ' + cantidadActual + " ,'" + index + '\')"><i class="far fa-edit"></i></a></td>')
                        }),
                        0 === $(".ver_carrito").length && jQuery(".header-nav-wrapper .mini-cart .ver_carrito").insertAfter(".portal-minicart-ref .cartFooter .cartCheckout")
                    }
                } else {
                    var minicart = ".mini-cart";
                    jQuery(minicart).find(".portal-minicart-ref .empty").remove(),
                    jQuery(minicart).find(".portal-minicart-ref .vtexsc-center").hide(),
                    jQuery(minicart).find(".portal-minicart-ref").append('<div class="empty"><p>Tu carrito de compras está vacío.</p></div>'),
                    jQuery(minicart).find(".ver_carrito").css({
                        display: "none"
                    })
                }
            }),
            setTimeout(function() {
                MINICART.updateMiniCarts()
            }, 800)
        })
    },
    updateMiniCarts: function() {
        jQuery(document).ajaxStop(function() {
            function _updateElement() {
                var minicart = ".mini-cart";
                jQuery(minicart).find(".cartCheckout").attr("href", "/checkout/#/cart"),
                jQuery(".v2-vtexsc-cart").removeClass("mouseActivated").removeClass("preLoaded").removeClass("vtexsc-cart"),
                "" == jQuery(minicart).find(".portal-minicart-ref .vtexsc-productList tbody").html() ? (jQuery(minicart).find(".portal-minicart-ref .empty").remove(),
                jQuery(minicart).find(".portal-minicart-ref .vtexsc-center").hide(),
                jQuery(minicart).find(".portal-minicart-ref").append('<div class="empty"><p>Tu carrito de compras está vacío.</p></div>'),
                jQuery(minicart).find(".ver_carrito").css({
                    display: "none"
                })) : 0 === $(".ver_carrito").length && jQuery(".header-nav-wrapper .mini-cart .ver_carrito").insertAfter(".portal-minicart-ref .cartFooter .cartCheckout")
            }
            _updateElement()
        })
    },
    contarProdsMinicart: function() {
        jQuery(document).ajaxStop(function() {
            jQuery(".mini-cart-qty-admake").hide().html("");
            var count = 0;
            jQuery(".portal-minicart-ref .vtexsc-center").each(function() {
                count = jQuery(this).find(".cartSkuImage").length
            }),
            jQuery("#mini-cart .vtexsc-wrap").find("p").remove(),
            jQuery("#mini-cart_mobile .vtexsc-wrap").find("p").remove(),
            count > 0 && jQuery(".mini-cart-qty-admake").show().text(count)
        })
    },
    crearBotonesMinicart: function(tr_, cantidadActual, posicion) {
        html = "",
        html += "<div class='input-group'>",
        html += "<span class='input-group-btn'><button type='button' class=' btn btn-default btn-number-decrease' data-type='minus' onclick='MINICART.disminuir(this)'><span class='glyphicon glyphicon-minus'></span></button></span>",
        html += "<input class=' form-control input-number' value='" + cantidadActual + "' target='product-$id' type='text' min='1' max='10' />",
        html += "<span class='input-group-btn'><button type='button' class='btn btn-default btn-number-add' data-type='plus' onclick='MINICART.incrementar(this)'><span class='glyphicon glyphicon-plus'></span></button></span>",
        html += "<span class='input-group-btn'><button type='button' class='btn btn-default btn-number-save' data-type='save' onclick='MINICART.save(this,\"" + posicion + "\")'><span><i class='far fa-save'></i></span></button></span>",
        html += "</div>",
        console.log(tr_),
        jQuery(tr_).parent().html(html)
    },
    incrementar: function(_this) {
        minValue = 1,
        maxValue = 10;
        var input = jQuery(_this).parent().parent().find("input:text")
          , decremento_boton = jQuery(_this).parent().parent().find(".btn-number-decrease")
          , incremento_boton = jQuery(_this).parent().parent().find(".btn-number-add");
        input.val() < maxValue && (input.val(parseInt(input.val()) + 1),
        "disabled" == decremento_boton.attr("disabled") && decremento_boton.prop("disabled", !1)),
        input.val() == maxValue && incremento_boton.prop("disabled", !0),
        input.val() >= minValue ? "disabled" == decremento_boton.attr("disabled") && decremento_boton.prop("disabled", !1) : console.log("lo sentimos, se alcanzó el valor mínimo: " + input.val())
    },
    disminuir: function(_this) {
        minValue = 1,
        maxValue = 10;
        var input = jQuery(_this).parent().parent().find("input:text")
          , decremento_boton = jQuery(_this).parent().parent().find(".btn-number-decrease")
          , incremento_boton = jQuery(_this).parent().parent().find(".btn-number-add");
        input.val() > minValue && (input.val(parseInt(input.val()) - 1),
        "disabled" == decremento_boton.attr("disabled") ? (decremento_boton.prop("disabled", !1),
        incremento_boton.prop("disabled", !1)) : incremento_boton.prop("disabled", !1)),
        input.val() == minValue && (incremento_boton.prop("disabled", !1),
        decremento_boton.prop("disabled", !0))
    },
    save: function(_this, posicion) {
        minValue = 1,
        maxValue = 10;
        var input = jQuery(_this).parent().parent().find("input:text");
        posicion = Number(posicion),
        vtexjs.checkout.getOrderForm().then(function(orderForm) {
            console.log(posicion),
            console.log(input.val());
            var itemIndex = posicion
              , updateItem = (orderForm.items[itemIndex],
            {
                index: itemIndex,
                quantity: input.val()
            });
            return vtexjs.checkout.updateItems([updateItem], null, 1)
        }).done(function(orderForm) {
            console.log(orderForm),
            console.log("Actualizado"),
            MINICART.carritoInicial()
        })
    }
}
  , HOME = {
    init: function() {
        "home-page" === document.body.id && (console.log("====== Home Page ======"),
        this.makeVideoCarousel(),
        this.makeAtributeCarousel(),
        this.makeBannersAtributos(),
        this.makeCarouselbrand(),
        this.countDownCarrusel())
    },
    countDownCarrusel: function() {
        $("#countDownCarrusel").hide();
        var atributos = Array("carruselCountDown", "carruselCountDownDateFinish", "carruselCountDownUrlImage", "carruselCountDownUrl", "carruselCountDownColor", "carruselCountDownDateStart");
        GLOBAL.valorAtributoGlobal(atributos, function(returnValue) {
            if (void 0 !== returnValue && null !== returnValue && Object.keys(returnValue).length > 0) {
                for (var i = 0; i < returnValue.length; i++)
                    switch (returnValue[i].atributo) {
                    case "carruselCountDown":
                        var countDown = returnValue[i].valor;
                        break;
                    case "carruselCountDownDateStart":
                        var countDownDateStart = returnValue[i].valor;
                        break;
                    case "carruselCountDownDateFinish":
                        var countDownDateFinish = returnValue[i].valor;
                        break;
                    case "carruselCountDownUrlImage":
                        var countDownUrlImage = returnValue[i].valor;
                        break;
                    case "carruselCountDownUrl":
                        var countDownUrl = returnValue[i].valor;
                        break;
                    case "carruselCountDownColor":
                        var countDownColor = returnValue[i].valor
                    }
                if ("TRUE" == countDown) {
                    var date = new Date
                      , fechaActual = (date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
                    new Date(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(),date.getMinutes()))
                      , var1 = countDownDateFinish.split(" ")
                      , fechasola = var1[0].split("-")
                      , horasola = var1[1].split(":")
                      , countDownDate = new Date(fechasola[0],parseInt(fechasola[1]) - 1,fechasola[2],horasola[0],horasola[1])
                      , var2 = countDownDateStart.split(" ")
                      , fechasola2 = var2[0].split("-")
                      , horasola2 = var2[1].split(":")
                      , countDownDateStart = new Date(fechasola2[0],parseInt(fechasola2[1]) - 1,fechasola2[2],horasola2[0],horasola2[1]);
                    if (fechaActual >= countDownDateStart)
                        if (fechaActual <= countDownDate) {
                            jQuery("#countDownCarrusel .imagen img").attr("src", countDownUrlImage),
                            jQuery("#countDownCarrusel .link a").attr("href", countDownUrl),
                            jQuery("#countDownCarrusel .link").css("background-color", countDownColor);
                            var isMobile, textoPunto = " :", mobileBreakpoint = 991;
                            isMobile = window.innerWidth <= mobileBreakpoint,
                            isMobile ? (jQuery(".bloque.countDownCarrusel .prateleira").css({
                                "float": "right",
                                width: "50%"
                            }),
                            jQuery(".bloque.countDownCarrusel .prateleira h2").hide(),
                            textoPunto = "") : (jQuery(".bloque.countDownCarrusel .prateleira").css({
                                "float": "right",
                                width: "75%"
                            }),
                            jQuery(".bloque.countDownCarrusel .prateleira h2").css({
                                "text-align": "left",
                                "padding-left": "22%"
                            }));
                            var x = setInterval(function() {
                                var now = (new Date).getTime()
                                  , distance = countDownDate - now
                                  , hours = (Math.floor(Number(distance) / 864e5),
                                Math.floor(Number(distance) % 864e5 / 36e5))
                                  , minutes = Math.floor(Number(distance) % 36e5 / 6e4)
                                  , seconds = Math.floor(Number(distance) % 6e4 / 1e3);
                                jQuery("#countDownCarrusel .Hours p").html(hours + textoPunto),
                                jQuery("#countDownCarrusel .Minutes p").html(minutes + textoPunto),
                                jQuery("#countDownCarrusel .Seconds p").html(seconds),
                                distance < 0 && (clearInterval(x),
                                document.getElementById("countDownCarrusel").innerHTML = "EXPIRED")
                            }, 10);
                            $("#countDownCarrusel").show()
                        } else
                            $("#countDownCarrusel").hide(),
                            $("#countDownCarrusel").remove();
                    else
                        $("#countDownCarrusel").hide(),
                        $("#countDownCarrusel").remove()
                }
            } else
                $("#countDownCarrusel").remove()
        })
    },
    makeCarouselbrand: function() {
        $.fn.owlCarousel && (jQuery(".slider_brands").addClass("owl-carousel"),
        jQuery(".slider_brands").owlCarousel({
            items: 5,
            autoPlay: !0,
            loop: !0,
            stopOnHover: !0,
            pagination: !1,
            itemsDesktop: !1,
            doots: !1,
            itemsDesktopSmall: [980, 3],
            itemsTablet: [767, 4],
            itemsMobile: [479, 2],
            navigation: !1,
            navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
        }))
    },
    makeVideoCarousel: function() {
        $.fn.owlCarousel && (jQuery(".product-list").each(function() {
            jQuery(this).find("h2, .helperComplement").remove()
        }),
        jQuery(".videos_bottom ul").addClass("owl-carousel"),
        jQuery(".videos_bottom ul").owlCarousel({
            items: 3,
            autoPlay: !1,
            stopOnHover: !0,
            pagination: !0,
            itemsDesktop: !1,
            itemsDesktopSmall: [980, 3],
            itemsTablet: [767, 2],
            itemsMobile: [479, 1],
            navigation: !0,
            navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
        }))
    },
    makeAtributeCarousel: function() {
        isMobile && (jQuery("#home-page .banners_atributos ul").addClass("owl-carousel"),
        jQuery("#home-page .banners_atributos ul").owlCarousel({
            items: 1,
            autoPlay: !0,
            stopOnHover: !0,
            pagination: !0,
            itemsDesktop: !1,
            itemsDesktopSmall: [980, 2],
            itemsTablet: [767, 1],
            itemsMobile: [479, 1],
            navigation: !0,
            navigationText: !1
        }))
    },
    makeBannersAtributos: function() {
        console.log("ini slider-info");
        var $showCaseOwl = $(".info-carousel");
        $showCaseOwl.owlCarousel({
            items: 4,
            autoPlay: !1,
            stopOnHover: !0,
            pagination: !1,
            itemsDesktop: !1,
            itemsDesktopSmall: [980, 3],
            itemsTablet: [767, 2],
            itemsMobile: [479, 1],
            navigation: !0,
            navigationText: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>', '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>']
        })
    }
}
  , GRID = {
    init: function() {
        "grid-page" === document.body.id && (console.log("====== GRID ======"),
        this.stickySidebar(),
        this.smartResearchMultiple(),
        this.moveElements(),
        this.orderByChange(),
        this.toggleLayeredAttributes(),
        this.filterGrid(),
        this.closeFilter())
    },
    filterGrid: function() {
        if ($(".search-multiple-navigator fieldset").addClass("refino-filter"),
        $("h3.filter-title").length > 0) {
            var title = $("h3.filter-title").html();
            $(".search-multiple-navigator h4").after('<h3 class="filter-title refino-filter">' + title + "</h3>")
        }
        $("fieldset.refino-filter").each(function(index, value) {
            var cont = $(this).find("h5").text().length;
            if (cont > 17) {
                var cadena = $(this).find("h5").text();
                cadena = cadena.substr(0, 17),
                $(this).find("h5").html(cadena + "...")
            }
        })
    },
    closeFilter: function() {
        isMobile && $(".navigation-tabs .search-multiple-navigator input").click(function() {
            console.log("holiii"),
            $(".navigation-tabs").removeClass("open")
        })
    },
    stickySidebar: function() {
        jQuery(window).scroll(function() {
            isMobile || jQuery(this).scrollTop() > 140
        })
    },
    smartResearchMultiple: function() {
        jQuery("#filters input[type='checkbox']").vtexSmartResearch({
            filtersFullWrapper: "#filters",
            loadContent: ".prateleira.vitrine[id^=ResultItems]",
            shelfClass: ".prateleira.vitrine",
            menuDepartament: ".navigation-tabs .menu-departamento",
            insertMenuAfter: ".search-multiple-navigator h3:first",
            emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'),
            elemLoading: '<div id="scrollLoading">Cargando...</div>',
            returnTopText: '<span class="text">volver</span><span class="text2">ARRIBA</span>',
            emptySearchMsg: "<h3>No hay resultados para estos filtros</h3>",
            filterErrorMsg: "hubo un error al intentar filtrar."
        })
    },
    moveElements: function() {
        jQuery("#products .sub").first().addClass("top"),
        jQuery("#products .searchResultsTime").first().addClass("top"),
        "categoria" === document.body.className ? jQuery(".sub.top .resultado-busca-filtro .orderBy").prependTo("#products") : jQuery(".sub.top .resultado-busca-filtro .orderBy").appendTo("#box-bread-brumb"),
        jQuery("#grid-page.resultado-busca .top-block .grid-title h2.titulo-sessao").text("")
    },
    orderByChange: function() {
        jQuery(".orderBy").first().find("select option").first().text("Seleccionar"),
        jQuery(".orderBy select").selectpicker()
    },
    toggleLayeredAttributes: function() {
        jQuery("#filters h5").hasClass("toggle-enabled") || (jQuery("#filters h5").addClass("toggle-enabled"),
        jQuery("#filters h5.toggle-enabled").click(function() {
            jQuery(".search-multiple-navigator fieldset").not(".current").removeClass("highlight"),
            jQuery(".search-multiple-navigator fieldset").not(jQuery(this).parent()).removeClass("current").removeClass("highlight"),
            jQuery(this).parent().addClass("current"),
            jQuery(this).parent().toggleClass("highlight")
        })),
        isMobile && ($(".navigation").length > 0 && (jQuery(".navigation").addClass("navigation-tabs"),
        ($(".close").length > 0 || $(".aplicar-filtros").length) && (jQuery('<div class="close"><p>Cerrar</p></div>').prependTo("#filters .navigation-tabs"),
        jQuery('<div class="aplicar-filtros"><p>Aplicar filtros</p></div>').prependTo("#filters .navigation-tabs"))),
        jQuery('<div class="close"><p>Cerrar</p></div>').prependTo("#filters .navigation-tabs"),
        jQuery('<div class="aplicar-filtros"><p>Aplicar filtros</p></div>').prependTo("#filters .navigation-tabs"),
        jQuery("#filters h3.filter-title").click(function() {
            jQuery("#filters .navigation-tabs").addClass("open")
        }),
        jQuery("#filters .navigation-tabs .close , #filters .navigation-tabs .aplicar-filtros").click(function() {
            jQuery("#filters .navigation-tabs").removeClass("open")
        })),
        0 == jQuery("#filters .navigation-tabs .search-multiple-navigator fieldset").length && jQuery("#filters").show()
    }
}
  , PRODUCT = {
    init: function() {
        "product-page" === document.body.id,
        console.log("====== PRODUCT PAGE ======"),
        this.removeHelperComplement(),
        this.removeInfoEmpty(),
        this.moveAndChangeInfo(),
        this.makeYoutubeVideo(),
        this.alertError(),
        this.slideToggleSku(),
        this.slideToggleCallButton(),
        this.requiredData(),
        this.productMobile(),
        this.slideExtraInfoMobile(),
        this.seguirComprandoFancy(),
        this.changeInputQuantity(),
        this.caracteristicas(),
        this.togglesPayments(),
        this.moveElements()
    },
    moveElements: function() {
        jQuery("#product-page .product-details .wrapper-cucardas").insertBefore("#product-page .product-details .product-image #show #include #image")
    },
    togglesPayments: function() {
        $(".payment-methods .title").click(function() {
            $(this).hasClass("open") ? (jQuery(this).removeClass("open"),
            $(".methods").slideUp("slow")) : (jQuery(this).addClass("open"),
            $(".methods").slideDown("slow")),
            $(document).ready(function() {
                $('[data-toggle="tooltip"]').tooltip()
            })
        })
    },
    caracteristicas: function() {
        if ($("#specification table.group .Caracteristicas").length > 0) {
            var txt_descrip = ($(".value-field.Caracteristicas").html(),
            $(".product-info .description-block").html());
            $(".extra-information .video-block").before('<div class="description-block">' + txt_descrip + "</div>")
        }
    },
    removeHelperComplement: function() {
        jQuery(".product-list").each(function() {
            jQuery(this).find(".helperComplement").remove()
        })
    },
    removeInfoEmpty: function() {
        0 == jQuery(".extra-information .specification-block #caracteristicas table").length && jQuery(".extra-information .specification-block").hide(),
        0 == jQuery(".extra-information td.productvideo").length && jQuery(".extra-information .video-block").hide()
    },
    moveAndChangeInfo: function() {
        jQuery(".produto .productName").removeClass("productName").addClass("prodname"),
        jQuery("#specification .Adicionales td.productvideo").appendTo(".video-block")
    },
    makeYoutubeVideo: function() {
        var youtube_url = jQuery("#caracteristicas .value-field.thumbsvideo").text();
        if ("" != youtube_url) {
            var videoid = youtube_url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if (videoid = videoid[1],
            !videoid.length)
                return;
            var thumbnailYotube = '<li class="youtube"><a data-video=' + videoid + '><i class="fa fa-play-circle"></i></a></li>';
            jQuery(thumbnailYotube).prependTo("ul.thumbs"),
            jQuery(document).on("click", "ul.thumbs li", function() {
                jQuery("#show #include iframe").remove(),
                jQuery("ul.thumbs li").removeClass("selected"),
                jQuery("#image").show()
            }),
            jQuery(document).on("click", "li.youtube", function(e) {
                e.preventDefault(),
                jQuery("#image") && jQuery("#image").hide();
                var videourl = jQuery(this).find("a").attr("data-video")
                  , iframe = '<iframe class="youtube-player" type="text/html" width="500" height="500" src="http://www.youtube.com/embed/' + videourl + '" frameborder="0" allowFullScreen></iframe>';
                jQuery(this).addClass("selected"),
                jQuery(".youtube-player").remove(),
                jQuery(iframe).appendTo("#show #include"),
                jQuery(window).width() <= 767 && !jQuery("body").hasClass("quickview") && jQuery(iframe).appendTo(this)
            })
        }
    },
    alertError: function() {
        alert = function() {}
    },
    slideToggleSku: function() {
        jQuery(".sku-selector-container ul .specification").hasClass("toggle-enabled") || (jQuery(".sku-selector-container ul .specification").addClass("toggle-enabled"),
        jQuery(".sku-selector-container ul .specification.toggle-enabled").click(function() {
            jQuery(".sku-selector-container ul.topic").not(".current").removeClass("active"),
            jQuery(".sku-selector-container ul.topic").not(jQuery(this).parent()).removeClass("current").removeClass("active"),
            jQuery(this).parent().addClass("current"),
            jQuery(this).parent().toggleClass("active")
        })),
        jQuery("ul.Talla li label").on("click", function() {
            jQuery(this).parent().parent().siblings(".specification").text($(this).text()),
            jQuery(this).parent().parent().parent().removeClass("active")
        })
    },
    slideToggleCallButton: function() {
        jQuery(".call-button-box .text-button").click(function() {
            jQuery(this).siblings().css("display", "block")
        }),
        jQuery(".call-button-box .close").click(function() {
            jQuery(".call-button-box #contacto_form").css("display", "none")
        })
    },
    requiredData: function() {
        alert = function() {}
        ,
        jQuery("#product-content .skuList").addClass("required"),
        jQuery("#product-content .datos_obligatorios").remove();
        var datos_obligatorios = '<div class="datos_obligatorios" style="display:none;">Elegir talla</div>';
        jQuery(datos_obligatorios).insertAfter("#product-content .skuList"),
        jQuery("#product-content .skuList label").click(function() {
            skuList = jQuery(this).parent().parent().parent(),
            jQuery(skuList).find(".datos_obligatorios").hide(),
            jQuery(skuList).removeClass("required")
        }),
        jQuery(document).on("vtex.buyButton.failedAttempt", function() {
            jQuery(".buy-in-page-button").attr("href", "javascript:void(0)"),
            jQuery("#product-content ul.topic .datos_obligatorios").show()
        })
    },
    productMobile: function() {
        function _resizeThumbnails() {
            jQuery(document).on("ajaxStop load", function() {
                jQuery("#product-content #include").hide(),
                jQuery("#product-content #show .thumbs > li").each(function() {
                    liElement = jQuery(this),
                    thumbImg = jQuery(liElement).find("img"),
                    thumbImg.length && (thumbSrc = jQuery(thumbImg).attr("src"),
                    newSource = thumbSrc.replace("100-100", "700-700"),
                    jQuery(thumbImg).attr("src", newSource))
                }),
                _carouselThumbnails()
            })
        }
        function _carouselThumbnails() {
            var $showCaseOwl = $(".produto #product-content .product-details .product-image .thumbs");
            $(".produto #product-content .product-details .product-image .thumbs").data("owlCarousel") && $(".produto #product-content .product-details .product-image .thumbs").data("owlCarousel").destroy(),
            $showCaseOwl.owlCarousel({
                itemsTablet: [767, 1],
                itemsMobile: [479, 1],
                items: 1,
                dots: !1,
                nav: !0,
                navigation: !0,
                loop: !0,
                autoWidth: !1,
                slideBy: 1
            })
        }
        jQuery(window).width() <= 767 && !jQuery("body").hasClass("quickview") && (jQuery(".produto .product-details .product-info .product-name").insertBefore(".produto .product-details .product-image"),
        _resizeThumbnails())
    },
    cloneOpinion: function() {
        var info_opinion = jQuery(".resenhas .quem > li").first().find(".opt-texto p").text();
        if ("" == info_opinion)
            var opinion = '<span class="opinion">' + info_opinion + "</span>";
        else
            var opinion = '<span class="opinion commentary">' + info_opinion + "</span>";
        jQuery(".product-info .opinion-destacada .opinion").remove(),
        jQuery(".product-info .opinion-destacada").append(opinion)
    },
    changeInputQuantity: function() {
        jQuery('<div class="quantity-button quantity-down">-</div>').insertBefore(".quantity-selector-container input"),
        jQuery('<div class="quantity-button quantity-up">+</div>').insertAfter(".quantity-selector-container input"),
        $(".quantity-selector-container .unitSelector").length && $(".quantity-selector-container .quantitySelector").css("display", "none"),
        jQuery(".quantity-selector-container").each(function() {
            var spinner = jQuery(this)
              , input = spinner.find("input")
              , btnUp = spinner.find(".quantity-up")
              , btnDown = spinner.find(".quantity-down")
              , min = input.attr("min")
              , max = input.attr("max");
            btnUp.click(function() {
                var oldValue = parseFloat(input.val());
                if (min = input.attr("min"),
                min = Number(min),
                oldValue >= max)
                    var newVal = oldValue;
                else
                    var newVal = oldValue + min;
                spinner.find("input").val(newVal),
                spinner.find("input").trigger("change")
            }),
            btnDown.click(function() {
                var oldValue = parseFloat(input.val());
                if (min = input.attr("min"),
                min = Number(min),
                oldValue <= min)
                    var newVal = oldValue;
                else
                    var newVal = oldValue - min;
                spinner.find("input").val(newVal),
                spinner.find("input").trigger("change")
            })
        })
    },
    slideExtraInfoMobile: function() {
        isMobile && (jQuery(".extra-information .description-block h2").click(function() {
            jQuery(this).toggleClass("active"),
            jQuery(".extra-information .productDescription").slideToggle()
        }),
        jQuery(".extra-information .video-block h2").click(function() {
            jQuery(this).toggleClass("active"),
            jQuery(this).siblings().slideToggle()
        }),
        jQuery(".extra-information .specification-block h2").click(function() {
            jQuery(this).toggleClass("active"),
            jQuery(this).siblings().slideToggle()
        }),
        jQuery(".extra-information .opinion-block h2").click(function() {
            jQuery(this).toggleClass("active"),
            jQuery(this).siblings().slideToggle()
        }))
    },
    seguirComprandoFancy: function() {
        jQuery(window).load(function() {
            jQuery(window).on("cartProductAdded.vtex", function(e) {
                console.log("click 1");
                var target_element = jQuery("header .mini-cart .skip-link").attr("data-id");
                jQuery("header .mini-cart .skip-link").not(jQuery("header .mini-cart .skip-link")).removeClass("active"),
                jQuery("header .mini-cart .skip-link").toggleClass("active"),
                jQuery("header .skip-content").not(target_element).hide().removeClass("active"),
                jQuery(target_element).toggle().toggleClass("active"),
                jQuery("#mini-cart").hasClass("active") ? jQuery(".overlay").css({
                    display: "block"
                }) : jQuery(".overlay").css({
                    display: "none"
                })
            })
        })
    }
}
  , STATICPAGE = {
    init: function() {
        "static-page" === document.body.id && (console.log("====== STATIC PAGE ======"),
        this.slideToggleLocales())
    },
    slideToggleLocales: function() {
        jQuery(".sucursales-page #static-content .locales ul .item.mayorista .number").hasClass("toggle-enabled") || (jQuery(".sucursales-page #static-content .locales ul .item.mayorista .number").addClass("toggle-enabled"),
        jQuery(".sucursales-page #static-content .locales ul .item.mayorista .number.toggle-enabled").click(function() {
            jQuery(".sucursales-page #static-content .locales ul .item.mayorista").not(".current").removeClass("highlight"),
            jQuery(".sucursales-page #static-content .locales ul .item.mayorista").not(jQuery(this).parent()).removeClass("current").removeClass("highlight"),
            jQuery(this).parent().addClass("current"),
            jQuery(this).parent().toggleClass("highlight")
        }))
    }
};
jQuery(document).ready(function() {
    GLOBAL.init(),
    HEADERFOOTER.init(),
    MINICART.init(),
    HOME.init(),
    GRID.init(),
    PRODUCT.init(),
    STATICPAGE.init(),
    contacto()
}),
jQuery(document).ready(function() {
    setTimeout(function() {
        PRODUCT.cloneOpinion()
    }, 1e3)
}),
jQuery(window).on("vtex.sku.selected", function(evt, productId, sku) {
    setTimeout(function() {
        PRODUCT.makeYoutubeVideo()
    }, 50)
});
