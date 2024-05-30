function initShaders(gl,VS_SOURCE,FS_SOURCE){
	var program=createProgram(gl,VS_SOURCE,FS_SOURCE);
	gl.useProgram(program);
	gl.program=program;
	return true;
}

function createProgram(gl,VS_SOURCE,FS_SOURCE){
	//Create a program object
	var program=gl.createProgram();
	
	//Create shader object
	var vShader=loadShader(gl,gl.VERTEX_SHADER,VS_SOURCE);
	var fShader=loadShader(gl,gl.FRAGMENT_SHADER,FS_SOURCE);

	//Attach the shader objects
	gl.attachShader(program,vShader);
	gl.attachShader(program,fShader);
	
	//Link the program object
	gl.linkProgram(program);
	
	//Check the result of linking
	var linked={
		status: gl.getProgramParameter(program,gl.LINK_STATUS),
		log:    gl.getProgramInfoLog(program)
	}
	console.log("program: "+linked.status);
	if (!linked.status)
		console.log(linked.log);
		
	return program;
}

function loadShader(gl,type,source){
	//Create shader object
	var shader=gl.createShader(type);
	
	//Set the shader program
	gl.shaderSource(shader,source);
	
	//Compile the program
	gl.compileShader(shader);
	
	//Check the result of compilation
	var compiled={
		status:  gl.getShaderParameter(shader,gl.COMPILE_STATUS),
		log:     gl.getShaderInfoLog(shader)
	}
	if (type==gl.VERTEX_SHADER)
		console.log("vertex shader: "+compiled.status);
	if (type==gl.FRAGMENT_SHADER)
		console.log("fragment shader: "+compiled.status);
	if (!compiled.status)
		console.log(compiled.log);
		
	return shader;
}