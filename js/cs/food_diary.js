// Content script for "http://www.myfitnesspal.com/food/diary/*"

(function (){
    var parser = new bfd.DiaryParser($('#main .container table'));

    var stats_button = create_stats_button();

    stats_button.click(function (){
    });

    function create_stats_button(){
        var first_meal_header = $('.meal_header').first();

        var stats_button_cell = $('<td/>');
        var stats_button = $('<a/>');
        var stats_image = $('<img/>', {
            src: chrome.extension.getURL('images/stats_icon.png')
        });

        stats_button.append(stats_image);
        stats_button_cell.append(stats_button);
        first_meal_header.append(stats_button_cell);

        return stats_button;
    }
}());
