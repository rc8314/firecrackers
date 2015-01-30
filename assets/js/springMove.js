(function(a) {
    a.fn.DB_springMove = function(b) {
        var c = {
            dirx: "",//为x时触发
            diry: "",//为y时触发
            mirror: 1, 
            radiusx: 10,//左右摇摆幅度
            radiusy: 10,//上下摇摆幅度
            radiusx_ago: 10, //旋转角度
            ago: 0, //为0时不旋转摇摆
            shensuo: 0, //为0时不伸缩,1伸缩
            motionSpeed: 0.05,
            intervalTimer: 30
        };
        a.extend(c, b);
        return this.each(function() {
            var f = a(this);
            var i = 0;
            var mheight = f.height();
            g();

            function g() {
                d();
                e()
            }

            function d() {
                f.css({
                    //position: "absolute"
                    display: "inline-block"
                })
            }

            function h() {
                radiusx = Math.sin(i) * c.radiusx;
                radiusy = Math.sin(i) * c.radiusy;
                radius_ago = Math.sin(i) * c.radius_ago;
                i += c.motionSpeed;
                if (c.shensuo != 0)
                {
                  f.css({
                      "height": mheight + mheight/c.shensuo * Math.sin(i)
                    })
                }
                if (c.ago != 0)
                {
                  f.css({
                      "transform":"rotate("+c.ago*radius_ago+"deg)",
                      "-ms-transform":"rotate("+c.ago*radius_ago+"deg)", /* Internet Explorer */
                      "-moz-transform":"rotate("+c.ago*radius_ago+"deg)", /* Firefox */
                      "-webkit-transform":"rotate("+c.ago*radius_ago+"deg)", /* Safari 和 Chrome */
                      "-o-transform":"rotate("+c.ago*radius_ago+"deg)" /* Opera */
                    })
                }
                if (c.dirx == "x") {
                    f.css({
                        "margin-left": radiusx * c.mirror
                    })
                }
                if (c.diry == "y") {
                    f.css({
                        "margin-top": radiusy * c.mirror
                    })
                }
            }

            function e() {
                timerId = setInterval(h, c.intervalTimer)
            }
        })
    }
})(jQuery);