"use strict";
// import {text_to_speech,chatbot} from "./ai.js";
// import {Bubbles} from "./Bubbles.js"
// import { addBubble,prepHTML,container,bubbleWrap,bubbleQueue,bubbleTyping } from "./mybubbles.js";    

// const sendMessage = async (message)=>{
//     if (message.length<=100 && message!=="")
//     {
//         let response = await chatbot(message);
//         let reply = response["answers"][0]["answer"];
//         let blob =  await text_to_speech(reply);
//         const audioUrl = URL.createObjectURL(blob);
//         new Audio(audioUrl).play();
//         addBubble('<span>'+reply+'</span>',function(){},undefined,true);        
//     }
//       else
//           alert("Maximum message length is 100 & message should not be empty");
// }


// let typeInput = function(callbackFn) {
//   var inputWrap = document.createElement("div")
//   inputWrap.className = "input-wrap"
//   var inputText = document.createElement("textarea")
//   inputText.setAttribute("placeholder", "Ask me anything...")
//   inputWrap.appendChild(inputText)
//   inputText.addEventListener("keypress", function(e) {
//     // register user input
//     if (e.keyCode == 13) {
//       e.preventDefault()
//       typeof bubbleQueue !== false ? clearTimeout(bubbleQueue) : false // allow user to interrupt the bot
//       var lastBubble = document.querySelectorAll(".bubble.say")
//       lastBubble = lastBubble[lastBubble.length - 1]
//       lastBubble.classList.contains("reply") &&
//       !lastBubble.classList.contains("reply-freeform")
//         ? lastBubble.classList.add("bubble-hidden")
//         : false
//       addBubble(
//         '<span class="bubble-button bubble-pick">' + this.value + "</span>",
//         function() {},
//         "reply reply-freeform",true
//       )
//       sendMessage(this.value);
//       this.value = ""
//     }
//   })
//   container.appendChild(inputWrap)
//   bubbleWrap.style.paddingBottom = "100px"
//   inputText.focus()
// }

// prepHTML();
// typeInput();
