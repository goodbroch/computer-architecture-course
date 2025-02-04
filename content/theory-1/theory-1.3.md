---
title: 1.3. Таблица команд БЭВМ
---

# Таблица команд БЭВМ

<table>
    <thead>
        <tr>
            <th>Наименование</th>
            <th>Мнемоника</th>
            <th>Код</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colSpan="4" align="center" >Адресные команды</td>
        </tr>
        <tr>
            <td>Побитовая конъюнкция</td>
            <td>AND M</td>
            <td>1XXX</td>
            <td>(A) & (M) -> A</td>
        </tr>
        <tr>
            <td>Обращение к подпрограмме</td>
            <td>JSR M</td>
            <td>2XXX</td>
            <td>(СК) -> М, (М) + 1 -> СК</td>
        </tr>
        <tr>
            <td>Пересылка</td>
            <td>MOV M</td>
            <td>3XXX</td>
            <td>(A) -> M</td>
        </tr>
        <tr>
            <td>Сложение</td>
            <td>ADD M</td>
            <td>4XXX</td>
            <td>(A) + (M) -> A</td>
        </tr>
        <tr>
            <td>Сложение с переносом</td>
            <td>ADC M</td>
            <td>5XXX</td>
            <td>(A) + (M) + (C) -> A</td>
        </tr>
        <tr>
            <td>Вычитание</td>
            <td>SUB M</td>
            <td>6XXX</td>
            <td>(A) - (M) -> A</td>
        </tr>
        <tr>
            <td>Переход, если перенос</td>
            <td>BCS M</td>
            <td>8XXX</td>
            <td>ЕСЛИ (С) = 1, то M -> СК</td>
        </tr>
        <tr>
            <td>Переход, если плюс</td>
            <td>BPL M</td>
            <td>9XXX</td>
            <td>ЕСЛИ (A) >= 0, то (М) -> СК</td>
        </tr>
        <tr>
            <td>Переход, если минус</td>
            <td>BMI M</td>
            <td>AXXX</td>
            <td>ЕСЛИ (A) < 0, то М -> СК</td>
        </tr>
        <tr>
            <td>Переход, если ноль</td>
            <td>BEQ M</td>
            <td>BXXX</td>
            <td>ЕСЛИ (A) = 0 и (С) = 0, то М -> СК</td>
        </tr>
        <tr>
            <td>Безусловный переход</td>
            <td>BR M</td>
            <td>CXXX</td>
            <td>(М) -> СК</td>
        </tr>
        <tr>
            <td>Приращение и пропуск</td>
            <td>ISZ M</td>
            <td>0XXX</td>
            <td>(M) + 1 -> M</td>
        </tr>
        <tr>
            <td colSpan="4" align="center" >Безадресные команды</td>
        </tr>
        <tr>
            <td>Очистка аккумулятора</td>
            <td>CLA</td>
            <td>F200</td>
            <td>0 -> A</td>
        </tr>
        <tr>
            <td>Очистка рег. переноса</td>
            <td>CLC</td>
            <td>F300</td>
            <td>0 -> C</td>
        </tr>
        <tr>
            <td>Инверсия аккумулятора</td>
            <td>CMA</td>
            <td>F400</td>
            <td>!(A) -> A</td>
        </tr>
        <tr>
            <td>Инверсия рег. переноса</td>
            <td>CMC</td>
            <td>F500</td>
            <td>!(C) -> C</td>
        </tr>
        <tr>
            <td>Циклический сдвиг влево на 1 разряд</td>
            <td>ROL</td>
            <td>F600</td>
            <td>Содержимое A и C сдвигается влево,<br/> А(15) -> C, C -> A(0)</td>
        </tr>
        <tr>
            <td>Циклический сдвиг вправо на 1 разряд</td>
            <td>ROR</td>
            <td>F700</td>
            <td>Содержимое A и C сдвигается вправо,<br/> A(0) -> C, C -> A(15)</td>
        </tr>
        <tr>
            <td>Инкремент аккумулятора</td>
            <td>INC</td>
            <td>F800</td>
            <td>(A) + 1 -> A</td>
        </tr>
        <tr>
            <td>Декремент аккумулятора</td>
            <td>DEC</td>
            <td>F900</td>
            <td>(A) - 1 -> A</td>
        </tr>
        <tr>
            <td>Остановка операций</td>
            <td>HLT</td>
            <td>F000</td>
            <td></td>
        </tr>
        <tr>
            <td>Нет операции</td>
            <td>NOP</td>
            <td>F100</td>
            <td></td>
        </tr>
        <tr>
            <td>Разрешение прерывания</td>
            <td>EI</td>
            <td>FA00</td>
            <td></td>
        </tr>
        <tr>
            <td>Запрещение прерывания</td>
            <td>DI</td>
            <td>FB00</td>
            <td></td>
        </tr>
        <tr>
            <td colSpan="4" align="center" >Команды ввода-вывода</td>
        </tr>
        <tr>
            <td>Очистка флага</td>
            <td>CLF B</td>
            <td>E0XX</td>
            <td>0 -> флаг устр. B</td>
        </tr>
        <tr>
            <td>Опрос флага</td>
            <td>TSF B</td>
            <td>E1XX</td>
            <td>ЕСЛИ (флаг устр. B) = 1, то (СК) + 1 -> СК </td>
        </tr>
        <tr>
            <td>Ввод</td>
            <td>IN B</td>
            <td>E2XX</td>
            <td>(B) -> A</td>
        </tr>
        <tr>
            <td>Вывод</td>
            <td>OUT</td>
            <td>E3XX</td>
            <td>(A) -> B</td>
        </tr>
    </tbody>
</table>

### Примечания:

* **(M)**  - содержимое ячейки с адресом *M*
* **(A)**  - содержимое *аккумулятора*
* **(CK)** - содержимое *счетчика команд*
* **(C)**  - содержимое *регистра переноса*
* **(B)**  – содержимое регистра данных устройства ввода-вывода с адресом *B*.
* **XXX**  – адрес ячейки памяти.
* **XX**   – адрес устройства ввода-вывода.
