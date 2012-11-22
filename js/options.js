$(document).ready(function() {
    var bfd = chrome.extension.getBackgroundPage().bfd;
    $('#populate_meals_link').click(function(){
        bfd.scrape_and_store_meals(function(data){
            $('#meals').html(data);    
        });
        return false;
    });

    $('#get_meals_link').click(function(){
        bfd.meals_store.get(function(meals){
            var meals_html = '';
            for(var i = 0; i < meals.length; i++){
                meals_html += '<p>' + meals[i] + '</p>';
            }
            $('#meals').html(meals_html);
        });
        return false;
    });
});

