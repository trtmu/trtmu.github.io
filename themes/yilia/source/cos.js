var path = 'https://hexo-1252269037.cos.ap-chengdu.myqcloud.com/';
//获取xmldom对象
function getXmlDocumentByFilePath() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", path, false);
    xmlhttp.send();
    var xmlDoc = xmlhttp.responseXML;
    return xmlDoc;
}
//获取所有图片路径
function checkJson(data) {
    var imgPath = new Array();
    var ccc = data.documentElement.getElementsByTagName("Key");
    for (var i = 0; i < ccc.length; i++) {
        var d = ccc[i].innerHTML;
        //如果是图片格式则添加至返回集合
        if (d.split('.')[1] == 'png' || d.split('.')[1] == 'jpg') {
           	if(d.indexOf("blog_img")!=-1){
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
            var imgsrc = imgPath[i];
            if (imgsrc != '' && imgsrc != null) {
               imgDiv += '<div class="box"><div class="pic">';
               imgDiv += '<img src="' + imgsrc + '"/></div></div>';
            }
        }
        // $("#imgItems").append(imgDiv);
        var link = document.createElement("link");
         link.rel = "stylesheet";
            link.type = "text/css";
            link.href = '../images.css';
            var script = document.createElement('script');
            script.src='../images.js';
            script.type = 'text/javascript';
            document.getElementsByTagName("head")[0].appendChild(script);
            document.getElementsByTagName("head")[0].appendChild(link);
          $("#main").append(imgDiv);
    } else {
        $("#imgItems").append('<h2>没有照片哦~</h2>');
    }
    $("#imgItems").show();
    //$('#imgItems').flexImages({rowHeight: 300});
}
