// Content script for "http://www.myfitnesspal.com/food/diary/*"
(function(){

    console.log('starting to scrape.');
    parse_printable_diary();
    console.log('finished.');
    chrome.extension.sendMessage({'scraped_meals' : true});

    function parse_printable_diary(){
        var dom_parser = new PrintableDiaryDOMParser();
        var entry_parser = new bfd.DiaryEntryParser(dom_parser);

        var date_headers = $('#content .main-title-2');
        date_headers.each(function (){
            var date_header = $(this);
            var entry_table = date_header.next();
            dom_parser.set_date_and_entry(date_header, entry_table);
            var entry = entry_parser.parse_and_save();
        });
    }

    function PrintableDiaryDOMParser(date_header, entry_table){
        this.set_date_and_entry = function set_date_and_entry(new_date_header, new_entry_table){
            date_header = new_date_header;
            entry_table = new_entry_table;
        };

        this.get_meal_headers = function get_meal_headers(){
            return entry_table.find('.title');
        };

        this.get_entry_date = function get_entry_date(){
            var date_string = date_header.html();
            var date = moment(date_string, 'MMM DD, YYYY');
            return date.format('YYYY-MM-DD');
        };

        this.get_nutrient_names = function get_nutrient_names(meal_headers){
            var names = [];
            var foods_cell = entry_table.find('.first').first();
            var nutrient_name_cells = foods_cell.nextUntil('.last');

            nutrient_name_cells.each(function(){
                var name = $(this).html().toLowerCase();
                // MFP uses sugar for the header on the food diary but sugars 
                // on the printable food diary. We want to internally store 
                // them with the same name so we pick sugar!
                if(name === 'sugars'){
                    name = 'sugar';
                }
                names.push(name);
            });
            return names;
        };

        this.get_ingredient_rows = function get_ingredient_rows(meal_header){
            return $(meal_header).nextUntil('.title');
        };

        this.get_meal_name = function get_meal_name(meal_header){
            return $(meal_header).children().first().html().toLowerCase();
        };

        this.get_nutrient_cells = function get_nutrient_cells(ingredient_row){
            return $(ingredient_row).find('td:not([class])');
        };

        this.get_ingredient_name = function get_ingredient_name(element){
            return $(element).find('.first').html();
        };

        this.get_nutrient_value = function get_nutrient_value(nutrient_cell){
            var number_only_regex = /\d+/;
            var value_string = $(nutrient_cell).html();
            return parseInt(value_string.match(number_only_regex), 10);
        };
    };
}());

