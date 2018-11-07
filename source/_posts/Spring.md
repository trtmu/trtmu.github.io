---
title: Spring
date: 2018年9月22日23:12:57
hasBQ: true
reward: true
comments: true
tags:
    - Spring
    - 笔记
    - 基础
    - Java
---

#<center>Spring</center>

## Spring
- Spring是一个轻量级**控制反转（IoC）**和**面向切面（aop）**的容器框架，他主要是为了解决企业应用开发的复杂性而诞生的。
- 优点    
> 实现了类之间松耦合的依赖关系，方便业务的扩展和维护。

- Spring的概况--Spring的核心模块
    -  核心容器（Spring Core）
    -  应用上下文（Spring Context）
    -  AOP模块（Spring AOP）
    -  JDBC和DAO模块（Spring DAO）           

### IOC和DI
- IOC 
> 其思想是反转资源获取的方向，传统的资源查找方式要求组件向容器发起请求查找资源，作为回应，容器适时的返回资源，而应用了IOC之后，则是容器主动的将资源推送给他所管理的组件，组件做的仅仅是选择一种合适的方式来接收资源，这种行为也被称为查找的被动形式        
> 在Spring中将每个类的依赖管理委托给Spring容器（第三方），当需要使用被依赖类的对象时，由Spring容器来动态的创建被依赖的队形并以某种方式注入到依赖的类中，这种管理依赖的方式为IoC或DI。

- DI（依赖注入） 是IOC的另一种表达方式：即组件以一些预定义好的方式接收来自如容器的资源注入

> 作用是管理类与类之间的依赖关系

- Spring提供了两种类型的IOC容器实现
    - `BeanFactory` IOC容器的基本实现
    - `ApplicationContext` 提供了更多的高级特性，是BeanFactory的子接口  

> `BeanFactory`是Spring框架的基础设施，面向Spring本身
> `ApplicationContext`面向使用Spring框架的开发者，几乎所有的应用场合直接使用ApplicationContext而非底层的BeanFactory
> 无论使用何种方式，配置文件时相同 






<!--more-->






### Spring的使用
- 对于MVC分层思想，在Spring中可以

- 使用Spring的IoC
    - 需要的Spring 模块
        -  Context
        -  Core
        -  Beans
        -  SpEL（Spring的表达式语言）
    - Spring配置文件的配置    
``` xml
    <beans>
        <bean id=“a” class=“Bean类的全限定名” />
        <bean id=“b” class=“”>
            <property name=“”  ref=“a” />
        </bean>
    </beans>  
```
    
- 获取Spring容器中注册的Bean类对象：
    - BeanFactory类对象的getBean(“id”)方法

#### Spring 创建对象
- <font color=red>默认为单例模式</font>
- **工厂方式**
    - 静态工厂方法
    - 非静态工厂方式
1. 静态工厂方法                     
    1. 申明一个类，并且声明一个静态的方法，方法的返回类型是某一个类的对象，工厂类的名称可以根据这一方法返回的类型而命名 
    2. 在Spring配置文件中使用                                
    `<bean id="" class="工厂类的全限定名" facyory-method="静态工厂方法">`                     
    **scope属性可以指定对象的作用范围，默认情况下是单例模式，即每次获取的Bean对象都是一个 prototype表示为原型，即每次获取Bean时，会在现有的对象上复制一份**
> 使用静态工厂方法的好处是可以控制创建对象的单例与否

2. 工厂成员方法方式        
    1. 设计工厂类时，创建某一类对象的方法是成员方法。
    2. 在Spring配置文件中，先将工厂类注册到容器中，然后在声明工程方法返回对象的配置。   
    ```
    <bean id="factory" class ="工厂类的全限定名"/>    
    <bean id="...Service" factory-bean="factory" factory-method="静态工厂方法>
    ```
    3. 何时使用
    在创建一个对象过程比较复杂时，需要使用工厂方式来简化复杂的创建过程

#### Bean 的生命周期
- 在 `<Bean> `标签中    
    - 使用init-method 指定初始化对象时执行的方法  
    - 使用destory-method指定销毁对象时执行的方法
        - PS：需要借助Java反射动态的调用close方法  
     
- <font color=red>当Spring容器对象创建完成后，会自动创建容器中所有注册了的Bean的对象,即对于Bean对象，会随容器的创建而创建，随容器的关闭而销毁。当然可以设置为延迟创建Bean对象，使用lazy-init属性，属性值为true时表示延迟创建，为true时只有调用了getBean方法时才会被创建</font>
- 如果是延迟创建，则会在获取这个Bean时来创建Bean对象，在创建Bean对象时先调用构造方法，然后再调用指定的init-method指定的初始化方法。
- 在Bean对象销毁时，会调用destroy-method指定的方法

#### Bean的获取方式
- 接口（类型）方式获取Bean对象
    1. 前提是在Spring容器中必须存在一个已注册该接口的实现类
    2. 通过容器的getBean（）方法来指定接口类型

#### 注解方式注册Bean
- 常用组件
     + `@Component`--Spring组件
     + `@Service`--Service层的组件
     + `@Reporitory` --Dao层的组件
     + `@Controller`--Controller层的组件
     + `@Autowired` 自动装载，即自动的注入依赖
> 以上注解所在的类，被Spring容器扫描到时，则会注册到Spring容器中

> 注解本身没有意义，只有结合了解析注解才有作用


#### p和c命名空间的应用
p:表示属性的命名空间，可以获取类中的属性，类似于`<property>`标签的功能。  
c:表示构造方法的命名空间，可以获取类中构造方法（根据个数不同，c命名空间有不同的写法）同`<constructor-arg>`标签的功能
p和c命名空间作为属性在`<bean>`标签中使用

#### Spring AOP的前身：动态代理实现
- 两种实现方式
    - jdk
    - cglib

> 动态代理是不改变现有业务功能，在业务被执行时，动态的执行前后添加一些额外的功能（事务、日志、权限），基于jdk的实现接口实现类的动态代理 ，基于cglib的子类动态代理.

- **基于jdk动态代理的实现步骤**
    - 定义一个工厂类，声明一个静态方法且返回业务接口类型，在方法中使用三步
        1. 实例化现有业务类对象
        2. 实例化拓展功能类的对象
        3. 借助`Proxy.newProxyInstance()`方法动态的创建代理类
> （该方法有三个参数，第一个为类加载器，一般使用本类的类加载器;第二个表示代理类实现的接口，第三个为方法的回调`InvocationHandler`在调用代理对象方法时的回调，即代理对象的方法的功能（内容）由InvocationHandler的`invoke()`方法来实现）   

> **jdk动态代理的实现特点是针对接口与实现类的。**

- **基于cglib动态代理的实现**
> <font color=red>如果项目环境是非Spring的，是需要加入cglib的jar包 ，因为cglib代理的实现是针对子类的，因此需要现有业务类的对象，在此业务类不需要实现任何的接口。</font>
- 核心类:`Enhancer`类
- 实现的步骤
    1. 实例化一个Enhancer类对象
    2. 通过Enhancer类对象设置代理类的父类和代理类执行方法时的回调（方法的拦截器），在回调的方法中实现的过程同jdk动态代理的InvocationHandler的invoke（）方法相同
    3. 通过Enhancer类对象创建代理对象

#### Spring AOP的应用
- 什么是AOP（Aspect-Oriented-Progromming）  
是一种扩展OOP（OOP（Object Oriented Programming）的另一种编程思想，在OOP中最基本的（关键模块化）单位是类（Class），在AOP中最关键模块化单位是切面（Aspect）。AOP和IoC都是Spring矿建的核心组件，两者之间没有依赖关系，如果在Spring项目中不想使用AOP也可以。但是AOP可以作为IoC的强大的中间件使用。

> 面向切面编程可以说是OOP（Object Oriented Programming，面向对象编程）的补充和完善。OOP引入封装、继承、多态等概念来建立一种对象层次结构，用于模拟公共行为的一个集合。不过OOP允许开发者定义纵向的关系，但并不适合定义横向的关系，例如日志功能。日志代码往往横向地散布在所有对象层次中，而与它对应的对象的核心功能毫无关系对于其他类型的代码，如安全性、异常处理和透明的持续性也都是如此，这种散布在各处的无关的代码被称为横切（cross cutting），在OOP设计中，它导致了大量代码的重复，而不利于各个模块的重用。

> AOP技术恰恰相反，它利用一种称为"横切"的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其命名为"Aspect"，即切面。所谓"切面"，简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未来的可操作性和可维护性。  

>使用"横切"技术，AOP把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处基本相似，比如权限认证、日志、事物。AOP的作用在于分离系统中的各种关注点，将核心关注点和横切关注点分离开来。

#####  AOP中关键概念
- 切面 Aspect：是横切多个类的模块化关注点，在企业级Java应用中事务处理就具有Aspect概念。在Spring AOP中切面就是由一个标准的Java类来实现。当然也可以使用`@Aspect`或`AspectJ`注解声明的类。
- 连接点 Join Point：程序执行过程中的一个点，这个点可以是执行的方法或处理的异常，在Spring AOP中，连接点就是一个执行的方法
- 通知 advice：在特定的连接点由切面来执行的一个动作（方法）。通知分为前置、后置、异常、最终、环绕通知五类
- 切入点 Pointcut：是匹配连接点的一种“断言”，通知是和切入点表达式关联起来，并运行在任何一个与切入点表达式匹配的连接点上。切入点需要使用切入点表达式来声明在通知方法上
- 引入 introduction：在不修改代码的前提下，引入可以在运行期为某些类动态地添加一些方法或字段，也可以生成一个实现`isModified`修饰的接口的类。在Spring AOP中允许想任何一个呗通知的对象中引入一个新的接口。类似于使用jdk动态代理产生代理类时，引入了指定的接口
- 目标对象 target object：由一个或多个切面通知的对象（被通知的对象），在Spring AOP中由于代理对象在运行时实现的，所以目标对象一般代表是代理对象。
- AOP 代理：指定一种方式产生或创建目标对象，默认情况下使用了jdk动态代理，也可以使用cglib动态代理
- 编织 weave ：将切面应用到目标对象并导致代理对象创建的过程


##### 在Spring配置文件中使用aop命名空间:动态代理
```
    <!-- 定义拦截(关注)哪些连接点(即对哪些执行的方法进行拦截) -->
    <!-- ex...指的是切入点表达式 -->
    <aop:pointcut expression="execution(* com.qfxa.service.impl.*.*(..))"
            id="pointcutId"/>
    <!-- 定义哪个切面类(拦截器)来处理拦截的连接点(方法) -->
    <aop:advisor advice-ref="txAspect" pointcut-ref="pointcutId"/>
```
> 现在我们使用的`MethodInterceptor`方法拦截器可以认为是一种环绕型通知。    

##### 通知的五种类型
- `Before Advice`:前置通知，在连接点执行前执行
- `After Returning Advice`：后置返回通知，在连接点执行完并返回后执行（返回前没有异常）
- `After thowing Advice`：后置异常通知，在连接点执行时发生并抛出异常之后执行的通知
- `After（finally） Advice`：后置通知，在连接点执行完毕后执行，执行中可能存在异常，类似于`try{}catch(){}finally{}`中的finally语句块
- `Around Advice`：环绕通知  ，在连接点执行前和后执行
> 在<aop:config>标签中使用<aop:aspect>来指定不同的通知处理切入点表达式拦截的连接点，要求切面类中通知的方法需要定义一个`JointPoint`的参数
###### 五种通知的类型执行顺序
1. 前置通知
2. 环绕通知
3. 后置通知
4. 后置返回通知或后置异常通知

##### Spring的基本注解
参见[这里](http://www.cnblogs.com/xdp-gacl/p/3495887.html)



## Spring MVC
### 简介
- 核心组件介绍
    1. 前端控制器 （Front Controller）
        - `DispatcherServlet`
    2. 后端控制器（自定义控制器）
        - `@Controller`用于标记自定义控制器
        - `@RequestMapping` 用于方法，声明请求处理的地址，表示请求处理的方法
    3. 视图模型 （ViewAndModel）
        - 在前端与后端控制器交互时所产生的类对象，用于存储请求处理的结果和响应视图（View）
        - 另外Model参数对象可以在`@RequsetMapping`标记的方法的参数列表中出现，用于存储处理数据的结果 
    4. 在`@RequestMapping`所在的请求处理方法上可以声明请求参数列表或请求参数组成的实体对象
    5. 当后端控制器处理完成时前端控制器要根据后端返回的Model查找响应的资源并将Model数据响应给View（SpringMVC提供了一个视图资源加载器）
- Spring Web MVC环境搭建
    1. 创建Web的Maven项目
    2. 添加Spring——webmvc的jar包
    3. 创建Spring容器配置文件
    4. 在web.xml文件中注册DispatcherServlet，在url-pattern中声明所有的请求由此Servlet处理
    5. 创建自定义控制器，在配置文件中启用注解注册方式
    > @RequestMapping(path=“/login”,method=RequestMethod.GET)
    6. 在配置文件中配置内部视图资源加载信息

#### 控制器（Controller）
- 控制器常用注解和传值
    - `@Controller（"路径"）` 
        - 表示为自定义控制器类提供的统一的路径，在类内部的其他请求方法路径会默认添加前缀（括号内的内容）作为完整路径
    - `GetMapping（"路径"）`
        - 默认为控制器的get请求
    - `PostMapping（"路径"）`
        - 默认为控制器的post请求 
> 一般情况下：@Controller 注解中声明请求的路径，在类中声明 @GetMapping 或 @PostMapping 来处理控制器的get或post请求，可以使用@Controller和@RequestMapping组合，并在@RequestMapping中声明请求的方法（GET/POST）
    - 传值方式
        - @RequestParam 接收请求中必须存在的一个参数
        - CookieValue 接收请求中必须存在的Cookie值
        - RequestHeader 接收请求头中必须存在的参数  
    以上注解需要在处理参数上使用  
    说明：对于@RequestParam注解主要解决请求参数名和方法参数名不同时，此时通过@RequestParam指定的参数从请求中获取参数的值，并赋给方法参数值
    另外，如果提交的参数数据较多，可以使用FormBean-实体类，当然以可以以单参数方式写在方法参数上。在FormBean来封装请求参数列表时，属性名称必须与参数匹配

#### `Session`、`Request`、`Response`三个范围对象在控制器中使用
- 可以在控制器的方法参数上声明`HttpSession`、`HttpServletRequest`、`HttpServletResponse`三种类型的对象，如果使用Model，默认情况下Model存放的对象属于request范围。
- 使用`ModelAndView`
    - Model (request范围存储的数据)
    - View (内部视图资源)
> 在控制器的方法返回类型上可以直接使用`ModelAndView`

#### Spring MVC文件上传的实现过程
- 常规方式
    1. 在Spring MVC配置文件中声明id为multipartResolver的上传处理器
        ```xml
        <bean id="multipartResolver"
          class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        ```
    2. 在项目依赖文件中添加commons-fileupload相关的jar包
    3. 在控制器的方法上使用`@RequestParam("文件域的名字") MultipartFile来接收上传文件的文件信息(源文件名,文件类型,文件长度,文件流)`
    > 通过`MultipartFile`类来获取上传文件的信息,实际上传的方法是`transfer(File f)`方法,该方法会将上传文件流写入到f指定的文件中. 
    4. 在客户端的页面中声明表单属性`method="post"`和`enctype="multipart/form-data"`
    使用`<input type="file" name="文件域名称">`指定上传的文件
- 使用Ajax方式上传
    1. 在spirng配置文件中配置   
        ```
        <bean id="multipartResolver" 
            class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
            <property name="defaultEncoding" value="utf-8"/>
            <!-- 上传单个文件的最大限制:10M -->
            <property name="maxUploadSizePerFile" value="10485760"/>
            <!-- 上传总文件的最大限制:100M -->
            <property name="maxUploadSize" value="104857600"/>
        </bean>
        ```
 
    2. 在单独的一个控制器中声明一个上传方法,来处理文件上传,在方法参数类上添加`@RequestParam(img) MultipartFile mFile`和`HttpServletRequest request`
    3. 借助于MultipartFile类实现文件上传
    4. 前端编写     

##### 乱码过滤器
- 在web.xml中配置
``` xml
<!-- 乱码过滤器 -->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

###  扩展
#### Json数据格式
- 两种数据类型的格式
    - JSON对象
        - `{"name":"disen","age":30,"isVip":true}`  
    - JSON数组
        - `["red","yellow","white"]` 
        - `[{}{}{}{}]`
- JSON的常用解析方式
    - `jackson` (Java原始方式)
        - `JSONObject`核心对象
        - `JSONArray` 核心对象
    - `fastJS` 阿里巴巴提供的第三方json数据解析的库,核心类:`JSON`
    - `GSON`谷歌提供的第三方json数据解析库,核心类:`GSON`类,需借助`TypeToken`抽象类
