$(document).ready(function() {
    var bfd = chrome.extension.getBackgroundPage().bfd;
    $('#scrape_meals_link').click(function(){
        event.preventDefault();
        bfd.scrape_and_store_meals(function(data, success){
            if(success){
                $('#meals').html(data);    
            } else {
                $('#meals').html('<h1> You are not logged into myfitnesspal.com </h1>');
            }
        });
    });

    $('#get_meals_link').click(function(){
        event.preventDefault();
        bfd.meals_store.get(function(meals){
            var meals_html = '';
            for(var i = 0; i < meals.length; i++){
                meals_html += '<p>' + meals[i] + '</p>';
            }
            $('#meals').html(meals_html);
        });
    });

    $('#clear_meals_link').click(function(){
        event.preventDefault();
        bfd.meals_store.clear();
    });
});

