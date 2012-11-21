$(document).ready(function() {
    $('#populate_meals_link').click(function(){
        scrape_and_store_meals(function(data){
            $('#meals').html(data);    
        });
        return false;
    });

    $('#get_meals_link').click(function(){
        meals_store.get(function(meals){
            var meals_html = '';
            for(var i = 0; i < meals.length; i++){
                meals_html += '<p>' + meals[i] + '</p>';
            }
            $('#meals').html(meals_html);
        });
        return false;
    });
});

