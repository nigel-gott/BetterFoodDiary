describe("Scraper test suite", function() {
    var scraper;

    beforeEach(function() {
        scraper = bfd.Scraper('');
    });
    
    it("only allows one scraper to be running at once.", function() {
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
});
