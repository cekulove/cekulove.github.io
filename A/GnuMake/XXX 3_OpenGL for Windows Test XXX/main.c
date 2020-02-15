#include<windows.h>
#include<GL/gl.h>
#include <GL/glu.h>

#pragma comment(lib,"libopengl32.a")
#pragma comment(lib,"libglu32.a")

LRESULT CALLBACK WinProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam) 
{
	switch (msg)
	{
	case WM_CLOSE:
		PostQuitMessage(0);
	default:
		break;
	}
	return DefWindowProc(hwnd, msg, wParam, lParam);
}
int WINAPI WinMain(HINSTANCE hInstance,HINSTANCE hPrevInstance,LPSTR lpCmdLine,int nShowCmd)
{
	// register window
	WNDCLASSEX wndclass;
	wndclass.style = CS_HREDRAW | CS_VREDRAW;
	wndclass.lpfnWndProc = &WinProc;
	wndclass.cbClsExtra = 0;
	wndclass.cbWndExtra = 0;
	wndclass.hInstance = hInstance;
	wndclass.hIcon = NULL;
	wndclass.hIconSm = NULL;
	wndclass.hCursor = NULL;
	wndclass.hbrBackground = NULL;
	wndclass.lpszMenuName = NULL;
	wndclass.lpszClassName = TEXT("GLWindow");
	wndclass.cbSize = sizeof(WNDCLASSEX);
	ATOM atom = RegisterClassEx(&wndclass);
	if (!atom)
	{
		return 0;
	}
	
	// create window
	HWND hwnd = CreateWindowEx(NULL, TEXT("GLWindow"), TEXT("OpenGL Window !"), WS_OVERLAPPEDWINDOW, 100, 100, 800, 600, NULL, NULL, hInstance, NULL);
	
	// create OpenGL render context
	HDC dc = GetDC(hwnd);
	PIXELFORMATDESCRIPTOR pfd;
	memset(&pfd, 0, sizeof(PIXELFORMATDESCRIPTOR));
	pfd.nVersion = 1;
	pfd.nSize = sizeof(PIXELFORMATDESCRIPTOR);
	pfd.cColorBits = 32;
	pfd.cDepthBits = 24;
	pfd.cStencilBits = 8;
	pfd.iPixelType = PFD_TYPE_RGBA;
	pfd.iLayerType = PFD_MAIN_PLANE;
	pfd.dwFlags = PFD_DRAW_TO_WINDOW | PFD_SUPPORT_OPENGL | PFD_DOUBLEBUFFER;

	int pixelFormat = ChoosePixelFormat(dc, &pfd);
	SetPixelFormat(dc, pixelFormat, &pfd);

	HGLRC rc = wglCreateContext(dc);
	wglMakeCurrent(dc, rc); // setup OpenGL context complete

	// OpenGL init
	glMatrixMode(GL_PROJECTION); // tell the GPU processer that i would select the projection matrix.
	glLoadIdentity();
	gluPerspective(50.0f, 800.0f / 600.0f, 0.1f, 1000.0f); // set some values to projection matrix.
	glMatrixMode(GL_MODELVIEW); // tell ... model view matrix.
	glFrontFace(GL_CW);

	glEnable(GL_CULL_FACE);
	

	glClearColor(0.0, 0.0, 0.0, 1.0);
	
	
	// show window
	ShowWindow(hwnd, SW_SHOW);
	UpdateWindow(hwnd);
	
	////init light
	//float blackColor[] = { 0.0f,0.0f,0.0f,1.0f };
	//float whiteColor[] = { 1.0f,1.0f,1.0f,1.0f };
	//glLightfv(GL_LIGHT0, GL_AMBIENT, whiteColor);
	//glLightfv(GL_LIGHT0, GL_DIFFUSE, whiteColor);
	//glLightfv(GL_LIGHT0, GL_SPECULAR, whiteColor);
	//float blackMat[] = { 0.0f,0.0f,0.0f,1.0f };
	//float ambientMat[] = { 0.1f,0.1f,0.1f,1.0f };
	//float diffuseMat[] = { 0.4f,0.4f,0.4f,1.0f };
	//glMaterialfv(GL_FRONT, GL_AMBIENT, blackMat);
	//glMaterialfv(GL_FRONT, GL_DIFFUSE, ambientMat);
	//glMaterialfv(GL_FRONT, GL_SPECULAR, diffuseMat);

	//glEnable(GL_LIGHTING);
	//glEnable(GL_LIGHT0);
	MSG msg;
	while (1)
	{
		if (PeekMessage(&msg,NULL,NULL,NULL,PM_REMOVE))
		{
			if (msg.message==WM_QUIT)
			{
				break;
			}
			TranslateMessage(&msg);
			DispatchMessage(&msg);
		}
		// draw scene
		glLoadIdentity();
		glClear(GL_COLOR_BUFFER_BIT);


		glBegin(GL_TRIANGLE_STRIP);

		glColor4ub(255, 0, 0, 255);


		glVertex3f(0.0f, 0.0f, -10.0f);
		glColor4ub(0, 255, 0, 255);
		glVertex3f(-5.0f, 0.0f, -10.0f);
		glColor4ub(0, 0, 255, 255);
		glVertex3f(-5.0f, -2.0f, -10.0f);

		glVertex3f(6.0f, 0.0f, -10.0f);
		glColor4ub(0, 255, 0, 255);
		glVertex3f(1.0f, 0.0f, -10.0f);
		glColor4ub(0, 0, 255, 255);
		glVertex3f(1.0f, -2.0f, -10.0f);

		glEnd();
		// present scene
		SwapBuffers(dc);
	}
	return 0;
}