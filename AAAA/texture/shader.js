// Shader Source
var VSHADER_SOURCE =
'	attribute vec2 a_Position;		'+
'	attribute vec2 a_TexCoord;		'+
'	varying vec2 v_TexCoord;				'+
'	void main(){								      '+
'		v_TexCoord=a_TexCoord;				'+
'		gl_Position = vec4(a_Position,0,1);		'+
'	}											';

var FSHADER_SOURCE =
'	uniform sampler2D u_Sampler;  '+
'	varying lowp vec2 v_TexCoord; '+
'	void main(){								'+
'		gl_FragColor = texture2D(u_Sampler,v_TexCoord);					'+
'	}											';
