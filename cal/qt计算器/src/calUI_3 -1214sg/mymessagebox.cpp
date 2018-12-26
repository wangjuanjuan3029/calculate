#include "mymessagebox.h"

MyMesseageBox::MyMesseageBox(QObject *parent) : QObject(parent)
{

}
void MyMesseageBox::MessageBox(QString express)
{
    QMessageBox message;
    message.setWindowTitle(QObject::tr("信息"));
    message.setText(QObject::tr("%1").arg(express));
    message.setStandardButtons(QMessageBox::Ok);
    message.setButtonText(QMessageBox::Ok , "确定");
    message.exec();
}
