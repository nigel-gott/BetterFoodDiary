bfd.scrape_from_printable_diary = function(callback){
    var $iframe = $('<iframe id="printable_diary_iframe" src="http://www.myfitnesspal.com/reports/printable_diary/?load"></iframe>');

    chrome.extension.onMessage.addListener(
        function(request, sender, sendResponse){
            var scraped_meals = request.scraped_meals;
            if(scraped_meals !== undefined){
                $iframe.remove();
                callback(JSON.parse(scraped_meals));
            }
        }
    );

    $('body').append($iframe);

}
