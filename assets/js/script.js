$(function(){

  //页面加载完毕淡入
  $("#loadmask").fadeOut(2000);
		

  //mask resize
    $("#mask_div").css("height",document.body.clientHeight+'px');
    $("#mask_div").css("width",document.body.scrollWidth+'px');

    $(window).resize(function(){
      $("#mask_div").css("height",document.body.clientHeight+'px');
      $("#mask_div").css("width",document.body.scrollWidth+'px');
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
      game.init();
      boss_enter();
      hover_pane();

    })
 
    //pop close 点击
    $("#pop_close").click(function(){
      $("#mask_div,#pop_div").hide();
    })

    //再玩一次
    $(".play_again").click(function(){
      play_again();
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


})

var gwidth = $(window).width() / 100 * 84-4;
var gheight = $(window).height() / 100 * 90 / 100 * 34;
//设置svg画布高宽
$("#drawing").css('width',gwidth+'px').css('height',gheight+'px')
  .attr('svg_width', gwidth)
  .attr('svg_height', gheight);


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
  $("#boss_talk").addClass("boss_talk_"+boss_talk).delay(1200).animate({opacity:1},2000).delay(1500).animate({opacity:0},1200)
};



//随机成功区域
function hover_pane(){
  var hover_red = random(2,3);
  var hover_border = random(6,14);
  var hover_mgtop = random(4,12)+8;
  $("#hover_pane").show().css('height',hover_red+'px').css('border-top',hover_border+'px solid #fff').css('border-bottom',hover_border+'px solid #fff').css('margin-top',hover_mgtop + '%');
}


//成功后动画
function suss_game(){
  ////hide触屏区域
  $("#hoverpane").hide();

  var suss_boss = random(1,3);
  $("#game_boss").addClass("boss_over_"+suss_boss).delay(3000).animate({opacity:0},1200);
  $("#hover_pane").hide();
  $("#ctl_box,#bz_box").hide();
  rotate("#bzgif");
  $("#bigfire").delay(900).fadeIn().delay(2500).fadeOut();
  setTimeout(boss_animate,4300);

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
  drawAll();
  //hover_pane();
}


//旋转鞭炮
function rotate(rotate_name) {
	$(rotate_name).show().animate({rotate: '360',marginTop:'50%'}, 900).delay(400).fadeOut('fast');
}


//游戏引导动画
function guide_animate(){
	$(".hand_on").delay(500).fadeIn(10).delay(2000).fadeOut(10);
	$(".hand_off").delay(500).fadeOut(10).delay(2000).fadeIn(10);
	$("#guide_fire").delay(500).fadeIn(10).animate({marginTop:'20%'},2000).fadeOut(10).animate({marginTop:'14%'},10);
	$("#guide_fline").delay(500).animate({marginTop:'20%'},2020).animate({marginTop:'14%'},10);
}


//
function ck_state(cc){
  $("#hoverpane").hide();
  if (cc==0){
    $("#mask_div,#pop_div,#all_fail").show();
  }else{
    $("#mask_div,#pop_div,#def_fail").show();
  }
}