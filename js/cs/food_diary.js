// Content script for "http://www.myfitnesspal.com/food/diary/*"

(function (){
    var parser = new bfd.DiaryParser($('#main .container table'));

    new bfd.StatsView();

}());
