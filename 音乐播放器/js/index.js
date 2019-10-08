var myAudio=document.getElementById("myAudio");
var cTime=document.getElementsByClassName("currentTime")[0];
var aTime=document.getElementsByClassName("allTime")[0];
var oPlay=document.getElementById("change");
var oPause=document.getElementsByClassName("")
var oProActive=document.getElementsByClassName("proActive")[0];
var duration,BgWidth=232,timer;
var oRadioBox=document.getElementsByClassName("radio-box")[0];
var oProBox=document.getElementsByClassName("proBox")[0];
var oAnimation=document.getElementsByTagName("img")[0];
myAudio.oncanplay=function () {
    //ondurationchange事件指dangduration发生变化时就会触发,但是当用于本地source时
    //由于本地资源加载很快，可能加载完成，再加载js,导致duration 都已经出来了，所以不会触发该事件
    //所以建议网络source时使用
    duration=this.duration;//使用windo.onload时，费时，this会指向window，故改为myAudio.duration
    cTime.innerHTML=turn(this.currentTime);//由于我这里用的是currentTime，所以不会引发canplay的每次拖动进度而出现00:00的情况
    aTime.innerHTML=turn(duration);
}
//把获取到的秒数转化为想要的格式
function turn (time) {
    var sec=parseInt(time%60) < 10? "0"+parseInt(time%60) : parseInt(time%60);
    var min=parseInt(time/60) <10 ? "0"+parseInt(time/60) : parseInt(time/60);
    return min+":"+sec;
}
oPlay.onclick=function () {
    if(myAudio.paused) {
        musicPlay();
        oAnimation.style.animationPlayState="running";
    }
    else{
        musicPause();
        oAnimation.style.animationPlayState="paused";
    }
}
//音乐播放，暂停函数
function musicPlay() {
    myAudio.play();
    oPlay.className="iconfont icon-zanting";
    timer=setInterval(move,200);//设置1秒计时一次，会导致不精准，当时间越小，越准确
}
function musicPause() {
    myAudio.pause();
    oPlay.className="iconfont icon-bofang"
    clearInterval(timer);
}
//实时更新currentTime
function move() {
    // oProActive.style.width= oProActive.offsetWidth +10 +"px";
    cTime.innerHTML=turn(myAudio.currentTime);//放到这个地方，才会每秒刷新currentTime
    oProActive.style.width= myAudio.currentTime/duration*BgWidth + 8 +"px";
}
//音乐放完了，重新播放
myAudio.onended=function () {
    // musicPause();
    // oAnimation.style.animationPlayState="paused";
    // myAudio.currentTime=0;//是为了让move函数重新开始计算
    // cTime.innerHTML=turn(0);
    // oProActive.style.width=8+"px";
    // musicPlay();
    next.onclick();
    oAnimation.style.animationPlayState="running";
}


//拖动进度条
oRadioBox.onmousedown=function () {//按下之后再绑定鼠标移动事件
    clearInterval(timer);//避免在播放时拖动进度，出现currentTime继续计算
    var c=myAudio.currentTime;
    document.body.onmousemove=function (e) {
        var newWidth=e.clientX - oProBox.getBoundingClientRect().left;
        // console.log(newWidth);
        if(newWidth < 8) {
            newWidth=8;
        }
        else if(newWidth > 240) {
            newWidth=240;
        }
        oProActive.style.width=newWidth +"px";//让style后边一个，坑了我，半天找不到拖不动的问题在哪儿
        c=(newWidth-8)/BgWidth*duration;//拖拽小圆点滑动时，更新currentTime
        cTime.innerHTML=turn(c);
    }
   
        document.body.onmouseup=function () {
            document.body.onmousemove=null;//免的松开鼠标后，move事件挥之不去
            document.body.onmouseup=null;//防止冒泡
            // musicPlay();我的并没有在暂停时拖动进度后，自动播放时，出现闪现00:00的情况
            myAudio.currentTime=c;
            //这种拖放和播放之间的逻辑和网易云音乐一样：暂停时拖动进度条，则拖动完成后不会自动播放
            //播放时拖动进度条，拖动完成后会跟着新的currentTime播放。刚好是我想要的
        }
   
}
//音量调节
var Volume=document.getElementsByClassName("iconfont icon-yinliang")[0];
var volControl=document.getElementsByClassName("vol-control")[0];
var has=false;
var volUp=document.getElementsByClassName("vol-up")[0];
var volDown=document.getElementsByClassName("vol-down")[0];
var volume=0.5;
myAudio.volume=0.5;//保证音乐打开时，音量不会过大
Volume.onclick=function () {
    if( has != true ){
        volControl.style.display="block";
    }
    else {
        volControl.style.display="none"
    }
    has=!has;
}
//点击实现音量控制（上下拖拽的进度条实在是写的有BUG，目前解决不了，等等直播答疑看看）
volUp.onclick=function () {
    if(myAudio.volume < 1) {
        volume=parseInt( (myAudio.volume+0.1)*100 )/100;
        myAudio.volume =volume;
        console.log(myAudio.volume);
    }
    if(myAudio.volume >=1) {
        myAudio.volume =1;
    }
    
}
volDown.onclick=function () {
    if(myAudio.volume > 0) {
        volume=parseInt( (myAudio.volume-0.1)*100 )/100;
        myAudio.volume =volume;
        console.log(myAudio.volume);
    }
    if(myAudio.volume <= 0) {
        myAudio.volume=0;
    }
}
//这是有bug的上下进度条的一部分js代码
// volRadioBox.onmousedown=function () {//按下之后再绑定鼠标移动事件
//     // var c=myAudio.currentTime;
//     document.body.onmousemove=function (e) {
//         // var newTop=e.clientY - volBg.getBoundingClientRect().bottom;
//         var newTop=e.clientY - volBg.getBoundingClientRect().top;
//         // console.log(newTop);
//         if(newTop < 0) {
//             newTop=0;
//         }
//         else if(newTop > 112) {
//             newTop=112;
//         }
//         // volActive.style.top=newTop +"px";
//         volActive.style.height=120-newTop+"px";

//         volActive.style.height += 12;
//         console.log(volActive.style.height);
//     }
   
//         document.body.onmouseup=function () {
//             document.body.onmousemove=null;//免的松开鼠标后，move事件挥之不去
//             document.body.onmouseup=null;//防止冒泡           
//         }
   
// }

//上一首，下一首切换
var prev=document.getElementsByClassName("iconfont icon-shangyishou")[0];
var next=document.getElementsByClassName("iconfont icon-xiayishou")[0];
var num=1;
//下边的if语句是为了实现3首歌曲“伪循环”
prev.onclick=function () {
    if( num==1 ) {
        myAudio.src="../source/身骑白马.mp3";
        num=2;
    }
    else if( num==2 ) {
        myAudio.src="../source/卡路里.mp3";
        num=3;
    }
    else if ( num==3 ) {
        myAudio.src="../source/9277.mp3";
        num=1;
    }
    myAudio.load();
    musicPlay();
    oAnimation.style.animationPlayState="running";//唱片转起来
}
next.onclick=function () {
    if( num==1 ) {
        myAudio.src="../source/身骑白马.mp3";
        num=2;
    }
    else if ( num==2 ) {
        myAudio.src="../source/卡路里.mp3";
        num=3;
    }
    else if ( num==3 ) {
        myAudio.src="../source/9277.mp3";
        num=1;
    }
    myAudio.load();
    musicPlay();
    oAnimation.style.animationPlayState="running";
}
