/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/**
 *      Master del Ecommerce - SearchEngine Class
 *      @version 0.0.1
 *      @copyright https://masterdelecommerce.com/
 *      @author Edwin Obando
 *
 * */

export default class SearchEngine {
    constructor() {
        this.ftDept = '';
        this.ftId = '';
        this.ftSEARCHTERM = '';
        this.lastReference = '';
    }

    init() {
        // First Load
        this.getVTEXIdsFromNativeController();

        // Events
        this.events();
        this.triggers();

        // Position
        this.calculatePosition();
    }

    events() {
        const inputSearch = '#search-engine-input';
        const resultItem = '#searchInputResultList li';
        const SearchButton = '.OPIcon-search';
        const self = this;

        $(document).on('click', (e) => {
            if ($(e.target).parents('.containerSearch').length === 0) {
                if ($(e.target).hasClass('searchEngine-clearInput')) {
                    $('#search-engine-input').val('');
                    $('#searchInputResultList').hide();
                    $('#loader-search-engine').hide();
                    $('#search-engine-input').focus();
                } else {
                    self.closeSearch();
                }
            }
        });

        $('.mainHeader')
            .on('focus', inputSearch, (e) => {
                self.lastReference = e.target.value;
                self.TypeAHead(e.target.value);
            })
            .on('input', inputSearch, (e) => {
                self.lastReference = e.target.value;
                self.TypeAHead(e.target.value);
            })
            .on('click', SearchButton, (e) => {
                if ($(e.target).hasClass('OPIcon-search')) {
                    if (self.ftDept && self.ftId && self.ftSEARCHTERM) {
                        doSearch('search-engine-input', self.ftDept, self.ftId, self.ftSEARCHTERM, '');
                    } else {
                        console.warn('No se encontraron las propiedades ftDept, ftId, SearchTerm: ', self.ftDept, self.ftId, self.ftSEARCHTERM);
                    }
                }
            })
            .on('keypress', inputSearch, (e) => {
                if (e.key === 'Enter') {
                    if (self.ftDept && self.ftId && self.ftSEARCHTERM) {
                        doSearch('search-engine-input', self.ftDept, self.ftId, self.ftSEARCHTERM, '');
                    } else {
                        console.warn('No se encontraron las propiedades ftDept, ftId, SearchTerm: ', self.ftDept, self.ftId, self.ftSEARCHTERM);
                    }
                }
            })
            .on('click', resultItem, (e) => {
                let element;
                if ($(e.target).is('label')) {
                    element = $(e.target).parent();
                } else {
                    element = $(e.target);
                }
                self.goToResult(element.attr('data-link'), element.attr('data-name'), element.parents('ul').attr('class'));
            });

        window.addEventListener('resize', self.calculatePosition);
    }

    triggers() {
        $(document).on('searchEngine:resultItemsRendered', () => {
            $('#loader-search-engine').hide();
        });
    }

    calculatePosition() {
        const windowSize = $(window).width();

        if (windowSize && windowSize > 900 && $('input#search-engine-input').length) {
            const searchButtonSize = $('#search-engine-input').siblings('.OPIcon-search').width() || 0;
            const inputSize = $('input#search-engine-input').width() || 0;
            const inputLeftPosition = $('#search-engine-input').offset().left || $(window).width() / 2;

            const finalPosition = Math.round(
                (parseInt(parseInt(inputLeftPosition) + parseInt((inputSize + searchButtonSize) / 2) + -300) * 100) / $(window).width()
            );

            if (finalPosition && !Number.isNaN(finalPosition)) {
                $('#searchInputResultList').css('left', `${finalPosition}%`);
            }
        } else {
            $('#searchInputResultList').css('left', '');
        }
    }

    async TypeAHead(word) {
        if (word && word.length >= 3) {
            $('body').addClass('block-scroll');
            $('#loader-search-engine').css('display', 'flex');
            $('#searchInputResultList').show();
            const historySearchResult = this.getHistorySearchResult(word); // Get from localStorage;
            const itemsResult = await this.doCustomSearch(word, historySearchResult && historySearchResult.length ? 10 - historySearchResult.length : 10);
            if (Array.isArray(itemsResult)) {
                const itemsSearchResult = [];
                const categoriesSearchResult = [];
                const totalCount = itemsResult.length + historySearchResult;

                itemsResult.forEach((item) => {
                    if (item && item.items && item.items.length) {
                        const itemRestructured = {};
                        itemRestructured.link = item.href;
                        if (item.items[0].nameComplete !== item.items[0].name) {
                            itemRestructured.name = item.items[0].nameComplete.replace(item.items[0].name, '');
                        } else {
                            itemRestructured.name = item.items[0].nameComplete;
                        }
                        itemsSearchResult.push(itemRestructured);
                    } else {
                        const categoryRestructured = {};
                        categoryRestructured.link = item.href;
                        categoryRestructured.name = item.name.split(' En ')[0];
                        categoryRestructured.context = item.name.split(' En ')[1];
                        categoriesSearchResult.push(categoryRestructured);
                    }
                });

                await this.compile({
                    historySearchResult,
                    itemsSearchResult,
                    categoriesSearchResult,
                    totalCount,
                    reference: word,
                });

                if (totalCount === 0) {
                    this.closeSearch();
                }
            } else {
                this.closeSearch();
            }
        } else {
            $('body').removeClass('block-scroll');
            $('#searchInputResultList').hide();
            $('#loader-search-engine').hide();
        }
    }

    doCustomSearch(term, maxRows) {
        return new Promise((resolve) => {
            $.get(`/buscaautocomplete/?maxRows=${parseInt(maxRows)}&productNameContains=${encodeURIComponent(term)}`)
                .done(({ itemsReturned }) => {
                    resolve(itemsReturned);
                })
                .fail(() => {
                    resolve([]);
                });
        });
    }

    getHistorySearchResult(sentence) {
        const historySearchResult = localStorage.getItem('SG-SearchEngine');
        if (historySearchResult) {
            const results = JSON.parse(historySearchResult);
            if (results && results.length) {
                const words = sentence.split(/[\s-,/;+]/g).filter((word) => word && word !== '');

                if (words && words.length) {
                    const finalResults = results.filter((result) => {
                        const response = words.filter(
                            (word) =>
                                (word.length > 2 && result.link.toLowerCase().indexOf(word.toLowerCase()) > -1) ||
                                (word.length > 2 && result.name.toLowerCase().indexOf(word.toLowerCase()) > -1)
                        );

                        return response && response.length;
                    });

                    return finalResults.slice(0, 2);
                }
                return [];
            }
            return [];
        }
        return [];
    }

    compile(data) {
        const self = this;
        return new Promise((resolve) => {
            if (data.reference === self.lastReference) {
                const source = $('#search-engine-template').html();
                if (source) {
                    const template = Handlebars.compile(source);
                    const html = template(data);
                    $('#searchInputResultList').empty().append(html);
                    $(document).trigger('searchEngine:resultItemsRendered');
                    resolve(true);
                } else {
                    console.warn('search-engine-template Not Found');
                    resolve(true);
                }
            }
        });
    }

    goToResult(link, name, type) {
        if (type === 'itemsSearchResult') {
            let historySearchResult = localStorage.getItem('SG-SearchEngine');
            if (historySearchResult) {
                historySearchResult = JSON.parse(historySearchResult);
                const duplicatedSearchResult = historySearchResult.filter((item) => item.link === link);
                if (historySearchResult && historySearchResult.length === 10 && duplicatedSearchResult && !duplicatedSearchResult.length) {
                    historySearchResult.pop();
                }

                if (duplicatedSearchResult && !duplicatedSearchResult.length) {
                    historySearchResult.unshift({
                        link,
                        name,
                    });
                }
            } else {
                historySearchResult = [
                    {
                        link,
                        name,
                    },
                ];
            }

            localStorage.setItem('SG-SearchEngine', JSON.stringify(historySearchResult));
        }

        window.location.href = link;
    }

    getVTEXIdsFromNativeController() {
        let VTEXScript = $('#VTEX-fullTextSearchBox script').text().split('enableFullTextSearchBox(');
        if (VTEXScript.length > 1) {
            VTEXScript = VTEXScript[1].replace(",'Buscar' );}); /*]]>*/ ", '').replace(/'/g, '');
            VTEXScript = VTEXScript.split(', ');

            if (VTEXScript.length >= 5) {
                this.ftDept = VTEXScript[1];
                this.ftId = VTEXScript[2];
                this.ftSEARCHTERM = `${VTEXScript[4]}`;
            }
        }
    }

    closeSearch() {
        $('body').removeClass('block-scroll');
        $('#searchInputResultList').hide();
        $('#loader-search-engine').hide();
    }
}
