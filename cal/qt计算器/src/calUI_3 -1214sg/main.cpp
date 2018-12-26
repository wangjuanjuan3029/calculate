#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
    w.show();

    /*
     * 1）调用验证是否负数
     * 2）调用验证表达式
     * 3）调用逆波兰函数
     * 4）调用计算函数
     */

    return a.exec();
}
