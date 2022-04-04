---
title: "[OOP] Differences Between Interface and Abstract Class"
categories:
    - Top
tags:
    - Interface
    - Abstract Class
last_modified_at: 2020-07-26 23:00:00
---
# *Interface VS Abstract Class*


### Last week, I made test code with Interface. Suddenly I wanted to check differences between Interface and Abstract Class  <br>

#### *I didn't use interface and abstract class too much in my workspace, so I sometime confuse.*

### ***1. Interface***
- In Java, using "implements" keyword.
    - ex) ```public Soccer implements Sports```
- In C#, writing interface name next to class name with ":".
    - ex) ```public Soccer : Sports```
- Only declare method with parameter, not declare variable and cannot write complete method.
- JavaCode

```
public class main{
    public static void main(String[] args){
        Dog poppy = new Dog();
        poppy.bark();
    }
}

public interface Animal {
    void bark();
}

public class Dog implements Animal {
    private String Name;
    private int Age;
    private String BarkSound="walwal";

    ///...Epillsis...

    @Override
    public void bark() {
        System.out.println(this.BarkSound);
    }
}
```


### ***2. Abstract Class***
- In Java, using "extends" keyword.
    - ex) ```public Soccer extents Sports```
- In C#, writing Abstract name next to class name with ":".
    - ex) ```public Soccer : Sports```
- being able to declare method using "abstract class" keyword, complete method, variable.
- JavaCode

```
public class main{
    public static void main(String[] args){
        Soccer soccer = new Soccer(11,90,"Soccer");
        Soccer.move();
        Soccer.sportName();
        //Up-Down-Right-Left
        //Soccer
    }
}

public class Soccer extends Sport {
    public Soccer(int fieldPlayerName, int fullTime, String sportName) {
        super(fieldPlayerName, fullTime, sportName);
    }

    @Override
    public void sportName() {
        System.out.println(super.getSportName());
    }
}

abstract class Sport {
    private int FieldPlayerName;
    private int FullTime;
    private String SportName;

    ///...Ellipsis...

    public void setSportName(String sportName) {
        SportName = sportName;
    }

    public void move(){
        System.out.println("Up-Down-Right-Left");
    }

    abstract void sportName();
}
```