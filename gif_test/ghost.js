document.addEventListener( "readystatechange", function() {
    var canvas = document.getElementById('ghost');
    var srcs = [
            '002.gif'
            //,'img_02.png'
        ];

    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        //var scale = 0.3;
        var scale = 1;
        var x = new Array ();
        var y = new Array ();
        var img = new Array ();
        var dstWidth = new Array ();
        var dstHeight = new Array ();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        //ctx.globalAlpha = 0.3;

        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        for (var i in srcs) {
            img[i] = new Image();
            img[i].src = srcs[i];
            dstWidth[i] = img[i].width * scale;
            dstHeight[i] = img[i].height * scale;
          var imgWidth = img[i].width;
          var imgHeight = img[i].height;
          var imgAspect = imgWidth / imgHeight;
          var canvasAspect = canvasWidth / canvasHeight;
          if (canvasAspect >= imgAspect ) {
            var ratio = canvasWidth / imgWidth;
            img[i].sx = 0;
            img[i].sy = ( imgHeight * ratio - canvasHeight ) / ratio / 2;
            img[i].sw = imgWidth;
            img[i].sh = canvasHeight / ratio;
          } else {
            var ratio = canvasHeight / imgHeight;
            img[i].sx = ( imgWidth * ratio - canvasWidth ) / ratio / 2;
            img[i].sy = 0;
            img[i].sw = canvasWidth / ratio;
            img[i].sh = imgHeight;
          }
        }
        function draw() {
            ctx.clearRect (0 , 0 , canvas.width , canvas.height);
            for (var i in srcs) {
                ctx.drawImage(myGif.image, img[i].sx, img[i].sy, img[i].sw, img[i].sh, 0, 0, canvas.width, canvas.height);
            }
        }

        //ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, dstWidth, dstHeight);
        //setInterval(draw, 100);
        draw();
    }

    document.getElementById("capture").addEventListener("click", function() {
        var video = document.getElementById("camera-bg");
        function render(){
          requestAnimationFrame(render);
          ctx.clearRect(0,0,canvas.width , canvas.height);
          ctx.drawImage(video, 0, 0, canvas.width , canvas.height);
          draw();
        }
        render();
        //ctx.drawImage(video, 0, 0, 480, 270);
    }, true);

});
