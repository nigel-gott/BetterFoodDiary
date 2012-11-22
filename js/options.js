$(document).ready(function() {
    var bfd = chrome.extension.getBackgroundPage().bfd;
    $('#populate_meals_link').click(function(){
        bfd.scrape_and_store_meals(function(data, success){
            if(success){
                $('#meals').html(data);    
            } else {
                $('#meals').html('<h1> You are not logged into myfitnesspal.com </h1>');
            }
        });
        event.preventDefault();
    });

    $('#get_meals_link').click(function(){
        bfd.meals_store.get(function(meals){
            var meals_html = '';
            for(var i = 0; i < meals.length; i++){
                meals_html += '<p>' + meals[i] + '</p>';
            }
            $('#meals').html(meals_html);
        });
        event.preventDefault();
    });
});

