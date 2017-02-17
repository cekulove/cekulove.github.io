---
layout: default
title:  "Hello World !"
date:   2017-02-17 23:46:05 +0800
categories: jekyll update
---
<h2>{{ page.title }}</h2>  

```c
/* HelloWorld.c */

#include<stdio.h>
int main()
{
	printf("Hello World !\n");
	return 0;
}
```

```
/* makefile */

main: HelloWorld.o HelloWorld
HelloWorld.o: HelloWorld.c
	gcc -c HelloWorld.c -o HelloWorld.o
HelloWorld: HelloWorld.o
	gcc HelloWorld.o -o HelloWorld

clean:
	rm HelloWorld.o
```
