// Content script for "http://www.myfitnesspal.com/food/diary/*"

(function (){
    var parser = new bfd.FoodDiaryParser();
    parser.parse();

    /*
    var nutrient = new bfd.Nutrient({value:10, name:'protein'});
    var ingredient = new bfd.Ingredient({name: 'chicken'});
    ingredient.get('nutrients').add(nutrient);
    var meal = new bfd.Meal({name: 'lunch'});
    meal.get('ingredients').add(ingredient);
    var entry = new bfd.DiaryEntry({date: new Date(), meals:[]});
    entry.get('meals').add(meal);

    entry.save();
    */

}());
