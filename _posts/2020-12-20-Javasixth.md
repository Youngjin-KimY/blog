---
title: "[Java] Java 6주차 과제"
categories:
    - Java
tags:
    - Inheritance
    - Dynamic method dispatch
last_modified_at: 2020-12-22 23:00:00
---
***전체적으로는 java in Nutshell을 참고합니다.***
### 공부내용  <br>

1. 자바 상속의 특징
    - 상속은 하나만 가능하다.
    - 모든 class super class를 갖는다.(```Obeject```제외)
2. super 키워드
    - ```super``` is a reserved keyword(자바에서 예약어이다.)
    - Invoking the constructor of a superclass
    - 이것은 ```this()```의 class 내에서 다른 constructor를 부르는 모습과 비슷하다고 할 수 있다.
    - ```super()``` can be used in a contructor.
    - ``` super``` should be first statement in constructor.
    
    ```
    /// 불가능한 케이스
    /// super class
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
    
    // sub class
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
3. 메소드 오버라이딩(method overriding)
    - super class에 존재하는 method를 선언부가 완전히 동일하게, 내용만 바꾸는 것(overloading과 헷갈리면 안된다. overloading은 method 이름만 같고 완전 새롭게 만드는 경우)
    - 조건
        - super class에서 만들어진 접근제어자보다 좁은 범위를 사용할수 없다.(부모가 public이면 sub class에선 다른 접근 제어자를 사용할 수 없음)
        - super class의 예외처리보다 더 넓은 예외처리를 할수 없다.
    
    ```
    public class man {
        private String name;
        private int age;
        private char sex;
    
        public man(String name, int age, char sex) {
            this.name = name;
            this.age = age;
            this.sex = sex;
        }
    
        ///..... getter and setter are omitted.......
    
        public void isAdult() {
            boolean ret = false;
            if (this.age >= 20) {
                ret = true;
                System.out.println(ret);
            }
            else {
                System.out.println("you are not adult");
            }
        }
    }
    
    public class student extends man{
        public student(String name, int age, char sex) {
            super(name, age, sex);
        }
    
        // 아래 코드는 overriding
        // 선언부는 super class와 동일하다. 다만 내용이 다르다.
        @Override
        public void isAdult() {
            if(this.getAge() >= 20){
                super.isAdult();
            }
            else{
                System.out.println(String.format("you needs %d years",20-this.getAge()));
            }
        }
    }
    ```
4. 다이나믹 메소드 디스패치 (Dynamic Method Dispatch)
    - interface또는 abstract class의 함수를 호출할시 사용되는 개념
    - compilte time에는 실제로 구현체를 알 수 없으나, runtime시 sub class가 구현한 내용을 실행
    - 예시 ```animal``` abstract class를 상속 받은 ```Cow, TRino``` class 예제
    
    ```
    // super class
    public abstract class animal {
        public boolean isPredator;
    
        public animal(boolean isPredator) {
            this.isPredator = isPredator;
        }
    
        boolean isPredator(){
            return this.isPredator;
        }
    
        // 이 함수를 호출하는 경우에 실제 구현체에 따라서
        // 다른 결과가 나온다.
        abstract void printKind();
    }
    
    // two sub classes
    class TRino extends animal{
        // ... omitted ...
    
        @Override
        void printKind() {
            System.out.println(this.kind + ": " + "hi TRino");
        }
    }
    
    class Cow extends animal{
        // ... omitted ...
    
        @Override
        void printKind() {
            System.out.println(this.kind + ": " + " hi cow");
        }
    }


    // 이 클래스에서는 abstract animal class를 상속받은 class들이
    // parameter가 되어서, abstract method를 실행하는 일을 doAction
    // 에서 한다.
    // 위에서는 TRino와 Cow에서 실제로 구현한 코드에 따라서 실행
    public class dispatch {
        public void doAction(animal obj){
            obj.printKind();
        }
    }
    
    public class App{
        public static void main(String[] args){
            animal t = new TRino("dino",true);
            animal c = new Cow("mammal",false);
            dispatch dispatch = new dispatch();
            dispatch.doAction(t); // print "dino : hi TRino" 
            dispatch.doAction(c); // print "mammalia : hi cow"
        }
    }
    ```
    - 결론적으로 runtime에 실제 구현내용을 알수 있으며, 객체지향적으로 if문을 푸는 모습도 보여줄 수 있다.
    - 추가(Vision pattern)
5. 추상 클래스(abstract class)
    - 상속을 받으면서 구현이 가능한 클래스, 단독으로는 사용이 불가능하다. 상속을 통해서만 사용한다.
    - ```abstract``` 키워드를 이용해서 사용할수 있다. 클래스 이름 앞에 붙일수 있고, method에도 abstract를 붙이면, 상속받는 자식클래스에서 반드시 구현해줘야 한다.

    ```
     public abstract class animal {
        public boolean isPredator;
    
        public animal(boolean isPredator) {
            this.isPredator = isPredator;
        }
    
        boolean isPredator(){
            return this.isPredator;
        }
    
        abstract void printKind();
    }
    
    class TRino extends animal{
        public String kind;
        
        public TRino(String kind,boolean isPredator) {
            super(isPredator);    
            this.kind = kind;
        }
    
        @Override
        void printKind() {
            System.out.println(this.kind);
        }
    }
    ```
6. final 키워드
    - When a class is declared with the ```final``` modifier, it means it cannot be extended or subclassed.(즉 ```final```이 붙은 class는 상속을 받을 수 없다.)
    - ex ) ```java.lang.String```
    - 다른 곳에서 상속하는 것을 원치 않을때, 써라.(Declaring a class with ```final``` prevents unwanted extensions to the class)
7. Object 클래스(API 추가할 것)
    - 모든 클래스는 부모클래스(super class)가 있다. 만약 extends를 통해서 특정 되어지지 않은 경우에는 ```java.lang.Object```가 부모클래스가 된다.
    - ```Object```class는 부모클래스(super class)가 없는 유일한 class.
    - 모든 자바 class들은 직접적이든, 간접적이든 ```Object``` class의 method를 상속한다.