  document.onreadystatechange = function () {
    if (document.readyState === "complete") {
      ready();
    }
  }

  function ready() {
    document.getElementById("capture").onclick = function() {
          var scene = document.querySelector('a-scene');
          var video = document.getElementsByTagName('video')[0];

          if (scene && video) {
            width = scene.offsetWidth;
            height = scene.offsetHeight;

            // スクリーンショット用のcanvasを作成
            var snapshot = document.createElement('canvas');
            snapshot.width = width;
            snapshot.height = height;
            var context = snapshot.getContext('2d');

            // カメラの映像をsnapshotに描画
            context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);

            // A-Frameの映像をsnapshotに描画
            // components.screenshotの大きさを現在のwidthとheightに指定
            scene.setAttribute('screenshot', 'width:' + width + '; height: ' + height + ';');
            var capture = scene.components.screenshot.getCanvas('perspective');
            context.drawImage(capture, 0, 0, width, height);

            // jpgに変換してダウンロードさせる
            // var a = document.createElement('a');
            // a.href = snapshot.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
            // a.download = 'aquarium.jpg';
            // a.click();
var imageType = "image/png";
var fileName = "camera.png";
var base64 = snapshot.toDataURL(imageType);
var blob = Base64toBlob(base64);
saveBlob(blob, fileName);
function Base64toBlob(base64){
    var tmp = base64.split(',');
    var data = atob(tmp[1]);
    var mime = tmp[0].split(':')[1].split(';')[0];
    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i);
    }
    var blob = new Blob([buf], { type: mime });
    return blob;
}
function saveBlob(blob, fileName){
    var url = (window.URL || window.webkitURL);
    var dataUrl = url.createObjectURL(blob);
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    var b = document.getElementById("capture_result");
    // a.href = dataUrl;
    // a.target = '_self';
    // a.download = fileName;
    // a.dispatchEvent(event);
    b.classList.add("is-captured");
    document.getElementById("capture_result_img").src = base64;

    //window.open('data:' + mimeType + ';base64,' + window.Base64.encode(content), '_blank');
}
          }
    };
  }

