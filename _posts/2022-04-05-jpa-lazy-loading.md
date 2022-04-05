---
title: "[Jpa] Sql join, Lazy loading and EntityGraph"
categories:
  - Jpa

tags:
  - Lazy loading
  - EntityGraph
---

1. Why Lazy loading?

   1. Spring-Data-Jpa는 Join을 해야하는 상황에서 현재 당장 값이 필요하지 않다면, proxy객체로 비우고 단일 테이블 접근 쿼리를 시행할 수 있도록 아래와 같은 annotation으로 세팅이 가능하다.

      ```java
      @ManyToOne(fetch = FetchType.LAZY)
      ```

   		2. 실제로 해당 객체가 필요할 때, `select` 쿼리로 가져온다.

2. 실제 예시로 한번 알아보자.
   1. 아래와 같은 entity relation이 있다고 생각해보자.<img src="../assets/images/onetomany.png?raw=true" alt="image-20220210122316921" style="zoom:" />

3. class 설정은 아래와 같다.

```java
@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id","username","age"})
public class Member extends BaseTimeEntity{
		//...중략...
    @ManyToOne(fetch = FetchType.LAZY) // 실무에서는 lazy로 쓴다.
    @JoinColumn(name = "team_id")
    private Team team;
  	//...중략...
}

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id","name"})
public class Team extends BaseTimeEntity{
		//...중략...
    @OneToMany(mappedBy = "team")
    private List<Member> members = new ArrayList<>();
		//...중략...
}

```

4. Member만 조회할때는, `Lazy`로 인해서, Team을 채우지 않고 조회한다.

   ```java
   List<Member> all = memberRepository.findAll(); // 1
   for(Member m : all) {
     System.out.println("member: " + m.getUsername()); // 2
     System.out.println("team: " + m.getTeam().getName()); // 3
     System.out.println("team.class: " + m.getTeam().getClass()); // 4
   }
   ```

   1번 라인이 실행될때, 아래와 같은 쿼리가 실행되고

   ```sql
   select
   	member0_.member_id as member_i1_0_,
   	member0_.created_at as created_2_0_,
   	member0_.modified_at as modified3_0_,
   	member0_.age as age4_0_,
   	member0_.team_id as team_id6_0_,
   	member0_.username as username5_0_ 
   from
   	member member0_
   ```

   2번 라인이 실행될때마다 개별 Team값을 조회하기 위한 쿼리가 실행된다.(N+1문제)

   ```sql
   select 
   team0_.team_id as team_id1_2_0_, team0_.created_at as created_2_2_0_, team0_.modified_at as modified3_2_0_, team0_.name as name4_2_0_ 
   from team team0_ 
   where team0_.team_id=1;
   
   select 
   team0_.team_id as team_id1_2_0_, team0_.created_at as created_2_2_0_, team0_.modified_at as modified3_2_0_, team0_.name as name4_2_0_ 
   from team team0_ 
   where team0_.team_id=2;
   ```

   

   4번 라인은 아래와 같이 현재 프록시 객체로 되어있다는 것을 알 수 있다.

   `class study.datajpa.entity.Team$HibernateProxy$zLx5GnJF`

5. N+1문제를 해결하기 위해서, 한방 쿼리가 필요하다!!!

   1. 사실 jpa를 쓰지 않고, 단순 mapper를 사용하던 곳에서는 sp를 이용해서 한반 쿼리를 사용하곤했다.

   2. How?

      1. JPQL `join fetch`

         1.  code

         ```java
         @Query("select m from Member m left join fetch m.team")
         List<Member> findMemberFetchJoin();
         ```

         2. real Query

            ```sql
            select
            	member0_.member_id as member_i1_0_0_,
              team1_.team_id as team_id1_2_1_,
            	member0_.created_at as created_2_0_0_,
            	member0_.modified_at as modified3_0_0_,
            	member0_.age as age4_0_0_,
            	member0_.team_id as team_id6_0_0_,
            	member0_.username as username5_0_0_,
            	team1_.created_at as created_2_2_1_,
            	team1_.modified_at as modified3_2_1_,
            	team1_.name as name4_2_1_ 
            from
            	member member0_ 
            left outer join
            	team team1_ 
            on member0_.team_id=team1_.team_id
            ```

         3. Team객체는?? 실제객체가 들어있는 것을 볼 수 있다.

            `class study.datajpa.entity.Team`

      2. EntityGraph

         1. code

            ```java
            @Override
            @EntityGraph(attributePaths = {"team"})
            List<Member> findAll();
            ```

            위와 같은 방식으로 join하려는 entity를 `attributePaths`에 명시해주면 자동으로 조인쿼리로 조회가 가능하다.

         3. JPQL + EntityGraph

            1. code

               ```java
               @EntityGraph(attributePaths = {"team"})
               @Query("select m from Member m")
               List<Member> findMemberEntityGraph();
               ```

               

#### reference : 김영한님의 실전스프링데이터jpa 강의
