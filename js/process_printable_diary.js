var current_date = new Date();
var year_ago_date = new Date();
year_ago_date.setMonth(current_date.getMonth() - 12);

$('#from_year').val(year_ago_date.getFullYear());
$('#from_month').val(year_ago_date.getMonth() + 1);
$('#from_day').val(year_ago_date.getDate());

$('#show_exercise_diary').attr('checked', false);
$('#show_exercise_notes').attr('checked', false);
$('#show_food_notes').attr('checked', false);
username = $('#header h1 strong').text().toLowerCase();
$('#username').val(username);

$form = $('.change-report form');
$form.attr('action', $form.attr('action') + '/?send');
alert('Submitting!');
$form.submit();

