$(function() {
    var bfd = chrome.extension.getBackgroundPage().bfd;

    function meals_to_html(meals){
        var i, html;
        for(i = 0;i < meals.length; i++){
            html += '<p>' + meals[i]  + '</p>';
        }
        return html;
    }

    $('#scrape_meals_link').click(function() {
        event.preventDefault();

        $.when(bfd.scraper.start()).then(
            function done(scraped_meals){
                var i;
                bfd.meal_store.append(scraped_meals);

                $('#meals').html(meals_to_html(scraped_meals));    
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

        var diary = new bfd.Diary();
        diary.fetch().then(
            function (){
                $('#meals').append('<p> Number to delete: ' + diary.length + '</p>');

                while(diary.length > 0){
                    var entry = diary.pop();
                    $('#meals').append('<p> destroying: ' + entry.id + '</p>');
                    entry.destroy();
                }
            
            },
            function (dfd, error, e){
                $('#meals').append('<p> Error delelting: ' + error + '</p>');

            }
        );

    });

    $('body').prepend('<a href="' + chrome.extension.getURL("unittests.html") + '">Unit tests</a>');
    $('body').prepend('<a href="' + chrome.extension.getURL("integrationtests.html") + '">Integration tests</a>');
});

