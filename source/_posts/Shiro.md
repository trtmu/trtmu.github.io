### Shiro

> Apache Shiro 是一个强大的java安全框架,提供了<font color=red>认证,授权,加密和会话管理</font>等功能,对于任何一个应用程序,Shiro都可以提供全面的安全管理服务.  
> 关于shiro的所有介绍请查看[这里](https://www.w3cschool.cn/shiro/)

#### Shiro的核心对象
- Subject：是Shiro对外提供的一个"门面",外部都直接调用该对象,Subject会调用SecurityManager来实现相应功能；
- SecurityManager：SecurityManager(安全管理器)是Shiro的核心,负责与Shiro的其他后端组件(Realm)行交互并将处理返回给Subject对象,类似于SpringMvc中的DispatcherServlet 所有具体的交互都通过 SecurityManager 进行控制；它管理着所有 Subject、且负责进行认证和授权、及会话、缓存的管理。
- Authenticator：认证器，负责主体认证的，这是一个扩展点，如果用户觉得 Shiro 默认的不好，可以自定义实现(通过继承该类或该类的子类)；其需要认证策略（Authentication Strategy），即什么情况下算用户认证通过了；
- Authrizer：授权器，或者访问控制器，用来决定主体是否有权限进行相应的操作；即控制着用户能访问应用中的哪些功能；
- Realm：可以有 1 个或多个 Realm，可以认为是安全实体数据源，即用于获取安全实体的；可以是 JDBC 实现，也可以是 LDAP 实现，或者内存实现等等；<font color=red>由用户提供</font>；注意：Shiro 不知道你的用户 / 权限存储在哪及以何种格式存储；所以我们一般在应用中都需要实现自己的 Realm；
SessionManager：Session 需要有人去管理它的生命周期，这个组件就是 SessionManager；而 Shiro 并不仅仅可以用在 Web 环境，也可以用在如普通的 JavaSE 环境、EJB 等环境；所以Shiro 就抽象了一个自己的 Session 来管理主体与应用之间交互的数据；这样的话，如我们在 Web 环境用，刚开始是一台 Web 服务器；接着又上了台 EJB 服务器；这时想把两台服务器的会话数据放到一个地方，这个时候就可以实现自己的分布式会话（如把数据放到 Memcached 服务器）；
SessionDAO：用于会话的 CRUD，比如我们想把 Session 保存到数据库，那么可以实现自己的 SessionDAO，通过如 JDBC 写到数据库；比如想把 Session 放到 Memcached 中，可以实现自己的 Memcached SessionDAO；另外 SessionDAO 中可以使用 Cache 进行缓存，以提高性能；
CacheManager：缓存控制器，来管理如用户、角色、权限等的缓存的；因为这些数据基本上很少去改变，放到缓存中后可以提高访问的性能
Cryptography：密码模块，Shiro 提高了一些常见的加密组件用于如密码加密 / 解密的。

