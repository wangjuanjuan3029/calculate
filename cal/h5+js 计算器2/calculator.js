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






