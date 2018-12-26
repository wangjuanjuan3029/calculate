function main()
{
	
	//获取文本框中输入值
	var newAdd=document.getElementById('showText').value; 
	
	//处理负数，是负数 变 0-x
	newAdd = foramt(newAdd);

	//验证表达式是否正确
	 if(verify(newAdd) == true)          //调用总 验证表达式，如果验证为真则转逆波兰，并且计算结果
	 {
		var postfix = nibolan (newAdd);  //调用转逆波兰
		
		cal(postfix);                    //计算
	 }



}

//以下是main.js调用的方法
//装逆波兰函数
function nibolan (mid) {
	//alert("nibolan");
	var postfixArr = []; //放逆波兰结果，后缀表达式
    var oper = new Stack();
   

	var midC = mid.split("");//转为数组类型
	var tempNum = "";//暂时存放数字,必须要赋值，否则就是undefined类型

	

	for(var i=0;i<midC.length;i++)
	{
			while( !isNaN(midC[i]) ||midC[i] == ".")
			{				
				tempNum += midC[i];                    //eval可将字符串转化为代码执行
				i++;
				if(isNaN(midC[i])  && midC[i] != ".")  //isNaN 表示不是一个数字
				{
			
					postfixArr.push(tempNum);
					tempNum = "";
					break;
				}
								
			}
			if(midC[i] == "(")
			{
				oper.push(midC[i]);  
	
			}
			else if(midC[i] == ")")
			{
				while(oper.store[oper.top-1] != "(")
				{
					postfixArr.push(oper.store[oper.top-1]);  //Priority(oper.store[oper.top-1])
					oper.pop();
				}
				if(oper.store[oper.top-1] == "(")
				{
					oper.pop();
				}
			}
			else if(oper.store == 0 || Priority(midC[i]) > Priority(oper.store[oper.top-1]))  //Priority(midC[i]);//运行了
			{
				oper.push(midC[i]);	
			}
			else
			{
				while(Priority(midC[i]) <= Priority(oper.store[oper.top-1]))
				{
					postfixArr.push(oper.store[oper.top-1]);
					oper.pop();
					if(oper.store == 0)
					{
						break;
					}
				}
				oper.push(midC[i]);
			}
	}

	while(oper.store != 0)
	{
		postfixArr.push(oper.store[oper.top-1]);
		oper.pop();

	}
	alert("逆波兰表达式："+postfixArr);
	return postfixArr;


}

//符号优先级判断
function Priority(oper)
{
	switch(oper)
	{
		case'(':i=1;break;
        case'+':i=2;break;
        case'-':i=2;break;
        case'*':i=4;break;
        case'/':i=4;break;
        case'%':i=4;break;
        case'√':i=4;break;
        case')':i=5;break;
        case'#':i=-1;break;
        default:i=-1;break;
	}
	return i;

}
//计算后缀表达式结果
function cal(postfix)
{

	var num = new Stack(); //放数字
	for(var  i=0;i<postfix.length;i++)
	{
		
		if(postfix[i] == "+")
		{
			var p = num.pop();     
			var s = num.pop();    
			num.push(Number(s)+Number(p));    

		}
		else if(postfix[i] == "-")
		{
			var p = num.pop();     
			var s = num.pop();    
			num.push(Number(s)-Number(p));    
			//break;
		}
		else if(postfix[i] == "*")
		{
			var p = num.pop();     
			var s = num.pop();    
			num.push(Number(s)*Number(p));    
		}
		else if(postfix[i] == "/")
		{
			var p = num.pop();     
			var s = num.pop(); 
			if(p != 0){
                num.push(Number(s)/Number(p));      
            }else{ 
                alert("除数不能为0");
                break;
            }
		
		}
		else if(postfix[i] == "%")
		{
			var p = num.pop();     
			var s = num.pop();
			if(p != 0){
                num.push(Number(s)%Number(p));      
            }else{ 
                alert("除数不能为0");
                break;
            }    
		}
		else if(postfix[i] == "√")
		{
			var p = num.pop();      
			if(p != 0){
                num.push(Math.sqrt(Number(p)));      
            }else{ 
                console.log("除数不能为0");
                break;
            }  
		}
		else 
		{
			num.push(postfix[i]);
		}
	}
	

	document.getElementById('showRes').value= num.store; 


}

function Stack(){
   this.store = [];
   this.top = 0;
   this.push = push;
   this.pop = pop;
}
function push(ele){
      this.store[this.top++] = ele;
 }

function pop(){
    var top = --this.top;
    if(top >= 0){
        var val =  this.store[top];
  //-----------------务必删除弹出栈的值原来的空间----------------------------
        this.store.splice(this.top,1);
        return val;
    }else{
        return 'It\' Ending !';
     }

 }


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





//总 验证表达式
function verify(newAdd)
{
	//alert("verify..");
	var verifyExp = newAdd.split("");//转为数组类型

	if(firstFinalRule(verifyExp) == false)
	{
		//alert("okokofalse..");
		return false;
	}
	else
	{ 
		if(missingBraces(verifyExp) == false)
		{
			//alert("sum  missB ..");
			return false;
		}
		else
		{
			if(Repeated(verifyExp) == false)
			{
				//alert("sum  missB ..");
				return false;
			}
			else{
				if(leftBraces(verifyExp) == false)
				{
					//alert("sum  leftBraces ..");
					return false;
				}
				else
				{
					if(rightBraces(verifyExp) == false)
					{
						//alert("sum  rightBraces ..");
						return false;
					}
					else
					{
						if(dotSqartRule(verifyExp) == false)
						{
							//alert("sum  dotRule ..");
							return false;
						}
						else
						{
							return true;
						}
						
					}

				}
				
			}
	
		}
	
	}

}
//第一个数的规则
function firstFinalRule(verifyExp)
{
	//alert("firstFinalRule..");
	
	var length = verifyExp.length;
	if(verifyExp[0] == "." ||verifyExp[0] == "+" ||verifyExp[0] == "*" ||verifyExp[0] == "/" ||verifyExp[0] == ")" )
	{
		alert("第一个数不能为. + - * / )");
		return false;
	}
	else if(verifyExp[length-1] == "." ||verifyExp[length-1] == "+" || verifyExp[length-1] == "-" || verifyExp[length-1] == "*" ||verifyExp[length-1] == "/" || verifyExp[length-1] == "%"|| verifyExp[length-1] == "(" )
	{
		alert("最后一个数不能为. + - * / )");
		return false;
	}
	else
	{
		return true;
	}
}

//括号不匹配规则  
function missingBraces(verifyExp)
{
	//alert("missingBraces..");
	
	var leftBracesIndex = 0; //记录左括号的数量
	var rightBracesIndex = 0;
	var leftNum = 0;   //记录从左到左括号有几个数
	var rightNum = 0;

	for(var i=0;i<verifyExp.length;i++)
	{
		if(verifyExp[i] == "(")
		{
			leftBracesIndex ++;
			leftNum = i;
		}
		else if(verifyExp[i] == ")")
		{
			rightBracesIndex ++;
			rightNum = i;
		}
	
	}
	if((leftBracesIndex == rightBracesIndex) && (leftNum <= rightNum))
	{
		return true;
	}
	else 
	{
		alert("括号数目不匹配或左括号应该在前！");
		return false;
	}

}

//重复输入 . + - * / % 根号
function Repeated(verifyExp)
{
	//alert("Repeated ...");
	for(var i=0;i<verifyExp.length;i++)
	{
		if(verifyExp[i] == "." ||verifyExp[i] == "+" ||verifyExp[i] == "-" ||verifyExp[i] == "*" ||verifyExp[i] == "/" ||verifyExp[i] == "√" )
		{
			i++;
			while(verifyExp[i] == "." ||verifyExp[i] == "+" ||verifyExp[i] == "-" ||verifyExp[i] == "*" ||verifyExp[i] == "/" ||verifyExp[i] == "√")
			{
				alert("重复输入符号 . + - */% √ ");
				i++;
				return fasle;
			}
	
		}
		
	}

}

//左括号前后的规则
function leftBraces(verifyExp)
{
	//alert("leftBraces ..");
	for(var i=0;i<verifyExp.length;i++)
	{
		if(verifyExp[i] == "(")
		{
			i--;
			if(verifyExp[i] >= 0 && verifyExp[i] <= 9 )
			{
				alert("左括号前不能为数字");
				return fasle;
			}
			i++;
			i++;
			if(verifyExp[i] == ")" || verifyExp[i] == "." ||verifyExp[i] == "+" ||verifyExp[i] == "*" || verifyExp[i] == "/" ||verifyExp[i] == "%" )
			{
				alert("左括号后不能为) . + * / % ");
				return fasle;
			}
		}
	}
	
}

//右括号前后的规则
function rightBraces(verifyExp)
{
	//alert("rightBraces ..");
	for(var i=0;i<verifyExp.length;i++)
	{
		if(verifyExp[i] == ")")
		{
			i--;
			if(verifyExp[i] == "(" || verifyExp[i] == "." ||verifyExp[i] == "+" ||verifyExp[i] == "*" || verifyExp[i] == "/" ||verifyExp[i] == "%" ||verifyExp[i] == "√")
			{
				alert("右括号前不能为( . + - * % √ 负号");
				return fasle;
			}
			i++;
			i++;
			if(verifyExp[i] == "-" || verifyExp[i] == "." ||verifyExp[i] == "√" )
			{
				alert("右括号后不能为. 负数 根号 ");
				return fasle;
			}
		}
	}
}
//小数点 和根号的规则 
// 根号前面不能是数字
/**
 * @brief  1.只能有一个小数点  2，小数点前后不能是 负号
 * @param  输入的表达式
 * @return false 不去执行逆波兰，堵塞
 */
function dotSqartRule(verifyExp)
{
	//alert("dotRule() ..");
	for(var i=0;i<verifyExp.length;i++)
	{
		if(verifyExp[i] == "." )
		{
			i++;
			while(verifyExp[i] >= 0 && verifyExp[i] <= 9)
			{
				i++;
				if(verifyExp[i] == ".")
				{
					alert("一个数中小数点不止一个");
					return false;
				}

			}
		}
		if(verifyExp[i] == "√" )
		{
			if(verifyExp[i-1] >= 0 && verifyExp[i-1] <= 9 )
			{
				alert("根号前不能是数字");
				return false;
			}
			i++;
			while(verifyExp[i] >= 0 && verifyExp[i] <= 9)
			{
				i++;
				if(verifyExp[i] == "√")
				{
					alert("一个数中根号不止一个");
					return false;
				}

			}
		}

	}
	
}


/**
 * @brief  判断是否负数
 * @param  输入的表达式
 * @return 如果是负数插入 0-x
 */
 function foramt(newAdd)
 {
 	//alert("format...");
 	for(var i=0;i<newAdd.length;i++)
	{
		if(newAdd[i] == "-")
		{
			if(i == 0)
			{
				var tem = 0;
				newAdd = tem + newAdd;
				
			}
			else if(newAdd[i-1] == "(")
			{
				newAdd = insert_item(newAdd,"0",i);  //调用自己写的插入函数

			}

		}

	}
 	return newAdd;
 	
 }


function insert_item(str,item,index){

	var newstr="";             //初始化一个空字符串

	var tmp=str.substring(0,index);

	var estr=str.substring(index,str.length);

	newstr+=tmp+item+estr;

	return newstr;

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
