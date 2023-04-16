"use strict";
const STTAPI = "https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US"
const TTSAPI = "https://eastus.tts.speech.microsoft.com/cognitiveservices/v1"
const CAPI = "https://beat-the-language.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=Beat-the-project&api-version=2021-10-01&deploymentName=production"


const SAPIKEY = "" //speech APIKEY 

const CAPIKEY = "" //chat APIKEY

const sendMessage = async (message) => {
  if (message.length <= 100 && message !== "") {
    let response = await chatbot(message);
    let reply = response["answers"][0]["answer"];
    let blob = await text_to_speech(reply);
    const audioUrl = URL.createObjectURL(blob);
    return new Audio(audioUrl);
    // addBubble('<span>'+reply+'</span>',function(){},undefined,true);        
  }
  else
    alert("Maximum message length is 100 & message should not be empty");
}

const chatbot = async (question) => {

  let data = {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
      'Ocp-Apim-Subscription-Key': CAPIKEY
    }),
    method: "POST",
    body: JSON.stringify({ question: question })
  }
  let url = new URL(CAPI);
  try {
    const request = fetch(url, data);
    return await (await request).json();
  } catch (err) {
    console.log(err);

  }
}

const text_to_speech = async (text) => {
  var myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", SAPIKEY);
  myHeaders.append("Content-Type", "application/ssml+xml");
  myHeaders.append("X-Microsoft-OutputFormat", "ogg-16khz-16bit-mono-opus");

  var raw = `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Male'\n    name='en-US-ChristopherNeural'>\n        ${text}\n</voice></speak>\n`;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return (await fetch(TTSAPI, requestOptions)).blob();
}

const speech_to_text = async (blob) => {
  var myHeaders = new Headers();
  myHeaders.append("Ocp-Apim-Subscription-Key", SAPIKEY);
  myHeaders.append("Content-Type", "audio/wave");
  const formData = new FormData();
  formData.append('audio', blob)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: blob,
    redirect: 'follow'
  };
  fetch(STTAPI, requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let text_input = document.querySelectorAll("textarea")[0];
      text_input.value = result["DisplayText"];
      text_input.disabled = false;
      text_input.setAttribute("placeholder", "Ask me Anything")
    })
    .catch(error => console.log('error', error));
}
// // exports for es6
if (typeof exports !== "undefined") {
  exports.text_to_speech = text_to_speech;
  exports.chatbot = chatbot;
  exports.speech_to_text = speech_to_text;
}