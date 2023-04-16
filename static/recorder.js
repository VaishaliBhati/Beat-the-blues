// import {speech_to_text} from "./ai.js";
import {audioBufferToWav} from "./wave_enc.js";

const record = document.querySelector(".record");
const stop = document.querySelector(".stop");

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
      .getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true,
        }
      )
     .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        record.onclick = () => {
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";
          record.style.color = "black";
        };
        let chunks = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        stop.onclick = () => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
          record.style.background = "";
          record.style.color = "";
        };
        mediaRecorder.onstop = (e) => {
        
          
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

          const audioContext = new AudioContext()
          const fileReader = new FileReader()

          // converting blob into audio buffer
          fileReader.onloadend = () => {
          
              const arrayBuffer = fileReader.result          
              // Convert array buffer into audio buffer
              audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {

                //converting the audio buffer to wave buffer
                let wave_buffer = audioBufferToWav(audioBuffer);
                let blob = new Blob([wave_buffer],{ type: "audio/wave; codecs=pcm" });
                let text_input = document.querySelectorAll("textarea")[0];
                // calling azure API
                text_input.disabled = true;
                text_input.setAttribute("placeholder", "predicting text from sound please wait...")
                record.disabled = true;
                stop.disabled = true;
                speech_to_text(blob);

              })
          
          }
          fileReader.readAsArrayBuffer(blob)
          //Load blob

          chunks = [];
          

        };

      })
      // Error callback
      .catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
    