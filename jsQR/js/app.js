var noSleep = new NoSleep();
var wakeLockEnabled = false;
var toggleEl = document.querySelector("#toggle");
toggleEl.addEventListener('click', function() {
  if (!wakeLockEnabled) {
    noSleep.enable();
    wakeLockEnabled = true;
    toggleEl.value = "自動ロック解除中";
    toggleEl.classList.add("onlock");
    //document.body.style.backgroundColor = "#8b84ff";
  } else {
    noSleep.disable();
    wakeLockEnabled = false;
    toggleEl.value = "自動ロック解除オフ";
    toggleEl.classList.remove("onlock");
    //document.body.style.backgroundColor = "";
  }
}, false);

//lang
var toggleLang = document.getElementsByClassName("lang_btn");
var lang_change = document.getElementById("lang_change");
[].forEach.call(document.getElementsByClassName("lang_btn"),function(e){
  e.addEventListener('click',function() {
    lang_change.setAttribute("data", this.value);
  }, false);
});


var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");
var outputInfo = document.getElementById("outputInfo");
var lang_change = document.getElementById("lang_change");
var waPlayFlag = true;
var buffer_data = ["01.mp3", "02.mp3"];

var event = "click";
document.addEventListener(event, function() {
  wa.playSilent();
});

function drawLine(begin, end, color) {
  canvas.beginPath();
  canvas.moveTo(begin.x, begin.y);
  canvas.lineTo(end.x, end.y);
  canvas.lineWidth = 4;
  canvas.strokeStyle = color;
  canvas.stroke();
}

// Use facingMode: environment or user
//navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }}).then(function(stream) {
navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }}).then(function(stream) {
  video.srcObject = stream;
  video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
  video.play();
  requestAnimationFrame(tick);
});

function tick() {
  loadingMessage.innerText = "⌛ Loading video..."
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });
    if (code && waPlayFlag == true) {
      drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
      drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
      drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
      drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
      outputMessage.hidden = true;
      outputData.parentElement.hidden = false;
      outputData.innerText = code.data;

      // if(code.data == "https://yasuyukihanai.github.io/aframeTest/jsQR/cat_test.mp3") {
      //   waPlayFlag = false;
      //   wa.loadFile( 'sound/' + buffer_data[0], function(buffer) {
      //     wa.play(buffer);
      //   });
      //   setTimeout(function() {
      //     waPlayFlag = true;
      //   }, 3000);
      // }

      var checknum = code.data.split('?id=')[1];
      if(checknum) {
        if(lang_change.getAttribute('data') == 'eng'){
          waPlayFlag = false;
          wa.loadFile( 'sound_eng/' + checknum + '.mp3', function(buffer) {
            wa.play(buffer);
          });
          setTimeout(function() {
            waPlayFlag = true;
          }, 3000);
        } else {
          waPlayFlag = false;
          wa.loadFile( 'sound/' + checknum + '.mp3', function(buffer) {
            wa.play(buffer);
          });
          setTimeout(function() {
            waPlayFlag = true;
          }, 3000);
        }
      }



    }
    // else {
    //   outputMessage.hidden = false;
    //   outputData.parentElement.hidden = true;
    // }
  }
  requestAnimationFrame(tick);
}