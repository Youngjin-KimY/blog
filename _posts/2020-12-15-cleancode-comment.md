---
title: "[CleanCode] Comment(주석)"
categories:
    - CleanCode
tags:
    - Comment
last_modified_at: 2020-12-15 23:00:00
---
# *CleanCode, comment*

#### CleanCode 후기입니다. 오늘부터 이후 몇주가 로버트C.마틴의 클린코드 독후감을 연재합니다.  <br>
***주석을 잘 다는 방법은...?***

1. intro
    - 잘 달린 주석은 유용하지만, 나쁜코드에 주석을 달기보단 새로 만들어라.
    - 사실 주석은 "실패".
    - 시간이 흐를수록, 주석과 코드는 멀어진다.
    - 부정확한 주석은 없는것보다 더 나쁘다.

2. 주석은 나쁜코드를 보완하지 못한다.
    - 주석을 다는 이유 : 코드 품질이 낮은 경우가 많다.
    - 주석을 달바엔 코드를 깔끔하게 정리할것

3. 코드로 의도를 표현하라
    ```
        //직원에게 복지 혜택을 받을 자격이 있는지 확인한다.
        if((employee.flags && HOURLY_FLAGS) && (employee.ages > 65))
    ```
    -> 변경한다. 꽤 많은 경우 코드로 ***의도***를 표현할 수 있다.
    ```
        if(employee.isEligibleForFullBenefits())
    ```

4. 좋은 주석
    - 법적인 주석
        - 법적인 이유로 넣는 저작권, 소유권 정보에 관한 주석은 포함해도 좋다고 한다.
        - 예시 : opensource열어보면 좀 있다.
    ```
        //Copyright (C) 2003, 2004, 2005 by Object Montor, Inc. All right reserved.
    ```
    - 정보를 제공하는 주석
        - 기본적인 정보를 주석으로 제공
        - 예를 들면, 추상메서드의 리턴값이나 regex형식 같은 류가 대표적이다.
        ```
            // 테스트중인 student인스턴스를 반환한다.
            public abstract Student studentInstance();
        
            // kk::mm:ss EEE, MMM dd, yyyy형식이다.
            Pattern timeMatcher = Pattern.complie(
                "\\d*:\\d*:\\d*\\w*,\\w*\\d*,\\d*")
        ```
        - 함수로 의미를 명확하게 나타낼 수 있는 이름이 있다면 함수도 한번 더 싸는게 좋다. 그러면 주석도 필요가 없어진다.
    - 의도를 설명하는 주석
        ```
            public void testConcurrentAddWidgets() throws Exception {
                WidgetBuilder widgetBuilder =
                    new WidgetBuilder(new Class[]{BoldWidget.class});
                String text = "'''bold text'''";
                ParentWidget parent = 
                        new BoldWidget(new MockWidgetRoot(), "'''bold text'''");
                AtomicBoolean failFlag = new AtomicBoolean();
                failFlag.set(false);
                
                // 스레드를 대량 생성하는 방법으로 어떻게든 경쟁 조건을 만들려 시도한다.
                for(int i=0; i<25000; i++)
                {
                    WidgetBuilderThread widgetBuilderThread = 
                            new WidgetBuilderThread(widgetBuilder, text, parent, failFlag);
                    Thread thread = new Thread(widgetBuilderThread);
                    thread.start();
                }
                assertEqual(false, failFlag.get());
            }
        ```
        ... 저자의 의도가 분명히 보인다는데... 주석의 의미는 크게 모르겠다.
    - 의미를 명료하게 밝히는 주석
        - 때로는 모호한 인수나 반환값은 그 의미를 읽기 좋게 표현하는 식의 주석의 의미가 있다.
        ***-> 인수나 반환값 자체를 명확하게 만들 수 있다면 더욱 좋다.***
        ```
            public void testCompareTo() throws Exception
            {
                WikiPagePath a = PathParser.parse("pageA);
                WikiPagePath ab = PathParser.parse("pageA.pageB);
                WikiPagePath b = PathParser.parse("pageB);
                ...
        
                assertTrue(a.compareTo(a) == 0) // a == a
                assertTrue(a.compareTo(b) != 0) // a !=b
                ....
            }
        ```
        - 위의 주석들은 의미를 좀더 명료하게 해준다. 그런데 실수로 적을때는 문제가 커질테니, 신중해야한다. 더 나은 방법이 있다면 주석이 아닌 함수 같은 방법으로 푸는것도 필요할 것 같다.
    - 결과를 경고하는 주석
        - 다른 프로그래머에게 결과를 경고하기 위해서 사용한다. 주의하지 않는 경우에 문제가 발생한 경우에 한번 더 인지를 하기 위해서 사용
        - 예 1) 테스트가 너무 오래 걸리니 주의 -> ***Junit4***이후로는 @Ignore("오래걸림") 이런식으로 안내가 가능
        - 예 2) 스레드에 안전하지 못함
        ```
            public static SimpleDateFormat makeStanardHttpDateFormat()
            {
                // SimpleDateFormatd은 스레드에 안전하지 못하다. 독립적으로 실행할 것
                SimpleDateFormat df = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z");
                df.setTimeZone(TImeZone.getTimeZone("GMT));
                return df;
            }
        ```
        - 프로그래머가 코드만 보고 알 수 있으면 매우 좋으나, 실력이 다 다르니... 위의 예에서 내부의 주석을 보며 실수를 면할 수 있다.
    - TODO 주석
        - 앞으로 할일을 적어둔다. 삭제해야하거나, 발생한 이벤트에 맞춰서 등등 IDE에서 찾기도 쉽다
        ```
            // TODO-MdM 현재 필요하지 않다.
            // 체크아웃 모델을 도입하면 함수가 필요 없다.
            protected VersionInfo makeVersion() throws Exception
            {
                throw new NotImplemented();
            }
        ```
        - 주기적으로 필요없는 TODO는 삭제해주자
    - 중요성을 강조하는 주석
        - 대수롭지 않다고 여겨질 내용을 위해서 달아놓는다. refactoring시에도 도움이 될 것같다.
        ```
            String listItemContent = match.group(3).trim();
            // 여기서 trim은 정말 중요하다. trim 함수는 문자열에서 시작 공백을 제거한다.
            // 문자열에 시작 공백이 있으면 다른 문자열로 인식되기 떄문이다.
        ```
    - 공개 API에서 JAVA Docs
        - Javadocs덕분에 표준 자바 라이브러리를 쉽게 사용할 수 있게 되었다.

5. 나쁜주석
    - 코드와 주석의 내용이 맞지않고, 코드를 더럽히고, 소스관리 프로그램으로 표현이 가능하며,코드로 설명이 가능한데 습관적으로 붙여놓은것들... 다 나쁜거다.
    - 주절거리는 주석
    - 같은 이야기를 중복하는 주석
    - 오해할 여지가 있는 주석
    - 의무적으로 다는 주석
    - 이력을 기록하는 주석
        - 소스관리 프로그램에서 해줄꺼라 굳이 할 필요가.. 날짜 다 나옴
        ```
           
           /*
            * 변경이력 (11-Oct-2001 부터)
            * -------------------------------
            * 11-Oct-2001 : 클래스를 정리하고 ...
            *
            */
        ```
    - 있으나 마나 한 주석(무서운 잡음 내용과 비슷 Javadocs에서 있으나 마나한 북붙 주석...이 존재)
        ```
        
            /**
            * 기본 생성자
            */
            protected AnnualDateRule()
            { }
        ```
        - 위와같은 이런 주석이 필요할까??
        ```
            private void startSending()
            {
                try
                {
                    doSending();
                }
                catch(SocketExceptione e)
                {
                    // 정상, 누군가 요청을 멈췄다.
                }
                catch(Exception e)
                {
                    try
                    {
                        response.add(ErrorResponder.makeExceptionString(e));
                        response.closeAll();
                    }
                    catch(Exception e)
                    {
                        // 이게 머야!
                    }
                }
            }
        
            -> refactoring 한다. 짜증을 낼 시간에 마지막 부분을 독자적인 함수로 묶어내야 한다.
        
            private void startSending()
            {
                try
                {
                    doSending();
                }
                catch(SocketExceptione e)
                {
                    // 정상, 누군가 요청을 멈췄다.
                }
                catch(Exception e)
                {
                    addExceptionAndCloseResponse(e)
                }
            }
        
            private void addExceptionAndCloseResponse(Exception e)
            {
                try
                {
                    response.add(ErrorResponder.makeExceptionString(e));
                    response.closeAll();
                }
                catch(Exception e1)
                {
        
                }
            }
        ```
        - 위에서는 Exception을 param으로 묶어내는 것을 받아서 쓸떼없는 주석을 없앴다.
    - 함수나 변수로 표현할수 있는 주석
        - 코드로 설명이 된다면, 주석을 쓰지 않고 코드로 개선하자
    - 위치를 표시하는 주석
        - 간혹 존재하는 //////Action///////// 이런거 필요없다.
        - C#에서는 region ~ endregion으로 묶어주면 될것같다.
    - 닫는 괄호에 다는 주석
        - 중첩이 심한 경우에 사용한다. 그럴바에는 함수로 묶어내자
        ```
            while(true)
            {
                if(...)
                {
                    try{
                        switch(i)
                        {
                            ...
                        }
                    }
                    catch(Exception e)
                    {
        
                    }
                }
                else
                {
        
                }
                .... 
            }// while
        ```
        - 내부의 로직을 따로 뺴서 //while같은 것을 없애자
    - 공로나 저자를 표시하는 주석
        - 소스관리프로그램을 보면 다 나오니까, 굳이 할 필요가 있을까??
    - 주석으로 처리한 코드
        - 1960년대 쯤에는 유용했는데, 지금은 소스관리 프로그램에서 해주니까, 지우자
        - 우리도 꽤 많은데....
    - HTML 주석
    - 전역정보
        - 코드에는 관련한 내용만 달자, 기본 전역 값을 써 놓을 필요는 없다.
        ```
        
            /**
            * 사용하는 포트정보 : 기본값은 3309
            */
            public void setPort(int port)
            {
                this.port = port;
            }
        ```
    - 너무 많은 정보 
        - 역사나 관련없는 내용 쓰지 말아라
        - 아래 예시는 base64를 인코딩/디코딩 하는 함수에서 존재하는 주석인데, RFC 2045말고는 불필요한 정보다...
        ```
        
            /*
                RFC 2045 : Multipurpose Internet Mail Extension (MIME)
                1부 : 인터넷 메시지 본체 형식
                6.8절. Base64 내용 전송 인코딩(Content-Transfer-Encoding)
                인코딩 과정은 ....
            */
        ```
    - 모호한 관계
        - 주석과 설명하는 코드는 관계가 명확해야한다. 
    - 함수헤더
        - 주석보다는 짧고 하나의 기능만 그리고 이름이 명확한 함수를 만들자.
    - 비공개 코드에서는 Javadocs
        - 공개안하는데 javadocs가 필요할까??? 코드만 보기 힘들어진다.