describe('Options page', function() {
    // Integration testing of the options page by loading it in an iframe.
    // TODO: Holy god damn this is dumb please use PyAuto.

    var $iframe;

    beforeEach(function() {
        $iframe = $('<iframe/>', {
            src: chrome.extension.getURL("options.html"),
        });
        $('body').append($iframe);
    });

    afterEach(function() {
        $iframe.remove();
    });

    it('scrapes data when scrape link is clicked.', function() {
        var contents_before;
        runs(function() {
            $iframe.load(function() {
                contents_before = $iframe.contents().find('#meals').html();
                // Must click the actual DOM node, this click function is raw 
                // JS and not the jQuery click function.
                // The jQuery click does not fire the click event properly on 
                // <a> tags as we are trying to do here.
                $iframe.contents().find('#scrape_meals_link')[0].click();
            });
        });

        waits(10000);

        runs(function() { 
            var contents_after = $iframe.contents().find('#meals').html();
            expect(contents_after).toNotBe(contents_before);
            // if h2 tags are present then an error has occured.
            expect(contents_after).toNotContain('h2');
        });
    });

});

