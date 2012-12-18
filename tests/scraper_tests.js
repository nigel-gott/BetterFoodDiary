describe("Scraper", function() {
    var DUMMY_SCRAPED_MEALS = ['Tuna', 'Mash'];

    var scraper, listener_timeout_id;

    beforeEach(function() {
        scraper = new bfd.Scraper();

        // Mock out so the scraper is not actually adding iframes to the test
        // page.
        spyOn($.fn, 'append');
        spyOn($.fn, 'remove');

        // Mock a message being passed back.
        spyOn(chrome.extension.onMessage, 'addListener').andCallFake(
            function(message_listener){
                // Pass back the message asynchronously. 
                listener_timeout_id = setTimeout(function (){
                    var test_data = JSON.stringify(DUMMY_SCRAPED_MEALS);
                    var message = {scraped_meals: test_data};

                    message_listener(message);
                }, 10);
            }
        );
        spyOn(chrome.extension.onMessage, 'removeListener');
    });

    afterEach(function() {
        // Ensure that the timeout wont be executing after the test finishes.
        clearTimeout(listener_timeout_id);
    });

    it("fails if start is called whilst already scraping.", function() {
        scraper.start();

        // Try start a second time whilst it is already scraping. Should fail 
        // syncronously. 
        var error_message;
        $.when(scraper.start()).then(
            function done(){

            },
            function fail(e){
                error_message = e;
            }
        );

        expect(error_message).toBe(scraper.ALREADY_SCRAPING_ERROR);
    });

    it("adds and removes an iframe to the page.", function () {
        runs(function() {
            scraper.start();
        });

        waitsFor(function() {
            return !scraper.is_scraping(); 
        }, 'the scraper to finish.', 20);

        runs(function() {
            expect($.fn.append.callCount).toEqual(1);
            expect($.fn.remove.callCount).toEqual(1);
        });
    });
});
