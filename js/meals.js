meals = (function(){
    var storage = chrome.storage.local;

    var store = function(meals){
        storage.get('meals', function(result){
            stored_meals = result['meals'];
            if(stored_meals === undefined)
                stored_meals = []
            else
                stored_meals = JSON.parse(stored_meals);

            stored_meals.push.apply(stored_meals, meals);
            storage.set({'meals': JSON.stringify(stored_meals)}, function(){
                console.log('stored meals');
            });
        });
    };

    return {
        populate_with_last_year : function(){
            store(['all Bran Breakfast', 'Turkey Pita']);
        },
        get_meals : function(callback){
            storage.get('meals', function(result){
                callback(result['meals']);
            });
        }
    };
})();

