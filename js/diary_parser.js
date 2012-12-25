var bfd = bfd || {};

bfd.DiaryParser = function DiaryParser(diary_table) {
    var meal_headers = diary_table.find('.meal_header');
    var nutrient_names = get_nutrient_names();

    this.parse = function parse(table){
        var diary_entry = new bfd.DiaryEntry({
            date: new Date(),
            meals: parse_collection(bfd.Meals, meal_headers, parse_meal)
        }); 
        return diary_entry;
    };

    function parse_collection(collection_type, element_list, parse_function){
        var collection = new collection_type();

        element_list.each(function(index, element){
            collection.add(parse_function(index, element));
        });

        return collection;
    }

    function parse_meal(index, meal_header){
        var ingredient_rows = $(meal_header).nextUntil('.bottom');
        var meal = new bfd.Meal({
            name: get_meal_name(meal_header),
            ingredients: parse_collection(bfd.Ingredients, ingredient_rows, parse_ingredient)
        });

        return meal;
    }

    function get_meal_name(meal_header){
        return $(meal_header).first().html().toLowerCase();
    }

    function parse_ingredient(index, ingredient_row){
        var nutrient_cells = $(ingredient_row).find('td:not([class])');
        var ingredient = new bfd.Ingredient({
            name: get_ingredient_name(ingredient_row),
            nutrients: parse_collection(bfd.Nutrients, nutrient_cells, parse_nutrient)
        });

        return ingredient;
    }

    function get_ingredient_name(element){
        return $(element).first().first().html();
    }

    function parse_nutrient(index, nutrient_cell){
            return new bfd.Nutrient({
                name: nutrient_names[index],
                value: $(nutrient_cell).html()
            });
    }

    // Returns the names of the nutrients displayed in the food diary.
    // For example: ['calories','carbs','fat','protein']
    function get_nutrient_names(){
        names = [];
        // The first meal header contains the nutrient column names.
        // The first cell in a meal header contains the meals title. So we 
        // select all the cells greather than the first.
        var nutrient_name_cells = meal_headers.first().children(':gt(0)');

        nutrient_name_cells.each(function(){
            names.push($(this).html().toLowerCase());
        });
        return names;
    }

};


