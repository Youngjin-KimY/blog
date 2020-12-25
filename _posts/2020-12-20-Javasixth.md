---
title: "[Java] Java 6주차 과제"
categories:
    - Java
tags:
    - Inheritance
last_modified_at: 2020-12-22 23:00:00
---
# *6주차 과제*

***전체적으로는 java in Nutshell을 참고합니다.***
### 공부내용  <br>

1. 자바 상속의 특징
    - 상속은 하나만 가능하다.
    - 모든 클래스는 부모클래스를 갖는다.(```Obeject```제외)
2. super 키워드
    - ```super``` is a reserved keyword(자바에서 예약어이다.)
    - Invoking the constructor of a superclass
    - 이것은 ```this()```의 클래스 내에서 다른 constructor를 부르는 모습과 비슷하다고 할 수 있다.
    - ```super()``` can be used in a contructor.
    - ``` super``` should be first statement in constructor.
    ```
    /// 불가능한 케이스
    /// 부모 클래스
    class classBasic{
        String name;
        String no;

        public classBasic() {
        }

        public classBasic(String name, String no) {
            this.name = name;
            this.no = no;
        }
    }

    class onlineClass extends classBasic{
        public onlineClass() {
            super("hi","01");
        }

        // 이런코드는 불가하다. this(), super()둘다 맨위로 와야하기 떄문이다.
        public onlineClass(String name, String no) {
            this();
            super(name,no);
        }
    }
    ```
3. 메소드 오버라이딩
4. 다이나믹 메소드 디스패치 (Dynamic Method Dispatch)
5. 추상 클래스
6. final 키워드
    - When a class is declared with the ```final``` modifier, it means it cannot be extended or subclassed.(즉 ```final```이 붙은 class는 상속을 받을 수 없다.)
    - ex ) ```java.lang.String```
    - 다른 곳에서 상속하는 것을 원치 않을때, 써라.(Declaring a class with ```final``` prevents unwanted extensions to the class)
7. Object 클래스
    - 모든 클래스는 부모클래스(super class)가 있다. 만약 extends를 통해서 특정 되어지지 않은 경우에는 ```java.lang.Object```가 부모클래스가 된다.
    - ```Object```class는 부모클래스(super class)가 없는 유일한 class.
    - 모든 자바 class들은 직접적이든, 간접적이든 ```Object``` class의 method를 상속한다.