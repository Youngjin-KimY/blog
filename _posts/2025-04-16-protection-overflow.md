---
layout: post
title: How to protect overflow, When I calculate Integer value
date: 2025-05-16 10:40 +0900
last_modified_at: 2025-05-16 10:40 +0900
tags: [jekyll theme, jekyll, tutorial]
math: true
---

# Overflow happens everywhere

> 'a' is start index of search space, 'b' is end index of that. In this time, I need to get middle idx of search space.
I uses following equations.
>
>- (b + a) % 2
>
> Do you know this equation have a problem?
>  
> overflow !! You can easily miss the overflow problem.

Is there other equation to lower overflow problem?
that is
> a + ((b - a) % 2)

> this equations is same with first one and not intuitive but more safe than first one.

>this equation is adopted and spread by Joshua Bloch (author of Effective Java) in 2006.
