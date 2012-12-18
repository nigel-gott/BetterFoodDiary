$(function() {
    var bfd = chrome.extension.getBackgroundPage().bfd;

    $('#scrape_meals_link').click(function() {
        event.preventDefault();

        $.when(bfd.scraper.start()).then(
            function done(scraped_meals){
                bfd.meal_store.append(scraped_meals);
                $('#meals').html(scraped_meals);    
            }, 
            function fail(error_message){
                $('#meals').html('<h2>' + error_message + '</h2>');
            }
        );
    });

    $('#get_meals_link').click(function() {
        event.preventDefault();

        bfd.meal_store.get(function(meals){
            $('#meals').html(meals);
        });
    });

    $('#clear_meals_link').click(function() {
        // TODO: Add a big confirmation popup thingy before actually clearing.
        event.preventDefault();

        bfd.meal_store.clear();
    });

    $('body').prepend('<a href="' + chrome.extension.getURL("unittests.html") + '">Unit tests</a>');
});

