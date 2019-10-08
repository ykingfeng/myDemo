var scene=document.getElementById("scene");
var hammer=document.getElementById("hammer");
scene.onmousedown=function() {
    hammer.src="hammer2.png";
}
scene.onmouseup=function() {
    hammer.src="hammer1.png";
}
scene.onmousemove=function(e) {
    //console.log(e);打印出鼠标移动的坐标，方便调试
    var x=e.clientX;
    var y=e.clientY;
    hammer.style.top=y+"px";
    hammer.style.left=x+"px"; //当鼠标移动时，锤子的位置才跟着发生变化，当然要写到mousemove里
}
scene.onclick=function(e) {
    var x=e.clientX;
    var y=e.clientY;
    //碰撞检测，检测双击时锤子是不是碰到了老鼠1的图片
    //检测鼠标的位置x，y是否在一个矩形的位置x1-x2，y1-y2之间
    var x1=mouseAry[mouseID].offsetLeft + hollowAry[mouseID].offsetLeft;
    var x2=hollowAry[mouseID].offsetLeft + hollowAry[mouseID].offsetWidth;
    
    var y1=mouseAry[mouseID].offsetTop + hollowAry[mouseID].offsetTop;
    var y2=hollowAry[mouseID].offsetTop + hollowAry[mouseID].offsetHeight;
    if(x1 < x && x < x2 && y1 < y && y < y2 ){
    mouseAry[mouseID].src="mouse2.png";
    /* console.log("击中了"); */
    }
}

/* var mouse1=document.getElementById("hollow1").getElementsByTagName("img")[0];
setInterval(mouseShow,100);
var mouse1Height=0;

function mouseShow() {
    mouse1Height +=5;
    if(mouse1Height <103) {
        mouse1.style.height =mouse1Height +"px";
    }
    if(mouse1Height >=103) {
        mouse1.style.height=103+"px";
    }
   
} */    //我的这种想法可行，但是hollow1是以左上角为基准，所以他的高度增加的方式不是我想要的自上而下
/* var hollow1=document.getElementById("hollow1");
var mouse1=hollow1.getElementsByTagName("img")[0];   这是作为第一个老鼠的动作的示范，接下来用数组来完成*/
var mouseID=0;
var hollowAry=[];
var mouseAry=[];
for(i=0;i < 9;i++) {
    hollowAry[i]=document.getElementById("hollow" + (i + 1 ));
    mouseAry[i]=hollowAry[i].getElementsByTagName("img")[0];
    console.log(hollowAry[i]);
    console.log(mouseAry[i]);
}
//2秒产生一个老鼠
var mouseLoop=null;
var loopTime=100;
var initialTop=102;
var endTop=0;
var nowTop=102;
var waitTime=0;
var waitMaxTime=1000;
setInterval(mouseChange,2000);
function mouseChange() { //每次只会产生一个老鼠
    if(mouseLoop==null) {
        mouseID=parseInt(Math.random()*9);
        nowTop=102;
        waitTime=0;
        mouseLoop=setInterval(mouseShow,loopTime);
        mouseAry[mouseID].src="mouse1.png";  //发现每次老鼠被敲打后，下一次该洞口的老鼠会标称mouse2，所以用这个来重置图片
    }
    
}

/* var loopTime=100; */
var mouseLoop=setInterval(mouseShow,loopTime);
/* var initialTop=102;
var endTop=0;
var nowTop=102;
 */
/* var waitTime=0;
var waitMaxTime=1000; */
function mouseShow() {
    
    if(nowTop > endTop){
        nowTop -=20;
    }
    if(nowTop < endTop){
        nowTop=endTop;
    }
    if(nowTop == endTop){
        if(waitTime < waitMaxTime) {
            waitTime += loopTime;
            /* console.log(waitTime); */
        }
        if(waitTime >= waitMaxTime) {
            nowTop=initialTop;
            clearInterval(mouseLoop);
            mouseLoop=null;
        }
        
        
    }
    mouseAry[mouseID].style.top=nowTop + "px";
}