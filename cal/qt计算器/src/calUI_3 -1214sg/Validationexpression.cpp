#include "ValidationExpression.h"

#include "mainwindow.h"
#include "Cal.h"

#include <QDebug>
#include <QMessageBox>

CValidationExpression::CValidationExpression()
{
    m_isPromoted = false;         //类成员变量要初始化
}
/**
 * @brief ValidationExpression::validation
 * 总调用验证函数
 * @param express 输入的表达式
 */
bool CValidationExpression::validation(QString express)
{
    bool firstFinalFlag = true;
    bool missBracesFlag = true;
    bool leftBraceFlag = true;
    bool rightBraceFlag = true;
    bool dotRuleFlag = true;

    //调用函数
    firstFinalFlag = firstFinalRule(express);     //第一个数和最后一个数规则
    if(firstFinalFlag == false)
    {
        return false;
    }
    else
    {
        missBracesFlag = missingBraces(express);     //括号不匹配
        if(missBracesFlag == false)
        {
            return false;
        }
        else
        {
            leftBraceFlag = leftBraces(express);      //左括号前后的规则

            if(leftBraceFlag == false)
            {

                return false;
            }
            else
            {
                rightBraceFlag = rightBraces(express);  //右括号前后的规则
                if(rightBraceFlag == false)
                {
                    return false;
                }
                else
                {
                    dotRuleFlag = dotRule(express);    //小数点规则，前后为数字,只能有一个小数点
                    if(dotRuleFlag==false)
                    {
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
/**
 * @brief 处理重复出现 . + - * / %
 * @param 输入表达式
 * @return false 不去执行逆波兰，堵塞
 */
QString CValidationExpression::invalidRepeated(QString express)
{
    QString validationExpress = express;
    QByteArray byte = express.toUtf8();
    char*  repeach= byte.data();
    while(*repeach!='\0')
    {
        if(*repeach=='.'||*repeach=='+'||*repeach=='-'||*repeach=='*'||*repeach=='/'||*repeach=='%')
        {
            repeach++;
            while(*repeach=='.'||*repeach=='+'||*repeach=='-'||*repeach=='*'||*repeach=='/'||*repeach=='%')
            {
                m_isPromoted = true;
                QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("连续输入+-*/.，请输入正确值！"),QMessageBox::Ok);
                m_isPromoted = false;
                validationExpress = express.left(express.length()-1);
                repeach++;
            }
        }
        repeach++;

    }
    return validationExpress;                 //返回字符串
}
/**
 * @brief 1.第一个数最后一个数规则 2.一直点击等号规则
 * @param 输入表达式
 * @return false 不去执行逆波兰，堵塞
 */
bool CValidationExpression::firstFinalRule(QString express)
{
    QByteArray byte = express.toUtf8();
    char*  lackExpress= byte.data();

    string finalExp = express.toStdString();
    int length = finalExp.length();

    if(*lackExpress == '+'||*lackExpress == '*'||*lackExpress == '/'||*lackExpress == ')'||*lackExpress=='.'||*lackExpress == '%')
    {
        m_isPromoted = true;
        QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("第一个数为+ * / ) . % 请输入正确值！"),QMessageBox::Ok);
        m_isPromoted = false;
        return false;
    }
    else if(length==0)                     // 连续输入等号，entrt键
    {
        return false;
    }
    else if(length>0)
    {
        char finalExpChar = finalExp.at(length-1);
        if(finalExpChar == '.'||finalExpChar == '('||finalExpChar == '+'||finalExpChar == '-'||finalExpChar == '*'||finalExpChar == '/'||finalExpChar == '%'||finalExpChar == '#')
        {
            m_isPromoted = true;
            QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("最后一个数为+ - * / ( . %请输入正确值！"),QMessageBox::Ok);
            m_isPromoted = false;
            return false;
        }
    }
    else
    {
        return true;
    }
}
/**
 * @brief 括号数目不匹配，左括号在前门
 * @param 输入表达式
 * @return false 不去执行逆波兰，堵塞
 */
bool CValidationExpression::missingBraces(QString express)
{
     string braceExp = express.toStdString();
     int length = braceExp.length();
     int leftBraceIndex = 0;           //记录左括号的数量
     int rightBraceIndex = 0;          //记录右括号的数量
     int leftNum = 0;                  //记录从左到左括号有几个数
     int righeNum = 0;                 //记录从左到右括号有几个数
     for(int i=0;i<length;i++)
     {
         char braceExpChar = braceExp.at(i);
         if(braceExpChar=='(')
         {
             leftBraceIndex++;
             leftNum = i;
         }
         else if(braceExpChar == ')')
         {
             rightBraceIndex++;
             righeNum = i;
         }

     }

     if((leftBraceIndex == rightBraceIndex)&&(leftNum <= righeNum))
     {
         return true;
     }else
     {
         m_isPromoted = true;
         QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("括号数目不匹配或左括号应该在前，请输入正确值！"),QMessageBox::Ok);
         m_isPromoted = false;
         return false;
     }


}
/**
 * @brief 1左括号规则  2数字后面不能是 (
 * @param 输入表达式
 * @return false 不去执行逆波兰，堵塞
 */
bool CValidationExpression::leftBraces(QString express)
{
     QByteArray byte = express.toUtf8();
     char*  leftBrace = byte.data();
     while(*leftBrace != '\0')
     {
         if(*leftBrace == '(')
         {
             *leftBrace--;     //前一个
             if(*leftBrace>='0'&&*leftBrace<='9')
             {
                 QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("左括号前不能为数字，请输入正确值！"));
                 return false;
             }
             *leftBrace++;
             *leftBrace++;     //后一个
             if(*leftBrace == ')'||*leftBrace == '+'||*leftBrace == '*'||*leftBrace == '/'||*leftBrace == '%'||*leftBrace == '.')
             {
                 m_isPromoted = true;
                 QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("左括号后不能为) . + * / %，请输入正确值！"));
                 m_isPromoted = false;
                 return false;
             }
         }
         *leftBrace++;
     }
}

/**
 * @brief  右括号规则
 * @param  输入表达式
 * @return false 不去执行逆波兰，堵塞
 */
bool CValidationExpression::rightBraces(QString express)
{
     QByteArray byte = express.toUtf8();
     char*  rightBrace = byte.data();
     while(*rightBrace != '\0')
     {
         if(*rightBrace == ')')
         {
             *rightBrace--;     //前一个
             if(*rightBrace=='.'||*rightBrace=='+'||*rightBrace=='-'||*rightBrace=='*'||*rightBrace=='('||*rightBrace=='%'||*rightBrace=='n')
             {
                 m_isPromoted = true;
                 QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("右括号前不能为( . + - * % 负号，请输入正确值！"));
                 m_isPromoted = false;
                 return false;
             }
             *rightBrace++;
             *rightBrace++;     //后一个
             if(*rightBrace == '.'||*rightBrace == 'n')
             {
                 m_isPromoted = true;
                 QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("右括号后不能为) . 负数，请输入正确值！"));
                 m_isPromoted = false;
                 return false;
             }

         }
         *rightBrace++;

     }
}

/**
 * @brief  1.只能有一个小数点  2，小数点前后不能是 负号
 * @param  输入的表达式
 * @return false 不去执行逆波兰，堵塞
 */
bool CValidationExpression::dotRule(QString express)
{
    QByteArray byte = express.toUtf8();
    char*  dotExpess = byte.data();
    while(*dotExpess != '\0')
    {
        if(*dotExpess=='.')
        {
            dotExpess++;
            while(*dotExpess>='0'&&*dotExpess<='9')
            {
                dotExpess++;
                if(*dotExpess=='.')//如果还有小数点，不止一个
                {
                    m_isPromoted = true;
                    QMessageBox::information(NULL,QObject::tr("error"),QObject::tr("小数点重复，请输入正确值！"));
                    m_isPromoted = false;
                    return false;
                }
            }
        }
        dotExpess++;
    }
}
/**
 * @brief  判断是否负数
 * @param  输入的表达式
 * @return 如果是负数插入 0-x
 */
QString CValidationExpression::foramt(QString formatExp)
{
    int length = formatExp.length();
    for(int i = 0;i < length; i++){
        if(formatExp[i] == '-'){
            if(i == 0){
                formatExp.insert(0,QString("0"));
            }else if(formatExp[i-1] == '('){
                formatExp.insert(i,QString("0"));
            }
        }
    }
    return formatExp;
}

bool CValidationExpression::isPromoted() const
{
    return m_isPromoted;
}
