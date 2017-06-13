
//懒加载
Echo.init({
  offset: 0,
  throttle: 0
})


//tab
function Tab(){};
Tab.prototype = {
	init: function(tabs,ctns,fcline){
		var that = this;
		for (var i = 0; i < tabs.length; i++) {
			tabs[i].ind = i;
			tabs[i].onmouseover= function(e){
				var e = window.event||e;
				e.preventDefault();
				e.stopPropagation();
				//todo:ie
				for (var j = 0; j < ctns.length; j++) {
					ctns[j].style.display = 'none';
				}
				var ctn = ctns[this.ind];
				ctn.style.display = 'block';
				if(fcline){
					that.focus(this,fcline);
				}
			}
		}
	},
	focus: function(tab,fcline){
		var prefix = ['MozTranform','msTransform','webkitTrandform','oTransform','transform'];
		prefix.forEach(function(value){
			fcline.style[value] = 'translateX(' + (tab.offsetLeft - 1) + 'px)';
		})
	}
};

//促销公告Tab
var nhType = document.getElementsByClassName('nh-type');
var ncList = document.getElementsByClassName('nc-list');
var tbtHover = document.getElementsByClassName('tab-type-hover')[0];
var newsTab = new Tab();
newsTab.init(nhType,ncList,tbtHover);

//排行榜Tab
var rhType = document.getElementsByClassName('rh-type');
var rclCon = document.getElementsByClassName('rcl-con');
var rhtHover = document.getElementsByClassName('rh-type-hover')[0];
var rankTab = new Tab();
rankTab.init(rhType,rclCon,rhtHover);


//轮播
function Banner(){
	this.speed = 5;
};
Banner.prototype = {
	init: function(obj){
		var that = this;
		this.container = obj.container;
		this.blLis = obj.blLis;
		this.prevBtn = obj.prevBtn;
		this.nextBtn = obj.nextBtn;
		this.bnInd = obj.bnInd; 
		this.timer = null;
		this.pulser = null;
		this.index = 0;
		this.animated = false;
		
		for (var i = 0; i < this.blLis.length; i++) {
      var span = document.createElement('span');
      span.className = 'banner-ind-btn';
      this.bnInd.appendChild(span);
    } 
    this.indBtn = this.bnInd.getElementsByClassName('banner-ind-btn');
    this.bnInd.style.marginLeft = -((this.indBtn.length - 1) * 12 + this.indBtn.length * 10) / 2 + 'px';
    this.blLis[0].style.zIndex = 1;
		this.blLis[0].style.opacity = 1;
		this.showButton(this.index);

    this.container.onmouseenter = function(){
    	that.stop();
    }
		this.container.onmouseleave = function(){
			that.play();
		}
		this.nextBtn.onclick = function(){
			that.nextBtnClick();
		}
		this.prevBtn.onclick = function(){
			that.prevBtnClick();
		}
		for (var i = 0; i < this.indBtn.length; i++) {
	    this.indBtn[i].ind = i;
	    this.indBtn[i].onmouseover = function() {
	        if (that.animated) {
	            return;
	        }
	        if (this.className == 'banner-ind-btn hover') {
	            return;
	        }
	        that.slide(that.index, this.ind);
	    }
		};
		this.play();
	},

	slide: function(now, next){
		var that = this;
		var speed = this.speed;
		var blLis = this.blLis;
    var go = function() {
      that.animated = true;
      var nowOp = (window.getComputedStyle(blLis[now], null).opacity) * 100;
     	blLis[now].style.opacity = (nowOp - speed) / 100;
      var nextOp = (window.getComputedStyle(blLis[next], null).opacity) * 100;
      blLis[next].style.opacity = (nextOp + speed) / 100;
      if (nowOp > 0) {
          that.timer = setTimeout(go, 10);
      } else {
        blLis[now].style.opacity = 0;
        blLis[now].style.zIndex = 0;
        blLis[next].style.opacity = 1;
        blLis[next].style.zIndex = 1;
        that.showButton(next);
        that.index = next;
       	that.animated = false;
      }
    }
    go();
	},
	prevBtnClick: function(){
    if (this.animated) {
        return;
    }
    if (this.index == 0) {
        this.slide(this.index, this.blLis.length - 1);
    } else {
        this.slide(this.index, this.index - 1);
    }	
	},
	nextBtnClick: function(){
    if (this.animated) {
        return;
    }
    if (this.index == this.blLis.length - 1) {
        this.slide(this.index, 0);
    } else {
        this.slide(this.index, this.index + 1);
    }
	},
	
	showButton: function(ind){
		var indBtn = this.indBtn;
    for (var i = 0; i < indBtn.length; i++) {
        indBtn[i].className = 'banner-ind-btn';
    }
    indBtn[ind].className += ' hover';
	},

	stop: function(){
		clearTimeout(this.pulser);
	},

	play: function(){
		var that = this;
		this.pulser = setInterval(function(){
			that.nextBtnClick();
		}, 3000);
	}
};

//主轮播

var conBanner = document.getElementsByClassName('con-banner')[0];
var bannerList = document.getElementsByClassName('banner-list')[0];
var mnLis = bannerList.getElementsByTagName('li');
var mnInd = document.getElementById('bn-ind');
var sliPre = document.getElementById('slide-pre');
var sliNext = document.getElementById('slide-next');
var mainBanner = new Banner();
mainBanner.init({
	container:conBanner,
	blLis:mnLis,
	prevBtn:sliPre,
	nextBtn:sliNext,
	bnInd:mnInd
});

//优品专辑轮播
var glCon = document.getElementsByClassName('gd-list-con')[0];
var gaLis = document.getElementsByClassName('ga-item');
var gbInd = document.getElementById('ga-bn-ind');
var gsPre = document.getElementById('ga-slide-pre');
var gsNext = document.getElementById('ga-slide-next');
var gdBanner = new Banner();
gdBanner.init({
	container:glCon,
	blLis:gaLis,
	prevBtn:gsPre,
	nextBtn:gsNext,
	bnInd:gbInd
});

//京东直播轮播图
var lvCon = document.getElementsByClassName('live-con')[0];
var lvLis = document.getElementsByClassName('live-item');
var lvInd = document.getElementById('live-bn-ind');
var lvPre = document.getElementById('live-slide-pre');
var lvNext = document.getElementById('live-slide-next');
var lvBanner = new Banner();
lvBanner.init({
	container:lvCon,
	blLis:lvLis,
	prevBtn:lvPre,
	nextBtn:lvNext,
	bnInd:lvInd
});

//左侧导航
var cateItems = document.getElementsByClassName('cate-items');
var popItem = document.getElementsByClassName('pop-item');
var snPop = document.getElementById('sn-pop');
var subNav = document.getElementById('subnav');
for (var i = 0; i < cateItems.length; i++) {
  cateItems[i].index = i;
  cateItems[i].onmouseover = function() {
      snPop.className = 'show';
      for (var j = 0; j < popItem.length; j++) {
          popItem[j].className = 'pop-item';
          cateItems[j].className = 'cate-items';
      }
      cateItems[this.index].className += ' selected';
      popItem[this.index].className += ' show';
  };
}
subNav.onmouseleave = function() {
  snPop.className = '';
  for (var i = 0; i < cateItems.length; i++) {
      cateItems[i].className = 'cate-items';
  }
}

//右侧模块菜单
var stCvt = document.getElementsByClassName('st-list-item-cvt');
var stLink = document.querySelectorAll('.st-list-item-cvt a');
var cvtText = document.querySelectorAll('.st-list-item-cvt .service-text');
var sCon = document.getElementsByClassName('service-content')[0];
var scClose = document.getElementsByClassName('sc-close')[0];
var scTab = document.getElementsByClassName('sc-tab');

for (var i = 0; i < stCvt.length; i++) {
  stCvt[i].ind = i;
  stCvt[i].onmouseenter = function() {
    for (var j = 0; j < cvtText.length; j++) {
      cvtText[j].className = 'service-text';
      scTab[j].style.display = 'none';
    }
    sCon.style.transform = 'translateY(' + (-sCon.offsetHeight) + 'px)';
    cvtText[this.ind].className = 'service-text selected';
    scTab[this.ind].style.display = 'block';
    for (var p = 0; p < stLink.length; p++) {
       stLink[p].style.transform = 'translateY(' + (-cvtText[this.ind].offsetTop + 1) + 'px)';
    }
  }
}
scClose.onclick = function() {
  sCon.style.transform = 'translateY(' + (sCon.offsetHeight) + 'px)';
  for (var j = 0; j < cvtText.length; j++) {
      cvtText[j].className = 'service-text';
  }
  for (var p = 0; p < stLink.length; p++) {
      stLink[p].style.transform = 'translateY(0px)';
  }
}

var czLink = document.getElementsByClassName('sc-tab-title-cz')[0].getElementsByTagName('a');
var stlCz = document.getElementsByClassName('stl-cz')[0];
var czItem = stlCz.getElementsByClassName('sc-tab-list-item');

var jpLink = document.getElementsByClassName('sc-tab-title-jp')[0].getElementsByTagName('a');
var stlJp = document.getElementsByClassName('stl-jp')[0];
var jpItem = stlJp.getElementsByClassName('sc-tab-list-item');

var jdLink = document.getElementsByClassName('sc-tab-title-jd')[0].getElementsByTagName('a');
var stlJd = document.getElementsByClassName('stl-jd')[0];
var jdItem = stlJd.getElementsByClassName('sc-tab-list-item');

var yxLink = document.getElementsByClassName('sc-tab-title-yx')[0].getElementsByTagName('a');
var stlYx = document.getElementsByClassName('stl-yx')[0];
var yxItem = stlYx.getElementsByClassName('sc-tab-list-item');


tabSlide(czLink, stlCz, czItem);
tabSlide(jpLink, stlJp, jpItem);
tabSlide(jdLink, stlJd, jdItem);
tabSlide(yxLink, stlYx, yxItem);

function tabSlide(tLink, stl, item) {
    for (var i = 0; i < tLink.length; i++) {
        tLink[i].ind = i;
        tLink[i].onmouseover = function() {
            for (var j = 0; j < tLink.length; j++) {
                tLink[j].className = '';
            }
            tLink[this.ind].className = 'st-hover';
            var itemInd = item[this.ind]; 
            var prefix = ['MozTranform','msTransform','webkitTrandform','oTransform','transform'];
            prefix.forEach(function(value){
            	stl.style[value] = 'translate(' + (-itemInd.offsetLeft + 10) + 'px)';
            })
           
        }
    }
}

//秒杀倒计时
var cHour = document.getElementsByClassName('clock-hour')[0].getElementsByClassName('clock-text')[0];
var cMin = document.getElementsByClassName('clock-min')[0].getElementsByClassName('clock-text')[0];
var cSec = document.getElementsByClassName('clock-sec')[0].getElementsByClassName('clock-text')[0];
var hour,minute,second;
var lfTimer,lf;
var leftTimer = function(year, month, day, hour, minute, second) {
   return (new Date(year, month - 1, day, hour, minute, second) - new Date());
}

function checkTime(time) {
  if (time < 10) {
      time = '0' + time;
  }
  return time;
}

lfTimer = setInterval(function() {
  lf = leftTimer(2019, 5, 23, 23, 55, 00);
  hour = checkTime(parseInt(lf / 1000 / 60 / 60 % 24));
  minute = checkTime(parseInt(lf / 1000 / 60 % 60));
  second = checkTime(parseInt(lf / 1000 % 60));
  cHour.innerHTML = hour;
  cMin.innerHTML = minute;
  cSec.innerHTML = second;
}, 1000);

//秒杀轮播
var pdtList = document.getElementsByClassName('pdt-list')[0];
var psPre = document.getElementsByClassName('ps-pre')[0];
var psNext = document.getElementsByClassName('ps-next')[0];
psNext.addEventListener('click', function() {
    pdtList.style.transform = 'translate(' + (-999) + 'px)';
}, false)
psPre.addEventListener('click', function() {
    pdtList.style.transform = 'translate(' + 0 + 'px)';
}, false)
