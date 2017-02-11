var canvas = document.createElement("canvas");
canvas.style.width="900px";
canvas.style.height="900px";
canvas.width="1000";
canvas.height="1000";
canvas.style.border="1px solid black";
var ctx = canvas.getContext("webgl");
document.getElementById("wrap").appendChild(canvas);						
document.getElementById("wrap").style.textAlign="center";
				
		
var VSHADER_SOURCE=
'	void main(){					'+
'		gl_Position=vec4(0.0,0.0,0.0,1.0);	'+
'		gl_PointSize=10.0;			'+
'	}						';

var FSHADER_SOURCE=
'	void main(){					'+
'		gl_FragColor=vec4(1.0,0.0,0.0,1.0);	'+
'	}						';
var vertexShader=ctx.createShader(ctx.VERTEX_SHADER);
ctx.shaderSource(vertexShader,VSHADER_SOURCE);
ctx.compileShader(vertexShader);

var fragmentShader=ctx.createShader(ctx.FRAGMENT_SHADER);
ctx.shaderSource(fragmentShader,FSHADER_SOURCE);
ctx.compileShader(fragmentShader);

var program=ctx.createProgram();

ctx.attachShader(program,vertexShader);
ctx.attachShader(program,fragmentShader);
ctx.linkProgram(program);

if(!ctx.getProgramParameter(program,ctx.LINK_STATUS)){
	var info = ctx.getProgramInfoLog(program);
	throw "Could not compile WebGL program.";
}

ctx.useProgram(program);

ctx.clearColor(0.0,0.0,0.0,1.0);
ctx.clear(ctx.COLOR_BUFFER_BIT);
ctx.drawArrays(ctx.PONTS,0,1);

ctx.deleteProgram(program);
