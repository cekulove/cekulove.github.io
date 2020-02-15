VPATH=lib
vpath %.a lib

OBJ=libfl.a

flex:=$(CURDIR)/flex/win_flex #flex存放路径

all: $(OBJ)
	$(flex) flex.l
	gcc lex.yy.c -L lib -lfl -o test

clean:
	rm -rf test.exe libfl.a lex.yy.c

