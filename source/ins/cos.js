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
        imgPath.push(ccc[i].innerHTML);
    }
    checkIsImg(imgPath);
}
//检查是否为图片 参数为数组
function checkIsImg(data) {
    var imgPath = new Array();
    var body = '';
    $.each(data, function (i, d) {
        if (d.split('.')[1] == 'png' || d.split('.')[1] == 'jpg') {
            imgPath.push(path + d);
            body += '<img src="' + path + d + '"/>';
            
        }
    });
    $("#test").append(body);
}