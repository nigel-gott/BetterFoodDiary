var bfd = bfd || {};

bfd.meals_store = (function(){
    var storage = chrome.storage.local;

    function parse_meals(meals){
        if(meals === undefined){
            return [];
        } else {
            return JSON.parse(meals);
        }
    }

    function get(callback){
        storage.get('meals', function(result){
            var stored_meals = parse_meals(result['meals']);
            callback(stored_meals);
        });
    }

    function set(meals){
        storage.set({'meals': JSON.stringify(meals)});
    }

    function append(new_meals){
        get(function(stored_meals){
            // TODO: Make sure we don't make duplicate meals.
            stored_meals.push.apply(stored_meals, new_meals);
            set(stored_meals);
        });
    }

    return {
        get: get,
        append: append
    };
})();

bfd.scrape_and_store_meals = function (callback){
    bfd.scrape_from_printable_diary(function(meals, success){
        if(success){
            bfd.meals_store.append(meals);
        }
        callback(meals, success);
    });
}


