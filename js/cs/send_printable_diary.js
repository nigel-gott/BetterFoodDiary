var entries = [];
$('#content .main-title-2').each(function (){
    entries.push($(this).html());
});

chrome.extension.sendMessage({'scraped_meals' : JSON.stringify(entries)});
