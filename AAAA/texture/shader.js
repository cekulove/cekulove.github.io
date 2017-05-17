// Shader Source
var VSHADER_SOURCE =
'	attribute vec2 a_Position;						'+
'	attribute vec2 a_TexCoord;						'+
'	varying vec2 v_TexCoord;						'+
'	void main(){									'+
'		v_TexCoord=a_TexCoord;						'+
'		gl_Position = vec4(a_Position,0,1);			'+
'	}												';

var FSHADER_SOURCE =
'	precision highp float;															'+
'	uniform sampler2D u_Sampler;  													'+
'	varying vec2 v_TexCoord; 														'+
'	void main(){																	'+
'	float alpha=texture2D(u_Sampler,v_TexCoord).a;									'+
'	float grey=dot(texture2D(u_Sampler,v_TexCoord).rgb,vec3(0.299,0.587,0.114));	'+
'	if (gl_FragCoord.x<525.0)														'+
'	   	gl_FragColor = vec4(grey,grey,grey,alpha);									'+
'	else																			'+
'		gl_FragColor = texture2D(u_Sampler,v_TexCoord);								'+
'	}																				';
