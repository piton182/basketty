const overlay=document.createElement("div");
overlay.id="overlay";
overlay.insertAdjacentHTML('afterbegin', `
<div>
    <span class='class123'>Basketty</span>
</div>
<div>
    <span class='class123'>cookie=</span>
    <span id='basketty::cookie' class='class123'>?</span>
</div>
`);

const on = () => {
    document.body.appendChild(overlay);

    chrome.runtime.sendMessage({msg: 'hi from content'}, function(resp) {
        document.getElementById("basketty::cookie").innerHTML=resp.value;
    });
};

const off = () => {
    document.body.removeChild(overlay);
};

chrome.storage.local.get(['basketty.on'], function(result) {
    console.log('a', result);
    if (result['basketty.on']) {
        on();
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension", request);
        if ('on' in request) {
            chrome.storage.local.get(['basketty.on'], function(result) {
                console.log('basketty.on=', result['basketty.on']);
                if (result['basketty.on']) {
                    on();
                } else {
                    off();
                }
            });
        }
    }
);