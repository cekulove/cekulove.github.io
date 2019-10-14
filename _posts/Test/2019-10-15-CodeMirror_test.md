---
layout: post
title: "CodeMirror"
categories: Test
---
<textarea id="txt" style="display: none">
    <!DOCYTPE html>
    <html lang="en">
    <head>
        <title>test</title>
    </head>
    <body onload="main()">
        <canvas id="test" width="400" height=“400” style="border:1px solid black">
            Please use a browser thats supports "canvas".
        </canvas>
    </body>
    </html>
</textarea>

<div id="tt"></div>

<script>
    var text=document.getElementById("txt").innerHTML;
    text=text.replace(/(^|\n)    /g,"$1").replace(/&lt;/g,"<").replace(/&gt;/g,">");

    CodeMirror(document.getElementById("tt"),{
        value: text,
        lineNumbers: true,
        mode: "htmlmixed"
    });
</script>