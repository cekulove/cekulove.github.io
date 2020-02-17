let canvas=document.getElementById("webgl");
let gl=canvas.getContext("webgl2");
let VS_SOURCE=document.querySelector("#vertex-shader").innerHTML.replace(/\n/,"");
let FS_SOURCE=document.querySelector("#fragment-shader").innerHTML.replace(/\n/,"");
initShaders(gl,VS_SOURCE,FS_SOURCE);

gl.clearColor(0,0,0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

let n=initVertexBuffers(gl);
function animate(){
    requestAnimationFrame(animate);
    gl.drawArrays(gl.TRIANGLE_FAN,0,n);
}
animate();

function initVertexBuffers(gl){
    const vertices=new Float32Array([
        //vertex    texCoord
        0.5,0.5,    1.0,1.0,
        -0.5,0.5,   0.0,1.0,
        -0.5,-0.5,  0.0,0.0,
        0.5,-0.5,   1.0,0.0
    ])
    const n=4;

    const SIZE=vertices.BYTES_PER_ELEMENT;

    let vertexBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    let a_Positon=gl.getAttribLocation(gl.program,"a_Position");
    gl.vertexAttribPointer(a_Positon,2,gl.FLOAT,false,SIZE*4,0);
    gl.enableVertexAttribArray(a_Positon);

    let a_TexCoord=gl.getAttribLocation(gl.program,"a_TexCoord")
    gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,SIZE*4,SIZE*2);
    gl.enableVertexAttribArray(a_TexCoord);

    let texture=gl.createTexture();
    let u_Sampler=gl.getUniformLocation(gl.program,"u_Sampler");

    let image=new Image();
    image.src="test.jpg";
    //image.crossOrigin="*";
    image.onload=function(){
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D,texture);

        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);

        gl.uniform1i(u_Sampler,0);

    };

    return n;
}
