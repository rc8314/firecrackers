var draw = SVG('drawing').size($('#drawing').width(), 600),
    group = draw.group().x(draw.width() * 0.5 - 70);

var path,                       // 引线
    pathStart = {x: 90, y: 100},// 引线开始坐标
    pathArray = [];             // 引线路径

var speed = 3000,               // 燃烧速度
    area = {y1: 0, y2: 0},      // 红线区域
    point;                      // 燃烧点

// 炮体图像
var image = group.image('../assets/img/bz.png', 147, 213).x(30).y(283);
// 燃烧图像
var fire = group.image('../assets/img/fire.gif', 60, 55).center(pathStart.x, pathStart.y);

image.mousedown(function () {
    /* 开始游戏 */
    path.animate(speed)
        .stroke({
            dashoffset: path.length()
        })
        .during(function (pos, morph) {
            point = path.pointAt((1 - pos) * path.length());
            fire.center(point.x, point.y);
        });
});
image.mouseup(function () {
    /* 结束游戏 */
    path.pause();

    if (point.y) {
        game.succ();
    } else {
        game.fail();
    }
});

var game = {
    // 初始化游戏
    init: function () {
        // 引线路径
        pathArray = [
            ['M', 100, 300],
            ['Q', 70, 250, 100, 200],
            ['Q', 130, 150, 90, 100]
        ];

        // 生成引线
        path = group.path(pathArray);

        // 添加动画
        path.fill('none')
            .stroke({
                width: 6,
                linecap: 'round',
                dasharray: path.length(),
                dashoffset: 0
            });
    },
    // 挑战成功
    succ: function () {},
    // 挑战失败
    fail: function () {}
};
