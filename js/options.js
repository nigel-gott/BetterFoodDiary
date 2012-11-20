$(document).ready(function() {
    $('#populate_meals_link').click(function(){
        meals_loader.read_meals_from_printable_diary(function(data){
            $('#meals').html(data);    
        });
        return false;
    });

    $('#get_meals_link').click(function(){
        meals_loader.get_meals(function(meals){
            var meals_html;
            for(var i = 0; i < meals.length; i++){
                meals_html += '<p>' + meals[i] + '</p>';
            }
            $('#meals').html(meals_html);
        });
        return false;
    });
});

