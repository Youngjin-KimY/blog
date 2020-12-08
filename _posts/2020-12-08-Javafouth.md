---
title: "Java 4주차 과제"
categories:
    - Java
tags:
    - if-else
    - switch
    - while
    - do-while
    - for
    - foreach
last_modified_at: 2020-11-15 23:00:00
---
# *4주차 과제*

***전체적으로는 java in Nutshell을 참고합니다.***
### 공부내용  <br>

1. 선택문
    - if/else<br>
        1) true이면 if 아래의 statement실행, false이면 else 아래의 statement 실행
        2) if의 조건절에는 Wrapper type의 Boolean도 가능한데, 이경우에는 자동으로 Wrapping이 unboxin된다.
    - if/else-if/else
        1) true인 조건아래의 statmenet가 실행됨
    - switch
        1) if/else-if/else와 꽤나 비슷하다고 생각할 수 있으나, 가독성이 뛰어나다.
        2) 각 케이스에서 break를 넣지 않으면 계속 break가 있는곳까지 내려간다는 특징이 있다.
        3) expression은 int, short, char, byte(이들의 wrapper type), String, enum까지 가능하다.
        ```
            int a = 1;
            switch(a){
                case 1:
                    System.out.println(1);
                    break; // 이게 없으면 계속 아래로 내려간다.
                case 2:
                    System.out.println(2);
                    break;
                default: // 가장 아래에 써준다. 모든 케이스에서 실패를 한경우다.
                    break;
            }
        ```

2. 반복문
    - while
    - do while
    - for
    - foreach

3. Junit5
    - 자바전용 테스팅 framework