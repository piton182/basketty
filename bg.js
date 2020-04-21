console.log("Loaded.");

chrome.runtime.onSuspend.addListener(function() {
    console.log("Unloading.")
});

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    console.log(msg);
    console.log(chrome.cookies);
    chrome.cookies.get({url: /*TODO: hardcode*/"https://www.jacksonsart.com", name: /*TODO: hardcode*/'_uetsid'}, function(cookie) {
        console.log("got cookie", cookie);
        // NB! used asynchronously => 'return true;' needed
        // https://developer.chrome.com/extensions/messaging#simple
        sendResponse({ text: 'hi from bg', value: cookie ? cookie.value : null });
    });

    // NB! Don't delete! Needed to be able to use sendResponse asynchronously.
    // https://developer.chrome.com/extensions/messaging#simple
    return true;
});

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('clicked');
    chrome.storage.local.get(['basketty.on'], function(result) {
        chrome.storage.local.set({'basketty.on': !result['basketty.on']}, function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {on: !result}, function(response) {
                //   console.log(response.farewell);
                });
            });
        });
    });
});