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

