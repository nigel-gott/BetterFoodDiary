describe("Scraper", function() {
    var DUMMY_SCRAPED_MEALS = ['Tuna', 'Mash'];

    var scraper;
    var listener_timeout_id;
    var dummy_message;

    beforeEach(function() {
        scraper = new bfd.Scraper();

        var json_meals = JSON.stringify(DUMMY_SCRAPED_MEALS);
        dummy_message = { scraped_meals : json_meals };

        // Mock out so the scraper is not actually adding iframes to the test
        // page.
        spyOn($.fn, 'append');
        spyOn($.fn, 'remove');

        // Mock a message being passed back.
        spyOn(chrome.extension.onMessage, 'addListener').andCallFake(
            function(message_listener){
                // Pass back the message asynchronously. 
                listener_timeout_id = setTimeout(function (){
                    message_listener(dummy_message);
                }, 10);
            }
        );
        spyOn(chrome.extension.onMessage, 'removeListener');
    });

    afterEach(function() {
        // Ensure that the timeout wont be executing after the test finishes.
        clearTimeout(listener_timeout_id);
    });

    it("synchronously fails if start is called whilst already scraping.", function() {
        scraper.start();

        // Try start a second time whilst it is already scraping. Should fail 
        // synchronously. 
        var returned_error;
        $.when(scraper.start()).then(
            function done(){

            },
            function fail(error){
                returned_error = error;
            }
        );

        expect(returned_error).toBe(scraper.ALREADY_SCRAPING_ERROR);
    });

    it("adds and removes an iframe to the page.", function () {
        runs(function() {
            scraper.start();
        });

        waitsFor(function() {
            return !scraper.is_scraping(); 
        }, 'the scraper to finish.', 20);

        runs(function() {
            expect($.fn.append.callCount).toBe(1);
            expect($.fn.remove.callCount).toBe(1);

            var append_iframe_arg = $.fn.append.mostRecentCall.args[0];
            expect(append_iframe_arg.attr('src')).toBe(scraper.INITIAL_SCRAPING_URL);
        });
    });

    it("passes back the scraped meals.", function() {
        var returned_scraped_meals; 

        runs(function() {

            $.when(scraper.start()).then(
                function done(scraped_meals){
                    returned_scraped_meals = scraped_meals;
                }
            );
        });

        waitsFor(function() {
            return !scraper.is_scraping(); 
        }, 'the scraper to finish.', 20);

        runs(function() {
            expect(returned_scraped_meals).toEqual(DUMMY_SCRAPED_MEALS);
        });
    });

    it("fails if the user is not logged in.", function() {
        dummy_message = { not_logged_in : true };
        var returned_error;

        runs(function() {
            $.when(scraper.start()).then(
                function done(){

                },
                function fail(error){
                    returned_error = error;
                }
            );
        });

        waitsFor(function() {
            return !scraper.is_scraping(); 
        }, 'the scraper to finish.', 20);

        runs(function() {
            expect(returned_error).toBe(scraper.NOT_LOGGED_IN_ERROR);
        });

    });
});
