#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "ValidationExpression.h"
#include "cal.h"

#include <iostream>
#include <QDebug>
#include <QPushButton>
#include <QMenuBar>
#include <QMenu>
#include <QString>
#include <QIcon>
#include <QKeyEvent>

using namespace std;
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    this->setWindowIcon(QIcon(":/picture/wang.ico"));
    this->setWindowTitle("计算器");
    this->setFixedSize(261,380);   
    //设置文本对齐格式
    ui->lineEdit->QLineEdit::setAlignment(Qt::AlignRight);
    ui->lineEdit_show->QLineEdit::setAlignment(Qt::AlignRight);
    //定制热键的问题，可以取消掉空格
    this->grabKeyboard();
    //当输入等号，进入逆波兰实现计算
    connect(ui->btn_equal,SIGNAL(clicked()),this,SLOT(equalCalculation()));
    connect(ui->actionQuit,&QAction::triggered,[=](){
        this->close();
    });

    m_validationObj = new CValidationExpression();
    m_calObj = new CCal();
}
/**
 * @brief 触发键盘事件
 * @param event
 */
void MainWindow::keyPressEvent(QKeyEvent *event)
{
    if(m_validationObj->isPromoted())
        return;

    switch (event->key()) {
    case Qt::Key_Enter:
        equalCalculation();
        break;
    case Qt::Key_Return:
        equalCalculation();
        break;
    case Qt::Key_0:
        on_btn_0_clicked();
        break;
    case Qt::Key_1:
        on_btn_1_clicked();
        break;
    case Qt::Key_2:
        on_btn_2_clicked();
        break;
    case Qt::Key_3:
        on_btn_3_clicked();
        break;
    case Qt::Key_4:
        on_btn_4_clicked();
        break;
    case Qt::Key_5:
        on_btn_5_clicked();
        break;
    case Qt::Key_6:
        on_btn_6_clicked();
        break;
    case Qt::Key_7:
        on_btn_7_clicked();
        break;
    case Qt::Key_8:
        on_btn_8_clicked();
        break;
    case Qt::Key_9:
        on_btn_9_clicked();
        break;
    case Qt::Key_Plus:
        on_btn_addition_clicked();
        break;
    case Qt::Key_Minus:
        on_btn_subtraction_clicked();
        break;
    case Qt::Key_Asterisk:
        on_btn_multiplcation_clicked();
        break;
    case Qt::Key_Slash:
         on_btn_division_clicked();
        break;
    case Qt::Key_Period:
        on_btn_dot_clicked();
        break;
    case Qt::Key_ParenLeft:
        on_btn_leftParenthesis_clicked();
        break;
    case Qt::Key_ParenRight:
        on_btn_rightParenthesis_clicked();
        break;
    case Qt::Key_Backspace:
        on_btn_arrows_clicked();
        break;
    case Qt::Key_Percent:
        on_btn_remainder_clicked();
        break;
    default:
        break;
    }
}

//输入等号槽
void MainWindow::equalCalculation()
{

    QString formatexp = m_validationObj->foramt(textFromBtn);  //1）调用验证是否负数
    textFromBtn = formatexp;

    bool vaildFlag = false;
    vaildFlag = m_validationObj->validation(textFromBtn);       //2）调用验证表达式
    if(vaildFlag)
    {
        QString firstStr = "#";
        textFromBtn +=firstStr;
        m_calObj->Tonibolan(textFromBtn,postfix);               //3）调用逆波兰函数
        qDebug()<<"算式的逆波兰表达式为：";
        qDebug()<<postfix;
        double sum = m_calObj->Calcval(postfix);                 //4）调用计算函数
        QString tempTextFromBtn = textFromBtn.replace("#","");   //界面不显示#出来
        ui->lineEdit->setText(tempTextFromBtn);
        ui->lineEdit_show->setText(QString::number(sum));
        if(m_calObj->divisorOfZero)
        {
            m_calObj->divisorOfZero = false;
            ui->lineEdit_show->setText("除数为0");
        }
        if(m_calObj->isDot)
        {
            m_calObj->isDot = false;
            ui->lineEdit_show->setText("求余不能为小数");
        }
    }
}

const static QString strNum_0 = "0";
void MainWindow::on_btn_0_clicked()
{
    textFromBtn += strNum_0;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_1 = "1";
void MainWindow::on_btn_1_clicked()
{
    textFromBtn += strNum_1;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_2 = "2";
void MainWindow::on_btn_2_clicked()
{
    textFromBtn += strNum_2;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_3 = "3";
void MainWindow::on_btn_3_clicked()
{
    textFromBtn +=strNum_3;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_4 = "4";
void MainWindow::on_btn_4_clicked()
{
    textFromBtn += strNum_4;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_5 = "5";
void MainWindow::on_btn_5_clicked()
{
    textFromBtn += strNum_5;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_6 = "6";
void MainWindow::on_btn_6_clicked()
{
    textFromBtn += strNum_6;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_7 = "7";
void MainWindow::on_btn_7_clicked()
{
    textFromBtn += strNum_7;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_8 = "8";
void MainWindow::on_btn_8_clicked()
{
    textFromBtn += strNum_8;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_9 = "9";
void MainWindow::on_btn_9_clicked()
{
    textFromBtn += strNum_9;
    ui->lineEdit->setText(textFromBtn);
}

const static QString strNum_add = "+";
void MainWindow::on_btn_addition_clicked()
{
    textFromBtn += strNum_add;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}

const static QString strNum_sub = "-";
void MainWindow::on_btn_subtraction_clicked()
{
    textFromBtn += strNum_sub;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}

const static QString strNum_mul = "*";
void MainWindow::on_btn_multiplcation_clicked()
{
    textFromBtn += strNum_mul;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}

const static QString strNum_div = "/";
void MainWindow::on_btn_division_clicked()
{
    textFromBtn += strNum_div;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}

const static QString strNum_dot = ".";
void MainWindow::on_btn_dot_clicked()
{
    textFromBtn += strNum_dot;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}

const static QString strNum_left = "(";
void MainWindow::on_btn_leftParenthesis_clicked()
{
    textFromBtn += strNum_left;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}

const static QString strNum_right = ")";
void MainWindow::on_btn_rightParenthesis_clicked()
{
    textFromBtn += strNum_right;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}

const static QString strNum_remainder = "%";
void MainWindow::on_btn_remainder_clicked()
{
    textFromBtn += strNum_remainder;
    RepetitionShow(textFromBtn);   //调用函数，只让%等出现一次
}


void MainWindow::on_btn_arrows_clicked()
{
    string text = textFromBtn.toStdString();
    int length = text.length();
    if(length>0)
    {
        textFromBtn = textFromBtn.left(textFromBtn.length()-1);
        ui->lineEdit->setText(textFromBtn);
    }
    else
    {
        return;
    }

}
void MainWindow::on_btn_c_clicked()
{

    textFromBtn = textFromBtn.left(0);  //清空存储从按钮获取的数字
    ui->lineEdit->clear();
    ui->lineEdit_show->clear();
}
void MainWindow::on_btn_nagative_clicked()
{
    on_btn_subtraction_clicked();
}
/**
 * @brief MainWindow::RepetitionShow
 * 处理重复出现小数点,加减乘除，提示错误，然后只显示一个
 * @param express  返回处理后的表达式，重复不会出现
 */
void MainWindow::RepetitionShow(QString express)
{
    QString validaRes = m_validationObj->invalidRepeated(express);
    textFromBtn = validaRes;
    ui->lineEdit->setText(textFromBtn);
}


MainWindow::~MainWindow()
{
    delete ui;

    if(NULL != m_validationObj)
    {
       delete m_validationObj;
       m_validationObj = NULL;
    }
    if(NULL != m_calObj)
    {
        delete m_calObj;
        m_calObj = NULL;
    }
}
