var bfd = bfd || {};

bfd.DiaryEntryParser = function DiaryEntryParser(dom_parser, create_nutrient_views) {

    this.parse = function parse(){
        meal_headers = dom_parser.get_meal_headers(); 
        nutrient_names = dom_parser.get_nutrient_names(meal_headers);
        entry_date = dom_parser.get_entry_date();


        var entry = new bfd.DiaryEntry({
            id: entry_date,
            date: entry_date,
            meals: []
        }); 

        parse_collection(entry.get('meals'), meal_headers, parse_meal, entry_date);

        console.log(entry.toJSON());
        entry.save();
        return entry;
    }

    function parse_collection(collection, element_list, parse_function, id_prefix){
        element_list.each(function(index, element){
            var model = parse_function(index, element, id_prefix);
            collection.add(model);
        });
    }

    function parse_meal(index, meal_header, id_prefix){
        var ingredient_rows = dom_parser.get_ingredient_rows(meal_header); 
        var id = id_prefix + '_meal' + index;
        var meal = new bfd.Meal({
            id: id,
            name: dom_parser.get_meal_name(meal_header),
            ingredients: []
        });

        parse_collection(meal.get('ingredients'), ingredient_rows, parse_ingredient, id);

        return meal;
    }

    function parse_ingredient(index, ingredient_row, id_prefix){
        var nutrient_cells = dom_parser.get_nutrient_cells(ingredient_row); 

        var id = id_prefix + '_ingredient' + index;
        var ingredient = new bfd.Ingredient({
            id: id,
            name: dom_parser.get_ingredient_name(ingredient_row),
            nutrients: []
        });

        parse_collection(ingredient.get('nutrients'), nutrient_cells, parse_nutrient, id);

        // Optional function that can be passed in
        if(typeof create_nutrient_views === 'function'){
            create_nutrient_views(ingredient.get('nutrients'), nutrient_cells);
        }

        return ingredient;
    }

    function parse_nutrient(index, nutrient_cell, id_prefix){
            return new bfd.Nutrient({
                id: id_prefix + '_nutrient' + index,
                name: nutrient_names[index],
                value: dom_parser.get_nutrient_value(nutrient_cell)
            });
    }


};
bfd.PrintableDiaryParser = function PrintableDiaryParser(){

};

