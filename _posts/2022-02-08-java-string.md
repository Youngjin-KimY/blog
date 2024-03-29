---
title: "[Java] String, StringBuffer, StringBuilder"
categories:
  - Java

tags:
  - String
---



자바에서는 문자열을 쉽게 다룰 수 있게 해주는 클래스가 제목같이 3가지가 있다.

각각의 특성이 있어서, 사용시기가 좀 다르니 그냥 막 정리해본다.



두가지 기준으로 처음부터 나눠 볼 것이다.

1. 가변을 기준으로 나눈다.
2. 쓰레딩 상황에서 나눈다.



주어진 문자열이 자주 변한다면, String클래스를 쓰지말자. String 클래스는 문자열에 다른 문자열을 추가하는 경우에 기존의 메모리에 더하는 방식이 아닌 완전히 새로운 메모리를 잡아서 할당을 한다. 기존의 사용되면 메모리는 GC에 의해서 수집되는 과정이 따른다. 즉 자주 변한하면 버려지는 메모리를 수집하는데 오버헤드가 생긴다.



가변이 많으면서 다중 쓰레딩 상황이라면 StringBuffer를 사용하자. 동시성을 위한 클래스라고 한다.

가변이 많지 않은 다중 쓰레딩 상황이라면 String을 사용하자 대충 생각만해봐도 StringBuffer에 비해서 메모리가 더 사용될 것 같다.

가변이 많으면서 단일 쓰레딩 상황이라면 StringBuilder도 좋은 선택이 될 수 있다.

가변이 없다면 String도 좋은 선택이다.



String클래스는 특징이 있다.

```java
String a = "abc";
String a = new String("abc");
```

위와 같은 두 가지 방식으로 선언이 가능하다. 위의 방식이 선호되는데, 그 이유는 String contant pool에 있는 값을 재활용을 하기 때문이다. 예를 들어 "abc"라는 값을 두곳에서 사용한다면, 같은 "abc"값을 사용한다는 의미이다.(주소가 같은거랑은 다른 문제이니 헷갈리면 안된다.)

아래 new를 사용한 방식은 같은 값이어도 각각 선언한다. 그래서 비효율 적이다.