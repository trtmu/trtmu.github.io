---
title: jsp与Servlet
date: 2018年9月20日17:30:11
tags:
    - Java
---
## jsp 与servlet

- DispatcherServlet主要用作职责调度工作，本身主要用于控制流程，主要职责如下：
  - 1、文件上传解析，如果请求类型是multipart将通过MultipartResolver进行文件上传解析；
  - 2、通过HandlerMapping，将请求映射到处理器（返回一个HandlerExecutionChain，它包括一个处理器、多个HandlerInterceptor拦截器）；
  - 3、通过HandlerAdapter支持多种类型的处理器(HandlerExecutionChain中的处理器)；
  - 4、通过ViewResolver解析逻辑视图名到物理视图实现；
  - 5、本地资源处理；
  - 6、渲染具体的视图等；
  - 7、如果执行过程中遇到异常将交给HandlerExceptionResolver来解析。

从以上我们可以看出DispatcherServlet主要负责流程的控制（而且在流程中的每个关键点都是很容易扩展的）。

3.2、DispatcherServlet在web.xml中的配置
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
        </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
 
 
 load-on-startup：表示启动容器时初始化该Servlet；
 url-pattern：表示哪些请求交给Spring Web MVC处理
 
 
 精确匹配<url-pattern>/index.html</url-pattern>
 路径匹配<url-pattern>/*</url-pattern>
 扩展名匹配<url-pattern>*.jsp</url-pattern>
 缺省匹配<url-pattern>/</url-pattern>


3.4、DispatcherServlet初始化顺序


==Servlet的生命周期是由servlet的容器来控制的。分为3个阶段：初始化阶段、运行阶段、销毁阶段。
    一、初始化阶段：Servlet容器创建servlet对象,调用servlet对象的init方法。
    二、运行阶段
        在这个阶段sevlet可以随时响应客户端的请求。当servlet容器接到访问特定的servlet请求时，servlet容器会创建针对与这个请求的servletRequest和servletResponse对象，然后调用service()方法，并把这两个对象当做参数传递给service()方法。Service()方法通过servletRequest对象获得请求信息，并处理该请求，再通过servletResponse对象生成响应结果。
        【不管是post还是get方法提交，都会在service中处理，然后，由service来交由相应的doPost或doGet方法处理，如果你重写了service方法，就不会再处理doPost或doGet了，如果重写sevice()方法，可以自己转向doPost()或doGet（）方法】
        注：当servlet容器把servlet生成的响应结果发送给客户后，servlet容器会销毁servletRequest和sevletResponse对象。
    三、销毁阶段
        当Web应用被终止时，servlet容器会先调用web应用中所有的servlet对象的destroy（）方法，然后在销毁servlet对象。此外容器还会销毁与servlet对象关联的servletConfig对象。
        在destroy（）方法的实现中，可以释放servlet所占用的资源。如关闭文件输入输出流，关闭与数据库的连接。==


  1、HttpServletBean继承HttpServlet，因此在Web容器启动时将调用它的init方法，该初始化方法的主要作用
    将Servlet初始化参数（init-param）设置到该组件上（如contextAttribute、contextClass、namespace、contextConfigLocation），通过BeanWrapper简化设值过程，方便后续使用
    提供给子类初始化扩展点，initServletBean()，该方法由FrameworkServlet覆盖。


```
public abstract class HttpServletBean extends HttpServlet implements EnvironmentAware{
@Override
    public final void init() throws ServletException {
       //省略部分代码
       try {
           //使用servletConfig对象找出配置参数设置到内部
           PropertyValues pvs = new ServletConfigPropertyValues(getServletConfig(), this.requiredProperties);
           //使用BeanWrapper构造DispatcherServlet
           BeanWrapper bw = PropertyAccessorFactory.forBeanPropertyAccess(this);
           ResourceLoader resourceLoader = new ServletContextResourceLoader(getServletContext());
           bw.registerCustomEditor(Resource.class, new ResourceEditor(resourceLoader, this.environment));
           initBeanWrapper(bw);
           bw.setPropertyValues(pvs, true);
       }
       catch (BeansException ex) {
           //…………省略其他代码
       }
       //2、提供给子类初始化的扩展点，该方法由FrameworkServlet覆盖
       initServletBean();
       if (logger.isDebugEnabled()) {
           logger.debug("Servlet '" + getServletName() + "' configured successfully");
       }
    }
    //…………省略其他代码
}
```


==BeanWrapper是对Bean的包装，其接口中所定义的功能很简单包括设置获取被包装的对象，获取被包装bean的属性描述器，由于BeanWrapper接口是PropertyAccessor的子接口，因此其也可以设置以及访问被包装对象的属性值。BeanWrapperImpl类提供了许多默认属性编辑器，支持多种不同类型的类型转换，可以将数组、集合类型的属性转换成指定特殊类型的数组或集合。用户也可以注册自定义的属性编辑器在BeanWrapperImpl中。==

 
2、FrameworkServlet继承HttpServletBean，通过initServletBean()进行Web上下文初始化，该方法主要覆盖一下两件事情：
    初始化web上下文；
    提供给子类初始化扩展点；

```
public abstract class FrameworkServlet extends HttpServletBean {
@Override
    protected final void initServletBean() throws ServletException {
        //省略部分代码
       try {
             //1、初始化Web上下文
           this.webApplicationContext = initWebApplicationContext();
             //2、提供给子类初始化的扩展点
           initFrameworkServlet();
       }
        //省略部分代码
    }
}
 
protected WebApplicationContext initWebApplicationContext() {
        //ROOT上下文（ContextLoaderListener加载的）
       WebApplicationContext rootContext =
              WebApplicationContextUtils.getWebApplicationContext(getServletContext());
       WebApplicationContext wac = null;
       if (this.webApplicationContext != null) {
           // 1、在创建该Servlet注入的上下文
           wac = this.webApplicationContext;
           if (wac instanceof ConfigurableWebApplicationContext) {
              ConfigurableWebApplicationContext cwac = (ConfigurableWebApplicationContext) wac;
              if (!cwac.isActive()) {
                  if (cwac.getParent() == null) {
                      cwac.setParent(rootContext);
                  }
                  configureAndRefreshWebApplicationContext(cwac);
              }
           }
       }
       if (wac == null) {
             //2、查找已经绑定的上下文
           wac = findWebApplicationContext();
       }
       if (wac == null) {
            //3、如果没有找到相应的上下文，并指定父亲为ContextLoaderListener
           wac = createWebApplicationContext(rootContext);
       }
       if (!this.refreshEventReceived) {
             //4、刷新上下文（执行一些初始化）
           onRefresh(wac);
       }
       if (this.publishContext) {
           // Publish the context as a servlet context attribute.
           String attrName = getServletContextAttributeName();
           getServletContext().setAttribute(attrName, wac);
           //省略部分代码
       }
       return wac;
    }
```

 
从initWebApplicationContext（）方法可以看出，基本上如果ContextLoaderListener加载了上下文将作为根上下文（DispatcherServlet的父容器）。
 
最后调用了onRefresh()方法执行容器的一些初始化，这个方法由子类实现，来进行扩展。
 
 
3、DispatcherServlet继承FrameworkServlet，并实现了onRefresh()方法提供一些前端控制器相关的配置：
 

```
public class DispatcherServlet extends FrameworkServlet {
     //实现子类的onRefresh()方法，该方法委托为initStrategies()方法。
    @Override
    protected void onRefresh(ApplicationContext context) {
       initStrategies(context);
    }
 
    //初始化默认的Spring Web MVC框架使用的策略（如HandlerMapping）
    protected void initStrategies(ApplicationContext context) {
       initMultipartResolver(context);
       initLocaleResolver(context);
       initThemeResolver(context);
       initHandlerMappings(context);
       initHandlerAdapters(context);
       initHandlerExceptionResolvers(context);
       initRequestToViewNameTranslator(context);
       initViewResolvers(context);
       initFlashMapManager(context);
    }
}
```

 
从如上代码可以看出，DispatcherServlet启动时会进行我们需要的Web层Bean的配置，如HandlerMapping、HandlerAdapter等，而且如果我们没有配置，还会给我们提供默认的配置。
 
从如上代码我们可以看出，整个DispatcherServlet初始化的过程和做了些什么事情，具体主要做了如下两件事情：
1、初始化Spring Web MVC使用的Web上下文，并且可能指定父容器为（ContextLoaderListener加载了根上下文）；
2、初始化DispatcherServlet使用的策略，如HandlerMapping、HandlerAdapter等。

 
从DispatcherServlet.properties可以看出有
DispatcherServlet默认使用WebApplicationContext作为上下文，因此我们来看一下该上下文中有哪些特殊的Bean：
1、Controller：处理器/许多特殊的Bean，那接下来我们就看看Spring Web MVC主要有哪些特殊的Bean。

3.6、DispatcherServlet中使用的特殊的Bean页面控制器，做的是MVC中的C的事情，但控制逻辑转移到前端控制器了，用于对请求进行处理；
2、HandlerMapping：请求到处理器的映射，如果映射成功返回一个HandlerExecutionChain对象（包含一个Handler处理器（页面控制器）对象、多个HandlerInterceptor拦截器）对象；如BeanNameUrlHandlerMapping将URL与Bean名字映射，映射成功的Bean就是此处的处理器；
3、HandlerAdapter：HandlerAdapter将会把处理器包装为适配器，从而支持多种类型的处理器，即适配器设计模式的应用，从而很容易支持很多类型的处理器；如SimpleControllerHandlerAdapter将对实现了Controller接口的Bean进行适配，并且掉处理器的handleRequest方法进行功能处理；
4、ViewResolver：ViewResolver将把逻辑视图名解析为具体的View，通过这种策略模式，很容易更换其他视图技术；如InternalResourceViewResolver将逻辑视图名映射为jsp视图；
5、LocalResover：本地化解析，因为Spring支持国际化，因此LocalResover解析客户端的Locale信息从而方便进行国际化；
6、ThemeResovler：主题解析，通过它来实现一个页面多套风格，即常见的类似于软件皮肤效果；
7、MultipartResolver：文件上传解析，用于支持文件上传；
8、HandlerExceptionResolver：处理器异常解析，可以将异常映射到相应的统一错误界面，从而显示用户友好的界面（而不是给用户看到具体的错误信息）；
9、RequestToViewNameTranslator：当处理器没有返回逻辑视图名等相关信息时，自动将请求URL映射为逻辑视图名；
10、FlashMapManager：用于管理FlashMap的策略接口，FlashMap用于存储一个请求的输出，当进入另一个请求时作为该请求的输入，通常用于重定向场景，后边会细述。