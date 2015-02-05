var share_num = 0;
var wxData = {
        "appId": 'wx633fd5d838f8e92d', 
        "imgUrl" : '/assets/img/sharemin.png',
        "link" : location.href,
        "desc" : "炮竹爆好运！" + share_num + "只年兽被我赶跑，你也来试试手运吧？",
        "title" : '炮竹驱年兽，新年爆好运'
};


$(function(){

  //页面加载完毕淡入
  $("#loadmask").fadeOut(2000);
  $("#loop_mp3")[0].play();
		

  //mask resize
    $("#mask_div,#sharemask").css("height",document.body.clientHeight+'px');
    $("#mask_div,#sharemask").css("width",document.body.scrollWidth+'px');

    $(window).resize(function(){
      $("#mask_div,#sharemask").css("height",document.body.clientHeight+'px');
      $("#mask_div,#sharemask").css("width",document.body.scrollWidth+'px');
    });


    //home开始start,出现游戏引导
    var gudietime;
    $("#start_bt").click(function(){
      $("#mask_div,#pop_div").show();
      guide_animate();
      gudietime = setInterval(guide_animate, 3000);

    })

    //游戏start开始
    $("#real_play").click(function(){
      clearTimeout(gudietime);
      $("#mask_div,#pop_div,#start_div,#home_box,#game_guide").fadeOut();
      $("#game_pane").fadeIn();
      $("#hoverpane").show();
      if (game.status=='off')
      {
        game.init();
      }else{
        count = 0;
        $("#scorebar div").html(1);
        drawAll();
      }
      boss_enter();

    })
 
    //pop close 点击
    $("#pop_close").click(function(){
      $("#mask_div,#pop_div,#hoverpane,#game_pane,#all_fail,#def_fail").hide();
      $("#start_div,#home_box,#game_guide").fadeIn();
    })

    //再玩一次
    $(".play_again").click(function(){
      play_again();
    })
  
    //点击分享
    $(".share_bt").click(function(){
      $("#sharemt,#sharemask").show();
    })
    $("#sharemt").click(function(){
      $("#sharemt,#sharemask").hide();
    })
  
  //眨眼动画开启
  var zyanId = setInterval(zyan,740);

	$('#left_dl').DB_springMove({
		dirx:'x', 
		diry:'',               
		mirror:-1,
		radiusx:10,
		radiusy:1,
		radius_ago:4,
		ago: 1,
		motionSpeed:0.07
	})
	
	$('#right_dl').DB_springMove({
		dirx:'x', 
		diry:'',               
		mirror:1,
		radiusx:10,
		radiusy:3,
		radius_ago:4,
		ago: -1.2,
		motionSpeed:0.07
	})
	
	$('#home_gj').DB_springMove({
		dirx:'', 
		diry:'y',               
		mirror:1,              
		radiusx:0,
		radiusy:3,
		shensuo:240,
		motionSpeed:0.07       
	})


  wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        callWxApi(res);

    });

    (function callWxApi(err){
        $.ajax({
            url: './sign/index.php',
            type: "POST",
            dataType: "json",
            success: function(_a) {
                wx.config({
                    debug: false,
                    appId: _a.appId,
                    timestamp: _a.timestamp,
                    nonceStr: _a.nonceStr,
                    signature: _a.signature,
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline']
                });

                wx.ready(function() {
                    wx.onMenuShareTimeline({
                        title: "炮竹爆好运！" + share_num + "只年兽被我赶跑，你也来试试手运吧？",
                        link: location.href,
                        imgUrl: '/assets/img/sharemin.png',
                        trigger: function() {},
                        success: function() {},
                        cancel: function() {},
                        fail: function() {}
                    });
                })
            }
        });
    })();


    //link好礼
    $(".gift_bt").click(function(){
      location.href="http://mp.weixin.qq.com/s?__biz=MzA5NDU0MjMwNg==&mid=204733832&idx=1&sn=f3b9e94a1674ebcb3f33c61305150f6f#rd";
    })
    


})

var gwidth = $(window).width() / 100 * 84-4;
var gheight = $(window).height() / 100 * 90 / 100 * 34;

var svgheight = $(window).height() / 100 * 48 / 100 * 70;
var svgwidth = $(window).width() / 100 * 83;

//设置svg引导画布高宽
$("#guide_mm svg").attr('width', svgwidth).attr('height', svgheight);
//设置svg画布高宽
$("#drawing").css('width',gwidth+'px').css('height',gheight+'px').attr('svg_width', gwidth).attr('svg_height', gheight);


//眨眼动画
function zyan(){
  $("#zyan").delay(200).fadeIn('fast').fadeOut('fast');

}


//再玩一次
function play_again(){
  count = 0;
  $("#mask_div,#pop_div,#all_fail,#def_fail").hide();
  $("#scorebar div").html(1);
  boss_animate();
}


//获取范围内的随机数
 function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

//随机boss及文字
function boss_enter(){
  var boss_id = random(1,3);
  var boss_talk = random(1,3);
  $("#game_boss").addClass("boss_"+boss_id).animate({height:"22%",marginTop:"41.5%",opacity:1},1400);
  $("#boss_talk").addClass("boss_talk_"+boss_talk).delay(1200).animate({opacity:1},2000).delay(1200).animate({opacity:0},800)
};


//成功后动画
function suss_game(){
  
  //hide触屏区域
  $("#hoverpane").hide();
  $("#hover_pane").hide();
  $("#ctl_box,#bz_box").hide();
  rotate("#bzgif");
  setTimeout(boss_cry,700);
  $("#bigfire").delay(610).fadeIn().delay(1500).fadeOut('fast');
  setTimeout(boss_animate,3000);
  

}

//boss哭
function boss_cry(){
  var suss_boss = random(1,3);
  $("#game_boss").addClass("boss_over_"+suss_boss).delay(1300).animate({opacity:0},700);
}

//再生产boss入场动画，适用于失败再玩一次和成功后继续时
function boss_animate(){
  $("#game_boss,#boss_talk").remove();
  $("#ctl_box,#bz_box").fadeIn();
  $("#bzgif").css('margin-top','106%');
  $("#game_sky").before("<div id='game_boss'></div>");
  $("#game_sky").after("<div id='boss_talk'></div>");
  boss_enter();
  if (count == 0)
  {
    $("#scorebar div").html(1);
  }else{
    $("#scorebar div").html( parseInt($("#scorebar div").html())+1);
  }
  setTimeout(drawAll,1400);
}


//旋转鞭炮
function rotate(rotate_name) {
	$(rotate_name).show().animate({rotate: '360',marginTop:'50%'}, 600).delay(300).fadeOut('fast');
}


//游戏引导动画
function guide_animate(){
	$(".hand_on").delay(500).fadeIn(10).delay(2000).fadeOut(10);
	$(".hand_off").delay(500).fadeOut(10).delay(2000).fadeIn(10);
	$("#guide_fire").delay(500).fadeIn(10).animate({marginTop:'20%'},2000).fadeOut(10).animate({marginTop:'14%'},10);
	$("#guide_fline").delay(500).animate({marginTop:'20%'},2020).animate({marginTop:'14%'},10);
}


//判断失败状态
function ck_state(cc){
  $("#hoverpane").hide();
  if (cc==0){
    share_num = 0;
    $("#mask_div,#pop_div,#all_fail").show();
  }else{
    share_num = cc;
    $("#mask_div,#pop_div,#def_fail").show();
  }
}