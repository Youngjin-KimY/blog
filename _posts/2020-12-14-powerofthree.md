---
title: "[problem solving]"
categories:
    - ps
tags:
    - math
last_modified_at: 2020-12-14 23:00:00
---
# *Problem solving*

***usually I solve problems in leetcode***
### powerOfThree  <br>

link : https://leetcode.com/explore/interview/card/top-interview-questions-easy/102/math/745/

1. problem definition
    - Given an integer n, return true if it is a power of three. Otherwise, return false. An integer n is a power of three, if there exists an integer x such that n == 3x. <br>
    ***Constraints:*** -2<sup>31<sup> <= n <= 2<sup>31</sup> - 1
    ```
        input : 27
        output : true

        input : 45
        output: false
    ```

2. approach
    - 사실 그냥 풀면 쉽다. 포문 여러번 돌려서 나눠보면 끝이니까, 이렇게 풀은걸 여기에 올리진 않을꺼고...
    - follow up에 이런 말이 있었다.  Could you do it without using any loop / recursion?
    - 두가지 방법이 생각났다
        1. log base 3 -> 이건 자바에서 log base 3를 내부적으로 지원해주진 않는것 같다. logA/logB = log<sub>B</sub>A 고딩때인가, 중딩때 나오던 로그함수의 성질을 이용해서 푸는방법이 하나있는데, 이건 약간 오차가 존재한다... 
        2. 두번째는 contraint를 이용한방법이다. 2<sup>31</sup> - 1수보다 큰 3의 제곱수를 만든다음(아마 long이 될꺼다) 그냥 나눠본다. 그래서 나머지가 나오면 3의 제곱수가 아니겠지..이렇게 풀었는데, 대충 빠르게 푼사람들 속도랑 비슷했다.
        ```
            //대충 찍었는데, 3의 20승 정도 하면 2의 31승 -1보다 크지 않을까 생각했다.
            private boolean isCheck(int n){

                //음수는 3의 제곱수가 될수 없다.
                if(n<=0) return false;

                long biggestPowerOfThreeMoreThanInt = 3*3*3*3*3*3*3*3*3*3*3*3*3*3*3*3*3*3*3;
                if(biggestPowerOfThreeMoreThanInt % n == 0) return true;
                return false;
            }
        ```

    - 끝