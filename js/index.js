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

//轮播
var conBanner = document.getElementsByClassName('con-banner')[0];
var bannerList = document.getElementsByClassName('banner-list')[0];
var blLis = bannerList.getElementsByTagName('li');
var bnInd = document.getElementById('bn-ind');
var indBtn = document.getElementsByClassName('banner-ind-btn');
var sliPre = document.getElementById('slide-pre');
var sliNext = document.getElementById('slide-next');
var speed = 5;
var timer = null;
var pulse = null;
var index = 0;
var animated = false;

biCenter();

function biCenter() {
    for (var i = 0; i < blLis.length; i++) {
        var span = document.createElement('span');
        span.className = 'banner-ind-btn';
        bnInd.appendChild(span);
    }
    bnInd.style.marginLeft = -((indBtn.length - 1) * 12 + indBtn.length * 10) / 2 + 'px';
}
blLis[0].style.zIndex = 1;
blLis[0].style.opacity = 1;
showButton(index);

function stop() {
    clearTimeout(pulse);
}

function play() {
    pulse = setInterval(sliNext.onclick, 3000);
}

sliPre.onclick = function() {
    if (animated) {
        return;
    }
    if (index == 0) {
        slide(index, blLis.length - 1);
    } else {
        slide(index, index - 1);
    }
}

sliNext.onclick = function() {
    if (animated) {
        return;
    }
    if (index == blLis.length - 1) {
        slide(index, 0);
    } else {
        slide(index, index + 1);
    }
}

function slide(now, next) {
    var go = function() {
        animated = true;
        var nowOp = (window.getComputedStyle(blLis[now], null).opacity) * 100;
        blLis[now].style.opacity = (nowOp - speed) / 100;
        var nextOp = (window.getComputedStyle(blLis[next], null).opacity) * 100;
        blLis[next].style.opacity = (nextOp + speed) / 100;
        if (nowOp > 0) {
            timer = setTimeout(go, 10);
        } else {
            blLis[now].style.opacity = 0;
            blLis[now].style.zIndex = 0;
            blLis[next].style.opacity = 1;
            blLis[next].style.zIndex = 1;
            showButton(next);
            index = next;
            animated = false;
        }
    }
    go();
}


function showButton(ind) {
    for (var i = 0; i < indBtn.length; i++) {
        indBtn[i].className = 'banner-ind-btn';
    }
    indBtn[ind].className += ' hover';
}

for (var i = 0; i < indBtn.length; i++) {
    indBtn[i].ind = i;
    indBtn[i].onmouseover = function() {
        if (animated) {
            return;
        }
        if (this.className == 'banner-ind-btn hover') {
            return;
        }
        slide(index, this.ind);
    }
}

conBanner.onmouseenter = stop;
conBanner.onmouseleave = play;
play();


//tab
var nhType = document.getElementsByClassName('nh-type');
var ncList = document.getElementsByClassName('nc-list');
var tbtHover = document.getElementsByClassName('tab-type-hover')[0];
var stCvt = document.getElementsByClassName('st-list-item-cvt');
var stLink = document.querySelectorAll('.st-list-item-cvt a');
var cvtText = document.querySelectorAll('.st-list-item-cvt .service-text');
var sCon = document.getElementsByClassName('service-content')[0];
var scClose = document.getElementsByClassName('sc-close')[0];
var scTab = document.getElementsByClassName('sc-tab');
for (var i = 0; i < nhType.length; i++) {
    nhType[i].ind = i;
    nhType[i].onmouseover = function() {
        for (var j = 0; j < ncList.length; j++) {
            ncList[j].className = 'nc-list';
        }
        ncList[this.ind].className += ' show';
        tbtHover.style.transform = 'translateX(' + (nhType[this.ind].offsetLeft - 1) + 'px)';
    }
}
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


tab(czLink, stlCz, czItem);
tab(jpLink, stlJp, jpItem);
tab(jdLink, stlJd, jdItem);
tab(yxLink, stlYx, yxItem);

function tab(tLink, stl, item) {
    for (var i = 0; i < tLink.length; i++) {
        tLink[i].ind = i;
        tLink[i].onmouseover = function() {
            for (var j = 0; j < tLink.length; j++) {
                tLink[j].className = '';
            }
            tLink[this.ind].className = 'st-hover';
            stl.style.transform = 'translate(' + (-item[this.ind].offsetLeft + 10) + 'px)';
        }
    }
}

var pdtList = document.getElementsByClassName('pdt-list')[0];
var psPre = document.getElementsByClassName('ps-pre')[0];
var psNext = document.getElementsByClassName('ps-next')[0];
var cHour = document.getElementsByClassName('clock-hour')[0].getElementsByClassName('clock-text')[0];
var cMin = document.getElementsByClassName('clock-min')[0].getElementsByClassName('clock-text')[0];
var cSec = document.getElementsByClassName('clock-sec')[0].getElementsByClassName('clock-text')[0];
var hour,
    minute,
    second;
var lfTimer;
var lf;
psNext.addEventListener('click', function() {
    pdtList.style.transform = 'translate(' + (-999) + 'px)';
}, false)
psPre.addEventListener('click', function() {
    pdtList.style.transform = 'translate(' + 0 + 'px)';
}, false)


//秒杀倒计时
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

//排行榜tab
var rhType = document.getElementsByClassName('rh-type');
var rclCon = document.getElementsByClassName('rcl-con');
var rhtHover = document.getElementsByClassName('rh-type-hover')[0];

for (var i = 0; i < rhType.length; i++) {
    rhType[i].ind = i;
    rhType[i].onmouseover = function() {
        for (var j = 0; j < rclCon.length; j++) {
            rclCon[j].className = 'rcl-con';
        }
        rclCon[this.ind].className += ' show';
        rhtHover.style.transform = 'translateX(' + (rhType[this.ind].offsetLeft - 1) + 'px)';
    }
}

//优品专辑轮播图
var glCon = document.getElementsByClassName('gd-list-con')[0];
var gaLis = document.getElementsByClassName('ga-item');
var gbInd = document.getElementById('ga-banner-indicator');
var gbIndBtn = document.getElementsByClassName('gb-bn-ind-btn');
var gsPre = document.getElementById('ga-slide-pre');
var gsNext = document.getElementById('ga-slide-next');
var speed = 5;
var gaTimer = null;
var gaPulse = null;
var gaIndex = 0;
var gaAnimated = false;


gaShowButton(gaIndex);

function gaStop() {
    clearTimeout(gaPulse);
}

function gaPlay() {
    gaPulse = setInterval(gsNext.onclick, 3000);
}

gsPre.onclick = function() {
    if (gaAnimated) {
        return;
    }
    if (gaIndex == 0) {
        gaSlide(gaIndex, gaLis.length - 1);
    } else {
        gaSlide(gaIndex, gaIndex - 1);
    }
}

gsNext.onclick = function() {
    if (gaAnimated) {
        return;
    }
    if (gaIndex == gaLis.length - 1) {
        gaSlide(gaIndex, 0);
    } else {
        gaSlide(gaIndex, gaIndex + 1);
    }
}

function gaSlide(now, next) {
    var go = function() {
        gaAnimated = true;
        var nowOp = (window.getComputedStyle(gaLis[now], null).opacity) * 100;
        gaLis[now].style.opacity = (nowOp - speed) / 100;
        var nextOp = (window.getComputedStyle(gaLis[next], null).opacity) * 100;
        gaLis[next].style.opacity = (nextOp + speed) / 100;
        if (nowOp > 0) {
            gaTimer = setTimeout(go, 10);
        } else {
            gaLis[now].style.opacity = 0;
            gaLis[now].style.zIndex = 0;
            gaLis[next].style.opacity = 1;
            gaLis[next].style.zIndex = 1;
            gaShowButton(next);
            gaIndex = next;
            gaAnimated = false;
        }
    }
    go();
}


function gaShowButton(ind) {
    for (var i = 0; i < gbIndBtn.length; i++) {
        gbIndBtn[i].className = 'gb-bn-ind-btn';
    }
    console.log(ind);
    gbIndBtn[ind].className += ' hover';
}

for (var i = 0; i < gbIndBtn.length; i++) {
    gbIndBtn[i].ind = i;
    gbIndBtn[i].onmouseover = function() {
        if (gaAnimated) {
            return;
        }
        if (this.className == 'gb-bn-ind-btn hover') {
            return;
        }
        gaSlide(gaIndex, this.ind);
    }
}

glCon.onmouseenter = gaStop;
glCon.onmouseleave = gaPlay;
gaPlay();