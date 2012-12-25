var bfd = bfd || {};

bfd.DiaryEntry = Backbone.Model.extend({
});

bfd.Diary = Backbone.Collection.extend({
    model: bfd.DiaryEntry
});


bfd.Meal = Backbone.Model.extend({
});

bfd.Meals = Backbone.Collection.extend({
    model: bfd.Meal
});

bfd.Ingredient = Backbone.Model.extend({
});

bfd.Ingredients = Backbone.Collection.extend({
    model: bfd.Ingredient
});


bfd.Nutrient= Backbone.Model.extend({
});

bfd.Nutrients = Backbone.Collection.extend({
    model: bfd.Nutrient
});
