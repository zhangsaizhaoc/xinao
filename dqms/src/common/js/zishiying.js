/**
 * Created by mac on 2018/1/31.
 */
(function(doc,win){
  var docEl = doc.documentElement,  //文档根标签
    resizeEvent =  'orientationchange' in window ? 'orientationchang' :'resize'; //viewport变化事件源
  var rescale = function(){//重置方法
    win.clientWidth = docEl.clientWidth;

    if (!win.clientWidth) return;
    docEl.style.fontSize = 40 * (win.clientWidth / 750) + 'px';
    // win.base = 20 * (win.clientWidth / 640);
    console.log("视窗宽度=="+win.clientWidth);
    // console.log("1rem=="+docEl.style.fontSize);
  }
  if (!doc.addEventListener) return;
  // console.log(doc.addEventListener);
  win.addEventListener(resizeEvent, rescale, false);
  doc.addEventListener('DOMContentLoaded', rescale, false);

})(document, window);
