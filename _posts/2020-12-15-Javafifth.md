---
title: "[Java] Java 5주차 과제"
categories:
    - Java
tags:
    - class
last_modified_at: 2020-12-15 23:00:00
---
# *5주차 과제*

***전체적으로는 java in Nutshell을 참고합니다.***
### 공부내용  <br>

1. 클래스 정의하는 방법
    - 생성규칙
        - 하나 이상의 문자
        - 첫글자는 숫자가 될 수 없음
        - '$','_'외의 특수문자를 사용할 수 없음
        - 자바 keyword(while, if) 들을 사용할 수 없음
        - 한글도 가능하다.
        - public class는 파일 이름도 동일해야한다. public class Student -> Student.java
2. 객체 만드는 방법 (new 키워드 이해하기)
    - new 연산자를 이용해서 생성하는데, heap메모리 영역에 생성된다.
    - new class명의 return은 heap영역의 주소
3. 메소드 정의하는 방법
    - 접근 한정자
    
    |한정자|클래스내부|동일패키지|같은 패키지의 하위클래스(상속)|다른 패키지의 하위클래스(상속)|앞의3가지를제외한외부접근|
    |:---:|:---:|:---:|:---:|:---:|:---:|
    |public|O|O|O|O|O|
    |protected|O|O|O|O|X|
    |없음(default)|O|O|O|X|X|
    |private|O|X|X|X|X| <- get,set를 이용
4. 생성자 정의하는 방법
    - public 생성자
        - 객체 생성시 초기화를 담당한다.
        - public + class 명 + param
        - 예시
        ```
            class Student
            {
                private int id;
                private String name;

                // default 생성자
                public Student()
                {}

                // 생성자 오버로딩
                public Student(int id, String name)
                {
                    this.id = id;
                    this.name = name;
                }
            }
        ```
        - 생성자 오버로딩을 한경우에는 default생성자가 자동으로 생성되지 않으니 주의!!
    - private 생성자
        - 인스턴스를 만들 필요가 없는 클래스의 경우사용
            - ex ) Math 클래스가 대표적
        - method && field를 static으로 선언하여, 접근할 수 있도록 함
5. this 키워드 이해하기