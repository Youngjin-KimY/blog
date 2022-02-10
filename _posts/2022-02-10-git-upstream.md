---
title: git upstream
categories:
  - Git

tags:
  - upstream
---



혼자서 작업을 하다보면 심심치 않게 보는 `git upstream` 어쩌구 저쩌구... 맨날 이게 뭐였더라 찾아보고 다시 까먹고 반복한다.



이렇게만 보면 `git`  을 안써본 사람인가 싶지만.. 한 100명쯤 같이 쓰는 레포에서도 일을 했어서, 끄적거릴때는 거의 안쓰는 `cherrypick` 이라던지 `git rebase -i` 로 합치면서 머지하는 등등 어떻게든 스파게티같은 커밋들을 피해가려고 노력을 많이 했었다.



근데 여전히 허접이라는 생각이 가득하다....



하지만.. 팀바팀 이라고 했던가, 옆팀은 본인 팀 레포도 fork떠서 썼었는데, 나는 그럴기회가 없었다. 아무래도 정신없이 돌아가는 상황에서 일일히 pr을 전부 확인하기는 쉽지 않기도 했고(중요한것만 꼭 확인부탁 했었다.. 맞는건 아니겠지만), pr을 확인하지 않는다면 fork떠서 하는 것은 불편함만 가중시키는게 아닐까 생각해본다.



그리고 뭐 opensource에 pr도 몇번안되서.. 까먹고 있었다.. 왜 이렇게 장황하게 썼을까??

바로 upstream branch는 바로.. fork를 뜬 내 origin repo의 오리진이다..  



그림으로보면 아래와 같다. upstream에서 fork를 떠서 origin에 작업을 하는것이다.

<img src="/Users/timyjkim/workspace/Youngjin-KimY.github.io/assets/images/image-20220210122316921.png" alt="image-20220210122316921" style="zoom: 67%;" />



근데 나는 대부분 아래와 같이 일을 했기에 upstream을 애매하게 알고 있던 것이다.

<img src="/Users/timyjkim/workspace/Youngjin-KimY.github.io/assets/images/image-20220210122430087.png" alt="image-20220210122430087" style="zoom:67%;" />



끝. 이제 슬슬 연차도 차가는데 바보같이 있을 수 없어서 정리합니다. 누구 읽으라고 쓴게 아니라서 그림도 대충그렸습니다..