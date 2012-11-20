load_hidden_printable_diary = function(callback){
    var $iframe = $('<iframe id="printable_diary_iframe" src="http://www.myfitnesspal.com/reports/printable_diary/?load"></iframe>');
    $iframe.hide();
    $('body').append($iframe);
}
