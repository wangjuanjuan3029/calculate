#ifndef MYMESSEXGBOX_H
#define MYMESSEXGBOX_H

#include <QObject>
#include <QMessageBox>

class MyMesseageBox : public QObject
{
    Q_OBJECT
public:
    explicit MyMesseageBox(QObject *parent = 0);
    static void MessageBox(QString express);

signals:

public slots:
};

#endif // MYMESSEXGBOX_H
