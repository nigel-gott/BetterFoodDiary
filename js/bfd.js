$('#content').prepend('<a href="' + chrome.extension.getURL("options.html") + '">BFD - Options</a>');

// Find all the ingredient rows.
$('#main .container tbody tr:not([class])').each(function(){
    // TODO: Change so you display an entire column of efficiencies at once.

    // Get the cells which only contain nutrition data.
    var tds = $(this).find('td:not([class])');

    var td_to_int = function(td){
        return parseInt($(td).html()); 
    }

    var calories = td_to_int(tds[0]); 

    var add_rollover = function(td, efficiency, value){
        // TODO: Change the colours to scale depending on efficiency
        $(td).mouseenter(function(){
            $(td).css('color','red');
            $(td).html(efficiency);
        });
        $(td).mouseleave(function(){
            $(td).css('color','black');
            $(td).html(value);
        });
    }

    for(var i = 1; i < tds.length; i++){
        var td = tds[i];
        var value = td_to_int(td);
        if(value !== 0){
            // Round the efficiency to 2 decimal places.
            var efficiency = Math.round( (calories / value) * 100 ) / 100;
            add_rollover(td, efficiency, value);
        }
    }

});
