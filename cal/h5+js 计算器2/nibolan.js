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

