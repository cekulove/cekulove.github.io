---
layout: default
title: "webGL_Test"
date:  2017-02-17 23:46:05 +0800
categories: jekyll update
---
<h2>{{ page.title }}</h2>  

```javascript
var canvas = document.createElement("canvas");
canvas.style.width="900px";
canvas.style.height="900px";
canvas.width="1000";
canvas.height="1000";
canvas.style.border="1px solid black";
var ctx = canvas.getContext("webgl");
document.body.appendChild(canvas);                         
document.body.style.textAlign="center";
var VSHADER_SOURCE=
'       attribute vec4 a_Position;      '+
'       void main(){                    '+
'               gl_Position=a_Position; '+
'               gl_PointSize=10.0;      '+
'       }                               ';
var FSHADER_SOURCE=
'       void main(){                                    '+
'               gl_FragColor=vec4(1.0,0.5,0.0,1.0);     '+
'       }                                               ';
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
var n=initVertexBuffer(ctx);
if (n<0){throw "Faild to set the positions of the vertices ";}  

ctx.clearColor(0.0,0.0,0.0,1.0);
ctx.clear(ctx.COLOR_BUFFER_BIT);
ctx.drawArrays(ctx.POINTS,0,n);

ctx.deleteProgram(program);
function initVertexBuffer(ctx){
    var vertices=new Float32Array([0.0 , 0.5 , -0.5 , -0.5 , 0.5 , -0.5]);
    var n=3;
    var vertexBuffer=ctx.createBuffer();
    if (!vertexBuffer){throw "Faild to create the buffer object";}
    ctx.bindBuffer(ctx.ARRAY_BUFFER,vertexBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER,vertices,ctx.STATIC_DRAW);
    var a_Position=ctx.getAttribLocation(program,"a_Position");
    ctx.vertexAttribPointer(a_Position,2,ctx.FLOAT,false,0,0);
    ctx.enableVertexAttribArray(a_Position);
    return n;
}
```

[back](/)
