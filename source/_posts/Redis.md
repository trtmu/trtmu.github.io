---
title: Redis
date: 2018年9月22日23:12:57
hasBQ: true
reward: true
comments: true
tags:
    - Redis
    - 笔记
    - 基础
---

### Redis(非关系型数据库)
- 一个高性能的可基于内存亦可持久化的日志型,Key-Value数据库

> REmote DIctionary Server(Redis) 是一个由Salvatore Sanfilippo写的key-value存储系统。
Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。
它通常被称为数据结构服务器，因为值（value）可以是 字符串(String), 哈希(Map), 列表(list), 集合(sets) 和 有序集合(sorted sets)等类型。 

#### Redis常用命令
> Redis默认使用的端口是<font color=red>6379</font>,可在配置文件中进行修改

- 开启redis服务器`redis-server.exe redis.conf`
- 使用redis客户端`redis-cli.exe`进行连接
- 客户端使用`ping`命令,可检测redis服务是否启动,如果启动则会响应`PONG`
- redis中关于键(key)的操作详见[这里](http://www.runoob.com/redis/redis-keys.html)
- redis中关于字符串(string)的操作详见[这里](http://www.runoob.com/redis/redis-strings.html)
- redis中关于哈希(Hash)的操作详见[这里](http://www.runoob.com/redis/redis-hashes.html)
- redis中关于列表(List)的操作详见[这里](http://www.runoob.com/redis/redis-lists.html)
- redis中关于集合(Set)的操作详见[这里](http://www.runoob.com/redis/redis-sets.html)
- redis中关于有序集合(sort set)的操作详见[这里](http://www.runoob.com/redis/redis-sorted-sets.html) 


### redis配置
> redis配置是在redis安装目录下的redis.conf文件,可以通过CONFIG命令查看或配置

- `CONFIG GET *` 获取所有的配置信息
- `CONFIG GET loglevel` 获取日志的打印级别
- `CONFIG SET loglevel "notice"` 设置日志的打印级别为notive
- reids配置中的其他参数说明见[此处](http://www.runoob.com/redis/redis-conf.html)

### redis的持久化机制
- 两种
    - 快照和追加方式

### Redis的数据类型
> redis支持五种数据类型string(字符串),hash(哈希),list(列表),set(集合)及zset(sorted set：有序集合)

- string(字符串)
    + string是redis最基本的类型,一个key对应一个value,string类型是二进制安全的,意思是redis的string可以包含任何数据,比如j pg图片或序列化的对象,<font color=red>一个键最大能储存512MB</font>
``` 
SET name liu//设置key为name value是liu
GET name //获取key为name 的value
```
- Hash(哈希)
    + Redis hash是一个stirng类型的键值(key-value)对集合,适合存储对象,每个hash可以存储2的32次方-1个键值对(40多亿)
```
//设置值
HSET liu age 23 sex 1
//获取值
HGET liu age/sex
//获取所有值
HGETALL liu
```
- List(列表(有序))
    + Redis列表时简单的字符串列表,按照插入顺序排列(类似于栈,先入栈的位于最底部),可以添加一个元素到列表的头部或尾部,每个列表最多可存储2的32次方-1个元素(40多亿)

```
//设置值
LPUSH array demo1
LPUSH array demo2
LPUSH array demo3
LPUSH array demo4
//获取值(获取从0到10的数据)
LRANGE array 0 10
```
- Set(集合(无序))
    + Set是string类型的无序集合,通过哈希表实现,所以添加,删除,查找的复杂度都是O(1)(与数据量大小无关)
```
//设置值
SADD cardid 653125
SADD cardid 653126
SADD cardid 653127
SADD cardid 653128
SADD cardid 653128
//获取值
SMEMBERS cardid
```
> 注意: 以上实例中 653128添加了两次,但是根据集合中元素的唯一性,第二次插入的元素将被忽略

- zset(sorted set:有序集合)
    + Redis zset和set一样也是string类型元素的集合,且不允许存在重复的成员,不同的是 每个元素都会关联一个double类型的分数,redis正是通过该分数来为集合中的成员进行从小到大的排序,zset的成员都是唯一的,但是分数是可以重复的
    + 添加元素到集合,元素在集合中存在则更新对应score

```
// 设置值
ZADD hobby 0 a
ZADD hobby 1 b
ZADD hobby 2 f
ZADD hobby 2 e

//获取值(获取从0开始到1000的数据)
ZRANGEBYSCORE hobby 0  1000

```

### Redis中的事务
- Redis中使用MULTI来开始一个事务,然后将多个命令入队到事务中,最后使用EXEC命令触发事务,一并执行事务中的所有命令 
- 事务相关的其他命令参见[这里](http://www.runoob.com/redis/redis-transactions.html)

### Redis中的高级操作
- 使用`SAVE`命令创建当前数据库的备份,一般会在开启Redis服务器的位置保存
- 恢复数据只需要将备份文件(demp.rdp)移动到redis安装目录并启动服务即可
- 使用`config get requirepass`可以查看是否设置了密码验证,默认情况下为无密码,可以通过`config set requirepass "new password"`来修改密码,登陆时使用 `AUTH "password"`来进行登陆验证

### Java使用Redis
- 核心包`Jedis.jar`
- 核心类`Jedis jedis = new Jedis("127.0.0.1");`
- 连接池配置
``` java
JedisPoolConfig config = new JedisPoolConfig();
//  设置最大连接对象的个数
config.setMaxTotal(10);
//  设置最大等待时间
config.setMaxWaitMillis(600);
//  设置最大空闲时间
config.setMaxIdle(400);
List<JedisShardInfo> list = new ArrayList<>();
JedisShardInfo e = new JedisShardInfo("10.35.161.25", 6379);
e.setPassword("1234");
list.add(e);
//  分别使用JedisPoolConfig对象和JedisShardInfo的list对象来构建ShardedJedisPool对象
ShardedJedisPool pool = new ShardedJedisPool(config, list);
//  使用ShardedJedisPool对象的getResource（）方法获取ShardedJedis对象
ShardedJedis jedis = pool.getResource();
//  使用ShardedJedis对象的具体方法就可以访问redis数据库
jedis.set("hello", "world");
System.out.println(jedis.get("hello"));
pool.close();
```

### Spring整合Redis
- 核心包`spring-data-redis.jar`
- xml配置文件详解
```xml
<!-- 引入redis的属性文件 -->
<bean id="configure"
    class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    <property name="locations">
        <list>
            <value>classpath:redis.properties</value>
        </list>
    </property>
</bean>
<!-- 设置redis连接池的具体信息 -->
<bean id="poolConfigure" class="redis.clients.jedis.JedisPoolConfig">
    <property name="maxIdle" value="${maxIdle}" />
    <property name="maxTotal" value="${maxTotal}" />
    <property name="maxWaitMillis" value="${maxWaitMillis}" />
</bean>
<!-- redis的连接工厂 -->
<bean id="connectionFactory"
    class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
    <property name="usePool" value="true" />
    <property name="hostName" value="${hostname}" />    
    <property name="port" value="${port}" />
    <property name="timeout" value="${timeout}" />
    <constructor-arg index="0" ref="poolConfigure" />
</bean>
<!-- 创建RedisTemplate对象，来实现redis数据库中数据的具体操作 -->
<bean id="redisTemp" class="org.springframework.data.redis.core.RedisTemplate">
    <property name="connectionFactory" ref="connectionFactory"></property>
</bean>
<!-- userService实例对象 -->
<bean id="userService" class="com.qfedu.service.impl.UserServiceImpl">
    <property name="userDao" ref="userDao"/>
</bean>
<!-- 构建userDao实例对象 -->
<bean id="userDao" class="com.qfedu.dao.impl.UserDaoImpl">
    <property name="redisTemp" ref="redisTemp" />
</bean>
```
- Dao详解
```java
public class UserDaoImpl implements IUserDao {
    //  RedisTemplate redis的模板对象，该对象可以完成redis数据的具体操作
    private RedisTemplate<Serializable, Serializable> redisTemp;
    public void setRedisTemp(RedisTemplate<Serializable, Serializable> redisTemp) {
        this.redisTemp = redisTemp;
    }
    @Override
    public void saveUser(User user) {
        //  使用redisTemplate对象的execute方法来实现具体的操作
        //  该方法需要一个回调对象
        redisTemp.execute(new RedisCallback<Object>() {
            //  在具体的回调方法中实现数据的持久化操作
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                connection.set(
                        redisTemp.getStringSerializer().serialize(user.getUid()),
                        redisTemp.getStringSerializer().serialize(user.getName()));
                
                return null;
            }
        });
    }
    @Override
    public User getUser(String uid) {
        return redisTemp.execute(new RedisCallback<User>() {
            //  在具体的回调方法中实现数据的取值操作
            @Override
            public User doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] key = redisTemp.getStringSerializer().serialize(uid);
                if(connection.exists(key)){
                    byte[] value = connection.get(key);
                    User u = new User();
                    u.setUid(uid);
                    u.setName(redisTemp.getStringSerializer().deserialize(value));
                    return u;
                }
                return null;
            }
        });
    }
}

```
