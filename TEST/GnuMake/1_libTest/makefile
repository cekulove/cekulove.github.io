all: main.exe
	echo && ./$<

main.exe: main.c libhello.lib
	gcc -o $@ $^
libhello.lib: hello.obj
	ar rcs -o $@ $<
hello.obj: hello.c
	gcc -c $< -o $@

clean:
	rm -rf hello.obj libhello.lib	main.exe

