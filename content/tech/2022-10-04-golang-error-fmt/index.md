---
title: "Golang: errors.new() vs. fmt.Errorf()"
description: 어떤 경우에 어느 것을 써야 바람직할까?
author: InterP
date: 2022-10-04 09:01:55 +0900
url: /golang-errorsnew-fmterrorf
categories: 
- Tech
tags:
- golang
- error
---
두 함수 호출 모두 error 를 리턴하지만, 어디서는 `errors.new()` 를 쓰고 다른 데서는 `fmt.Errorf()` 를 써서 헷갈렸다. [링크](https://www.digitalocean.com/community/tutorials/how-to-add-extra-information-to-errors-in-go)에서 확인한 결과, 아래와 같은 설명이 되어 있었다.

> Generally, when creating a sentinel error value, the [errors.New](https://pkg.go.dev/errors#New) function from the [errors](https://pkg.go.dev/errors) package is used instead of the `fmt.Errorf` function you’ve been using thus far.
> 
> **Using `errors.New` instead of `fmt.Errorf` does not make any foundational changes to how the error works**, though, and both functions could be used interchangeably most of the time.
> 
> The biggest difference between the two is the `errors.New` function will only create an error with a static message, and **the `fmt.Errorf` function allows formatting the string with values**, similar to `fmt.Printf` or `fmt.Sprintf`. Since sentinel errors are fundamental errors with values that don’t change, it’s common to use errors.New to create them.

두 함수 호출로 리턴되는 error 에 특별한 차이는 없지만, **포맷이 필요하면 fmt.Errorf, 포맷이 필요없는 static error message 라면 errors.New** 를 쓰는 것이다.