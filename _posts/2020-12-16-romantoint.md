---
title: "[Problem solving] Roman to Integer"
categories:
    - ps
tags:
    - math
last_modified_at: 2020-12-16 23:00:00
---
# *Problem solving*

***usually I solve problems in leetcode***
### Roman to Integer  <br>

problem link : https://leetcode.com/explore/interview/card/top-interview-questions-easy/102/math/878/

1. problem definition
    - 로마숫자를 10진수로 변환하기
    - 조건 
        1. [1,3999]
        2. s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
        3. 1 <= s.length <= 15
    - 각 문자는 다음과 같다.

        |Symbol|Value|
        |:---:|:---:|
        |I|1|
        |V|5|
        |X|10|
        |L|50|
        |C|100|
        |D|500|
        |M|1000|

2. approach
    - 이거는 원리를 이해하면 쉬운데, 그게 아니면 어렵다.
    - ***원리(principle)***
        1. ***내 앞자리문자가 나보다 크거나 같으면 +=***
            - ex. XVI => 1+5+10 = 15
        2. ***내 앞자리문자가 나보다 작은 -=***
            - ex> Iv => 5-1 = 4
    - ***뒤에서 부터 파징하면서 더하거나 뺴주면 끝이다.***
    - 코드
    ```
        class Solution {
            HashMap<Character,Integer> romanNumMap = new HashMap<>();
            public Solution()
            {
                romanNumMap.put('I',1);
                romanNumMap.put('V',5);
                romanNumMap.put('X',10);
                romanNumMap.put('L',50);
                romanNumMap.put('C',100);
                romanNumMap.put('D',500);
                romanNumMap.put('M',1000);
            }
            
            public int romanToInt(String s) {
                if(s.length() == 0) return romanNumMap.get(s);
                
                int len = s.length();
                int pre = romanNumMap.get(s.charAt(len-1));
                int ret = pre;
                for(int i=len-2;i>=0;i--)
                {
                    int cur = romanNumMap.get(s.charAt(i));
                    if(cur>=pre) ret+=cur;
                    else ret -= cur;
                    pre = cur;
                }
                return ret;
            }
        }
    ```
3. 시간 및 공간 복잡도
    - 시간
        1. hashmap 생성 O(1)
        2. 첫 pre o(1)
        3. cur생성 o(lenth of s)
        4. 합 O(length of s) <= O(15)
    - 공간
        1. hashmap 생성 O(6) 대략 O(1)
        2. 짜잘한 문자들 constant O(4) 대략 O(1)
        3. 합 O(1)    
    - 끝