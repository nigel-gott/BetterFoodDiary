$(function() {
    var bfd = chrome.extension.getBackgroundPage().bfd;

    $('#scrape_meals_link').click(function() {
        event.preventDefault();

        $.when(bfd.scraper.start()).then(
            function done(scraped_meals){
                $('#meals').html(scraped_meals);    
            }, 
            function fail(error_message){
                $('#meals').html('<h2>' + error_message + '</h2>');
            }
        );

    });

    $('#get_meals_link').click(function() {
        event.preventDefault();

        $('#meals').append('<hr>');
        chrome.storage.local.get('diary_entries', function(result){
            if(result.diary_entries){
                var entries = result.diary_entries.split(',');
                $('#meals').append('<p> Entries: ' + entries + '</p>');
                var i;
                for(i = 0; i < entries.length; i++){
                    var id = 'diary_entries-' + entries[i];
                    get_id(id);
                }
            } else {
                $('#meals').append('<p> No diary entries found </p>');
            }
        });
        

        function get_id(id){
            chrome.storage.local.get(id, function(result){
                $('#meals').append('<p> id : ' + id+ '</p>');
                $('#meals').append(prettyPrint(JSON.parse(result[id]), {maxDepth:3}));
            });
        }
    });

    $('#clear_meals_link').click(function() {
        // TODO: Add a big confirmation popup thingy before actually clearing.
        event.preventDefault();
        $('#meals').append('<hr>');

        chrome.storage.local.clear();

    });

    $('body').prepend('<a href="' + chrome.extension.getURL("unittests.html") + '">Unit tests</a>');
    $('body').prepend('<a href="' + chrome.extension.getURL("integrationtests.html") + '">Integration tests</a>');
});

