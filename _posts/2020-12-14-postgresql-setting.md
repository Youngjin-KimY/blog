---
title: "[Postgresql] Intro postresql settings with spring boot JPA"
categories:
    - Sql
tags:
    - Postgresql
    - Base-setting
    - JPA
last_modified_at: 2020-12-14 23:00:00
---
# *postgresql setting with spring boot JPA*

***I decided to use postgresql as my db, this is my first postgresql setting experience description***

1. Reason to writing
    - I need to see again my first postgresql with java spring boot JPA setting issues.
    - Sharing my experience

2. Requirement
    1. (in my case, Ubuntu) Ubuntu port open(ufw)
    ```
        netstat -ntlp // checking port status
    ```
    2. Installing postgresql, postgresql official website supports terminal download script.(in my case, ***port 5432***)
    3. Spring boot project with adding JPA dependency
    ```
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
    
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
        </dependency>
    ```

3. ***My Issues***
    1. ***I cannot access port of postgresql port***
    2. ***spring boot project cannot update table row***

4. Solution
    1. Answer of posrgress port
        1. Changing listen_address
        ```
            //terminal
            sudo vim /etc/postresql/13/main/postgresql.conf
        
            #listen_address = "localhost" -> listen_address = "*"
        ```
        2. Adding line about allowing outside access postgresql
        ```
            //terminal
            sudo vim /etc/postgresql/13/main/pg_hba.conf
        
            //adding this contents on most bottom
            host    all     all     0.0.0.0/0       trust // this allows all outside user access postgresql
        ```
        3. restart postgresql
        ```
            //terminal
            service postgresql restart
        ```
    2. Answer of spring boot proejct
        1. Adding hibernate option
        ```
            // application.properties
            spring.jpa.hibernate.ddl-auto=update
        
            // setting model Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
        ```
        2. Setval in postgresql
        ```
            // Error : ERROR: relation "hibernate_sequence" does not exist
            // correcting postgresql primary key sequence
            // 시퀀스 키가 동기화되지 않으면 이슈가 발생
            select setval('playerbasicinfo_id_seq',(select max(id) from playerbasicinfo));
        
            // table key setting
            AUTO_INCREMENT PRIMARY KEY
        ```
    3. ***Plus***(hibernate option)
        1. **create** – Hibernate first drops existing tables, then creates new tables(이건 새로 매번 스키마에 맞춰 만들어주는 듯)
        2. **update** – the object model created based on the mappings (annotations or XML) is compared with the existing schema, and then Hibernate updates the schema according to the diff. It never deletes the existing tables or columns even if they are no more required by the application(수정사항 반영)
        3. **create-drop** – similar to create, with the addition that Hibernate will drop the database after all operations are completed. Typically used for unit testing(app 꺼지면 db드롭시키는거 같음)
        4. **validate** – Hibernate only validates whether the tables and columns exist, otherwise it throws an exception(이건 제대로 스키마가 있는지 보고, 아니면 Excpetion)
        5. **none** – this value effectively turns off the DDL generation(아무것도 안함)
        ***from https://www.baeldung.com/spring-boot-data-sql-and-schema-sql***