document.addEventListener( "readystatechange", function() {
    var canvas = document.getElementById('ghost');
    var srcs = [
            'img_01.png',
            'img_02.png',
            'img_03.png',
            'img_04.png',
            'img_05.png',
            'img_06.png'
        ];
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        var scale = 0.3;
        var x = new Array ();
        var y = new Array ();
        var img = new Array ();
        var dstWidth = new Array ();
        var dstHeight = new Array ();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.globalAlpha = 0.3;
        for (var i in srcs) {
            img[i] = new Image();
            img[i].src = srcs[i];
            dstWidth[i] = img[i].width * scale;
            dstHeight[i] = img[i].height * scale;
        }
        function draw() {
            ctx.clearRect (0 , 0 , canvas.width , canvas.height);
            for (var i in srcs) {
                x[i] = Math.random() * canvas.width;
                y[i] = Math.random() * canvas.height;
                ctx.drawImage (img[i] , x[i] , y[i], dstWidth[i], dstHeight[i]);
            }
        }

        //ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, dstWidth, dstHeight);
        //setInterval(draw, 100);
        draw();
    }

    document.getElementById("capture").addEventListener("click", function() {
        draw();
    }, true);

});
