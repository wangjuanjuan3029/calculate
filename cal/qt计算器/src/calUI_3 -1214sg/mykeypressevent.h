#ifndef MYKEYPRESSEVENT_H
#define MYKEYPRESSEVENT_H

#include <QKeyEvent>
#include <QDebug>

class MyKeyPressEvent
{
public:
    MyKeyPressEvent();
    void keyPressEvent(QKeyEvent *event);//获取键盘输入值
};

#endif // MYKEYPRESSEVENT_H
