---
title: 1.4. Арифметические операции
---

# Арифметические операции

В этом разделе рассматриваются основные способы записи чисел в базовой ЭВМ, арифметические операции, выполняемые с этими числами, и команды, инициирующие арифметические операции.

Целые двоичные числа без знака можно использовать для представления нуля и целых положительных чисел. 
При размещении таких чисел в одном *16-разрядном слове* они могут изменяться <br />
от `0000 0000 0000 0000`<sub>2</sub> = `0000`<sub>16</sub> = `0`<sub>10</sub> <br />
до `1111 1111 1111 1111`<sub>2</sub> = `1FFF`<sub>16</sub> = `(215 - 1)`<sub>10</sub> = `65535`<sub>10</sub>.

Подобные числа (так же, как и рассмотренные ниже двоичные числа со знаком) относятся к числам с фиксированной запятой, 
разделяющей целую и дробную части числа. 
В числах, используемых в базовой ЭВМ, положение запятой строго фиксировано после младшего бита слова.

Целые двоичные числа со знаком используются тогда, когда необходимо различать ***положительные*** и ***отрицательные*** числа. 
В них ***старший бит*** используется для кодирования знака: 
* `0` - для положительных чисел 
* `1` - для отрицательных чисел.

Отрицательные числа представлены в ***дополнительном коде***. Это упрощает конструкцию ЭВМ, так как при сложении двух таких чисел, 
имеющих разные знаки, не требуется переходить к операциям вычитания меньшего (по модулю) 
числа из большего и присвоения результату знака большего числа.

Рассмотрим простое правило для получения дополнительного кода двоичного числа (для примера взято двоичное число, эквивалентное числу *709<sub>10</sub>*):

1. Получить инверсию заданного числа (все его ***0*** заменить на ***1***, а все ***1*** - на ***0***):

    ```markdown
      0 000 0010 1100 0101 - Число
      1 111 1101 0011 1010 - Инверсия числа
    ```

2. Образовать дополнительный код заданного числа путем добавления ***1*** к инверсии этого числа:
   
   ```markdown
      1 111 1101 0011 1010 - Инверсия числа
    + 0 000 0000 0000 0001 - Слагаемое 1 
    ————————————————————————————————————————
	  1 111 1101 0011 1011 - Дополнительный код числа
    ```

3. Проверим правильность вычисления дополнения путем сложения заданного числа и его дополнения:
    
    ```markdown
      0 000 0010 1100 0101 - Число
    + 1 000 0010 1100 0101 - Прямой код
    ————————————————————————————————————
	  1 000 0101 1000 1010 - Дополнительный код числа
    ```

Так как перенос из старшего разряда выпадает за пределы разрядной сетки, то он не учитывается. Оставшаяся же 16-разрядная сумма равна нулю, что подтверждает правильность преобразования.

* **Сложение** целых двоичных чисел со знаком и без знака выполняется в базовой ЭВМ с помощью команды ADD.

* **Увеличение на 1 (*INCREMENT*) и уменьшение на 1 (*DECREMENT*)**.<br/>
По команде *INC* к содержимому аккумулятора прибавляется единица, а по команде *DEC* - единица вычитается. 
Если при этом возникает перенос из старшего разряда *А*, то в регистр переноса заносится *1*, в противном случае в него заносится *0*.

* **Вычитание** *(X-Y)* может выполняться путем сложения уменьшаемого X и дополнительного кода вычитаемого Y.
Однако это требует записи и выполнения нескольких команд (*CLA*, *ADD Y*, *CMA*, *INC*, *ADD X*). 
Для сокращения программ и времени выполнения вычитания в базовой ЭВМ предусмотрена команда **SUB Y** (*CLA*, *ADD X*, *SUB Y*), которая реализует те же действия за меньшее время.

* **Умножение и деление**. В базовой ЭВМ нет команд для выполнения этих действий (АЛУ не выполняет таких операций).Поэтому произведение и частное приходится получать программным путем.

* **Сложение с переносом (ADC M)**.<br/>
`ADC` позволяет выполнить сложение `(A)`, `(M)`, и `(C)`, обеспечивая корректное сложение чисел больше разрядности аккумулятора.
Формат команды: `5XXX`, где `XXX` - адрес операнда.<br />
Пример операции: `(A) + (M) + (C) -> A`.