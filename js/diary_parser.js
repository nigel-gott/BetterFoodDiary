var bfd = bfd || {};

bfd.DiaryEntryParser = function DiaryEntryParser(dom_parser, create_nutrient_views) {

    var i = 1;

    function id(){
        i++;
        return i;
    }

    this.parse = function parse(){
        meal_headers = dom_parser.get_meal_headers(); 
        nutrient_names = dom_parser.get_nutrient_names(meal_headers);
        entry_date = dom_parser.get_entry_date();

        var entry = new bfd.DiaryEntry({
            id: id(),
            date: entry_date,
            meals: []
        }); 

        parse_collection(entry.get('meals'), meal_headers, parse_meal);

        console.log(entry.toJSON());
        entry.save();
        return entry;
    }

    function parse_collection(collection, element_list, parse_function){
        element_list.each(function(index, element){
            var model = parse_function(index, element, collection);
            collection.add(model);
        });
    }

    function parse_meal(index, meal_header){
        var ingredient_rows = dom_parser.get_ingredient_rows(meal_header); 
        var meal = new bfd.Meal({
            id: id(),
            name: dom_parser.get_meal_name(meal_header),
            ingredients: []
        });

        parse_collection(meal.get('ingredients'), ingredient_rows, parse_ingredient)

        return meal;
    }

    function parse_ingredient(index, ingredient_row){
        var nutrient_cells = dom_parser.get_nutrient_cells(ingredient_row); 

        var ingredient = new bfd.Ingredient({
            id: id(),
            name: dom_parser.get_ingredient_name(ingredient_row),
            nutrients: []
        });

        parse_collection(ingredient.get('nutrients'), nutrient_cells, parse_nutrient);

        // Optional function that can be passed in
        if(typeof create_nutrient_views === 'function'){
            create_nutrient_views(ingredient.get('nutrients'), nutrient_cells);
        }

        return ingredient;
    }

    function parse_nutrient(index, nutrient_cell, nutrients){
            return new bfd.Nutrient({
                id: id(),
                name: nutrient_names[index],
                value: dom_parser.get_nutrient_value(nutrient_cell)
            });
    }


};

bfd.FoodDiaryDomParser = function FoodDiaryDomParser(){
    this.get_meal_headers = function get_meal_headers(){
        return $('#main .container table').find('.meal_header');
    };

    this.get_entry_date = function get_entry_date(){
        return new Date();
    };

    // Returns the names of the nutrients displayed in the food diary.
    // For example: ['calories','carbs','fat','protein']
    this.get_nutrient_names = function get_nutrient_names(meal_headers){
        names = [];
        // The first meal header contains the nutrient column names.
        // The first cell in a meal header contains the meals title. So we 
        // select all the cells greather than the first.
        var nutrient_name_cells = meal_headers.first().children(':gt(0)');

        nutrient_name_cells.each(function(){
            names.push($(this).html().toLowerCase());
        });
        return names;
    };

    this.get_ingredient_rows = function get_ingredient_rows(meal_header){
        return $(meal_header).nextUntil('.bottom');
    };

    this.get_meal_name = function get_meal_name(meal_header){
        return $(meal_header).find('.first').html().toLowerCase();
    };

    this.get_nutrient_cells = function get_nutrient_cells(ingredient_row){
        return $(ingredient_row).find('td:not([class])');
    };

    this.get_ingredient_name = function get_ingredient_name(element){
        return $(element).find('.first a').html();
    };

    this.get_nutrient_value = function get_nutrient_value(nutrient_cell){
        return parseInt($(nutrient_cell).html(), 10);
    };


};

bfd.FoodDiaryParser = function FoodDiaryParser(){
    var dom_parser = new bfd.FoodDiaryDomParser();
    var parser = new bfd.DiaryEntryParser(dom_parser);
    this.parse = parser.parse;

    function create_nutrient_views(nutrients, nutrient_cells){
        nutrient_cells.slice(1).each(function (index, element){
            new bfd.NutrientView({
                'el': element,
                'model': nutrients.at(index+1)
            });
        });
    }
}
bfd.PrintableDiaryParser = function PrintableDiaryParser(){

};

