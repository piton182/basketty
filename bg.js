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
        sendResponse({ text: 'hi from bg', value: cookie.value });
    });

    // NB! Don't delete! Needed to be able to use sendResponse asynchronously.
    // https://developer.chrome.com/extensions/messaging#simple
    return true;
});
