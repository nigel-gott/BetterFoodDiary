var meals2 = ['Curry', 'Chicken'];

chrome.extension.sendMessage({'meals' : JSON.stringify(meals2)});
