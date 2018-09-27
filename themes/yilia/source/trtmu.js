/**
 * 自定义相册模块方法
 */

var path = 'https://hexo-1252269037.cos.ap-chengdu.myqcloud.com/';
$(function () {
  //获取并生成图片
  arrayImg(checkJson());
  //初始化弹窗
  tipPhotos();
});

/**
 * 二维码弹窗显示
 */
function tipPhotos() {
  $("#trtmu").hover(function () {
    Dialog.init('<img src="https://hexo-1252269037.cos.ap-chengdu.myqcloud.com/hexo_blog/static_img/wx_add.jpg" width="100%">');
  }, function () {
  });
}


//获取所有图片路径
function checkJson() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", path, false);
  xmlHttp.send();
  var xmlDoc = xmlHttp.responseXML;
  var imgPath = [];
  var ccc = xmlDoc.documentElement.getElementsByTagName("Key");
  for (var i = 0; i < ccc.length; i++) {
    var d = ccc[i].innerHTML;
    //todo 相册分栏的话需要在此处进行根据url分类
    //如果是图片格式则添加至返回集合
    if (d.split('.')[1] === 'png' || d.split('.')[1] === 'jpg') {
      if (d.indexOf("blog_img") !== -1) {
        imgPath.push(path + d);
      }
    }
  }
  return imgPath;
}

//动态生成图片并添加样式
function arrayImg(imgPath) {
  var imgDiv = '';
  if (imgPath != null) {
    for (i in imgPath) {
      var imgSrc = imgPath[i];
      if (imgSrc !== '' && imgSrc != null) {
        imgDiv += '<div class="box"><div class="pic">';
        imgDiv += '<img src="' + imgSrc + '"/></div></div>';
      }
    }
    //动态添加瀑布流样式
    $("#main").append(imgDiv);
  } else {
    $("#main").append('<h2>没有照片哦~</h2>');
  }
  //$('#main').flexImages({rowHeight: 300});
  $("#main").show();
}
