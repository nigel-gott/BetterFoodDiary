var bfd = bfd || {};

var storage = new Backbone.ChromeStorage('diary_entries', 'local');
bfd.DiaryEntry = Backbone.RelationalModel.extend({
    chromeStorage: storage,

    relations: [{
        type: Backbone.HasMany,
        key: 'meals',
        relatedModel: 'bfd.Meal',
        collectionType: 'bfd.Meals',
        reverseRelation: {
            key: 'diary_entry',
            includeInJSON: 'id',
        }
    }],

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
    model: bfd.DiaryEntry,
    chromeStorage: storage
});

bfd.Meals = Backbone.Collection.extend({
    model: bfd.Meal
});

bfd.Meal = Backbone.RelationalModel.extend({
    relations: [{
        type: Backbone.HasMany,
        key: 'ingredients',
        relatedModel: 'bfd.Ingredient',
        collectionType: 'bfd.Ingredients',
        reverseRelation: {
            key: 'meal',
            includeInJSON: 'id',
        }
    }]
});

bfd.Ingredients = Backbone.Collection.extend({
    model: bfd.Ingredient
});

bfd.Ingredient = Backbone.RelationalModel.extend({
    relations: [{
        type: Backbone.HasMany,
        key: 'nutrients',
        relatedModel: 'bfd.Nutrient',
        collectionType: 'bfd.Nutrients',
        reverseRelation: {
            key: 'ingredient',
            includeInJSON: 'id',
        }
    }]
});

bfd.Nutrients = Backbone.Collection.extend({
    model: bfd.Nutrient,
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

bfd.Nutrient= Backbone.RelationalModel.extend({
    toggle_efficiency: function(){
        var displaying_efficiency = this.get('displaying_efficiency');
        this.set({ 'displaying_efficiency' : !displaying_efficiency });
    },
    get_calorie_efficiency: function(){
        var value = this.get('value');
        var calories = this.get('ingredient').get('nutrients').get_value('calories');
        if(value !== 0 && calories){
            return calories / value;
        } else {
            return '';
        }
    }
});

