describe("Scraper", function() {

    beforeEach(function() {
        this.scraper = new bfd.Scraper();
        that = this;

        spyOn($.fn, 'append');
        spyOn($.fn, 'remove');

        spyOn(chrome.extension.onMessage, 'addListener').andCallFake(
            function(callback){
                // Simulate a message being passed back.
                that.timeout_id = setTimeout(function (){
                    var test_data = JSON.stringify(['Tuna', 'Mash']);
                    var message = {scraped_meals: test_data};

                    callback(message);
                }, 10);
            }
        );
        spyOn(chrome.extension.onMessage, 'removeListener');
    });

    afterEach(function() {
        clearTimeout(this.timeout_id);
    });

    it("fails if start is called whilst already scraping.", function() {
        this.scraper.start();

        // Try start a second time whilst it is already scraping. Should fail 
        // syncronously. 
        var error_message;
        $.when(this.scraper.start()).then(
            function done(){

            },
            function fail(e){
                error_message = e;
            }
        );

        expect(error_message).toBe(this.scraper.ALREADY_SCRAPING_ERROR);
    });

    it("adds and removes an iframe to the page.", function () {
        runs(function() {
            this.scraper.start();
        });

        waitsFor(function() {
            return !this.scraper.is_scraping(); 
        }, 'the scraper to finish.', 10000);

        runs(function() {
            expect($.fn.append.callCount).toEqual(1);
            expect($.fn.remove.callCount).toEqual(1);
        });
    });
});
