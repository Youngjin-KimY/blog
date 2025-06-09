---
layout: post
title: "[Sql] SELECT"
tags: [ mysql, mariadb, sql ]
last_modified_at: 2025-06-04T12:15:00
---

## Daily notes 2020/06/03
## update 2025/06/04

### I had a quest. 
the quest migrate data of A table, so I had to make backup table in backup database.<br>
there was a problem which is table had about 300 millons row.<br>

first I thought that select all row and then insert into new table, but is it ok? there were too many...<br>

after Searching and asking, I got solution, which is below query.<br>

***SELECT INTO #tmp FROM A <br>***

the query create #tmp table with all row of A.


```sql
select * from ...
```

Do you know `select` has `lock` ?
- shared lock
- gap lock