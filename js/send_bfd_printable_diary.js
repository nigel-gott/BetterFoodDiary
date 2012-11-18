var meals2 = ['Curry', 'Chicken'];

alert('Sending!');
chrome.extension.sendMessage({'meals' : JSON.stringify(meals2)});
