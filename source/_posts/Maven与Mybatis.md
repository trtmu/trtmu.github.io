---
title: Maven与Mybatis
date: 2018年9月22日23:12:57
hasBQ: true
reward: true
comments: true
tags:
    - Maven
    - 笔记
    - Mybatis
---
# <center> Maven项目管理与Mybatis </center>

## Maven工具
* 核心命令是：mvn
* 说明：项目的管理工具，一个项目的编译、运行、测试、发布等功能的管理工具，基于POM（项目对象模型）的概念将项目中依赖的jar包从本地或远程仓库中加载到项目的classpath中。

### maven的使用
- 创建项目的命令
mvn archetype:generate   
	- `-DarchetypeCatalog=internal`  
	- `-DgroupId=com.qfxa`
	- `-DartifactId=helloapp `
	- `-DarchetypeArtifactId=maven-archetype-quickstart`  
	- `-DinteractiveMode=false`
- 常用命令
	- `mvn compile` 编译
	- `mvn test-compile`编译测试代码
	- `mvn test`运行测试
	- `mvn package`打包，java项目打包为jar包，web项目打包为war包
	- `mvn install`安装到本地仓库
	- `mvn deploy`发布到远程仓库或运行环境
- maven项目的结构
src/main/java 存放的是Java的源代码
src/main/resources 存放一些资源文件（框架的配置文件及数据库连接的属性文件）
src/test/java 存放的是测试的源代码
> 以上文件目录在发布时，不会在classes目录下创建，仅有源码资源包  
> Eclispe 配置 maven时，可以通过配置`Dependencies`来快速引入jar包，步骤：window-->show view-->other-->搜索maven--> Maven repositories-->Rebuild Index




<!--more-->


## Mybatis
- 概念   
Mybatis是基于ibatis的，实现了ORM（对象关系映射）的功能，但不是完全实现。主要体现在只对查询结果进行关系映射，增删改查等语句必须自己写。另外实现了ORM框架有Hibernate、JPA。  
- 主要技术  
ORM框架实现的底层技术：Java反射+XML解析/注解+JDBC

- 核心结构技术
    - 引导层
        - 基于XML方式
> Mybaits有两种XML格式，一种为配置文件(主要配置连接数据库的相关信息)，一种为映射文件（主要为具体的映射关系）
        - 基于API方式
    - 框架支撑层
        - 事务管理
        - 连接池管理
        - 缓存处理
        - SQL语句处理
	        1. xml映射的方式
	        2. 注解方式
	- 数据处理层
		1. 参数处理（ParaterHandler）
		2. SQL解析（SQLSource）
		3. SQL执行（Executor）
		4. 结果处理和映射（ResultSetHandler）
	- 接口层
		- 基于Statement ID --语句ID方式
		- 基于Mapper接口 --常用于框架整合中使用
> 提供增删改查的的方法 ，注意使用`SqlSession`建立连接时，对数据库进行修改时需要提交事务

- <font color=red>**Mybatis核心类**</font>
	- `SqlSessionFactoryBuilder`
	- `SqlSessionFactory`
	- **`SqlSession`**    会话对象或数据操作的对象，主要来执行mybatis的语句（statementId）
	- Resources  资源工具类，可以加载Class下的资源

- \#和$两个表示符 
	-  \#{属性名}获取传入参数中的属性变量，在SQL语句解析时会使用？占位，在语句的预处理对象当中再赋值
	> 传入参数 User User  
> 语句：select * from User where name like #{name}  
> 解析：select * from User where name like ？  
	- ${属性名或value}获取传入参数对象中的属性值或参数的常量值，在语句的解析中直接使用常量值来替换，不进行预处理操作
> 执行: preparedStatement设置这个参数的值  
> 语句：select * from user where name like ${name}  
> 解析：select * from user where name like ‘disen’  


- Mybatis数据结果映射规则
**字段名和resultType指定的类中属性名对应**
	- 第一种：使用列的别名
	- 第二种：使用resultMap方式，将查询结果的字段名和实体类的属性进行匹配


- Mybatis的配置文件结构
    + <font color=red>标签顺序</font>  
        + `properties`（属性资源的使用）  
        + `settings`（全局参数设置用于支撑框架）  
        + `typeAliases`（类型别名）  
        + `typeHandlers`（类型处理器）  
        + `objectFactory`（对象工厂）  
        + `plugins`（插件）  
        + `environments`（环境信息集合） 
            - environment（单个环境信息）
            - transactionManager（事物）
            - dataSource（数据源）  
        + `mappers`（映射器/映射文件）  

	
- 配置文件详解
	1. 属性资源--xxx.properties   
    ``` xml
    <properties resource="jdbc.properties"/>
    <!-- 开启默认值选项,默认值使用:开始,如下例${user :123} -->
        <property name="org.apache.ibatis.parsing.PropertyParser.enable-default-value" value="true"/>
    ```
	2. settings设置
		- jdbcTypeForNull
		设置变量为Null（null，varchar，other）
        - 具体参考[这里](http://blog.csdn.net/u014231523/article/details/53056032)
	3. typeAliases设置类的别名
		1. 为每个类来指定别名
		2. 为包下的所有实体类统一指定别名，每个实体类的别名是类的简称（类名）
	4. typeHandlers自定义类型处理器
		1. 创建类，并继承BasrTypeHandler，并指定转换的实体类的类型，同时实现四个方法（一个set\*（），三个get\*（））
        set是向数据库写数据时回调
        get是从查询结果集中读取数据时回调
    5.  mappers引入映射文件
```html
<mappers>
    <mapper resources="单个映射文件的文件系统的路径"/>
    <package name="mapper接口类所在的类名"/>
</mappers>
```
- Mapper接口编程风格
    - 创建Mapper接口类
    - 在同一个包下创建Mapper接口对应的映射文件，<font color=red>且文件名与接口类名一致，在映射文件的命名空间的属性需写为Mapper接口的**全限定名**</font>
    - 在配置文件中的`<mapper>`下使用`<package name="">`添加Mapper映射文件。
    - 在映射文件中声明语句同时在Mapper接口中声明方法。<font color=red>方法名称必须与语句ID匹配。包含参数及参数类型一致</font>
    - 通过SqlSession的`getMapper（Class）`方法来获取Mapper接口的对象

        > `#{arg0} ` `#{arg1}` ` #{param1}` ` #{param2}`这种情况主要体现在Mapper接口方法参数上

- 映射文件语句相关的应用
    - 在`insert`标签中可以使用`<selectKey>`来生成主键扩展：当插入数据成功后，可以返回数据的ID

- Mybatis下的多表联查
    - 定义：多张表通过关联关系查询出相关的数据，对这些数据进行映射（多对一、一对多标签）
    - 实现多对一的关联查询使用`<association>`
       - 常用属性：
        - property 实体类中关联对象的属性名（即主表对应实体类中的对象）
        - column: 查询实体类的结果中，与关联对象对应的外键字段
        - select：根据提供的外键字段的值查询唯一的关联的对象，属性值为语句的ID，如果该语句在其他的Mapper映射文件中，则需写成全限定文件名（包含命名空间）
        - fetchType 加载方式
            +  lazy 延迟加载
            +  eager 立即加载
    - 实现一对多的关联查询`colllection`
        - 常用属性
            + propety：在实体类中的一个属性名
            + ofType：集合中元素的类型
            + column：关联查询中的条件取值（查询结果中的列值）
            + select：关联查询的语句ID
    - mybatis复杂SQL语句使用注意事项
        - 清楚表与表之间的主外键关系
        - 了解内连接与外连接的区别
            - 内连接：join on --->
            - 外链接: left|right join on          查询结果中可能包含多余数据（left：左表的多余 right：右表的多余）
        - Mybatis中写复杂语句时，对每个表的字段要设置别名，别名规则一般使用表名或具有一定含义的字符
        - 处理映射时，找出关系最顶层的对象，按照对象中的属性一层层向下映射    
- Mybatis下的二级缓存`<cache>`针对查询结果数据
    - mybatis 缓存层次
        - 一级缓存：本地Session缓存(默认)数据有效性是同一个会话,使用`<settings>`设置;localCacheScope 本地缓存的范围（SESSION，STATEMENT）
        - 二级缓存：来存储所有Session中查询的数据
            - 在`<settings>`配置中使用`cacheEnable`设置为true表示开启所有的Mapper映射文件（或某一命名空间）下的二级缓存
            - 在Mapper映射文件中，使用`<cache/>`标签开启当前命名空间的缓存。且可以通过`<cache> `中的相关属性（size，eviction，readOnly，flushInterbal）来定制   
            PS：<font color=red>二级缓存在使用时，只针对查询的结果，如果数据发生变更,则不会存入二级缓存</font>
            > 在`<select>`标签中使用`useCache`属性来设置是否对查询结果缓存，默认为true，使用flushCache设置为true表示刷新缓存，可以在`<update>``<delete>``<insert>`这些标签中使用flushCache来刷新缓存
- Mabatis的动态SQL（使用OGNL表达式）
    - if
    - choose（when,otherwise）
    - trim
    - foreach

- MVC开发模式
    - V：View视图层--JSP、HTML、模板：展示数据
    - C：Controller 控制器层--Servlet。处理V层发出的请求，根据请求调用业务Model来处理数据并将数据处理的结果返回给View。
    - M：Model模型层-- JavaBean类
        - 数据模型：即POJO（普通的Java类）
        - 业务模型类：处理Controller控制器传入的数据，并与数据库进行交互。细分两大模块，目的是分离业务处理和数据库操作，细分如下：
            -  service
            -  Dao
    - 设计的目标是实现View和Model分离
    - 经典的MVC层次：View--Controller--Service--Dao,还有一个JavaBean来贯穿所有层次。JavaBean所在的包名常被命名为po包、bean包、domain包、entity（实体类）包。
    - 使用MVC设计思想的框架结构：
        - 域名包
            - view
            - controller（控制器）
                - form （表单）
                - validate（验证信息）
                - format（格式）
            - model
                - po一般是java实体类（bean）
                - service一般是控制层和dao层之间的交互
                    - service.impl(接口) 
                - dao一般负责与数据库的交互
                    - dao.impl(接口)   
                - utils 工具包
