---
title: [item 2] 변수의 스코프를 줄이자
categories:
  - Kotlin

tags:
  - effective Kotlin
---

## ***[item 2] 변수의 스코프를 줄이자***

- 상태를 정의할 때는 변수와 프로퍼티의 스코프를 최소화 하자

  ```kotlin
  // bad
  var user : User
  for (int i in users.indices) {
    user = users[i]
    print("User at $i is user")
  }
  
  // little better
  var user: User
  for(i in users.indices) {
    user = users[i]
    println("User at $i is $user")
  }
  
  // best
  for((i, user) in users.withIndex()) {
    println("User at $i is $user")
  }
  ```

  결국에서 변수를 반복문 안쪽에서만 쓸수 있도록 그중에서도 더 줄일 수 있으면 좋다. `best`의 경우에는  `user`변수가 따로 `for`문의 선언부에서만 작동을 하는 것을 볼 수 있다.

- 캡쳐링 

  - `sequence` builder를 사용했을 때 나타난다.
  - 스코프를 늘리면 변수의 캡쳐링이 일어나서 잘못된 값이 나오기도 한다.

  ```kotlin
  // 정상적인 코드
  fun right() {
  val primes : Sequence<Int> = sequence{
    var nums = generateSequence(2) { it + 1 }
    
    while(true) {
      val prime = nums.first()
      yield(prime)
      
      nums = nums.drop(1).filter{ it % prime != 0}
    }
  }
  
  println(primes.take(10).toList())
  }
  
  //실수한 코드
  fun error() {
  	val primes : Sequence<Int> = sequence{
    var nums = generateSequence(2) { it + 1 }
    
    var prime : Int
    while(true) {
      prime = nums.first()
      yield(prime)
      
      //내용이 어려운데, 여기서 prime 변수가 while scope 밖에 있기 때문에, filter가 한번만 일어나고 나서
      //drop(1)이 실행되는 구조이다. 그래서 prime값이 2일경우 4만 제한상태에서 filtering이 끝난다. 
      //prime변수가 scope내로 들어오면서 capturing이 된다고 하는데, 좀 더 공부하고 이해해야 감이 올 것 같다.
      //이런 이슈를 제외하기 위해서라도 scope를 줄이다.
      nums = nums.drop(1).filter{ it % prime != 0}
    	}
  	}
  
  	println(primes.take(10).toList())
  }
  ```

- 결론 `scope` 를 줄이자.

Ref. effective kotlin - item_2