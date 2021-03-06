var 
    sWidth = $('#drawing').attr('svg_width'), sHeight = $('#drawing').attr('svg_height'),
    vWidth = 455, vHeight = 340,
    // svg body
    draw = SVG('drawing').size(sWidth, sHeight).viewbox(0, 0, vWidth, vHeight),
    // 炮竹group组
    group,
    // 引线燃烧效果图
    fire,
    // 炮体图像
    bz,
    // 引线
    path,
    // 白色安全区域及红色提示线
    rect, line;
    
var
    // 引线路径坐标
    pathArray = null,
    // 白色安全区域坐标
    areaArray = null,
    // 成功次数
    count = 0,
    // 引线当前燃烧点坐标
    point = null;

var mc;

var game = {
    // 初始化游戏
    init: function () {
        //console.log('init');

        createPath(0, 55 / 2, 94, 204 + 14);
        createArea(-300, 55, vWidth + 300, 204, count);

        // 显示基础图片
        group = draw.group().x(vWidth * 0.5 - 70);
        fire = group.image('assets/img/fire.gif', 60, 55).center(pathArray[2][3], pathArray[2][4]).opacity(0);
        bz = group.image('assets/img/bz.png', 110, 150).y(204);
        path = group.path(pathArray).fill('none');

        // 绘制白色安全区域及红线
        rect = draw.rect(areaArray[2] - areaArray[0], areaArray[3] - areaArray[1]).x(areaArray[0]).y(areaArray[1]).fill('rgba(255,255,255,.7)');
        line = draw.line(areaArray[0], areaArray[1] + (areaArray[3] - areaArray[1]) / 2, areaArray[2], areaArray[1] + (areaArray[3] - areaArray[1]) / 2).stroke({width: random(1,3), color: '#b30e0e'});

        // 设置引线属性，动画用
        path.stroke({width: 4, linecap: 'round', dasharray: path.length(), dashoffset: 0});

        // 绑定按钮事件
        mc = new Hammer.Manager($("#hoverpane")[0]);
        mc.add(new Hammer.Press());
        mc.on("press", game.start);
        mc.on("pressup", game.stop);

        //显示触屏区域
        $("#hoverpane").show();
    },
    // 开始游戏
    start: function () {
        //console.log('start');
        fire_music.play();
        // 显示燃烧动画
        fire.opacity(1);

        var speed = getSpeed(count);

        path.animate(speed)
            .stroke({
                dashoffset: path.length()
            })
            .during(function (pos, morph) {
                point = path.pointAt((1 - pos) * path.length());
                fire.center(point.x, point.y);

                if (point.y > areaArray[3]) {
                    path.stop();

                    game.fail();
                }
            });
    },
    // 结束游戏
    stop: function () {
        //console.log('stop');
        fire_music.pause();
        path.stop();

        if (point.y >= areaArray[1] && point.y <= areaArray[3]) {
            game.succ();
        } else {
            game.fail();
        }
    },
    // 挑战成功
    succ: function () {
        //console.log('succ: ' + (count + 1));
        fire_music.pause();
        $("#hoverpane").hide();

        count++;
        draw.clear();
        mc.destroy();

        // 开始成功动画
        suss_game();
    },
    // 挑战失败
    fail: function () {
        //console.log('fail');
        fire_music.pause();
        $("#hoverpane").hide();
        $(".kill_num").html(count);

        // 开始失败
        ck_state(count);
        count = 0;

        draw.clear();
        mc.destroy();

        
    }
};

function createPath (x1, y1, x2, y2) {
    /* 计算引线路径 */

    var xl = x1 + random(0, 30) / 100 * (x2 - x1);
    var xr = x2 - random(0, 30) / 100 * (x2 - x1);

    var ym = y1 + random(40, 60) / 100 * (y2 - y1);
    var yt = y1 + (ym - y1) / 2;
    var yb = ym + (y2 - ym) / 2;

    pathArray = [
        ['M', (x1 + x2) / 2, y2],
        ['Q', xl, yb, (x1 + x2) / 2, ym],
        ['Q', xr, yt, (x1 + x2) / 2, y1]
    ];
}

function createArea (x1, y1, x2, y2, count) {
    /* 计算白色安全区域 */

    var
        //白色区域减幅数值，为0时每过一关区域高度递减1,即下方45-count(count为当前关卡数),建议这里最大设置值5。
        white_step = 5,
        // 计算白色区域的高度
        step = 45 - count - white_step,
        // 红线的位置
        yt = random(y1, y2 - step);
    
    areaArray = [x1, yt, x2, yt + (step > 25 ? step : 25)];
}

function getSpeed (count) {
    /* 计算燃烧时间，调整时间的时候要先自己计算下第15关的燃烧时间是否合理 */

    var 
        // 初始化燃烧时间为3秒
        speed = 3000,
        // 前3关递减量
        step1 = 200,
        // 3至10关递减量
        step2 = 150,
        // 10至15递减量
        step3 = 100,
        // 15关之后递减量
        step4 = 50;

    if (count >= 0) {
        speed = speed - step1 * (count < 3 ? count : 2);
    }
    if (count >= 3) {
        speed = speed - step2 * ((count < 10 ? count : 9)  - 2);
    }
    if (count >= 10) {
        speed = speed - step3 * ((count < 15 ? count : 14) - 9);
    }
    if (count >= 15) {
        speed = speed - step4 * (count - 14);
    }

    return speed > 100 ? speed : 100;
}
