var overlay=document.createElement("div");
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
document.body.appendChild(overlay);

chrome.runtime.sendMessage({msg: 'hi from content'}, function(resp) {
    document.getElementById("basketty::cookie").innerHTML=resp.value;
});
