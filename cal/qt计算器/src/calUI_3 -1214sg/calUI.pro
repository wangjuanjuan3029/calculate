#-------------------------------------------------
#
# Project created by QtCreator 2018-11-28T11:07:41
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = calUI
TEMPLATE = app


SOURCES += main.cpp\
        mainwindow.cpp \
    Cal.cpp \
    Validationexpression.cpp

HEADERS  += mainwindow.h \
    Cal.h \
    ValidationExpression.h

FORMS    += mainwindow.ui

RESOURCES += \
    res.qrc
