---
title: JSP与Servlet
date: 2018年9月22日23:12:57
hasBQ: true
reward: true
comments: true
tags:
    - Servlet
    - 笔记
    - 基础
    - JSP
    - Java
---

# Servlet+JSP
<hr/>
### Servlet+Tomcat+JSP简介  

-  **Servlet是一种服务器端的JAVA应用程序，具有独立于平台和协议的特性，可以生成动态的web页面，Servlet由Servlet容器管理，也叫Servlet的运行环境，给发送的请求和响应之上提供网络服务，比如tomcat**

- Tomcat是轻量级Web应用服务器而且是Servlet规范和JSP规范的开源实现，之所以大范围的流行，是因为Tomcat技术先进、性能稳定，且免费，所以比较流行
- JSP(Java Server Pages)java服务器页面，JSP属于java的组件，使用的是java语言
JSP是一种动态网页技术标准，可以在传统网页HTML中插入Java程序段
JSP是网站的VIEW（同时还能提供java的执行和显示结果）。使用JSP开发的Web引用是跨平台的。

<font color=red>
**JSP与servlet同属于javaee的组件，所以一次编写，到处运行**</font>  

- JSP调用Java的格式  `<%Java代码%>`   
引用变量 `<%=name%>`   







<!--more-->






### **Servlet的实现方式**
- Servlet的工作原理
	- 根据请求从WEB容器中获取到对应的Servlet处理类
	- 第一次请求会实例化Servlet类,同时会调用`init(ServletConfig)`方法,在`init`方法中可以通过`ServletConfig`来获取初始化参数值.
> 拓展: 在HttpServlet的`init(ServletConfig)`方法中会调用它的`init()`方法
	- 如果非第一次调用,则直接调用`service(ServletRequest,ServletResponse)`方法,在方法中,通过request对象的`getMethod()`来获取请求的方法`(GET,POST,DELETE,HEAD,PUT...)`
	- 根据请求方法来执行对应的`doxxx()`来处理具体的业务功能,在`doxxx()`方法中可以通过request来获取请求数据,再调用某一个Model的业务处理方法,将处理的结果通过Reponse对象返回给请求端
	- 在Servlet结束时,会调用`destroy()`来回收具体业务处理过程中使用资源  
<font color=red>servlet的加载模式为单例模式（只有一个对象）</font>
- 继承 HttpServlet**接口**，重写其中的方法
	- `void init()`初始化方法
	- `void service()`//根据请求的不同，动态的有web容器（Tomcat）去执行相应的doGet（）或doPost（）方法
	- `void destory()`销毁servlet时调用
- 继承 GernericServlet**抽象类**，重写其中的方法
- 实现 Servlet接口  
>   HttpServlet在实现Servlet接口时，覆写了service方法，该方法体内的代码会自动判断用户的请求方式，如为GET请求，则调用HttpServlet的doGet方法，如为Post请求，则调用doPost方法。因此，开发人员在编写Servlet时，通常只需要覆写doGet或doPost方法，而不要去覆写service方法。　

**get和Post的区别**   
>Post请求通常用于表单的提交，安全性高，提交的参数类型和长度无限制，会修改网页的一些信息；get请求是幂等的（每次请求的结果相同） 且大小有限制，url的长度有限制1kb（1024字节）是不安全的请求参数直接出现在地址栏中，点击相应的链接，get请求的参数会被附加在url之后。

### **servlet的两种注册方式**
1. 注解方式（Eclispe生成Severlet时会自动生成与类名相同的注解）    

|注解方式的属性| 属性含义|
---|---
asyncSupported|是否支持异步操作模式
description|Servlet的描述
displayName|Servlet的显示名称
initParams|Servlet的init参数
name|Servlet的名称
urlPatterns|Servlet的访问URL
value|Servlet的访问URL

2. 配置web.xml方式

``` xml
<servlet>
	<servlet-name>name</servlet-name>
	<servlet-class>com.qf.XXXServlet</servlet-class>
	<load-on-startup>1</load-on-startup>
</servlet>
				
<servlet-mapping>
	<servlet-name>name</servlet-name>
	<url-pattarn>/hello</url-pattart>			
</servlet-mapping>
```


### **servlet生命周期**
Servlet生命周期分为三个阶段：
    
1. 初始化阶段 调用`init()`方法
	1. Servlet容器启动时自动装载某些Servlet，实现它只需要在web.XML文件中的<Servlet></Servlet>之间添加代码：`<load-on-startup>1</load-on-startup>`
	2. 在Servlet容器启动后，客户首次向Servlet发送请求
	3. Servlet类文件被更新后，重新装载Servlet
 		- Servlet被装载后，Servlet容器创建一个Servlet实例并且调用Servlet的init()方法进行初始化。在Servlet的整个生命周期内，init()方法只被调用一次。
2. 响应客户请求阶段　调用`service()`方法
	- 对于用户请求，servlet容器或创建对于这个请求的Request对象和Response对象，然后调用service方法，service方法会从request对象获得请求信息，处理请求，并通过response向客户返回响应信息
3. 终止阶段　调用`destroy()`方法		
	- 当WEB应用被终止，或Servlet容器终止运行，或Servlet容器重新装载Servlet新实例时，Servlet容器会先调用Servlet的destroy()方法，在destroy()方法中可以释放掉Servlet所占用的资源

### Servlet工作原理
> 首先用户在客户端页面发送一个请求，收到请求后，Servlet调用`service（）`方法响应用户请求；匹配请求后，自行调用doGet或doPost方法进行解析request，使用response返回响应信息   

- Tomcat和Servlet是如何工作的
	1.  Web客户端向Servlet容器(Tomcat)发出Http请求
	2.  Servlet容器接收Web客户端的请求
	3.  Servlet容器创建一个HttpRequest对象，将Web客户端请求的信息封装到这个对象中。
	4.  Servlet容器创建一个HttpResponse对象
	5.  Servlet容器调用HttpResponse对象的`service`方法，将HttpRequest对象与HttpResponse对象作为参数传给HttpServlet对象。
	6.  HttpServlet调用HttpRequest对象的有关方法，获取Http请求信息。
	7.  HttpServlet调用HttpResponse对象的有关方法，生成响应数据。
	8.  Servlet容器将HttpServlet的响应结果传给Web客户端。

<hr/>
#### request的常用方法
- 获取同一个请求中表单控件的值或问号传的值
	- `request.getParameter(String s)`  
- 获取同一个请求中表单控件的多个同名的值（复选框）
 	- `request.getParameterValues(String[] s)`   
- 实现页面的跳转（内部转发）
	- `RequestDispatcher对象.forward（request，response)`    
- 获取请求的方式
	- `request.getMethod()`    
- 在request范围内将value存储在key中
	- `requset.setAttribute(key,value)`    
- 在request范围中获取key所对应的value值 
	- `request.getAttribute(key)`    
- 获取RequestDispatcher对象，包含的参数为具体的url
	- `request.getRequestDispatcher("/要传输到的页面")`    
- 获取指定名称参数
	- `request.getParameter(String s) `    
- 获取多个值（复选框）返回值为数组
	- `request.getParameterValue(String s)`    
- 将信息保存到session中
	- `request.getSession.setAttribute(约定id,Bean的对象)`   
- 跳转页面
	- `request.getRequestDispatcher("链接").forward(request,response)`    
- 设置编码格式  
```java
request.setCharacterEncoding("utf-8")    
response.setContentType("text/html;charset=utf-8");  
```
#### jsp页面的取值

``` xml
<jsp:useBean id="约定ID" class="类名.Bean" scope="session"></jsp:useBean>
<jsp:getProperty property="约定ID的值" name="约定ID"/>
```
### 页面的跳转
#### JSP页面跳转Servlet
`javascript:window.location.href="CartSeverlet?id="+id;`可以传值
#### Jsp页面跳转Jsp
- 不带参数直接跳转  
`javascript:window.location.href="new.jsp";`按钮点击事件的Jsp跳转
`<%request.getRequestDispatcher("/tieshan.jsp").forward(request, response); %>`
- 服务器的内部转发  
`response.sendRedirect("niumowang.jsp");`请求重定向
2. 带参数的跳转  **[点这里](http://blog.csdn.net/Qiuzhongweiwei/article/details/76037324)**

#### Servlet跳转JSP的方式
- `request.getRequestDispatcher("/pro.jsp").forward(request, response);`（内部跳转）  
- `response.sendRedirect(request.getContextPath()+"/xxx.jsp");`(请求重定向)

#### Servlet跳转Servlet
- `request.getRequestDispatcher("Servlet").forward(request, response);`（内部跳转） 
- `response.sendRedirect("Servlet");`(请求重定向) 

#### 服务器内部转发与请求重定向的区别
1. **服务器内部转发是一次请求，一次响应
请求重定向是两次请求，两次响应**
2. 服务器内部转发只能在同一个服务器之间进行
请求重定向可以在多个服务器之间进行
3. 内部转发地址栏不会改变，用户无感知
请求重定向在地址栏就可以看到
4. [详细解析](http://blog.csdn.net/getstudymessages/article/details/6230325)

### Jsp的内置对象 
- jsp 九大内置对象和其作用详解 [参考博客](http://www.cnblogs.com/stanljj/p/4117980.html)
	1. `request`对象  
request 对象是 javax.servlet.httpServletRequest类型的对象。 该对象代表了客户端的请求信息，主要用于接受通过HTTP协议传送到服务器的数据。（包括头信息、系统信息、请求方式以及请求参数等）。request对象的作用域为一次请求。
	2. `response`对象  
response 代表的是对客户端的响应，主要是将JSP容器处理过的对象传回到客户端。response对象也具有作用域，它只在JSP页面内有效。
	3. `session`对象  
session 对象是由服务器自动创建的与用户请求相关的对象。服务器为每个用户都生成一个session对象，用于保存该用户的信息，跟踪用户的操作状态。session对象内部使用Map类来保存数据，因此保存数据的格式为 “Key/value”。 session对象的value可以是复杂的对象类型，而不仅仅局限于字符串类型。
	4. `application`对象  
 application 对象可将信息保存在服务器中，直到服务器关闭，否则application对象中保存的信息会在整个应用中都有效。与session对象相比，application对象生命周期更长，类似于系统的“全局变量”。
	5. `out` 对象  
out 对象用于在Web浏览器内输出信息，并且管理应用服务器上的输出缓冲区。在使用 out 对象输出数据时，可以对数据缓冲区进行操作，及时清除缓冲区中的残余数据，为其他的输出让出缓冲空间。待数据输出完毕后，要及时关闭输出流。
	6. `pageContext` 对象  
pageContext 对象的作用是取得任何范围的参数，通过它可以获取 JSP页面的out、request、reponse、session、application 等对象。pageContext对象的创建和初始化都是由容器来完成的，在JSP页面中可以直接使用 pageContext对象。
	7. `config` 对象  
config 对象的主要作用是取得服务器的配置信息。通过 pageConext对象的 getServletConfig() 方法可以获取一个config对象。当一个Servlet 初始化时，容器把某些信息通过 config对象传递给这个 Servlet。 开发者可以在web.xml 文件中为应用程序环境中的Servlet程序和JSP页面提供初始化参数。
	8. `page` 对象  
page 对象代表JSP本身，只有在JSP页面内才是合法的。 page隐含对象本质上包含当前 Servlet接口引用的变量，类似于Java编程中的 this 指针。
	9. `exception` 对象  
exception 对象的作用是显示异常信息，只有在包含 isErrorPage="true" 的页面中才可以被使用，在一般的JSP页面中使用该对象将无法编译JSP文件。excepation对象和Java的所有对象一样，都具有系统提供的继承结构。exception 对象几乎定义了所有异常情况。在Java程序中，可以使用try/catch关键字来处理异常情况； 如果在JSP页面中出现没有捕获到的异常，就会生成 exception 对象，并把 exception 对象传送到在page指令中设定的错误页面中，然后在错误页面中处理相应的 exception 对象。


### EL表达式与JSTL
具体使用参见[这里](http://blog.csdn.net/qwerasdf123/article/details/4189889)

### 文件的上传和下载
####文件的下载
- 通过超链接下载
	弊端是浏览器识别的文件类型会默认打开该文件而不是下载

JSP代码示例:
```html
<!--下载服务器端download目录下的ks5.txt文件，但是由于浏览器可以识别txt等常用文件格式，会默认打开，一般不推荐使用此种方法-->
<a href="download/ks5.txt">文本</a>
```

- 使用Servlet请求来下载

JSP代码示例
```html
<a href="DownloadServlet?filename=1.jpg">下载图片</a>
```
Servlet代码示例
```java
//获取请求文件名
String filename = request.getParameter("filename");
//设置文件MIME类型  MIME（多功能网际邮件扩充协议）
//此处出错会导致文件没有类型 作用相当于识别文件类型 设置此选项用于标识传输文件的文件类型
response.setContentType(getServletContext().getMimeType(filename));
response.setHeader("Content-Disposition", "attachment;filename="+ filename);
// 获取文件的绝对路径
String filePath = getServletContext().getRealPath("/dow/" + filename);
// 使用缓冲区读取文件为字节流
BufferedInputStream bis = new BufferedInputStream(new FileInputStream(filePath));
//此处注意流的内容
BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream());
//最后正常读写流
```

#### 使用Part实现文件的上传
Servlet代码示例
```java
//首先一步需为Servrlet添加注解
@MultipartConfig
该注解主要是为了辅助 Servlet 3.0 中 HttpServletRequest 提供的对上传文件的支持。
该注解标注在 Servlet 上面，以表示该 Servlet 希望处理的请求的 MIME 类型是 multipart/form-data
// 得到文件请求头部
Part part = request.getPart("file");
// 得到头部请求消息 格式为： 文件上传类型； name标识 filename=“文件名.文件类型”
String content = part.getHeader("Content-Disposition");
// 切割出完整的文件名（需去除“”）
String fileName = content.substring(content.lastIndexOf("=") + 2,content.length() - 1);
// 对文件名做随机处理(防止重名文件)
// 前半部分的内容为随机生成一串16位字符，后半部分的内容为获取从“.”开始之后的内容用于组成新的文件名
String RodFileName = UUID.randomUUID().toString().replace("-", "&")+ fileName.substring(fileName.lastIndexOf("."));
// 设置上传路径
String Path = request.getServletContext().getRealPath("/dow");
// 使用part写入文件
part.write(Path + "/" + RodFileName);
response.getWriter().write("<h1>文件上传成功<h1>");
```
Jsp代码示例
>enctype="multipart/form-data"的意思，是设置表单的MIME编码。默认情况，这个编码格式是application/x-www-form-urlencoded，不能用于文件上传；只有使用了multipart/form-data，才能完整的传递文件数据，enctype="multipart/form-data"是上传二进制数据


```html
<form action ="DownloadServlet" method="post" enctype="multipart/form-data">
		<!-- name="file"用于标识请求 -->
		请选择上传文件<input type="file" name="file"/>
		<input type="submit" value="上传"/>
</form>
```

### <font color=red>Cookie与Session</font>
- 具体可参考[这里](http://blog.csdn.net/fangaoxin/article/details/6952954/)
- 什么是会话
- 管理HTTP协议会话：Cookie和Session
  - Cookie：将用户相关数据保存在客户端，用户每次访问该站点会自动携带cookie数据（类似于服务器发给客户端的通行证）
  - Session：将用户数据保存在服务器端，为每一个客户端生成一个独立的Session数据对象，通过Session对象的唯一编号，区分对应的客户端数据


#### <font color=red>使用Cookie可以实现登陆时间的记录</font>
- 具体步骤：
	1. 通过服务器端向客户端写cookie
		Cookie cookie = new Cookie(name,value);
		response.addCookie(cookie);
	2. 当客户端存在cookie之后，以后每次请求自动携带 HTTP协议请求头信息		
```java
//获得客户端所有cookie		
Cookie[] cookies = request.getCookies();
if(cookies==null){}  判断cookie是否存在
遍历cookie获得需要信息
for (Cookie cookie : cookies) {
	if (cookie.getName().equals(name)) {
		//逻辑代码                 
	}
}
```

- Cookie和Session的生命周期 
	- Cookie生命周期
		- 创建：
		`Cookie cookie = new Cookie(name,value); response.add(cookie);`
		- 销毁：会话cookie会在浏览器关闭时销毁，持久cookie会在cookie过期(MaxAge)后销毁
	- Session生命周期
		- 创建：
		`request.getSession()`
		- 销毁的三种方式：
			1.服务器关闭时销毁  
			2.session过期时销毁 
			3.手动调用session.invalidate(会清空所有session)

- 设置Session的过期时间
	1. 在web.xml文件中设置Session的过期时间
	2. 调用Session对象的setMaxInactiveInterval(int interval) 单位是秒
```xml
<session-config>
	<session-timeout>30</session-timeout>
</session-config>
```
```java
HttpSession session = request.getSession();
//设置session过期时间1小时
session.setMaxInactiveInterval(60*60); 
```
 
### Ajax
1. 原理
 简单来说就是通过XMLHttpRequest对象来向服务器发送异步请求，从服务器获得数据，然后使用JavaScript来操作DOM对象来更新页面。
	- 核心对象
	XMLHttpRequest对象
	- 属性
		- `onreadystatechange` 每次状态改变所触发时间的时间处理程序
		- `responseText`从服务器进程返回数据的字符串形式
		- `responseXML`从服务器进程返回的DOM兼容的文档数据对象
		- `status`从服务器返回的数字代码。（404  500  200）
		- `sataus Text` 伴随状态码的字符串信息
		- `readyState` 对象状态值
			- 0（未初始化）对象已建立，但是尚未初始化，也就是还没有调用`open`方法
			- 1（初始化）对象已建立，尚未调用`send`方法
			- 2 （发送数据）`send`方法已调用，但是当前的状态及http头未知
			- 3 （数据传送中）已接收部分数据，因为响应及http头不全，这时通过responBody和responseText获取部分数据会出错
			- 4 （数据接收完毕）此时可以通过responseXML和responseText获取完整的回应数据

2. 使用ajax-servlet
```javascript
//1. 获取用户输入
var username=document.getElementById("username").value;
//2. 创建XMLHttpRequset对象
var xmlhttp;
if (window.XMLHttpRequest)
{
//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
xmlhttp=new XMLHttpRequest();
}else{
 // IE6, IE5 浏览器执行代码
xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
//3. 向服务器发送请求
xmlhttp.open("GET","链接",true);
xmlHttp.onreadystatechange=callback;
xmlhttp.send();
//4. 设置回调函数
在回调函数中判断`readyState`响应码是否正常（4为正常）以及`sataus`状态码是否正常（200为正常），正常后可解析响应并做逻辑处理
```



### JQuery
>jQuery是一个兼容多浏览器的javascript库（函数库），可以简化查询DOM对象、处理事件、制作动画、处理Ajax交互过程。

- JQuery的引用方式
	1. 引用本地JQuery库
	` <script type=“text/javascript” src=“jquery.js”></script>`
	2. 引入在线JQuery库
	`<script src="http://code.jquery.com/jquery-latest.js"></script>`

- JQuery的使用
`$(function(){});`相当于：`$(document.ready(function(){}));`

- JQuery的包装集
>在jQuery中将所有的对象，无论是一个还是一组，都封装成一个jQuery包装集，即集合。也就是说，$()的返回结果都是集合，不是单个对象。
例如：获取包含一个元素的jQuery包装集
`var jQueryObject = $("id");`
虽然，通过id获得的是一个元素对象，但是依然以集合的方式返回，只不过，集合中只有一个元素而已`

- JQuery的包装集与DOM对象的互换
	- JQuery包装集转DOM对象
	`var domObject = $(“#testDiv”)[0];`或者`var domObject = $(“#testDiv”).get(0);`
	- DOM对象转JQuery包装集
```javascript
var div = document.getElementById("testDiv");
var domToJQueryObject = $(div);
```

- JQuery获取内容和属性
	- 用于操作DOM的JQuery的方法
 		- 设置或返回所选元素的文本内容`text()`
 		- 设置或返回所选元素的内容（包括 HTML标签）`html()`
 		- 设置或返回表单字段的值`val()`
		- 设置或返回属性值`attr()`

- JQuery的选择器
	 点击[这里](http://www.cnblogs.com/onlys/articles/jQuery.html)
- JQuery的事件
	常用事件：

事件|描述|参数|备注
-|-|-|
click|点击事件|function|无
one|一次执行后销毁|'click',function(){ }|只会执行一次，然后销毁事件
hide|隐藏元素|speed,callback|可选的 speed 参数规定隐藏/显示的速度，可以取以下值："slow"、"fast" 或毫秒。可选的 callback 参数是隐藏或显示完成后所执行的函数名称。
show|显示元素|speed,callback|同上
toggle|切换|speed,callback|同上
fadeIn|淡入|speed,callback|用于淡入已隐藏的元素
fadeOut|淡出|speed,callback|用于淡出可见元素
fadeToggle|淡入或者淡出|speed,callback|在 fadeIn() 与 fadeOut() 方法之间进行切换。
fadeTo|透明度设置|speed,opacity,callback|opacity参数参数将淡入淡出效果设置为给定的不透明度（值介于 0 与 1 之间）
slideDown()|滑动|speed,callback|用于向下滑动元素
slideUp()|滑动|speed,callback|用于向上滑动元素
slideToggle()|滑动|speed,callback|在 slideDown() 与 slideUp() 方法之间进行切换



- JQuery动画
>默认地，所有 HTML 元素都有一个静态位置，且无法移动。
如需对位置进行操作，要首先把元素的`position` 属性设置为 `relative`、`fixed` 或 `absolute`！

使用 animate() 方法来操作所有 CSS 属性
<font color=red>需注意：当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right，等等。</font>
animate() 方法用于创建自定义动画。
