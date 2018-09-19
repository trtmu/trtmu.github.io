## MySql

## 基础知识
### 数据库语言分类  
- DDL(Data Definition Language)   数据定义语言,用于操作对象和对象的属性,这种对象包括数据库本身,以及数据库对象:表,视图等等,DDL对这些对象和属性的管理和定义具体表现在Create,Drop和Alter上,DDL语句不会对于具体的数据进行操作
	+ Create语句:可以创建数据库和数据库的一些对象
	+ Drop语句:可以数据表,索引,触发器,条件约束以及数据表的权限等
	+ Alert:修改数据表定义及属性
- DML(Data Manipulation Language)  数据操作语言,用于操作数据库对象中包含的数据
	+ Insert语句:向指定的数据表中插入一条记录
	+ Delete语句:删除数据表中的一条或多条记录,也可以删除数据表中的所有记录,但实际上操作的依旧是记录
	+ Update语句:用于修改已存在表中的记录的内容
- DCL(Data Control Language)  数据控制语句,用于操作数据库对象的权限,这里的数据库对象是指数据库用户
	+ Grant语句:允许对象的创建者给某用户或某组或所有用户某些指定的权限
	+ Revoke语句:可以废除某用户或某组或所有用户访问权限

### Mysql其他知识点
- 启动和关闭MySql服务  
`net start mysql`   
`net stop mysql`

- MySql语句规范  
关键字和函数名称大写  
数据库名称，表名称，字段名称小写（只能使用字母数字和#__$）

- 数据类型：
	- 整型   
`tinyint`		1字节  
`smalint`		2字节  
`mediumint`		3字节  
`int`			4字节  
`bigint`		8字节  
	- 浮点型  
`float（m,d）`			m指总的位数，d指小数点后的位数  
double同理
	- 字符型  
`char（M）`定长 0-255  
`varchar(M) `可变长度 0-65535  
`enum` 枚举  
`set` 集合

### 数据库语言
- 常用命令   
`select version（）`输出版本情况  
`select new（）`输出当前时间  
`select user（）`输出当前用户  

### 数据库操作（database）  
创建数据库 `create database 数据库名`     
查询所有数据库 `show databases `  
删除数据库 `drop database 数据库名`  
修改数据库 `alter database 数据库名` 

### 数据表操作（table）
- 进入数据表 `use 数据库名`  
- 新建数据表
```sql
create table 数据表名（
	列 列数据类型，
	...
）；
```
- 查看数据表结构`show columns from 数据表名` 或者 `desc 表名`  
- 插入（添加数据） 	`insert 表名（列名1，列名2...） values（列名对应的值）`  
- 查找数据 			`select（字段） from 表名` 
- 修改数据 			`update 表名 set 列名=值  [条件];`  
- 删除数据 			`delete from 表名 [条件]`  
- 数据表的列操作  
插入（添加列）	`alter table 表名 add column 新增列名 数据类型 约束`  
删除列 		`alter table 表名 drop column 列名`  
修改列属性 	`alter table 表名 modify 待修改列名  数据类型`  
修改列名称 	`alter table 表名 change column 原名 改名 数据类型`  

### 约束(约束也属于数据库对象)
> 优点：约束可以保证数据的完整性和一致性，约束分为表级约束及列级约束
> 删除外键的数据 cascade delete   
> 设置外键列植为null，cascade set null

1.	非空约束 	`not null`设置此列可以为空
2.	主键约束	<font color=red>每张数据表只能存在一个主键，一个主键可以定义在一个或多个字段上</font>主键能保证记录的唯一且不为空，主键默认为`not null`  使用 `primary key`设置此列为主键 ，`auto_increment` 设置自动编号.
	 <font color=red>必须和主键一起使用，默认情况下起始值为1，每次自增1。</font>
3.	唯一约束 	`unique key` 唯一约束保证数据的唯一性（这一列不可有重复元素），唯一约束的字段可以为空，且每张数据表可以存在多个唯一约束。
4.	检查约束 	`check` 检查，指定一个布尔表达式，用于指定对应列的值必须满足该表达式 
5.	外键约束	 `foreign key` <font color=red>取值范围必须是主表中某一主键列的值，外键的值可以为空，如果有值，必须是主表中有效的主键值</font>  

### 查询的扩展（都需要搭配select语句使用）
- 聚合（统计）函数  <font color=red>统计函数只能有一个结果</font>
```sql
计算某列的最大值`select max(列名) from 表名`
计算某列的最小值`select min(列名) from 表名`
计算某列的平均值`select avg(列名) from 表名`
计算某列的总和`select sum(列名) from 表名`
计算记录总数或某列的记录数量`count(*)count(列名)`
查询所有记录总数，无论是否为null`select count(*) from 表名`
只查询指定列中不为null的记录总数。`select count(列名) from 表名`
返回的表是一个值，一个行值 
```

- 常用运算符  
	- 比较运算符 `>	<	=	!= 	>=	<=`  
		- in （值1,值2） 在值1和值2之间  
	`select * from worker where money in (5000,10000);`  
		- between 值1 and 值2  
	`select * from worker where money between 5000 and 10000;`  
	- 逻辑运算符 
		- and（逻辑与）	
		- or（逻辑或）	
		- not（逻辑非）

- 常用表达式	
	- 条件查询：`where`  列名
	- 分组：`group by`  列名----根据某一列来分组  
`select sex from worker group by sex;` 
	- 筛选：having----条件表达式----是否含有  
`select sex from worker group by sex having sex='男';`
<font color=red>必须与group by搭配使用，表示对分组的结果进行筛选。</font>
	- 排序：`order  by`  列名（默认为升序排序，如果要降序排序，后面加关键字`desc`）  
`select * from worker order by money`  
`select * from worker order by money desc`
	- 条件：`limit m，n`m指从哪里开始，n指取几个  取出来的值不包含M对应的值  
`select bm from worker group by bm limit 0,4;（1-4）`
	- 模糊查询：`字段 like ‘通配符’`
		- 通配符
			- `%`表示任意个数的任意字符	
				- `%a`表示以a结尾的字符串    
				- `a%`表示以a开头的字符串`%a%`表示含有a的字符串
			- `_`表示一个字符 
				- `__洋`一串字符中含有洋且只有两个字  
	
- **子查询**：指嵌套在查询内部的查询条件，且必须始终出现在圆括号内，子查询可以包含多个关键字或条件；子查询通常作为主查询的条件，通常是将子查询作为主查询的where条件来使用。  
`select * from(select  * from worker where bm='B部门')as a where a.money>1000；（使用子查询查询B部门工资高于1000的人）`
- 连接查询（多应用于多表查询）
	- 等值连接：指使用等号=比较两个表的连接项的值，相当于两表执行笛卡尔积后，取两表连接项相等的记录。  
`select * from worker,bumen;` 查找所有属于worker和bumen的列项。（笛卡尔积,也就是交集）
	- 内连接（inner join on）
`select a.name,a.money,a.bm,b.ver from worker as a join bumen as b on a.bm=b.bmname ` 查找a,b两张表中 a的bm列和b.bmname相同时的所有列
	- 外链接
		- 左外链接（left join或left outer join）
查询出的结果除了包含符合连接条件的记录外，还包含左表中剩余的其他记录。使用条件：需要将表2符合条件的元素加入表1时，且不会影响表1  
`select * from worker as a left join bumen as b on a.bm=b.bmname;`
		- 右外链接（right outer join 或right join）
查询出的结果除了包含符合连接条件的记录外，还包含右表中剩余的其他记录。使用条件：需要将表1符合条件的元素加入表2时，且不会影响表2  
`select * from worker as a right join bumen as b on a.bm=b.bmname;`

- 常用函数
	- 字符串函数
		- 连接两个字符串的内容  
`select concat(name,bm) from worker;`  
		- 使用连接符来连接字符串内容
`select concat_ws("是",name,bm) from worker;`  
		- 将字串转成大写	lower（str）将所有字符转成小写（调用者都为select）    	 
		`select upper('aaaaaaasdas')； lower('AAAAAA');`
		- 取str的前num位	
`select left('aaaaaaasdas',6);`  
		- 取str的后num位
`select right('aaaaaaasdas',6)`  
		- 进一取整：`select ceil(10.5456);  输出11`  
		- 整数除法：`select 10 div 3; 输出3`
		- 舍一取整：`select floor（10.5456）输出10`
		- 取余数或模：`select 10 mod 3; 输出1`
		- 幂运算：`select power（2,3）输出8`
		- 四舍五入：`select round(2.5) 输出3`
		- 数字截取：`select truncate（123.35，-2）输出100`
	- 日期时间函数：
		- 当前时间和日期 `new（）` 	
		- 当前日期 `curdate（）`	
		- 当前时间 `curtime（）`
		- 日期的差值 `datediff（”2014-9-3”，”2015-9-6”）`




### SQL事务 
- 事务是一个逻辑工作单元的一系列操作，这些操作要么全部执行成功，要么全部执行失败
- 事务的特性：（ACID性）  
 	- 原子性（Atomic）：事务内部的一系列操作不可再分，要么全部成功，要么全部失败。
	- 一致性（Consistent）：事务执行前后系统中数据的状态必须保持一致性。
	- 隔离性（Isolation）：多个并发事务操作时，一个并发事务只能看到其他事务执行之前或执行之后的数据状态。不能查看其他事务执行过程中的数据状态。
	- 持久性（Durative）:事务一旦执行成功，那么对系统数据的影响是持久性的。
- MySQL中操作事务  
MySQL默认一个SQL语句为一个事务.
	- 要想改变默认设置，则需使用：`start transaction` 或 `begin`  开启事务
	- 提交事务 `commit` 	
	- 设置保存点 `savepoint 保存点名称` 	
	- 回滚到`begin`后一步  `rollback` 
	- 回滚到定义此保存点的位置 `rollback to 保存点名称 ` 
- **事务的隔离级别**
	- 读未提交级别 `read uncommitted`
	> 会出现“脏读””不可重复读””幻读”现象
	- 读提交级别 `read committed`
>会出现“不可重复读”“幻读”现象
	- 可重复读级别 `repeatable read `
>会出现“幻读”现象（InnoDB引擎可以避免“幻读”）
	- 串行化级别 `serializable`
	>最高的隔离级别
`serializable`
- 术语解释：  
**脏读**：一个事务读取了另一个事务修改的但未提交的数据（脏数据）  
**不可重复读**：一个事务两次读取了其他事务不同的修改的提交的数据，导致了两次读取的结果不一致。  
**幻读**：一个事务两次读取的数据记录数量不一致，通常的原因是其他事务增加或删除了记录。

- 查看当前隔离级别
`select @@tx_isolation;`  
- 设置当前会话的隔离级别的命令 
`set session transaction isolation level read uncommitted /read committed /repeatable read /serializable;`  
- 事务的其他概念
>事务的实现是基于数据库的存储引擎，不同的存储引擎对事务的支持程度不一样，**MySQL中支持事务的存储引擎有innoDB和NDB。**innoDB是MySQL默认的存储引擎，默认的隔离级别是RR（repeatable read），并且在RR的隔离级别下更进一步，通过多版本并发控制（MVCC，Multiversion Concurrency Control）解决了不可重复读问题，加上间隙锁（也就是并发控制）解决幻读问题。因此innoDB的RR隔离级别其实实现了串行化级别的效果，而且保留了比较好的并发性能。


>事务的隔离性是通过锁实现，而事务的原子性、一致性和持久性是通过事务日志实现。
	事务日志通过重做（redo）日志和innoDB 存储引擎的日志缓冲（InnoDB Log Buffer）实现
	undo log 主要为事务的回滚服务，undo log记录了数据在每个操作前的状态
	redo log保障的是事务的持久性和一直性，而undo log保障了事务的原子性。

- SQL用户操作及密码操作 
	- 创建用户：
`create user ‘用户名’@‘主机名’identified by ‘密码’；`  
	- 授予权限：`grant select|insert|delete|update|all on 数据库名称.表名称 to '用户名'@'主机名';`
	- 创建用户后分配权限： `grant [权限] on 数据库名称.表名称 to '用户名'@'主机名' identified by '密码';`
	- 收回权限：`revoke [权限] on 数据库名称.表名称 from '用户名'@'主机名'`
	- 修改密码：
`update user set password=password('新密码') where user='用户名';`
`flush privileges;`
- 数据库的备份和恢复  
	1. 备份数据库---将服务器里面的数据库备份成一个.sql文件
   `mysqldump -u用户名 -p密码 --databases testdb > 备份路径 (e:\bak.sql)`
	2. 还原数据库----将.sql文件再还原到数据库
   `mysql -u用户名 -p密码 < 还原路径 (e:\dbbak.sql)`
	3. 备份数据库中的表
   `mysqldump -u用户名 -p密码 数据库名称 表名称 > 备份路径 (eg: e:\tabbak.sql)`
   	4. 还原数据库中的表
   `mysql -u用户名 -p密码 要还原到的数据库名称 < 还原路径 (eg: e:\tabbak.sql)`


### 存储过程
- 存储过程是一组为了完成特定功能的SQl语句集 ，经编译后存储在数据库中，用户通过指定存储过程的名字并给定参数（如果该存储过程带有参数）来调用执行.
- 优点：增强SQl语言的功能和灵活性；是标准的组件式编程；有较快的执行速度；可以减少网络流量；作为一种安全机制来充分利用

- 存储过程中的定义
变量赋值的语法： `set 变量名=变量值；` 
>用户变量一般以@开头

- 在方法或者存储过程中定义一个临时变量的方法：
`declare 变量名 变量类型 default  值；`

>**参数：存储过程根据需要可以有输入、输出、输入输出参数，如果有多个参数使用逗号分隔。（in out inout）  
in参数的值必须在调用存储过程时指定，在存储过程中修改该参数的值不能被返回，为默认值  
out 参数的值可在存储过程内部被改变和返回  
inout参数的值需要在调用时指定，且可被改变和返回**

- 改变默认的结束标志使用关键字 `delimiter 符号` 

自定义存储过程:
```
create procedure 名称（参数类型  参数  参数数据类型）
	begin
	....
	end
	结束标志
```

<font color=red>存储过程的调用要使用call</font>
>特殊语句:选择语句（case）、条件语句（if）、循环语句（while）都需要关闭（end if）


### 自定义函数
- 函数必须在库中调用
```sql
create function nummm(num int)
returns int
	begin
	return num+80;
	end
```
- <font color=red>自定义函数的调用要使用select</font>
### MySQL中的触发器
```sql
delimter //     /*改变结束标志*/
create trigger 触发器名称 before|after  触发事件(insert|delete|update) on 触发器关联的表名称 for each row
begin
触发器执行的逻辑代码
end//
delimter //
```
>
** MySQL的查询优化方法**

>- 优化查询SQL语句。如果连接查询和子查询都可以查询到结果，则优先选择连接查询。因为子查询是会常见零时表，临时表的内容是储存子查询结果的，查询完毕后，还有撤销临时表
- 在频繁使用的列上创建索引（index）
- 拆表。如果一个表中的字段很多，应该讲不常使用的字段存储在另一张表中，原表只保留常用查询字段。
- 增加冗余字段。将需要经常使用的信息以冗余字段的方式添加到表中，省去连接查询的耗时。
- 增加中间表。建立一个中间表，将多张表的查询字段存放在此中间表中。



## Java与MySQl的交互
### 使用JDBC数据库连接
常用类：
DriverManager类
方法：`public static Connection getConnection(String url,String user,String password)`
获取数据库连接对象。
Connection (数据库连接对象)
方法：`PreparedStatement prepareStatement(String sql)`
`void close();//关闭数据库连接`
PreparedStatement(表示预编译的SQL语句的对象，使用此对象操作数据库)
`setInt(int parameterIndex,int x)`
`int executeUpdate()// 执行增、删、改操作。返回：影响表中记录的行数。`
`ResultSet executeQuery()// 执行查询操作。 返回：ResultSet结果集`
JDBC操作数据库的步骤
1. 加载驱动`Class.forName(“org.gjt.mm.mysql.Driver”)`
与数据库建立连接 (创建Connection 对象)
2. `Connection con=DriverManager.getConnection()`
根据连接获取操作对象（创建PreparedStatement对象）进行数据操作（使用此操作对象执行sql语句）
3. `PreparedStatement ps=con.prepareStatement("SQL语句");`
`ps.executeUpdate();`   // 增、删、改
`ResultSet rs=ps.executeQuery();`   // 查询
遍历结果集（rs）
4. 关闭数据库
`con.close();`

例如：
```java
/**
 * 使用JDBC连接数据库
 */
	public static Connection getC() throws Exception {
		Class.forName("org.gjt.mm.mysql.Driver");
		Connection con = DriverManager.getConnection(
				"jdbc:mysql://localhost:3306/java1704","root", "123");
		return con;
	}
```


使用JDBC操作事务
Connection对象对于事务的支持：
`setAutoCommit(boolean autoCommit)`设置自动提交模式，为false表示禁用自动提交模式
`Savepoint setSavepoint（String name）`在当前事务中创建一个具有给定名称的保存点
`rollback（）` 取消在当前事务中进行的所有更改
`rollback（Savepoint savepoint）`回退到保存点状态
`commit（）`提交事务

### DBCP数据库连接池 （database connection poll）
原理：在访问数据库的过程中，数据库连接（connection）是一种很重要且获取很耗时的资源，数据库连接池可以保存一些连接供用户操作，使用完成后将连接重新放回连接池等待重用。数据库连接池可以对连接对象进行分配、管理、重用
使用 BasicDataSource建立连接
代码：
```java
/*
* 需要数据库连接池库 需手动设置驱动、数据库地址、用户名及密码
*/
	public static Connection getC() throws SQLException {
		BasicDataSource ds = new BasicDataSource();
		ds.setDriverClassName("org.gjt.mm.mysql.Driver");
		ds.setUrl("jdbc:mysql://localhost:3306/java1704");
		ds.setUsername("root");
		ds.setPassword("123");
		System.out.println("-------");
		Connection con = ds.getConnection();
		return con;
	}

```

### 使用工厂类获取连接（对配置文件的key有严格要求）
```java
	/*
	 * 需配置文件（dbcpfactory.properties）配置文件需设置数据      *库地址等属性
	 */
	public static Connection getC() throws Exception {
		Properties pro = new Properties();
		// 读取配置文件
		InputStream in = ProDemo.class.getClassLoader().getResourceAsStream(
				"dbcpfactory.properties");
		pro.load(in);// 加载配置文件
		// 使用工厂对象获取数据源
		DataSource ds = BasicDataSourceFactory.createDataSource(pro);
		// 获取数据库连接对象
		Connection con = ds.getConnection();
		return con;
	}
```
### C3P0连接池
步骤：
<font color=red>**将配置文件（c3p0-config.xml）传入项目的src目录下!!!!!!!!**</font>
```java
public static Connection getC() throws SQLException {
		
		ComboPooledDataSource ds = new ComboPooledDataSource();
		Connection con = ds.getConnection();
		return con;

	}
```







