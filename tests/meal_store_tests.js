describe("Meal store", function() {

    var meal_store = bfd.meal_store;
    var dummy_storage;

    beforeEach(function() {
        dummy_storage = {};

        spyOn(meal_store.storage, 'get').andCallFake(
            function(key, callback){
                callback(dummy_storage);
            }
        );
        spyOn(meal_store.storage, 'set').andCallFake(
            function(new_value){
                dummy_storage = new_value;
            }
        );

    });

    it('appends correctly.', function() {
        meal_store.append(['A']); 
        meal_store.append(['B']);
        var meals;
        meal_store.get(function(result) {
            meals = result;
        });
        expect(meals).toEqual(['A','B']);
    });

    it('clears correctly.', function() {
        meal_store.append(['A']);
        meal_store.clear();
        var meals;
        meal_store.get(function(result) {
            meals = result;
        });
        expect(meals).toEqual([]);
    });

    it('gets correctly.', function() {
        meal_store.append(['A']);
        var meals;
        meal_store.get(function(result) {
            meals = result;
        });
        expect(meals).toEqual(['A']);
    });


});
