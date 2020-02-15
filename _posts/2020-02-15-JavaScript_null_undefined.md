---
title : 2020-02-15-Null and Undefined in JavaScript
date: 2020-02-15 22:00:00
comment : true
categories : javascript
---

# Null and Undefined in JavaScript

### In my dailyLife, usually I code server-side code, but sometime I am not front-end engineer, I encounter problem of jquery of raw javascript. <br>

especially, I saw `undefined` error. usally I encountered this error, when API in server send the data, between name of property in class or entity from server and front are diffence. so solution is very easy, which making name of each side same.<br>

in this time, I have question about `undefined` and like me, junior confuses `null`.

# what is undefined ??<br>
1. primitive type, so `undefined` can be assigned
2. in the condition, it is same with `false`<br>


```
var input = undefined

if(!input){
    console.log('undefined???')
}
else{
    console.log('hi')
}
```

console print 'undefined???'

# what is null ??<br>
1. primitive, so it can be also assigned
2. in the condition, it is same with `false`


# funny thing, you can use like this

```
var thisIsTrue = undefined == null // true
var butThisIsFalse = undefied === null // false
```

- we can guess that those are difference type.

```
typeof(null) // object
typeof(undefined) // undefined
```

# conclusion

`null` doesn't have value.<br>
`undefined` doesn't have type and value.