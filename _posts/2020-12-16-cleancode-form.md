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
    1. 신문 기사처럼 작성하라<br>
        이름은 간단하면서도, 올바른 모듈을 보듯이 작성한다. 뒤로갈수록 세세하게 작성한다.
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

            위의 코드는 다 붙여놔서 한눈에 안들어 온다.

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
            휠씬 눈에 잘 들어오지 않는가??? <br>
    
        3. 세로 밀집도<br>
        밀접한 의미를 가진 인스턴스 변수 가까이 두는것을 의미한다.
        ```
            public class Student
            {
                /**
                * 이름
                */
                private String name;
                /**
                * student 속성
                */
                private List<Property> properties = new ArrayList<>();
            }

            -> 이것보다는

            public class Student
            {
                private String name;
                private List<Property> properties = new ArrayList<>();
            }
        ```
        아래 코드는 클래스의 변수를 한눈에 확인이 가능하다.

        4. 수직거리
        - 밀접한 내용은 근처에 둬야한다. 같은 파일에 둬야한다. 연관성이 깊은 두 개념이 멀리 떨어져 있으면, 코드를 읽는 사람이 소스 파일과 클래스를 뒤지게 된다.
        - 변수 선언<br>
            사용하는 위치에 최대한 가까이 선언한다.
        - 인스턴스 변수<br>
            클래스 맨 처음에 선언한다. 변수간에 세로로 거리를 두지 않는다.(아래 거리를 많이 두지 말라는 뜻)
        - 종속 함수<br>
            한 함수가 다른 함수를 호출하면, 두 함수는 근처에 두자. 그리고 호출하는 함수를 먼저 배치한다.
        - 개념적 유사성<br>
            개념적인 친화도가 높은 경우 가까이 배치한다. 대표적인 예) 종속함수
            ```
                public class Assert{
                    static public void assetTrue(boolean condition){
                        assertTrue(null, condition);
                    }

                    static public void assertTrue(String message, boolean condition){
                        if(!condition)
                            fail(message);
                    }
                    ....
                }
            ```
        5. 세로 순서
            - 함수 호출의 종속성은 아래 방향으로 유지한다.<br>
                호출하는 함수가 호출되는 함수보다 먼저 쓴다. 가장 중요한 개념을 맨 처음에 표현한다.
            - 가로 형식 맞추기<br>
                오른쪽으로 스크롤할 필요없게 코드를 짰다. 가급적이면 오른쪽으로 길지 않게하자.
        6. 가로와 공백의 밀집도
            - 밀접할수록 띄어쓰지 않는다.
        7. 가로정렬
            - 하지마라
            ```
                public class FitNesseExpediter implements ResponseSender
                {
                    private Socket      socket;
                    private Inpustream  input;
                    ...

                    public FitNesseExpediter(Socket s, FitNesseContext context) throws Exception
                    {
                        this.context =          context;
                        socket =                s;
                        ...
                    }
                }
            ```
            - 코드가 엉뚱한 부분을 강조해 진짜 의도가 사라진다.
            - 타입은 무시하고, 변수이름부터 보게 된다거나, 그런 이슈가 존재한다.
        8. 들여쓰기
            - 계층을 확인할수 있다. 코드가 속하는 범위를 시각적으로 표현한다.
            - 들여쓰기 무시하기
                - 떄로 간단한 경우는 아래와 같이 무시하기도 한다. 하지만 들여쓰기로 범위를 제대로 표현하는게 더 좋다.
                ```
                    public class CommentWidget extends TextWidget
                    {
                        public CommentWidget(){}
                        public CommentWidget(ParentWidget parent, String text){super(parent, text);}
                    }
                ```
        9. 가짜 범위
            - 빈 while && for문에 사용한다.
            ```
                while(dis.read(buf,0,readBufferSize) != -1)
                ; // 새행에다 제대로 들여써서 넣어준다.
            ```
            이건 이해가 잘안감...
            - 팀 규칙
                - 팀에 속했다면 가장 선호해야하는 팀 규칙이다.