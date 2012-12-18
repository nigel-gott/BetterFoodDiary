describe("Scraper", function() {
    var DUMMY_SCRAPED_MEALS = ['Tuna', 'Mash'];

    var scraper;
    var listener_timeout_id;
    var dummy_message;

    beforeEach(function() {
        scraper = new bfd.Scraper();
        dummy_message = {};

        // Mock out so the scraper is not actually adding iframes to the test
        // page.
        spyOn($.fn, 'append');
        spyOn($.fn, 'remove');

        // Mock a message being passed back.
        spyOn(chrome.extension.onMessage, 'addListener').andCallFake(
            function(message_listener){
                var json_meals = JSON.stringify(DUMMY_SCRAPED_MEALS);
                dummy_message.scraped_meals = json_meals;

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
            expect($.fn.append.callCount).toBe(1);
            expect($.fn.remove.callCount).toBe(1);
        });
    });

    it("passes back the scraped meals.", function() {
        var recieved_scraped_meals; 

        runs(function() {

            $.when(scraper.start()).then(
                function done(scraped_meals){
                    recieved_scraped_meals = scraped_meals;
                }
            );
        });

        waitsFor(function() {
            return !scraper.is_scraping(); 
        }, 'the scraper to finish.', 20);

        runs(function() {
            expect(recieved_scraped_meals).toEqual(DUMMY_SCRAPED_MEALS);
        });
    });
});
