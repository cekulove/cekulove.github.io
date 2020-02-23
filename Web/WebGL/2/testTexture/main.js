function main(){
	let canvas=document.getElementById("webgl");
	canvas.style.border="1px solid black";
	let gl=canvas.getContext("webgl");
	let VS_SOURCE=document.querySelector("#vertex-shader").innerHTML;
	let FS_SOURCE=document.querySelector("#fragment-shader").innerHTML;
	initShaders(gl,VS_SOURCE,FS_SOURCE);
	let n=initVertexBuffers(gl);
	gl.clearColor(0.0,0.0,0.0,1.0,);
	gl.clear(gl.COLOR_BUFFER_BIT);
	initTexture(gl,n);
}

function initVertexBuffers(gl){
	let vertices=new Float32Array([
		1.0,1.0,	6.0,6.0,
		-1.0,1.0,	0.0,6.0,
		-1.0,-1.0,	0.0,0.0,
		1.0,-1.0,	6.0,0.0
	])
	let FSIZE=vertices.BYTES_PER_ELEMENT;
	let n=4;
	let vbo=gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
	gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
	let a_Position=gl.getAttribLocation(gl.program,"a_Position");
	gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
	gl.enableVertexAttribArray(a_Position);
	let a_TexCoord=gl.getAttribLocation(gl.program,"a_TexCoord");
	gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4,FSIZE*2);
	gl.enableVertexAttribArray(a_TexCoord);
	return n;
}

function initTexture(gl,n){
	let texture=gl.createTexture();
	let u_Sampler=gl.getUniformLocation(gl.program,"u_Sampler");
	let image=new Image();
	image.src="test.jpg";
	image.onload=()=>{
		loadTexture(gl,n,texture,u_Sampler,image);
	}
	return true;
}

function loadTexture(gl,n,texture,u_Sampler,image){
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,1);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D,texture);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
	//gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
	//gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);
	gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
	gl.uniform1i(u_Sampler,0);
	render(gl,n);
}

function render(gl,n){
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLE_FAN,0,n);
	requestAnimationFrame(()=>{render(gl,n)});
}