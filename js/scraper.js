// Scrapes the users printable diary to get meal data for the past year. //{{{
//
// The method in which we do this is a bit clunky, but the best with what 
// we are given. 
//
// 1. Open an iframe in background.html which points to the users printable
// diary, combined with a dummy get parameter ?load we can load in a specific 
// content script (js/cs/load_printable_diary.js).
//
// 2. The content script sets the pages form to get a years worth of data 
// (it defaults to displaying a days worth) and then submits it. 
// It has also changed the action of the form so that the dummy get is now
// ?send, which loads a different content script (js/cs/send_printable_diary.js).
//
// 3. The send content script now actually scrapes the meal data and using 
// message passing sends this to the extension.
//
// Another thing to note is that because we are using these dummy gets, 
// the default page behaviour wont change for the user, they can still use
// reports/printable_diary just as usual.//}}}

var bfd = bfd || {};

bfd.Scraper = function Scraper(){ 
    this.INITIAL_SCRAPING_URL = 'http://www.myfitnesspal.com/reports/printable_diary/?load';
    this.ALREADY_SCRAPING_ERROR = 'Already scraping.';
    this.NOT_LOGGED_IN_ERROR = 'Not logged into myfitnesspal.com';

    var current_defer = false;
    var $iframe;

    this.start = function start() { 
        var defer = $.Deferred();

        if(!current_defer) {
            current_defer = defer;
            create_scraper();
        } else {
            defer.reject(this.ALREADY_SCRAPING_ERROR);
        }

        return defer.promise();
    };

    this.is_scraping = function is_scraping(){
        return current_defer !== false;
    };

    function create_scraper(){
        chrome.extension.onMessage.addListener(message_listener);

        $iframe = $('<iframe/>', {
            src: this.INITIAL_SCRAPING_URL 
        });
        $('body').append($iframe);
    }

    function message_listener(message) {
        var scraped_meals = message.scraped_meals && JSON.parse(message.scraped_meals);

        if(scraped_meals){
            current_defer.resolve(scraped_meals);
        } else if(message.not_logged_in){
            current_defer.reject(this.NOT_LOGGED_IN_ERROR);
        } else {
            // Recieved a message we don't care about, don't want to do 
            // cleanup just yet.
            return;
        }

        remove_scraper();
    }

    function remove_scraper(){
        chrome.extension.onMessage.removeListener(message_listener);
        $iframe.remove();
        current_defer = false;
    }
};

bfd.scraper = new bfd.Scraper();
