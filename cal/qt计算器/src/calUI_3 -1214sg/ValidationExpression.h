#ifndef VALIDATIONEXPRESSION_H
#define VALIDATIONEXPRESSION_H

#include "mainwindow.h"
/****************************
 * 功能： 用于验证表达式
 * 开发者：汪娟娟
 * 日期：  2018年12月11日
 *****************************/
class CValidationExpression
{
public:
    CValidationExpression();
    bool validation(QString express);           //总验证表达式，输入等号调用private五个函数
    QString invalidRepeated(QString express);   //处理重复出现 . + - * /
    QString foramt(QString formatExp);          //处理负数，变成  0-x
    bool isPromoted() const;                    //常函数限制不可以在该函数内修改类的数据成员

private:
    bool firstFinalRule(QString express);       //第一个数和最后一个数规则
    bool missingBraces(QString express);        //括号不匹配
    bool leftBraces(QString express);           //左括号前后的规则
    bool rightBraces(QString express);          //右括号前后的规则
    bool dotRule(QString express);              //小数点规则，前后为数字,只能有一个小数点

private:

    bool m_isPromoted;
};

#endif // VALIDATIONEXPRESSION_H
