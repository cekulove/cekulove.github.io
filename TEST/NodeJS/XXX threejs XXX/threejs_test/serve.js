var http = require('http');
var fs = require('fs');//�����ļ���ȡģ��

var documentRoot = './';
//��Ҫ���ʵ��ļ��Ĵ��Ŀ¼

var server= http.createServer(function(req,res){

    var url = req.url; 
    //�ͻ��������url�������������localhost:8888/index.html
    //��ô�����url == /index.html 

    var file = documentRoot + url;
    console.log(url);
    //E:/PhpProject/html5/websocket/www/index.html 


    fs.readFile( file , function(err,data){
    /*
        һ��Ϊ�ļ�·��
        ����Ϊ�ص�����
            �ص�������һ��Ϊ��ȡ���󷵻ص���Ϣ�����ؿվ�û�д���
            ����Ϊ��ȡ�ɹ����ص��ı�����
    */
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404����</h1><p>��Ҫ�ҵ�ҳ�治����</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//��index.html��ʾ�ڿͻ���
            res.end();

        }

    });



}).listen(8888);

console.log('�����������ɹ�');