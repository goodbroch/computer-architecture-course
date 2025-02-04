---
title: 3.2. Интерпретатор базовой ЭВМ
---

## Интерпретатор базовой ЭВМ

Полный текст микропрограммы (интерпретатора команд) приведен в табл. 3.2. В этой таблице есть один "лишний" столбец (ВЕРТ.), содержание которого будет описано ниже.

Первые микрокоманды интерпретатора служат для выборки команды из основной памяти (ОП) базовой ЭВМ и определения ее типа: адресная, безадресная или ввода-вывода. Для этого содержимое СК (в котором хранится адрес исполняемой команды) пересылается через БР в РА (СК=>БР и БР=>РА). Затем из ячейки ОП, на которую указывает РА, пересылается в РД команда, а содержимое СК увеличивается на единицу и пересылается в БР: ОП(РА)=>РД, СК+1=>БР.

Таблица 3.2 - Интерпретатор базовой ЭВМ (микропрограмма)

<table>
    <thead>
        <tr>
            <th>Адрес</th>
            <th colSpan="2">Микрокоманды</th>
            <th colSpan="2">Комментарии</th>
        </tr>
        <tr>
            <th></th>
            <th>Горизонт.</th>
            <th>Верт.</th>
            <th>Метка</th>
            <th>Действие</th>
        </tr>
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
        </tr>
        <tr>
            <th colSpan="5"><b><i>Цикл выборки команды</i></b></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>01</td>
            <td>0000 0008</td>
            <td>0300</td>
            <td>нач</td>
            <td>СК ==> БР</td>
        </tr>
        <tr>
            <td>02</td>
            <td>0004 0000</td>
            <td>4001</td>
            <td></td>
            <td>БР ==> РА</td>
        </tr>
        <tr>
            <td>03</td>
            <td>0080 0408</td>
            <td>0311</td>
            <td></td>
            <td>ОП(РФ) ==> РД, СК + 1 ==> БР</td>
        </tr>
        <tr>
            <td>04</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>05</td>
            <td>0000 0002</td>
            <td>0100</td>
            <td></td>
            <td>РД ==> БР</td>
        </tr>
        <tr>
            <td>06</td>
            <td>0010 0000</td>
            <td>4003</td>
            <td></td>
            <td>БР ==> РК</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Определение типа команды</b></i></th>
        </tr>
        <tr>
            <td>07</td>
            <td>880C 8000</td>
            <td>AF0C</td>
            <td></td>
            <td>IF BIT(15,PK) = 0 THEN АДЦ(0C)</td>
        </tr>
        <tr>
            <td>08</td>
            <td>880C 4000</td>
            <td>AE0C</td>
            <td></td>
            <td>IF BIT(14,PK) = 0 THEN АДЦ(0C)</td>
        </tr>
        <tr>
            <td>09</td>
            <td>880C 2000</td>
            <td>AD0C</td>
            <td></td>
            <td>IF BIT(13,PK) = 0 THEN АДЦ(0C)</td>
        </tr>
        <tr>
            <td>0A</td>
            <td>895E 1000</td>
            <td>EC5E</td>
            <td></td>
            <td>IF BIT(12,PK) = 1 THEN БАД(5Е)</td>
        </tr>
        <tr>
            <td>0B</td>
            <td>828E 0008</td>
            <td>83BE</td>
            <td></td>
            <td>GOTO B/B(8E)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Определение вида адресации</b></i></th>
        </tr>
        <tr>
            <td>0C</td>
            <td>881D 0800</td>
            <td>AB1D</td>
            <td>АДЦ</td>
            <td>IF BIT(11,PK) = 0 THEN АДР(1D)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Цикл выборки адреса операнда</b></i></th>
        </tr>
        <tr>
            <td>0D</td>
            <td>0000 0002</td>
            <td>0100</td>
            <td></td>
            <td>РД ==> БР</td>
        </tr>
        <tr>
            <td>0E</td>
            <td>0004 0000</td>
            <td>4001</td>
            <td></td>
            <td>БР ==> РА</td>
        </tr>
        <tr>
            <td>0F</td>
            <td>0080 0000</td>
            <td>0001</td>
            <td></td>
            <td>ОП(РА) ==> РД</td>
        </tr>
        <tr>
            <td>10</td>
            <td>881D 0008</td>
            <td>A31D</td>
            <td></td>
            <td>IF BIT(3,PK) = 0 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>11</td>
            <td>891D 0010</td>
            <td>E41D</td>
            <td></td>
            <td>IF BIT(4,PK) = 1 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>12</td>
            <td>891D 0020</td>
            <td>E51D</td>
            <td></td>
            <td>IF BIT(5,PK) = 1 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>13</td>
            <td>891D 0040</td>
            <td>E61D</td>
            <td></td>
            <td>IF BIT(6,PK) = 1 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>14</td>
            <td>891D 0080</td>
            <td>E71D</td>
            <td></td>
            <td>IF BIT(7,PK) = 1 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>15</td>
            <td>891D 0100</td>
            <td>E81D</td>
            <td></td>
            <td>IF BIT(8,PK) = 1 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>16</td>
            <td>891D 0200</td>
            <td>E91D</td>
            <td></td>
            <td>IF BIT(9,PK) = 1 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>17</td>
            <td>891D 0400</td>
            <td>EA1D</td>
            <td></td>
            <td>IF BIT(10,PK) = 1 THEN АДР(1D)</td>
        </tr>
        <tr>
            <td>18</td>
            <td>0000 0402</td>
            <td>0110</td>
            <td></td>
            <td>РД ==> БР</td>
        </tr>
        <tr>
            <td>19</td>
            <td>0008 0000</td>
            <td>4002</td>
            <td></td>
            <td>БР ==> РД</td>
        </tr>
        <tr>
            <td>1A</td>
            <td>0100 0000</td>
            <td>0002</td>
            <td></td>
            <td>РД ==> ОП(РА)</td>
        </tr>
        <tr>
            <td>1B</td>
            <td>0000 0082</td>
            <td>0140</td>
            <td></td>
            <td>РД + СОМ(0) = РД - 1 ==> БР</td>
        </tr>
        <tr>
            <td>1C</td>
            <td>0008 0000</td>
            <td>4002</td>
            <td></td>
            <td>БР ==> РД</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Цикл исполнения адресных команд</b></i></th>
        </tr>
        <tr>
            <th colspan=5><b><i>Декодирование адресных команд</b></i></th>
        </tr>
        <tr>
            <td>1D</td>
            <td>892D 8000</td>
            <td>EF2D</td>
            <td>АДР</td>
            <td>IF BIT(15,PK) = 1 THEN ПРХ(2D)</td>
        </tr>
        <tr>
            <td>1E</td>
            <td>0000 0002</td>
            <td>0100</td>
            <td></td>
            <td>РД ==> БР</td>
        </tr>
        <tr>
            <td>1F</td>
            <td>0004 0000</td>
            <td>4001</td>
            <td></td>
            <td>БР ==> РА</td>
        </tr>
        <tr>
            <td>20</td>
            <td>8927 4000</td>
            <td>EE27</td>
            <td></td>
            <td>IF BIT(14,PK) = 1 THEN АРФ(27)</td>
        </tr>
        <tr>
            <td>21</td>
            <td>8824 2000</td>
            <td>AD24</td>
            <td></td>
            <td>IF BIT(13,PK) = 0 THEN A1(24)</td>
        </tr>
        <tr>
            <td>22</td>
            <td>8857 1000</td>
            <td>AC57</td>
            <td></td>
            <td>IF BIT(12,PK) = 0 THEN JSR(57)</td>
        </tr>
        <tr>
            <td>23</td>
            <td>8238 0008</td>
            <td>8338</td>
            <td></td>
            <td>GOTO MOV(38)</td>
        </tr>
        <tr>
            <td>24</td>
            <td>0080 0000</td>
            <td>0001</td>
            <td>A1</td>
            <td>ОП(РА) ==> РД</td>
        </tr>
        <tr>
            <td>25</td>
            <td>8850 1000</td>
            <td>AC50</td>
            <td></td>
            <td>IF BIT(12,PK) = 0 THEN ISZ(50)</td>
        </tr>
        <tr>
            <td>26</td>
            <td>8235 0008</td>
            <td>8335</td>
            <td></td>
            <td>GOTO AND(35)</td>
        </tr>
        <tr>
            <td>27</td>
            <td>0080 0000</td>
            <td>0001</td>
            <td>АРФ</td>
            <td>ОП(РА) ==> РД</td>
        </tr>
        <tr>
            <td>28</td>
            <td>882B 2000</td>
            <td>AD2B</td>
            <td></td>
            <td>IF BIT(13,PK) = 0 THEN СУМ(2B)</td>
        </tr>
        <tr>
            <td>29</td>
            <td>8843 1000</td>
            <td>AC43</td>
            <td></td>
            <td>IF BIT(12,PK) = 0 THEN SUB(43)</td>
        </tr>
        <tr>
            <td>2A</td>
            <td>82B0 0008</td>
            <td>83B0</td>
            <td></td>
            <td>GOTO P - A(B0)</td>
        </tr>
        <tr>
            <td>2B</td>
            <td>883C 1000</td>
            <td>AC3C</td>
            <td>СУМ</td>
            <td>IF BIT(12,PK) = 0 THEN ADD(3C)</td>
        </tr>
        <tr>
            <td>2C</td>
            <td>823F 0000</td>
            <td>833F</td>
            <td></td>
            <td>GOTO ADC(3F)</td>
        </tr>
        <tr>
            <td>2D</td>
            <td>8830 4000</td>
            <td>AE30</td>
            <td>ПРХ</td>
            <td>IF BIT(14,PK) = 0 THEN УПХ(30)</td>
        </tr>
        <tr>
            <td>2E</td>
            <td>8847 1000</td>
            <td>AC47</td>
            <td></td>
            <td>IF BIT(12,PK) = 0 THEN BR(47)</td>
        </tr>
        <tr>
            <td>2F</td>
            <td>82D0 0008</td>
            <td>83D0</td>
            <td></td>
            <td>GOTO Р - П(D0)</td>
        </tr>
        <tr>
            <td>30</td>
            <td>8833 2000</td>
            <td>AD33</td>
            <td>УПХ</td>
            <td>IF BIT(13,PK) = 0 THEN П1(33)</td>
        </tr>
        <tr>
            <td>31</td>
            <td>884С 1000</td>
            <td>AC4C</td>
            <td></td>
            <td>IF BIT(12,PK) = 0 THEN BMI(4C)</td>
        </tr>
        <tr>
            <td>32</td>
            <td>824E 0008</td>
            <td>834E</td>
            <td></td>
            <td>GOTO BEQ(4E)</td>
        </tr>
        <tr>
            <td>33</td>
            <td>8846 1000</td>
            <td>AC46</td>
            <td>П1</td>
            <td>IF BIT(12,PK) = 0 THEN BCS(46)</td>
        </tr>
        <tr>
            <td>34</td>
            <td>824A 0008</td>
            <td>834A</td>
            <td></td>
            <td>GOTO BPL(4A)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Исполнение адресных команд</b></i></th>
        </tr>
        <tr>
            <td>35</td>
            <td>0000 0212</td>
            <td>1120</td>
            <td>AND</td>
            <td>A & РД ==> БР</td>
        </tr>
        <tr>
            <td>36</td>
            <td>0040 C000</td>
            <td>4035</td>
            <td></td>
            <td>БР ==> A, N, Z</td>
        </tr>
        <tr>
            <td>37</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>38</td>
            <td>0000 0010</td>
            <td>1000</td>
            <td>MOV</td>
            <td>A ==> БР</td>
        </tr>
        <tr>
            <td>39</td>
            <td>0008 0000</td>
            <td>4002</td>
            <td></td>
            <td>БР ==> РД</td>
        </tr>
        <tr>
            <td>3A</td>
            <td>0100 0000</td>
            <td>0002</td>
            <td></td>
            <td>РД ==> ОП(РА)</td>
        </tr>
        <tr>
            <td>3B</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>3C</td>
            <td>0000 0012</td>
            <td>1100</td>
            <td>ADD</td>
            <td>A + РД ==> БР</td>
        </tr>
        <tr>
            <td>3D</td>
            <td>0040 E000</td>
            <td>4075</td>
            <td></td>
            <td>БР ==> A, C, N, Z</td>
        </tr>
        <tr>
            <td>3E</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>3F</td>
            <td>823C 0001</td>
            <td>803C</td>
            <td>ADC</td>
            <td>IF BIT(0,PC) = 0 THEN ADD(3C)</td>
        </tr>
        <tr>
            <td>40</td>
            <td>0000 0412</td>
            <td>1110</td>
            <td></td>
            <td>A + РД + 1 ==> БР</td>
        </tr>
        <tr>
            <td>41</td>
            <td>0040 E000</td>
            <td>4075</td>
            <td></td>
            <td>БР ==> A, C, N, Z</td>
        </tr>
        <tr>
            <td>42</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>43</td>
            <td>0000 0512</td>
            <td>1190</td>
            <td>SUB</td>
            <td>A + COM(РД) + 1 = A - РД ==> БР</td>
        </tr>
        <tr>
            <td>44</td>
            <td>0040 E000</td>
            <td>4075</td>
            <td></td>
            <td>БР ==> A, C, N, Z</td>
        </tr>
        <tr>
            <td>45</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>46</td>
            <td>828F 0001</td>
            <td>808F</td>
            <td>BCS</td>
            <td>IF BIT(0,PC) = 0 THEN ПРЕ(8D)</td>
        </tr>
        <tr>
            <td>47</td>
            <td>0000 0002</td>
            <td>0100</td>
            <td>BR</td>
            <td>РД ==> БР</td>
        </tr>
        <tr>
            <td>48</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>49</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>4A</td>
            <td>838F 0004</td>
            <td>C28F</td>
            <td>BPL</td>
            <td>IF BIT(2,PC) = 1 THEN ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>4B</td>
            <td>8247 0008</td>
            <td>8347</td>
            <td></td>
            <td>GOTO BR(47)</td>
        </tr>
        <tr>
            <td>4C</td>
            <td>828F 0004</td>
            <td>828F</td>
            <td>BMI</td>
            <td>IF BIT(2,PC) = 0 THEN ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>4D</td>
            <td>8247 0008</td>
            <td>8347</td>
            <td></td>
            <td>GOTO BR(47)</td>
        </tr>
        <tr>
            <td>4E</td>
            <td>828F 0002</td>
            <td>818F</td>
            <td>BEQ</td>
            <td>IF BIT(1,PC) = 0 THEN ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>4F</td>
            <td>8247 0008</td>
            <td>8347</td>
            <td></td>
            <td>GOTO BR(47)</td>
        </tr>
        <tr>
            <td>50</td>
            <td>0000 0402</td>
            <td>0110</td>
            <td>ISZ</td>
            <td>РД + 1 ==> БР</td>
        </tr>
        <tr>
            <td>51</td>
            <td>0008 0000</td>
            <td>4002</td>
            <td></td>
            <td>БР ==> РД</td>
        </tr>
        <tr>
            <td>52</td>
            <td>0100 0000</td>
            <td>0002</td>
            <td></td>
            <td>РД ==> ОП(РА)</td>
        </tr>
        <tr>
            <td>53</td>
            <td>858А 8000</td>
            <td>DF8F</td>
            <td></td>
            <td>IF BIT(15,РД) = 1 THEN ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>54</td>
            <td>0000 0408</td>
            <td>0310</td>
            <td></td>
            <td>СК + 1 ==> БР</td>
        </tr>
        <tr>
            <td>55</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>56</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>57</td>
            <td>0000 0402</td>
            <td>0110</td>
            <td>JSR</td>
            <td>РД + 1 ==> БР</td>
        </tr>
        <tr>
            <td>58</td>
            <td>0010 0000</td>
            <td>4003</td>
            <td></td>
            <td>БР ==> РК</td>
        </tr>
        <tr>
            <td>59</td>
            <td>0000 0008</td>
            <td>0300</td>
            <td></td>
            <td>СК ==> БР</td>
        </tr>
        <tr>
            <td>5A</td>
            <td>0008 0000</td>
            <td>4002</td>
            <td>БР ==> РД</td>
            <td></td>
        </tr>
        <tr>
            <td>5B</td>
            <td>0100 0004</td>
            <td>0202</td>
            <td></td>
            <td>РД ==> ОП(РА), РК ==> БР</td>
        </tr>
        <tr>
            <td>5C</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>5B</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Продолжение цикла выборки команды, декодирование и исполнение безадресных команд</b></i></th>
        </tr>
        <tr>
            <td>5E</td>
            <td>8861 0800</td>
            <td>AB61</td>
            <td>БАД</td>
            <td>IF BIT(11,PK) = 0 THEN Б0(61)</td>
        </tr>
        <tr>
            <td>5F</td>
            <td>886C 0400</td>
            <td>AA6C</td>
            <td></td>
            <td>IF BIT(10,PK) = 0 THEN Б1(6C)</td>
        </tr>
        <tr>
            <td>60</td>
            <td>82E0 0008</td>
            <td>83E0</td>
            <td></td>
            <td>GOTO Р - Б(E0)</td>
        </tr>
        <tr>
            <td>61</td>
            <td>8867 0400</td>
            <td>AA67</td>
            <td>Б0</td>
            <td>IF BIT(10,PK) = 0 THEN Б2(67)</td>
        </tr>
        <tr>
            <td>62</td>
            <td>8865 0200</td>
            <td>A965</td>
            <td></td>
            <td>IF BIT(9,PK) = 0 THEN Б3(65)</td>
        </tr>
        <tr>
            <td>63</td>
            <td>8882 0100</td>
            <td>A882</td>
            <td></td>
            <td>IF BIT(8,PK) = 0 THEN ROL(82)</td>
        </tr>
        <tr>
            <td>64</td>
            <td>8285 0008</td>
            <td>8385</td>
            <td></td>
            <td>GOTO ROR(85)</td>
        </tr>
        <tr>
            <td>65</td>
            <td>887B 0100</td>
            <td>A87B</td>
            <td>Б3</td>
            <td>IF BIT(8,PK) = 0 THEN CMA(7B)</td>
        </tr>
        <tr>
            <td>66</td>
            <td>827E 0008</td>
            <td>837E</td>
            <td></td>
            <td>GOTO CMC(7E)</td>
        </tr>
        <tr>
            <td>67</td>
            <td>886A 0200</td>
            <td>A96A</td>
            <td>Б2</td>
            <td>IF BIT(9,PK) = 0 THEN Б4(6A)</td>
        </tr>
        <tr>
            <td>68</td>
            <td>8876 0100</td>
            <td>A876</td>
            <td></td>
            <td>IF BIT(8,PK) = 0 THEN CLA(76)</td>
        </tr>
        <tr>
            <td>69</td>
            <td>8279 0008</td>
            <td>8379</td>
            <td></td>
            <td>GOTO CLC(79)</td>
        </tr>
        <tr>
            <td>6A</td>
            <td>A888</td>
            <td>Б4</td>
            <td></td>
            <td>IF BIT(8,PK) = 0 THEN HLT(88)</td>
        </tr>
        <tr>
            <td>6B</td>
            <td>8287 0008</td>
            <td>8387</td>
            <td></td>
            <td>GOTO NOP(87)</td>
        </tr>
        <tr>
            <td>6C</td>
            <td>886F 0200</td>
            <td>A96F</td>
            <td>Б1</td>
            <td>IF BIT(9,PK) = 0 THEN Б5(6F)</td>
        </tr>
        <tr>
            <td>6D</td>
            <td>888A 0100</td>
            <td>A88A</td>
            <td></td>
            <td>IF BIT(8,PK) = 0 THEN EI(8A)</td>
        </tr>
        <tr>
            <td>6E</td>
            <td>828C 0008</td>
            <td>838C</td>
            <td></td>
            <td>GOTO DI(8C)</td>
        </tr>
        <tr>
            <td>6F</td>
            <td>8873 0100</td>
            <td>A873</td>
            <td>Б5</td>
            <td>IF BIT(8,PK) = 0 THEN INC(73)</td>
        </tr>
        <tr>
            <td>70</td>
            <td>0000 0110</td>
            <td>1080</td>
            <td>DEC</td>
            <td>A + COM(0) = A - 1 ==> БР</td>
        </tr>
        <tr>
            <td>71</td>
            <td>0040 E000</td>
            <td>4075</td>
            <td></td>
            <td>БР ==> A, C, N, Z</td>
        </tr>
        <tr>
            <td>72</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>73</td>
            <td>0000 0410</td>
            <td>1010</td>
            <td>INC</td>
            <td>A + 1 ==> БР</td>
        </tr>
        <tr>
            <td>74</td>
            <td>0040 E000</td>
            <td>4075</td>
            <td></td>
            <td>БР ==> A, C, N, Z</td>
        </tr>
        <tr>
            <td>75</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>76</td>
            <td>0000 0200</td>
            <td>0020</td>
            <td>CLA</td>
            <td>0 ==> БР</td>
        </tr>
        <tr>
            <td>77</td>
            <td>0040 C000</td>
            <td>4035</td>
            <td></td>
            <td>БР ==> A, N, Z</td>
        </tr>
        <tr>
            <td>78</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>79</td>
            <td>0001 0000</td>
            <td>4080</td>
            <td>CLC</td>
            <td>0 ==> C</td>
        </tr>
        <tr>
            <td>7A</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>7B</td>
            <td>0000 0090</td>
            <td>1040</td>
            <td>CMA</td>
            <td>COM(A) ==> БР, инверсия A</td>
        </tr>
        <tr>
            <td>7C</td>
            <td>0040 C000</td>
            <td>4035</td>
            <td></td>
            <td>БР ==> A, N, Z</td>
        </tr>
        <tr>
            <td>7D</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>7E</td>
            <td>8280 0001</td>
            <td>8080</td>
            <td>CMC</td>
            <td>IF BIT(0,PC) = 0 THEN Б6(80)</td>
        </tr>
        <tr>
            <td>7F</td>
            <td>8279 0008</td>
            <td>8379</td>
            <td></td>
            <td>GOTO CLC(79)</td>
        </tr>
        <tr>
            <td>80</td>
            <td>0002 0000</td>
            <td>40C0</td>
            <td>Б6</td>
            <td>1 ==> C</td>
        </tr>
        <tr>
            <td>81</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>82</td>
            <td>0000 1000</td>
            <td>0008</td>
            <td>ROL</td>
            <td>RAL(A) ==> БР, сдвиг влево</td>
        </tr>
        <tr>
            <td>83</td>
            <td>0040 E000</td>
            <td>4075</td>
            <td></td>
            <td>БР ==> A, C, N, Z</td>
        </tr>
        <tr>
            <td>84</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>85</td>
            <td>0000 0800</td>
            <td>0004</td>
            <td>ROR</td>
            <td>RAR(A) ==> БР, сдвиг вправо</td>
        </tr>
        <tr>
            <td>86</td>
            <td>0040 E000</td>
            <td>4075</td>
            <td></td>
            <td>БР ==> A, C, N, Z</td>
        </tr>
        <tr>
            <td>87</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td>NOP</td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>88</td>
            <td>0000 0001</td>
            <td>4008</td>
            <td>HLT</td>
            <td>Останов машины</td>
        </tr>
        <tr>
            <td>89</td>
            <td>8201 0008</td>
            <td>8301</td>
            <td></td>
            <td>GOTO НАЧ(01)</td>
        </tr>
        <tr>
            <td>8A</td>
            <td>1000 0000</td>
            <td>4800</td>
            <td>EI</td>
            <td>Разрешение прерывания</td>
        </tr>
        <tr>
            <td>8B</td>
            <td>8201 0008</td>
            <td>8301</td>
            <td></td>
            <td>GOTO НАЧ(01)</td>
        </tr>
        <tr>
            <td>8C</td>
            <td>0800 0000</td>
            <td>4400</td>
            <td>DI</td>
            <td>Запрещение прерывания</td>
        </tr>
        <tr>
            <td>8D</td>
            <td>8201 0008</td>
            <td>8301</td>
            <td></td>
            <td>GOTO НАЧ(01)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Продолжение цикла выборки команды, декодирование и исполнение команд ввода-вывода</b></i></th>
        </tr>
        <tr>
            <td>8E</td>
            <td>0200 0000</td>
            <td>4100</td>
            <td>B/B</td>
            <td>Организация связей с ВУ</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Цикл прерывания</b></i></th>
        </tr>
        <tr>
            <td>8F</td>
            <td>8288 0080</td>
            <td>8788</td>
            <td>ПРЕ</td>
            <td>IF BIT(7,PC) = 0 THEN HTL(88)</td>
        </tr>
        <tr>
            <td>90</td>
            <td>8201 0020</td>
            <td>8501</td>
            <td></td>
            <td>IF BIT(5,PC) = 0 THEN НАЧ(01)</td>
        </tr>
        <tr>
            <td>91</td>
            <td>0000 0200</td>
            <td>0020</td>
            <td></td>
            <td>0 ==> БР</td>
        </tr>
        <tr>
            <td>92</td>
            <td>0004 0000</td>
            <td>4001</td>
            <td></td>
            <td>БР ==> РА</td>
        </tr>
        <tr>
            <td>93</td>
            <td>0000 0008</td>
            <td>0300</td>
            <td></td>
            <td>СК ==> БР</td>
        </tr>
        <tr>
            <td>94</td>
            <td>0008 0000</td>
            <td>4002</td>
            <td></td>
            <td>БР ==> РД</td>
        </tr>
        <tr>
            <td>95</td>
            <td>0100 0400</td>
            <td>0012</td>
            <td></td>
            <td>РД ==> ОП(РА), 1 ==> БР</td>
        </tr>
        <tr>
            <td>96</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>97</td>
            <td>0800 0000</td>
            <td>4400</td>
            <td></td>
            <td>Запрещение прерывания</td>
        </tr>
        <tr>
            <td>98</td>
            <td>8201 0008</td>
            <td>8301</td>
            <td></td>
            <td>GOTO НАЧ(01)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Пультовые операции</b></i></th>
        </tr>
        <tr>
            <th colspan=5><b><i>Ввод адреса</b></i></th>
        </tr>
        <tr>
            <td>99</td>
            <td>0000 0040</td>
            <td>3000</td>
            <td>В/А</td>
            <td>КР ==> БР</td>
        </tr>
        <tr>
            <td>9A</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>9B</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Чтение</b></i></th>
        </tr>
        <tr>
            <td>9C</td>
            <td>0000 0008</td>
            <td>0300</td>
            <td>ЧТ</td>
            <td>СК ==> БР</td>
        </tr>
        <tr>
            <td>9D</td>
            <td>0004 0000</td>
            <td>4001</td>
            <td></td>
            <td>БР ==> РА</td>
        </tr>
        <tr>
            <td>9E</td>
            <td>0080 0408</td>
            <td>0311</td>
            <td></td>
            <td>ОП(РА) ==> РД, СК + 1 ==> БР</td>
        </tr>
        <tr>
            <td>9F</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>A0</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Запись</b></i></th>
        </tr>
        <tr>
            <td>A1</td>
            <td>0000 0008</td>
            <td>0300</td>
            <td>ЗАП</td>
            <td>СК ==> БР</td>
        </tr>
        <tr>
            <td>A2</td>
            <td>0004 0000</td>
            <td>4001</td>
            <td></td>
            <td>БР ==> РА</td>
        </tr>
        <tr>
            <td>A3</td>
            <td>0000 0040</td>
            <td>3000</td>
            <td></td>
            <td>КР ==> БР</td>
        </tr>
        <tr>
            <td>A4</td>
            <td>0008 0000</td>
            <td>4002</td>
            <td></td>
            <td>БР ==> РД</td>
        </tr>
        <tr>
            <td>A5</td>
            <td>0100 0408</td>
            <td>0312</td>
            <td></td>
            <td>РД ==> ОП(РА), СК + 1 ==> БР</td>
        </tr>
        <tr>
            <td>A6</td>
            <td>0020 0000</td>
            <td>4004</td>
            <td></td>
            <td>БР ==> СК</td>
        </tr>
        <tr>
            <td>A7</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <th colspan=5><b><i>Пуск</b></i></th>
        </tr>
        <tr>
            <td>A8</td>
            <td>0000 0200</td>
            <td>0020</td>
            <td>ПУС</td>
            <td>0 ==> БР</td>
        </tr>
        <tr>
            <td>A9</td>
            <td>005C E000</td>
            <td>4077</td>
            <td></td>
            <td>БР ==> A, C, N, Z, РА, РД, РК</td>
        </tr>
        <tr>
            <td>AA</td>
            <td>0400 0000</td>
            <td>4200</td>
            <td></td>
            <td>Сброс флагов ВУ</td>
        </tr>
        <tr>
            <td>AB</td>
            <td>0800 0000</td>
            <td>4400</td>
            <td></td>
            <td>Запрещение прерывания</td>
        </tr>
        <tr>
            <td>AC</td>
            <td>828F 0008</td>
            <td>838F</td>
            <td></td>
            <td>GOTO ПРЕ(8F)</td>
        </tr>
        <tr>
            <td>...</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>B0</td>
            <td></td>
            <td></td>
            <td>Р - А</td>
            <td>Арифметическая команда 7###</td>
        </tr>
        <tr>
            <td>...</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>D0</td>
            <td></td>
            <td></td>
            <td>Р - П</td>
            <td>Команда перехода D###</td>
        </tr>
        <tr>
            <td>...</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>E0</td>
            <td></td>
            <td></td>
            <td>Р - Б</td>
            <td>Безадресная команда FC##</td>
        </tr>
        <tr>
            <td>...</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>FF</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </tbody>
</table>

Далее содержимое БР, т.е. адрес следующей команды, пересылается в СК, а команда пересылается из РД в РК, после чего начинается ее дешифрация. 

Так как адресные команды (команды с кодами операции от 0 до D) обязательно содержат ноль в 15, 14 или 13 бите, то проверкой этих битов РК можно выделить адресную команду и перейти к проверке ее 2-го бита (бита вида адресации). Для разделения команд ввода-вывода (код операции Е) и безадресных команд (код операции F) достаточно проанализировать 12-ый бит РК: если этот бит равен 1, то надо переходить к микрокомандам продолжения дешифрации безадресных команд, расположенных, начиная с адреса 5E (метка БАД). В комментариях микрокоманда анализа 12-го бита РК записана в виде: IF BIT(12,РК)=1 THEN БАД(5E).

В памяти микрокоманд нет полных микропрограмм для адресных команд с кодами операций 7 и D, а также для безадресных команд FC00, FD00, FE00 и FF00. Когда при декодировании команды выясняется, что выбрана команда 7xxx, управление передается ячейке с адресом В0. Начиная с этой ячейки, могут располагаться микрокоманды какой-либо новой арифметической команды (например, умножения). Для микропрограмм реализации команды перехода и безадресных команд выделены участки памяти микрокоманд с начальными адресами D0 и E0.

В базовой ЭВМ реализован и другой вариант интерпретатора, использующий более короткие - вертикальные микрокоманды (столбец "ВЕРТ." табл. 3.2). Эти микрокоманды состоят из полей, в которых закодированы требуемые наборы управляющих сигналов (рис. 3.2). Для декодирования используются дополнительные устройства - дешифраторы. 