meals = (function(){
    var storage = chrome.storage.local;

    var store = function(meals){
        storage.get('meals', function(result){
            stored_meals = parse_meals(result['meals']);

            stored_meals.push.apply(stored_meals, meals);
            storage.set({'meals': JSON.stringify(stored_meals)});
        });
    };

    var parse_meals = function(meals){
        if(meals === undefined){
            return [];
        } else {
            return JSON.parse(meals);
        }
    };


    return {
        read_meals_from_printable_diary : function(callback){
            chrome.extension.onMessage.addListener(
                function(request, sender, sendResponse){
                    alert('Got response!');
                    meals = JSON.parse(request.meals);
                    store(meals);
                    callback(meals);
                }
            );

            chrome.tabs.create({url: 'http://www.myfitnesspal.com/reports/printable_diary/?load'});
        },
        get_meals : function(callback){
            storage.get('meals', function(result){
                callback(result['meals']);
            });
        }
    };
})();

