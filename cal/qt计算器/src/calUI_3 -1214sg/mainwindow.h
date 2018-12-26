#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "Cal.h"
#include "ValidationExpression.h"
#include <stack>

#include <QMainWindow>
using std::string;
/****************************
 * 功能： 用于主函数进入
 * 开发者：汪娟娟
 * 日期：  2018年12月11日
 *****************************/
namespace Ui {
class MainWindow;
}

class CValidationExpression;

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    QStack<QString> postfix;              //存放结果
    bool isNegative = false;              //负数
    QString textFromBtn;                  //存储从按钮获取的数字
    void keyPressEvent(QKeyEvent *event); //获取键盘输入值
    void RepetitionShow(QString express); //处理重复出现小数点,加减乘除，提示错误，然后只显示一个

private slots:

    void equalCalculation();              //当点击等号去执行这个槽

    void on_btn_0_clicked();

    void on_btn_1_clicked();

    void on_btn_2_clicked();

    void on_btn_3_clicked();

    void on_btn_4_clicked();

    void on_btn_5_clicked();

    void on_btn_6_clicked();

    void on_btn_7_clicked();

    void on_btn_8_clicked();

    void on_btn_9_clicked();

    void on_btn_addition_clicked();

    void on_btn_subtraction_clicked();

    void on_btn_multiplcation_clicked();

    void on_btn_division_clicked();

    void on_btn_leftParenthesis_clicked();

    void on_btn_rightParenthesis_clicked();

    void on_btn_arrows_clicked();

    void on_btn_c_clicked();

    void on_btn_dot_clicked();

    void on_btn_remainder_clicked();

    void on_btn_nagative_clicked();

private:
    Ui::MainWindow *ui;

    CValidationExpression * m_validationObj;
    CCal * m_calObj;
};

#endif // MAINWINDOW_H
