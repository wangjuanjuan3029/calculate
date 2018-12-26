#include "Cal.h"

#include <stack>
#include <stdlib.h>
#include <stdio.h>
#include <QDebug>
#include <QMessageBox>
#include <iostream>
#include <QObject>

CCal::CCal(QObject *parent) : QObject(parent)
{

}
/**
 * @brief    定义优先级别
 * @param ch 传入参数
 * @return   代表优先级先后
 */
int CCal:: Priority(QString oper)
{
    QChar *Qch = new QChar[10];
    Qch = oper.data();            //转Qchar
    char ch = Qch->toLatin1();

    int i;
    switch(ch)
    {
        case'(':i=1;break;
        case'+':i=2;break;
        case'-':i=2;break;
        case'*':i=4;break;
        case'/':i=4;break;
        case'%':i=4;break;
        case')':i=5;break;
        case'#':i=-1;break;
        default:i=-1;break;
    }
    return i;
}
/**
 * @brief        转为逆波兰
 * @param ch     传入参数
 * @param retch  返回后缀表达式
 */
void  CCal::Tonibolan(const QString &mid,QStack<QString> &postfix)
{
    if(NULL== mid  )
      return;

    QStack<QString> oper;                           //放操作符
    QString tempNum;                                //暂时存放数字
   for(int i=0;i<mid.length();i++)
   {
        while (mid[i].isDigit() ||mid[i] == '.' )   //对于连续输入数字
        {
            tempNum += QString(mid[i]);
            i++;
            if(!mid[i].isDigit()&& mid[i] != '.')    //不是数字
            {
                postfix.push(tempNum);
                tempNum = "";
                break;
            }

        }
         if(mid[i]=='(')                            //左括号直接压栈
        {
            oper.push(QString(mid[i]));
        }
        else if(mid[i]==')')                        //右括号
        {
            while(oper.top()!="(")
            {
                postfix.push(oper.top());
                oper.pop();
            }
            if(oper.top()=="(")
            {
                oper.pop();
            }

        }
        else if(oper.empty()||Priority(QString(mid[i]))>Priority(oper.top()))  //优先级比较
        {
            oper.push(QString(mid[i]));
        }
        else
        {
            while(Priority(QString(mid[i])) <= Priority(oper.top()))
            {
                postfix.push(oper.top());
                oper.pop();
                if(oper.empty())
                {
                    break;
                }
            }
            oper.push(QString(mid[i]));
        }
    }
    while(!oper.empty())
    {
        postfix.push(oper.top());
        oper.pop();
    }

}

/**
 * @brief     计算逆波兰表达式的值
 * @param ret 后缀表达式
 * @return    返回结果
 */

double CCal::Calcval(QStack<QString> &postfix)
{
    stack<double> st;         //放数字
    QStack<QString> tempPostfix;
    while(!postfix.empty())
    {
        tempPostfix.push(postfix.pop());
    }
    while(!tempPostfix.empty())
    {
        QString element =tempPostfix.pop();

        if(element == "+")
        {
            double a=st.top();
            st.pop();
            double b=st.top();
            st.pop();
            st.push(b+a);
        }
        else if(element == "-")
        {
            double a=st.top();
            st.pop();
            double b=st.top();
            st.pop();
            st.push(b-a);
        }
        else if(element == "*")
        {
            double a=st.top();
            st.pop();
            double b=st.top();
            st.pop();
            st.push(b*a);

        }
        else if(element == "/")
        {
            double a=st.top();
            st.pop();
            double b=st.top();
            st.pop();
            if(a != 0)
            {
                st.push(b/a);
            }
            else
            {
                divisorOfZero = true;
                return -1;
            }
        }
        else if(element == "%")
        {
            long a=st.top();
            double aIsDot = st.top();
            st.pop();
            long b=st.top();
            double bIsDot = st.top();
            st.pop();

            double aIsDotRule = aIsDot - a;
            double bIsDotRule = bIsDot - b;
            if(aIsDotRule>0||bIsDotRule>0)    // 是小数
            {
                isDot = true;
                return -1;
            }
            else
            {
                if(a != 0)
                {

                    st.push(b%a);
                 }
                 else
                 {
                    divisorOfZero = true;
                    return -1;
                 }
            }

        }
        else if(element == "#")
        {
            break;
        }
        else                                 //放入数字
        {
            st.push(element.toDouble());
        }

     }
     return st.top();
}



