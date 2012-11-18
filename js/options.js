$(document).ready(function() {
    $('#populate_meals_link').click(function(){
        meals.populate_with_last_year();
        return false;
    });
});

