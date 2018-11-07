---
title: SpringData
date: 2018年9月22日23:12:57
hasBQ: true
reward: true
comments: true
tags:
    - SpringData
    - 笔记
    - 基础
    - Java
---

## SpringData

> SpringData是spring出品的一种轻量级的持久层解决方案,提供了强大且轻量的持久层解决方案,SpringData使用Repository作为根接口,该接口负责管理域类及域类的id类型作为参数类型,这个接口主要作为标记接口来工作,常使用它的子接口CrudRepository来实现复杂的Crud操作.


<!--more-->


``` java
public interface CrudRepository<T, ID extends Serializable>
  extends Repository<T, ID> {
    //保存给定的实体
  <S extends T> S save(S entity);      
  //查找给定主键的实体
  Optional<T> findById(ID primaryKey); 
  //返回所有指定的实体
  Iterable<T> findAll();               
  //返回实体的数量
  long count();                        
  //删除给定的实体
  void delete(T entity);               
  //查看对应主键的实体是否存在
  boolean existsById(ID primaryKey);   

  // … more functionality omitted.
}
```


- SpringData最大特点
    - SpringData可以根据相应的接口名称生成对应的JPQL语句
    - SpringData可以使用`@Query`注解实现定制化JPQL语句
    - SpringData使用`@Modifying`结合`@Query`可以实现部分字段的更新
