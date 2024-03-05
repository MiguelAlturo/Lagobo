/**
 *      Menu Class
 *      @version 0.0.1
 *      @copyright https://github.com/mevm24
 *      @author Marco Villegas
 *
 * */

export default class Menu {

    constructor() {
        this.init();
    }

    init() {
        console.log("menu-init");
        const self = this;
        self.initMenu();
        window.addEventListener('resize', self.initMenu());
    }

    initMenu() {
        if (window.innerWidth <= 768) {
            $('.categoriesLabel').off('click').click((e) => {
                const target = $(e.target).parent();
                target.next().toggleClass('active');
            });
            $('.categoriesContainer .first-level > li.menu').off('click').click((e) => {
                let target = $(e.target);
                if (!target.is('.menu'))
                    target = $(e.target).parent();
                if (target.find('[class*=menu]').length > 0) {
                    e.preventDefault();
                    target.find('[class*="-level"]').first().addClass('active');
                }
            });
            $('.close-menu-container').off('click').click((e) => {
                const target = $(e.target);
                target.parents('.categoriesContainer').removeClass('active');
            });
            $('.close-menu-container').off('click').click((e) => {
                const target = $(e.target);
                target.parents('.categoriesContainer').removeClass('active');
            });
            $('.categoriesContainer .first-level > li.menu .close-menu').click((e) => {
                const target = $(e.target);
                target.parents('.second-level').removeClass('active');
            });
        }
    }
}
