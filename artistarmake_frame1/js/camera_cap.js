  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      ready();
    }
  }

  function ready() {
    document.getElementById("capture").onclick = function() {
          var scene = document.getElementById('screen');
          var video = document.getElementsByTagName('video')[0];
          var loopFrame = 180;
            var capturer = new CCapture({
              format: 'gif',
              //display: true,
              quality: .15,
              framerate: 1,
              verbose: true,
              name: 01,
              workersPath: '/aframeTest/artistarmake_frame1/js/',
              timeLimit: 2
            });


          if (scene && video) {
            width = video.videoWidth;
            height = video.videoHeight;

            // スクリーンショット用のcanvasを作成
            var snapshot = document.createElement('canvas');
            snapshot.width = width;
            snapshot.height = height;
            var context = snapshot.getContext('2d');

            var snapshotB = document.createElement('canvas');
            snapshotB.width = width;
            snapshotB.height = height;
            var contextB = snapshotB.getContext('2d');

            // カメラの映像をsnapshotに描画
            context.drawImage(video, 0, 0, width, height);
            contextB.drawImage(snapshot, 0, 0, width, height);

            // A-Frameの映像をsnapshotに描画
            // components.screenshotの大きさを現在のwidthとheightに指定
            scene.setAttribute('screenshot', 'width:' + width + '; height: ' + height + ';');
            //var capture = scene.components.screenshot.getCanvas('perspective');
            //context.drawImage(capture, 0, 0, width, height);
            document.getElementById("capture_flash").classList.add("is-capStart");


function render(){
  requestAnimationFrame(render);
  context.clearRect(0,0,width,height);
  context.drawImage(snapshotB, 0, 0, width, height);
  //context.drawImage(scene, 0, 0, width, height);
  if (video.offsetWidth > video.offsetHeight) {
      context.drawImage(scene, 0, 0, width, height);
      //resizedContext.drawImage(aScene, 0, 0, width, height);
  } else {
      var scale = height / width;
      var scaledWidth = height * scale;
      var marginLeft = (width - scaledWidth) / 2;
      context.drawImage(scene, marginLeft+(scaledWidth*.22), 0, (scaledWidth*.57), height);
  }
  capturer.capture( snapshot );
}
render();
capturer.start();
setTimeout(function() {
  document.getElementById("capture_convert").classList.add("is-convert");
  capturer.stop();
  capturer.save(
    function(blob){
      var reader = new FileReader();
      console.log(blob)
      reader.readAsDataURL(blob);
      reader.addEventListener("load", function () {
        gifler('/aframeTest/artistarmake_frame1/img/gif.gif').frames('canvas.screen', onDrawFrame);
        document.getElementById("capture_convert").classList.remove("is-convert");
        document.getElementById("capture_result_img").src = reader.result;
        document.getElementById("capture_result").classList.add("is-captured");
      }, false);

    }
  );
}, 1600);

            // jpgに変換してダウンロードさせる
            // var a = document.createElement('a');
            // a.href = snapshot.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
            // a.download = 'aquarium.jpg';
            // a.click();
// var imageType = "image/png";
// var fileName = "camera.png";
// var base64 = snapshot.toDataURL(imageType);
// var blob = Base64toBlob(base64);

// saveBlob(blob, fileName);

// function Base64toBlob(base64){
//     var tmp = base64.split(',');
//     var data = atob(tmp[1]);
//     var mime = tmp[0].split(':')[1].split(';')[0];
//     var buf = new Uint8Array(data.length);
//     for (var i = 0; i < data.length; i++) {
//         buf[i] = data.charCodeAt(i);
//     }
//     var blob = new Blob([buf], { type: mime });
//     return blob;
// }

// function saveBlob(blob, fileName){
//     var url = (window.URL || window.webkitURL);
//     var dataUrl = url.createObjectURL(blob);
//     var event = document.createEvent("MouseEvents");
//     event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//     var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
//     var b = document.getElementById("capture_result");
//     // a.href = dataUrl;
//     // a.target = '_self';
//     // a.download = fileName;
//     // a.dispatchEvent(event);
//     b.classList.add("is-captured");
//     document.getElementById("capture_result_img").src = base64;

//     //window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
// }
          }

      var resultClose = function(){
        document.getElementById("capture_result").classList.remove("is-captured");
        document.getElementById("capture_flash").classList.remove("is-capStart");
      }
      document.getElementById("result_close").onclick = function() {
        resultClose();
      };
      // document.getElementById("capture_result").onclick = function() {
      //   resultClose();
      // }

    };
  }

