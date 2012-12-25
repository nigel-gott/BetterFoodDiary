// Content script for "http://www.myfitnesspal.com/food/diary/*"

var bfd = bfd || {};

var parser = new bfd.DiaryParser($('#main .container table'));
parser.parse().get_total_nutrients();
