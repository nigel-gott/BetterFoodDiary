// Content script for "http://www.myfitnesspal.com/food/diary/*"

(function (){
    var parser = new bfd.FoodDiaryParser();
    parser.parse();

}());
