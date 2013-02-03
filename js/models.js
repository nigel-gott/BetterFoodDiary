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
    },
    toggle_efficiency: function(){
        var displaying_efficiency = this.get('displaying_efficiency');
        this.set({ 'displaying_efficiency' : !displaying_efficiency });
    },
    get_calorie_efficiency: function(){
        var value = this.get('value');
        var calories = this.get('nutrients').get_value('calories');
        if(value !== 0 && calories){
            return calories / value;
        } else {
            return '';
        }
    }
});

bfd.Nutrients = Backbone.Collection.extend({
    model: bfd.Nutrient,

    add_nutrients: function(other_nutrients){
        var bound_add = _.bind(this.add, this);
        other_nutrients.each(bound_add);
    },

    add: function(nutrient){
        var our_nutrient = this.has(nutrient.get('name'));
        if(our_nutrient !== false){
            our_nutrient.add(nutrient); 
        } else {
            Backbone.Collection.prototype.add.call(this, nutrient.clone());
        }
    },

    get_value: function(nutrient_name){
        var nutrient = this.has(nutrient_name);
        return nutrient && nutrient.get('value');
    },

    has: function(nutrient_name){
        var names = this.pluck('name');
        var i;
        for(i = 0; i < names.length; i++){
            if(names[i] === nutrient_name){
                return this.at(i);
            }
        }
        return false;
    }
});
