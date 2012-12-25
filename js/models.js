var bfd = bfd || {};

bfd.DiaryEntry = Backbone.Model.extend({
    get_total_nutrients: function(){
        var all_nutrients = this.get('meals').get_all_nutrients();

        var total_nutrients = _.reduce(all_nutrients, 
            function(total, next_nutrients){
                total.add_nutrients(next_nutrients);
                return total;
            },
            new bfd.Nutrients()
        );

        total_nutrients.each(function(nutrient) {
            console.log(nutrient.get('name') + ' = ' + nutrient.get('value'));
        });

        return total_nutrients;
    }
});

bfd.Diary = Backbone.Collection.extend({
    model: bfd.DiaryEntry
});


bfd.Meal = Backbone.Model.extend({
});

bfd.Meals = Backbone.Collection.extend({
    model: bfd.Meal,
    get_all_nutrients: function(){
        var all_nutrients = [];
        this.each(function(meal) {
            meal.get('ingredients').push_nutrients(all_nutrients);
        });
        return all_nutrients;
    }
});

bfd.Ingredient = Backbone.Model.extend({
});

bfd.Ingredients = Backbone.Collection.extend({
    model: bfd.Ingredient,
    push_nutrients: function(all_nutrients){
        this.each(function(ingredient) {
            all_nutrients.push(ingredient.get('nutrients'));
        });
    }
});


bfd.Nutrient= Backbone.Model.extend({
    add: function(nutrient){
        this.set({ value: this.get('value') + nutrient.get('value') });
    }
});

bfd.Nutrients = Backbone.Collection.extend({
    model: bfd.Nutrient,
    add_nutrients: function(other_nutrients){
        var that = this;
        other_nutrients.each(function(nutrient){
            var our_nutrient = that.has(nutrient);
            if(our_nutrient !== false){
                our_nutrient.add(nutrient); 
            } else {
                that.add(nutrient.clone());
            }
        });
    },
    has: function(nutrient){
        var names = this.pluck('name');
        var i;
        for(i = 0; i < names.length; i++){
            if(names[i] === nutrient.get('name')){
                return this.at(i);
            }
        }
        return false;
    }
});
