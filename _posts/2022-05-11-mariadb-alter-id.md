---
title: do you know mariadb jump id if you delete row?
categories:
  - mariadb

tags:
  - id
---

## *** mariadb jumps id if you delete row***

1. jump id?
  - I didnt check other db also jump id if rows are deleted

2.  how do I corret
  ```sql
    alter table auto_increment=[startingNumber]
    -- alter table auto_increment=10

  ```

3. how do I check
  ```sql
    SELECT AUTO_INCREMENT
      FROM information_schema.tables
      WHERE table_name = 'tablename'
      and table_schema = database()
  ```
  or
  if you are using other db now
    ```sql
    SELECT AUTO_INCREMENT
      FROM information_schema.tables
      WHERE table_name = 'tablename'
      and table_schema = `schemaname`
  ```
      

