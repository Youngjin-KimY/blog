---
title: "[CleanCode] form(형식맞추기)"
categories:
    - cleanCode
tags:
    - form
last_modified_at: 2020-12-16 23:00:00
---
# *CleanCode, comment*

#### CleanCode 후가입니다. 오늘부터 이후 몇주가 로버트C.마틴의 클린코드 독후감을 연재합니다.  <br>
***형식을 맞추는 방법은...?***

1. 형식을 맞추는 목적
    - 코드의 형식은 **의사소통**의 일환
    - 코드의 가독성에 지대한 영향을 주며, 이후 확장성에 까지 영향을 줄 수 있다.
2. 적절한 행 길이를 유지하라
    - 큰 파일보다 작은 파일이 이해하기 쉽다. (tomcat같은 거대한 시스템의 평균 200줄 정도)
    1. 신문 기사처럼 작성하라
        - 이름은 간단하면서도, 올바른 모듈을 보듯이 작성한다. 뒤로갈수록 세세하게 작성한다.
    2. 개념은 빈 행으로 분리하라.
        ```
            import lombok.NoArgsConstructor;
            import java.util.function.BinaryOperator;
            @NoArgsConstructor
            public class Calculator {
                public long add(int a, int b)
                {
                    BinaryOperator<Integer> fff = (c,d) -> c+d;
                    return fff.apply(a,b);
                }
                public long minus(int a, int b)
                {
                    BinaryOperator<Integer> fff = (c,d) -> c-d;
                    return fff.apply(a,b);
                }
                public long multiply(Integer ...args)
                {
                    long ret = 1;
                    for(Integer v: args)
                    {
                        ret *= v;
                    }
                    return ret;
                }
            }
        ```
        - 위의 코드는 다 붙여놔서 한눈에 안들어 온다.
        ```
            import lombok.NoArgsConstructor;
            import java.util.function.BinaryOperator;

            @NoArgsConstructor
            public class Calculator {
                public long add(int a, int b)
                {
                    BinaryOperator<Integer> fff = (c,d) -> c+d;
                    return fff.apply(a,b);
                }

                public long minus(int a, int b)
                {
                    BinaryOperator<Integer> fff = (c,d) -> c-d;
                    return fff.apply(a,b);
                }

                public long multiply(Integer ...args)
                {
                    long ret = 1;
                    for(Integer v: args)
                    {
                        ret *= v;
                    }
                    return ret;
                }
            }
        ```
        - 휠씬 눈에 잘 들어오지 않는가???
    3. 세로 밀집도
    4. 수직거리
        - 변수 선언
        - 인스턴스 변수
        - 종속 함수
        - 개념적 유사성
    5. 세로 순서
        - 가로 형식 맞추기
    6. 가로와 공백의 밀집도
    7. 가로정렬
    8. 들여쓰기
        - 들여쓰기 무시하기
    9. 가짜 범위
        - 팀 규칙
        - 밥 아저씨의 형식 규칙
3. 