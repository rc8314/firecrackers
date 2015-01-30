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
    $("#start_bt").click(function(){
      $("#mask_div,#pop_div").show();
    })

    //游戏start开始
    $("#real_play").click(function(){
      $("#mask_div,#pop_div,#start_div,#home_box").hide();
      //临时控制--测试用（显示失败后画面）
      $("#game_guide").hide();
      $("#mask_div,#pop_div,#all_fail").show();
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


//眨眼动画
function zyan(){
  $("#zyan").delay(200).fadeIn('fast').fadeOut('fast');

}


//再玩一次
function play_again(){
  $("#mask_div,#pop_div").hide();
  //
}