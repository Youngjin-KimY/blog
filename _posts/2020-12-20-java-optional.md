---
title: "[Java] Optional"
categories:
    - Java
tags:
    - Optional
last_modified_at: 2020-12-20 23:00:00
---
***Referring to java in Nutshell***<br>
***Reffering to 더 자바, Java 8 written by whiteship in inflearn(https://www.inflearn.com/course/the-java-java8?inst=6fcc1e30)***

1. Description
    - This is a value-based class; Optional is primarily intended for use as a method return type where there is a clear need to represent "no result," and where using null is likely to cause errors.<br> ***in JavaDocs***
2. Usage
    ```
        public static void main(String[] args){
            Optional<Student> st = getStudentById(10);
    
        }
        class Student{
            public int id;
            public String name;
        }
    ```
3. Caution
    - for Return, not param 
    - not for collection(collections already are boxed)
    - use of identity-sensitive operations (including reference equality (==), identity hash code, or synchronization) on instances of Optional may have unpredictable results and should be avoided.
4. APIs
    - For Creating
        - Optional.of()
        - Optional.ofNullable()
        - Optional.empty()
    - For Empty Checking
        - isPresent()
        - isEmpty() (after Java 11)
    - For Get inner data and with Predicate
        - get()
        - ifPresent(Consumer)
        - ofElse(T)
        - orElseGet(Supplier)
        - orElseThrow()
        - Optional.filter()
    - For Converting
        - map(Function)
        - flatMap(function) : Optional<Optional\<T\>\>
