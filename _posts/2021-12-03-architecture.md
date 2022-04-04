---
title: "사용자 수에 따른 규모 확장성"
categories:
  - Architecture

tags:
  - Architecture
---

1. Web layer should be stateless
   1. 특정 사용자가 특정 서버만 들어가는 상황을 배제
2. All layers are recommended as redundacy(다중화)
3. Caching layer
   1. 잘 쓰면 매우 유용하다
4. Supporting many data centers
   1. 과거 경험에서 한쪽 IDC가 날라갔던 경험이 있기에, 필수
5. Static contents are serviced from CDN
   1. 대부분의 큰회사들은 akamai같은 공급업체를 사용
6. Data layer needs SHARDING
   1. 사실 RDB의 경우가 nosql보다 샤딩이 좀더 어려운듯... 이건 경험의 차이라고 봐야하나..
7. Each layer should be independently serviced
8. Monitoring, automation
   1. 상당히 중요.