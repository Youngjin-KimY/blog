---
title: "객체지향 프로그래밍을 향해"
categories:
  - Book-Object

tags:
  - OOP
---

1. 객체는 클래스가 아니다. 클래스는 공통적인 상태와 행동을 공유하는 객체들을 추상화 한 결과
2. 객체는 독립적이지 않다.



도메인(Domain) 사용자가 프로그램을 사용하는 분야



### 객체(instance)

1. 상태와 행동을 가지는 복합적인 존재
2. 스스로 판단하고 행동하는 자율적인 존재
3. 캡슐화 - 데이터와 기능을 객체 내부로 묶어버리는 개념



### OOP의 요소

1. 캡슐화

2. 상속과 구현
   1. 상속 장점 : 코드의 재사용
   2. 상속 단점 : 캡슐화가 약화됨, child 가 parent를 잘 알고 있어야하기 때문이다. 설계가 유연하지 않음. Parent를 변경하면 child도 변경해야하는 경우도 많음

3. 다형성

   1. 다형성은 이론적으로 **여러 형태를 받아 들일 수 있는 성질**..라는 어려운 말로 설명하는데, 좀더 구체적으로 쓰면, 컴파일타임과 실행타임의 의존성이 달라진다고 설명할 수 있는데, 이는 ***"추상클래스"*** 혹은 ***"인터페이스"*** 통해서 만들 수 있다.

   2. ```java
      public abstract class Animal {
          protected String name;
      
          public void printName() {
              System.out.println(this.name);
          }
      }
      
      class Lion extends Animal {
          public Lion() {
              super.name = "Lion";
          }
      }
      
      class Tiger extends Animal {
          public Tiger() {
              super.name = "Tiger";
          }
      }
      
      class Monkey extends Animal {
          public Monkey() {
              super.name = "Monkey";
          }
      }
      ```

      ```java
      public class Zoo {
          private List<Animal> animals = new ArrayList<>();
      
          public void GetherAnimals(Animal ... animals) {
              this.animals = Arrays.asList(animals);
          }
      
          public List<Animal> animals() {
              return this.animals;
          }
      }
      ```

      ```java
      public class main {
          public static void main(String[] args) {
              Zoo zoo = new Zoo();
              zoo.GetherAnimals(new Lion(), new Monkey(), new Tiger()); // 이곳에서 GetherAnimals에 파라메터는 실제로 실행되는 이때와 위쪽에 Zoo 클래스 내부에서 작성되는 때와 다른 클래스가 존재하게 된다. 이런경우를 다형성을 적용한 경우이며, lazy binding 또는 dynamic binding이라고 한다.
              List<Animal> animalList = zoo.animals();
              for(Animal animal : animalList) {
                  animal.printName();
              }
          }
      }
      ```

      

