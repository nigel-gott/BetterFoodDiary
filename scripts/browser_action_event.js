chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: 'http://www.myfitnesspal.com/reports/printable_diary/'});
});
