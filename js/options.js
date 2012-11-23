$(document).ready(function() {
    var bfd = chrome.extension.getBackgroundPage().bfd;

    $('#scrape_meals_link').click(function() {
        event.preventDefault();

        bfd.scrape_and_store_meals(function(scraped_meals, error_message){
            if(scraped_meals){
                $('#meals').html(scraped_meals);    
            } else {
                $('#meals').html('<h2>' + error_message + '</h2>');
            }
        });
    });

    $('#get_meals_link').click(function() {
        event.preventDefault();

        bfd.meals_store.get(function(meals){
            $('#meals').html(meals);
        });
    });

    $('#clear_meals_link').click(function() {
        // TODO: Add a big confirmation popup thingy before actually clearing.
        event.preventDefault();

        bfd.meals_store.clear();
    });

    $('body').prepend('<a href="' + chrome.extension.getURL("unittests.html") + '">Unit tests</a>');
});

