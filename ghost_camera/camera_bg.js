// Initializing camera background.
// quated from AR.js
// https://raw.githubusercontent.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.js
window.addEventListener('load', function() {
  // check API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices || !navigator.mediaDevices.getUserMedia) {
    var fctName = '';

    if (!navigator.mediaDevices) {
      fctName = 'navigator.mediaDevices';
    } else if (!navigator.mediaDevices.enumerateDevices) {
      fctName = 'navigator.mediaDevices.enumerateDevices';
    } else if (! navigator.mediaDevices.getUserMedia) {
      fctName = 'navigator.mediaDevices.getUserMedia';
    } else {
      console.assert(false);
    }

    alert("こちらのブラウザではカメラにアクセスできません。 \n iOSをご利用の場合はSafari, Androidの場合はFirefox, Chrome, Microsoft Edgeそれぞれの最新ブラウザでお楽しみいただけます。");
    return;
  }

  var video = document.getElementById('camera-bg');

  var adjustToWindow = function (){
    var sourceWidth = video.videoWidth;
    var sourceHeight = video.videoHeight;

    var screenWidth = window.innerWidth
    var screenHeight = window.innerHeight

    // compute sourceAspect
    var sourceAspect = sourceWidth / sourceHeight
    // compute screenAspect
    var screenAspect = screenWidth / screenHeight

    // if screenAspect < sourceAspect, then change the width, else change the height
    if( screenAspect < sourceAspect ){
      // compute newWidth and set .width/.marginLeft
      var newWidth = sourceAspect * screenHeight
      video.style.width = newWidth+'px'
      video.style.marginLeft = -(newWidth-screenWidth)/2+'px'

      // init style.height/.marginTop to normal value
      video.style.height = screenHeight+'px'
      video.style.marginTop = '0px'
    }else{
      // compute newHeight and set .height/.marginTop
      var newHeight = 1 / (sourceAspect / screenWidth)
      video.style.height = newHeight+'px'
      video.style.marginTop = -(newHeight-screenHeight)/2+'px'

      // init style.width/.marginLeft to normal value
      video.style.width = screenWidth+'px'
      video.style.marginLeft = '0px'
    }
  }

  video.addEventListener('loadedmetadata', adjustToWindow);
  window.addEventListener('resize', adjustToWindow);

  // Start video
  navigator.mediaDevices.enumerateDevices().then(function(devices) {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'environment',
      }
    }).then(function(stream) {
      video.srcObject = stream;
      video.play();
    }).catch(function(error) {
      alert("カメラの起動を拒否されました。");
    });
  }).catch(function(error) {
    alert("カメラの起動を拒否されました。");
  });
});
