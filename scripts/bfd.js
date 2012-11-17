$('#content').prepend('<p class="flash"> BFD has loaded!</p>');

// Changes the default form settings to display the previous years worth of 
// meals only and then submits the form. However only if a year of data is 
// not already displayed.

// TODO: Improve date handling to jump back exactly 365 years.
var new_from_year_value = parseInt($('#to_year').val()) - 1
if(new_from_year_value != $('#from_year').val()){
    $('#from_year').val(new_from_year_value);
    $('#show_exercise_diary').attr('checked', false);
    $('#show_exercise_notes').attr('checked', false);
    $('#show_food_notes').attr('checked', false);

    // When we visit the reports/printable_diary page without a username 
    // in the url, mfp does not add the username value to the change report
    // form, resulting in an error when we submit unless we find and add the 
    // username ourselves. 
    
    // TODO: Add cleaner way of getting the username, this way is pretty hacky.
    var username = $('#header h1 strong').text().toLowerCase();
    $('#username').val(username);
    $('.change-report form').submit();
}
