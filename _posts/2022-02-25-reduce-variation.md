---
title: item-1 가변성 제한
categories:
  - Kotlin

tags:
  - Effective Kotlin
---

## ***[item 1] 가변성 제한***

- var보다는 val을 사용하는 것이 좋다.

- mutable 프로퍼티 보다는 immutable 프로퍼티를 사용하는 것이 좋다.

- mutable 객체와 클래스보다는 immutable 객체와 클래스를 사용하는 것이 좋다.

- 변경이 필요한 대상을 만들어야 한다면, immutable 데이터 클래스로 만들고 copy를 활용하는 것이 좋다.

- 컬렉션에 상태를 저장해야 한다면, mutable 컬렉션 보다는 읽기 전용 컬렉션을 사용하는 것이 좋다.

- 변이 지점을 적절하게 설계하고, 불필요한 변이 지점을 만들지 않는 것이 좋다.

  ```kotlin
  var list1 : List<Int> = listOf()
  list1+=1 // [1]
  list1+=1 // [1, 2]
  val list2 : MutableList<Int> = mutableListOf()
  list2.add(1) // [1]
  list2.add(1) // [1, 2]
  
  // 아래코드는 변경지점이 너무 많고, =+도 사용할 수 없다. 동기화 기점도 정하기 어렵다.
  var list3 : MutableList<Int> = mutableListOf()
  ```

  

- mutable 객체를 외부에 노출하지 않는 것이 좋다.

  - 아래코드는 mutable 객체인 `storedUser`를 `super class`형태로 노출시키면서 변할 가능성을 없앴다.

  ```kotlin
  class UserHolder {
    private val storedUser : MutableMap<Int, String> = mutableMapOf()
    
    fun loadAll() : Map<Int, String> {
      return storedUser
    }
  }
  ```

  

Ref. effective kotlin - item_1