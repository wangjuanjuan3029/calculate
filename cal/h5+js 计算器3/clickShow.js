/*
 * 这里面是点击按钮然后在输入框显示功能
 * 通过键盘输入事件
 */


function showText1()
{
	var newAdd=document.getElementById('num1').innerHTML;
	document.getElementById('showText').value += newAdd; 
}
function showText2()
{	
	var newAdd=document.getElementById('num2').innerHTML;
	document.getElementById('showText').value += newAdd; 
}
function showTextAdd()
{	
	var newAdd=document.getElementById('add').innerHTML;
	document.getElementById('showText').value += newAdd; 
}
function showTextSub()
{	
	var newAdd=document.getElementById('sub').innerHTML;
	document.getElementById('showText').value += newAdd; 
}
function showTextDot()
{
	var newAdd=document.getElementById('dot').innerHTML;
	document.getElementById('showText').value += newAdd; 
}
function showText0()
{	
	var newAdd=document.getElementById('num0').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showText3()
{	
	var newAdd=document.getElementById('num3').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showTextleft()
{
	var newAdd=document.getElementById('left').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showTextMulp()
{
	var newAdd=document.getElementById('mulp').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showText6()
{	
	var newAdd=document.getElementById('num6').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showText5()
{	
	var newAdd=document.getElementById('num5').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showText4()
{	
	var newAdd=document.getElementById('num4').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showTextright()
{	
	var newAdd=document.getElementById('right').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showTextDiv()
{	
	var newAdd=document.getElementById('div').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showText9()
{
	var newAdd=document.getElementById('num9').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showText8()
{
	var newAdd=document.getElementById('num8').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showText7()
{
	var newAdd=document.getElementById('num7').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showTextSqart()
{
	var newAdd=document.getElementById('sqart').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showTextClearAll()
{
 	var showText = document.getElementById('showText');
    showText.value="";
	document.getElementById("showText").focus();
}

function showTextQiuyu()
{
	
	var newAdd=document.getElementById('qiuyu').innerHTML;
	document.getElementById('showText').value += newAdd; 
}

function showTextArrows()
{
	var showText = document.getElementById('showText').value + "";  //获取文本框中值
	var length = "";
	length = showText.length;
	if(length > 0)
	{
		document.getElementById('showText').value = showText.substr(0,length-1)
	}
}



//键盘事件
  document.onkeyup = function (event) {
            var e = event || window.event;
            var keyCode = e.keyCode || e.which;
            switch (keyCode) {
                case 8:
                    showTextArrows();  //删除一个
                    break;
                case 96:
                    showText0();  
                    break;
                case 48:
                    showText0();  
                    break;
                case 97:
                    showText1();  
                    break;
                case 49:
                    showText1();  
                    break;
                case 98:
                    showText2(); 
                    break;
                case 50:
                    showText2();  
                    break;
                case 99:
                    showText3();  
                    break;
                case 51:
                    showText3();  
                    break;
                case 100:
                    showText4();  
                    break;
                case 52:
                    showText4();  
                    break;
                case 101:
                    showText5(); 
                    break;
                case 53:
                    showText5(); 
                    break;
                case 102:
                    showText6();  
                    break;
                case 54:
                    showText6();  
                    break;
                case 103:
                    showText7();  
                    break;
                case 55:
                    showText7();  
                    break;
                case 104:
                    showText8(); 
                    break;
                case 56:
                    showText8(); 
                    break;
                case 105:
                    showText9();  
                    break;
                case 57:
                    showText9();  
                    break;
                case 106:
                    showTextMulp();  
                    break;
                case 107:
                    showTextAdd(); 
                    break;
                case 109:
                    showTextSub();  
                    break;
                case 110:
                    showTextDot();  
                    break;
                case 111:
                    showTextDiv(); 
                    break;
                case 13:
                    main(); 
                    break;
                default:
                	alert("请输入数字区域，或小键盘的加减乘除！");
                    break;
            }
        }
