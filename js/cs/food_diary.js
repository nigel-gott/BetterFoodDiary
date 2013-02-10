// Content script for "http://www.myfitnesspal.com/food/diary/*"

(function (){
    var dom_parser = new FoodDiaryDomParser();
    var parser = new bfd.DiaryEntryParser(dom_parser, create_nutrient_views);

    var diary_entry = parser.parse();
    diary_entry.save();

    function create_nutrient_views(nutrients, nutrient_cells){
        // Slice the cells to get rid of the first as we don't want to create an
        // calorie efficiency rollover for the calorie cell. 
        nutrient_cells.slice(1).each(function (index, element){
            new bfd.NutrientView({
                'el': element,
                'model': nutrients.at(index+1)
            });
        });
    }

    function FoodDiaryDomParser(){
        this.get_meal_headers = function get_meal_headers(){
            return $('#main .container table').find('.meal_header');
        };

        this.get_entry_date = function get_entry_date(){
            var d = new Date($('#date_selector').val());
            var curr_date = d.getDate();
            var curr_month = d.getMonth() + 1; //Months are zero based
            var curr_year = d.getFullYear();
            return curr_date + "/" + curr_month + "/" + curr_year;
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


    }

}());
