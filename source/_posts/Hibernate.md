---
title: Hibernate
date: 2018年9月22日23:12:57
hasBQ: true
reward: true
comments: true
tags:
    - Java
    - 笔记
    - Hibernate
---

# <center>Hibernate</center>

### Hibernate中对象的三种状态
详见[这里](http://blog.csdn.net/fg2006/article/details/6436517/)
### Hibernate中load和get方法的不同
> Hibernate中的get方法在调用之后会先确认该主键id对应的记录是否存在,先去session缓存中查找,然后在二级缓存中查找,如果还没有就进行查询数据库,数据库中没有则会返回null;而load方法会根据配置的加载时间(是否为懒加载)来判断,如果是懒加载则会在session缓存中查找,查找该id对应的对象是否存在,不存在则使用延迟加载,返回实体的代理类对象(该代理类为实体类的子类,由cglib生成).等具体使用该对象时,再查询二级缓存和数据库,若依旧没有发现则抛ObjectNotFoundException异常;如果不为懒加载和get一样,只是最终如果未查找到数据会抛上述异常

### Hibernate 配置文件详解
> 如果配置文件的文件名为hibernate.cfg.xml时,使用`new Configuration().configure().buildSessionFactory()`即可,如果要修改配置文件名,则需要将文件名作为参数用于构建SessionFactory对象:`new Configuration().configure("hibernate.xml").buildSessionFactory()`


### Hibernate

```xml
<session-factory>
        <!-- 设置数据库连接驱动 -->
        <property name="connection.driver_class">com.mysql.jdbc.Driver</property>
        <!-- 设置数据库用户名 -->
        <property name="connection.url">jdbc:mysql:///hibernate_test</property>
        <!-- 设置数据库连接用户名 -->
        <property name="connection.username">123</property>
        <property name="connection.password">123</property>

        <!-- 指定数据库方言 -->
        <!-- 指定数据库连接信息 -->
        <property name="dialect">org.hibernate.dialect.MySQL57InnoDBDialect</property>
        <!-- 是否打印sql语句 -->
        <property name="show_sql">true</property>
        <!-- 格式化sql语句 -->
        <property name="format_sql">true</property>
        <!-- 通过映射文件是否自动创建维护数据表结构，在正式的生产环境要删掉 -->
        <property name="hbm2ddl.auto">update</property>
        <!-- 配置实体类映射文件 (xml方式) -->
        <mapping resource="com/trtmu/relationbyxml/o2o/User.hbm.xml" />
        <!-- 配置实体类映射文件(注解方式) -->
        <mapping class="com.trtmu.relationbyannotation.o2o.User"/>
    </session-factory>
```

## Hibernate关系映射模型
><font color=red>无论是哪种关系映射模型,需把握一个原则,除了多对多,一般都是在多的一方设置外键,且将维护关系的权利交给多的一方</font>
> Hibernate实体类单向关系存在一对一,一对多,多对一,多对多这基本四种映射模型  
> 一对一,多对多设置双向映射关系时,无论注解或者xml配置方式,实体bean中都不可以持有对方的引用,   
> 如:<font color=red>复写的toString()方法</font>,否则会导致堆栈溢出.   
### 使用xml文件配置和注解方式实现映射关系
### 1. 一对一
#### 1.1 单向一对一
> 一对一可以理解为特殊的多对一,当多的一方设置为唯一时即一对一,下面使用User和Card(身份证)举例说明(根据user查找card)


```xml
<class name="User" table="re_o2o_user">
        <!-- id指实体表示符(OID) 对应数据表中主键 name:标识属性名称 -->
        <id name="id">
            <!-- 主键生成策略 -->
             <generator class="native"/>
        </id>
        <property name="name" column="name" />
        <property name="age" column="age" />
        <!-- 单向一对一关系映射
            可以理解为特殊的多对一(多方唯一即是一对一关系)
            name对应实体类中中的字段
            unique表示多的一方为唯一的,即将关系变为一对一
            column表示在这一方添加的外键列名
        -->
        <many-to-one name="card" unique="true" column="card_id" ></many-to-one>
</class>

```
```java
public class User {
    private Card card;
    /**
     * 单向一对一 
     * 只能通过User查找Card 
     * 如果不指定JoinColumn则会默认使用*类名_主键*作为外键
     */
    @OneToOne
    @JoinColumn(name = "cardid")
    public Card getCard() {
        return card;
    }
    public void setCard(Card card) {
        this.card = card;
    }
}
```
#### 1.2 双向一对一

```xml
<!-- 在主表方添加或修改如下 -->
<many-to-one name="card" unique="true"   column="card_id"  />
<!-- ****************************************************************** -->
<!-- 在从表方添加或修改如下 -->
<one-to-one name="user" property-ref="card"  cascade="save-update"/>
```
```java
public class User implements Serializable {
    /**
     * 双向一对一 
     */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    public Card getCard() {
        return card;
    }
}

//******************************************************
public class Card implements Serializable {
    @OneToOne(mappedBy = "card")// 声明放弃维护联接列关系
    public User getUser() {
        return user;
    }
}
```

<hr/>
### <font color=red>2. 一对多</font>
#### 2.1 单向一对多
> 一对多的使用场景最为广泛,比较符合日常生活中的实际情况,且使用双向的一对多就可以实现双向多对多,下面使用Department和User举例说明  

``` xml
<class name="Department" table="re_o2m_department">
        <!-- id指实体表示符(OID) 对应数据表中主键 name:标识属性名称 -->
        <id name="id">
            <!-- 主键生成策略 -->
            <generator class="native" />
        </id>
        <property name="name" column="name" />
        <property name="createDate" column="createDate" />
        <!-- 单向一对多 
            使用set标签的name表示实体类中的属性
            key表示在多的一方添加外键一列的列名
            class表示多的一方的实体类
         -->
        <set name="user">
            <key column="dep_id" />
            <one-to-many class="User" />
        </set>
    </class>

```
```java
public class Department {
    private Set<User> user = new HashSet<>();
    /**
     * 单向一对多
     * 只能通过Department查询User
     * 不加入JoinColumn会建立第三方表作为中间表
     */
    @OneToMany
    @JoinColumn(name = "dep_id")
    public Set<User> getUser() {
        return user;
    }
    public void setUser(Set<User> user) {
        this.user = user;
    }
}
```
#### 2.2 双向一对多
```xml
    <!-- Department配置 -->
    <!-- 双向一对多 
    双向关系必须设置inverse属性放弃维护数据库连接,否则会死循环
    -->
    <set name="user" inverse="true">
        <key column="dep_id" />
        <one-to-many class="xml.o2m.User" />
    </set>
    <!-- User配置 -->
    <!-- 
    配置双向关系,则必须设置该属性,
    其中column的值必须为多一方的外键字段
    -->
    <many-to-one name="department"  column="dep_id" class="xml.o2m.Department"/>
```
```java
public class Department {
    //省略其他属性与Set,Get方法
    private Set<User> user = new HashSet<>();
    /**
     * 双向一对多值需要此注解即可
     *  mappedBy映射的是对方中自己的属性名
     */
    @OneToMany(mappedBy = "dep")
    public Set<User> getUser() {
        return user;
    }
}

//******************************************************
public class User {
    private Department dep;
    @ManyToOne
    @JoinColumn(name = "dep_id")
    public Department getDep() {
        return dep;
    }
}
```


<hr/>   
### 3. 多对一
#### 3.1 单向多对一
>单向多对一的使用场景也比较广泛下面使用Classes和Student举例说明

```xml
<class name="Student" table="re_m2o_student">
        <!-- id指实体表示符(OID) 对应数据表中主键 name:标识属性名称 -->
        <id name="id">
            <!-- 主键生成策略 -->
             <generator class="native"/>
        </id>
        <property name="name" column="name" />
        <property name="age" column="age" />
        
        <!-- 单向多对一
            name对应实体类中中的字段
            column表示在这一方添加的外键列名
         -->
        <many-to-one name="classes"  column="cls_id" />
    </class>
```

```java
public class Student {
    //省略其他属性与Set,Get方法
    private Classes classes;
    @ManyToOne
    @JoinColumn(name = "cls_id")
    public Classes getClasses() {
        return classes;
    }
    public void setClasses(Classes classes) {
        this.classes = classes;
    }
}
```
#### 3.2 双向多对一
> 双向多对一同双向一对多

<hr/>
### 4. 多对多
#### 4.1单向多对多
- 多对多的应用场景较少,且可以使用双向多对一实现,下面使用Role和User举例说明
``` xml
<class name="User" table="re_m2m_user">
        <!-- id指实体表示符(OID) 对应数据表中主键 name:标识属性名称 -->
        <id name="id">
            <!-- 主键生成策略 -->
             <generator class="native"/>
        </id>
        <property name="name" column="name" />
        <property name="age" column="age" />
        <!-- 单向多对多
                key表示第三方表中的字段值 
                必须指定table值,table就是维护双方关系的表名
         -->
        <set name="roles" table="re_m2m_role_user">
            <key column="user_id"/>
            <many-to-many class="Role" column="role_id"/>
        </set>
    </class>
```
<hr/>
```java
public class User {
    //省略其他属性与Set,Get方法
    private Set<Role> roles = new HashSet<>();
    /**
     * 单向多对多
     * JoinTable因为多对多一定会有第三张表存在,所以使用该注解
     * joinColumns是joincolumn的一个数组表示我方在第三方表中的外键名称
     * inverseJoinColumns同上,只不过是对方在第三方表中的外键名称
     */
    @ManyToMany
    @JoinTable(name = "annore_m2m_user_role", joinColumns = {
            @JoinColumn(name = "user_id")}, inverseJoinColumns = {
                    @JoinColumn(name = "role_id")})
    public Set<Role> getRoles() {
        return roles;
    }
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
```

#### 4.2 双向多对多
```xml
<!-- User表配置 -->
<!-- 双向多对多 key表示第三方表中的字段值 -->
    <set name="roles" table="xml_m2m_role_user">
        <key column="user_id" />
        <many-to-many class="Role" column="roles_id" />
    </set>

<!-- Role表配置 -->
<!-- 双向多对多 key表示第三方表中的字段值 必须有一方放弃关系的维护-->
    <set name="users" table="xml_m2m_role_user" inverse="true">
        <key column="roles_id" />
        <many-to-many class="User" column="user_id" />
    </set>
```
``` java
public class User {
    private Integer id;
    private String name;
    private Integer age;
    private Set<Role> roles = new HashSet<>();
    /**
     * 双向多对多
     * JoinTable因为多对多一定会有第三张表存在,所以使用该注解
     * joinColumns是joincolumn的一个数组表示我方在第三方表中的外键名称
     * inverseJoinColumns同上,只不过是对方在第三方表中的外键名称
     */
    @ManyToMany
    @JoinTable(name = "anno_m2m_user_role", joinColumns = {
            @JoinColumn(name = "user_id")}, inverseJoinColumns = {
                    @JoinColumn(name = "role_id")})
    public Set<Role> getRoles() {
        return roles;
    }
}
//*********************************
public class Role {
    private Set<User> users = new HashSet<>();
    @ManyToMany
    @JoinTable(name = "anno_m2m_user_role", joinColumns = {
            @JoinColumn(name = "role_id")}, inverseJoinColumns = {
                    @JoinColumn(name = "user_id")})
    public Set<User> getUsers() {
        return users;
    }
}
```




<hr/>
### Hibernate中的几种查询语句

> `SQL structuren query language`  原生SQL语句  
> `HQL hibernate query language`  Hibernate 面向对象的查询语言  
> `Criteria`  面向对象的条件查询对象    

- <font color=red>HQL没有插入语句!!!,因为Hibernate的HQL语言是用于面向对象实现查询功能的,然而在插入操作中是不会牵涉任何查询动作的,所以HQL不能用于insert语句的插入操作,而select、update、delete语句都可以有可能的查询实现</font>

#### Hibernate的标准查询(Criteria)


### JPA (JAVA Persistence API)
#### 搭建JPA环境
1. 添加依赖支持==>实现了jpa规范的hibernate产品相关jar包
    - 添加hibernate-entitymanager  5.2.10Final包
    - 添加mysql驱动mysql-connector-java 5.1.42
2. 配置jpa具体信息:必须满足如下规范:
    - 在classpath路径下:必须存在META-INF文件夹下persistence.xml文件
    - 配置文件详解:
        - `<persistence-unit>`持久化单元  可选属性:事务类型`<transaction-type="RESOURCE_LOCAL">`
        - 配置hibernate属性
3. jpa实体类常用注解
    - 在类上方声明实体类`@Entity`
    - 在类上方添加`Table(name="")`:指定映射关系对应的表
    - <font color=red>在实体类中必须指定映射的id,使用`@id`;且必须使用`@GeneratedValue(strategy =GenerationType.IDENTITY)`来指明主键的生成策略(可选策略根据数据库结构决定)</font>可选值有:
        - `GenerationType.IDENTITY` 表示底层数据库是采用自增方式生成主键
        - `GenerationType.SEQUENCE` 表示底层数据库是采用序列方式来生成主键
        - `GenerationType.TABLE` 在数据库中创建表来存放主键信息
        - `GenerationType.AUTO` 表示由程序控制主键生成
    - 可以使用`@Column`来配置字段在数据库中的属性(长度,约束等)
    - 可以使用`@Temporal`来映射日期类型可选值有:
        - `DATE`:日期类型
        - `TIME`:时间类型
        - `TIMESTAMP`: 时间戳
    - 可以使用`@Enumerated`来映射枚举类型,可选值有:
        - `EnumType.STRING` 表示枚举类的值
        - `EnumType.ORDINAL` 表示枚举类的序号索引
    - 可以使用`@Transient`将属性或字段不做映射
```java
    /**
     * 主键以UUID方式生成
     * Jpa是不支持UUID的,但是可以使用Hibernate的方法可以实现
     */
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;
    /**
     * 日期时间类型
     * 可选值分别代表日期类型,时间类型,时间戳
     */
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    /**
     * 枚举类型
     * 可选值STRING表示该枚举类的值
     * ORDINAL表示该枚举类的索引
     */
    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.男;
```

