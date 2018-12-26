#ifndef CAL_H
#define CAL_H

#include <QObject>
#include <QStack>

using namespace std;
/****************************
 * 功能： 用于 转逆波兰 计算
 * 开发者：汪娟娟
 * 日期：  2018年12月11日
 *****************************/
class CCal : public QObject
{
    Q_OBJECT
public:
    explicit CCal(QObject *parent = 0);
    void Tonibolan(const QString &mid,QStack<QString> &postfix); //转为逆波兰
    double Calcval(QStack<QString> &postfix);                    //计算逆波兰表达式的值
    bool divisorOfZero = false;                                  //接收除数为0的返回信息
    bool isDot = false;

private:
     int Priority(QString oper);                                 //定义优先级别

signals:

public slots:
};

#endif // CAL_H
