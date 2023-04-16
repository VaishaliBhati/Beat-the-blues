const widerBy = 2;
const sidePadding = 6; // padding on both sides of chat bubbles
let animationTime = 200;
let typeSpeed = 5;

var container = document.getElementById("chat");
container.classList.add("bubble-container");

var bubbleWrap = document.getElementsByClassName("bubble-wrap")[0];

var bubbleTyping = document.getElementsByClassName("bubble-typing imagine")[0];

function addBubble(say, posted, reply, live) {

reply = typeof reply !== "undefined" ? reply : ""
live = typeof live !== "undefined" ? live : true // bubbles that are not "live" are not animated and displayed differently
animationTime = live ? animationTime : 0
typeSpeed = live ? typeSpeed : 0
// create bubble element
var bubble = document.createElement("div")
var bubbleContent = document.createElement("span")
bubble.className = "bubble imagine " + (!live ? " history " : "") + reply
bubbleContent.className = "bubble-content"
bubbleContent.innerHTML = say
bubble.appendChild(bubbleContent)
bubbleWrap.insertBefore(bubble,bubbleTyping)
// answer picker styles
if (reply !== "") {
    var bubbleButtons = bubbleContent.querySelectorAll(".bubble-button")
    for (var z = 0; z < bubbleButtons.length; z++) {
    ;(function(el) {
        if (!el.parentNode.parentNode.classList.contains("reply-freeform"))
        el.style.width = el.offsetWidth - sidePadding * 2 + widerBy + "px"
    })(bubbleButtons[z])
    }
    bubble.addEventListener("click", function(e) {
    if (e.target.classList.contains('bubble-button')) {
        for (var i = 0; i < bubbleButtons.length; i++) {
        ;(function(el) {
            el.style.width = 0 + "px"
            el.classList.contains("bubble-pick") ? (el.style.width = "") : false
            el.removeAttribute("onclick")
        })(bubbleButtons[i])
        }
        this.classList.add("bubble-picked")
    }
    })
}
let wait = live ? animationTime * 2 : 0
let minTypingWait = live ? animationTime * 6 : 0
if (say.length * typeSpeed > animationTime && reply == "") {
    wait += typeSpeed * say.length
    wait < minTypingWait ? (wait = minTypingWait) : false
    setTimeout(function() {
    bubbleTyping.classList.remove("imagine")
    }, animationTime)
}
live && setTimeout(function() {
    bubbleTyping.classList.add("imagine")
}, wait - animationTime * 2)
bubbleQueue = setTimeout(function() {
    bubble.classList.remove("imagine")
    var bubbleWidthCalc = bubbleContent.offsetWidth + widerBy + "px"
    bubble.style.width = reply == "" ? bubbleWidthCalc : ""
    bubble.style.width = say.includes("<img src=")
    ? "50%"
    : bubble.style.width
    bubble.classList.add("say")
    posted()

    // save the interaction

    // animate scrolling
    let containerHeight = container.offsetHeight
    let scrollDifference = bubbleWrap.scrollHeight - bubbleWrap.scrollTop
    let scrollHop = scrollDifference / 200
    var scrollBubbles = function() {
    for (var i = 1; i <= scrollDifference / scrollHop; i++) {
        ;(function() {
        setTimeout(function() {
            bubbleWrap.scrollHeight - bubbleWrap.scrollTop > containerHeight
            ? (bubbleWrap.scrollTop = bubbleWrap.scrollTop + scrollHop)
            : false
        }, i * 5)
        })()
    }
    }
    setTimeout(scrollBubbles, animationTime / 2)
}, wait + animationTime * 2)
}
if (typeof exports !== "undefined") {
    exports.addBubble = addBubble
 }

