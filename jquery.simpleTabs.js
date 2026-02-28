(function ($) {

    $.fn.simpleTabs = function (options) {

        let settings = $.extend({
            activeClass: "active",
            animationSpeed: 300,
            defaultTab: null
        }, options);

        return this.each(function () {

            let container = $(this);
            let tabs = container.find(".tab-links li");
            let contents = container.find(".tab-content");

            function activateTab(tabId) {

                tabs.removeClass(settings.activeClass);
                contents.hide();

                tabs.filter(`[data-tab='${tabId}']`)
                    .addClass(settings.activeClass);

                $("#" + tabId)
                    .fadeIn(settings.animationSpeed);

                window.location.hash = tabId;
            }

            // Click event
            tabs.on("click", function () {
                let tabId = $(this).data("tab");
                activateTab(tabId);
            });

            // Keyboard navigation
            tabs.attr("tabindex", "0");

            tabs.on("keydown", function (e) {

                let currentIndex = tabs.index(this);

                if (e.key === "ArrowRight") {
                    let next = (currentIndex + 1) % tabs.length;
                    tabs.eq(next).click().focus();
                }

                if (e.key === "ArrowLeft") {
                    let prev = (currentIndex - 1 + tabs.length) % tabs.length;
                    tabs.eq(prev).click().focus();
                }
            });

            // Hash navigation
            let hash = window.location.hash.replace("#", "");

            if (hash && $("#" + hash).length) {
                activateTab(hash);
            } else {
                activateTab(settings.defaultTab || tabs.first().data("tab"));
            }

        });
    };

}(jQuery));