// TODO: Actually scrape results and parse into meals array.
var meals2 = ['All Bran', 'Tuna'];

chrome.extension.sendMessage({'scraped_meals' : JSON.stringify(meals2)});
