$(document).ready(function() {
    $('#populate_meals_link').click(function(){
        meals.populate_with_last_year();
        return false;
    });

    $('#get_meals_link').click(function(){
        meals.get_meals(function(meals){
            meals = JSON.parse(meals);
            for(var i = 0; i < meals.length; i++){
                $('#meals').append('<p>'+meals[i]+'</p>');
            }
        });
        return false;
    });
});

