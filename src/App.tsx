import React, {ReactNode, useMemo, useRef, useState} from 'react';
import './App.css';
import {spriteSheet} from "./spriteSheet/SpriteSheet";
// @ts-ignore
import Sprite from './spriteSheet/minesweeper.png'
// @ts-ignore
import {SpriteSheet} from 'react-spritesheet';
import CountDownTimer from "./components/CountDownTimer";


const Mine = -1;

//функция инициализации игрового поля
function createField(size: number): number[] {
    const field: number[] = new Array(size * size).fill(0);


    function inc(x: number, y: number) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
            if (field[y * size + x] === Mine) return;

            field[y * size + x] += 1;
        }
    }


    for (let i = 0; i < /*кол-во мин*/ size;) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);

        if (field[y * size + x] === Mine) continue;

        field[y * size + x] = Mine;

        i += 1;

        inc(x + 1, y);
        inc(x - 1, y);
        inc(x, y + 1);
        inc(x, y - 1);
        inc(x + 1, y - 1);
        inc(x - 1, y - 1);
        inc(x + 1, y + 1);
        inc(x - 1, y + 1);
    }


    return field
}


enum Mask {
    Transparent,
    Fill,
    Flag = -3,
    Question = -4,
    ThisBomb = -5,
    SafeBomb = -2,
}

//представление масок
const mapMasktoView: Record<Mask, ReactNode> = {
    [Mask.Transparent]: null,
    [Mask.Fill]: <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem1"/>,
    [Mask.Flag]: <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem3"/>,
    [Mask.Question]: <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem4"/>,
    [Mask.ThisBomb]: <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem7"/>,
    [Mask.SafeBomb]: <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem8"/>,
}


function App() {
    const size = 16; // размер доски
    const dimension = new Array(size).fill(null)
    const [mousedown, setMousedown] = useState(false)
    const [fail, setFail] = useState(false)
    const [field, setField] = useState<number[]>(() => createField(size));
    const [mask, setMask] = useState<Mask[]>(() => new Array(size * size).fill(Mask.Fill));
    const [timeOver, setTimeOver] = useState(false)
    const [seed, setSeed] = useState(1);
    const [firstDown, setFirstDown] = useState(0)


    //условия победы
    const win = useMemo(() => field.every((f, i) =>
        (f === Mine && (mask[i] === Mask.Flag || mask[i] === Mask.Fill || mask[i] === Mask.Question))
        || f === Mask.SafeBomb
        || mask[i] === Mask.Transparent
    ), [field, mask])

    //перезапуск игры
    const reset = () => {
        setField(() => createField(size));
        setMask(() => new Array(size * size).fill(Mask.Fill));
        setSeed(Math.random()); //перезапуск таймера
        setFail(false);
        setTimeOver(false);
        setFirstDown(0)
    }

    //окончание игры
    const gameOver = () => {
        setTimeOver(true)
        setFail(true)
    }

    //если время закончилось
    if (timeOver) {
        mask.forEach((_, i) => {
            if (field[i] === Mine || field[i] === Mask.SafeBomb) {
                mask[i] = Mask.Transparent
            }
        })
    }

    //перерисовываем поле
    const isMine = (i: any) => {
        if (field[i] !== Mine) {
            mask[i] = Mask.Transparent
            setFirstDown(2)
        }
            if (field[i] === Mine) {
                setField(() => createField(size));
                setMask(() => new Array(size * size).fill(Mask.Fill))
                setFirstDown(0)
            }
        }

    return (
        <div className="App">
            <div key={seed} className='minesweeper'>
                <div className='minesweeper_controller'>
                    <CountDownTimer minutes={40} seconds={0} fail={fail} mousedown={mousedown} win={win}
                                    overFunc={gameOver}
                                    func={reset}/>

                </div>
                <div className='minesweeper_board'>
                    {dimension.map((_, y) => {
                        return (<div key={y} className='minesweeper_board_y'>
                            {dimension.map((_, x) => {
                                return (<div key={x}
                                             className='minesweeper_board_x'
                                             onClick={() => {
                                                 if (win || fail) return;
                                                 if (mask[y * size + x] === Mask.Flag || mask[y * size + x] === Mask.Question) return;

                                                //проверка: если первый клик мина
                                                 if (field[y * size + x] === Mine && firstDown === 0) {
                                                     isMine(y * size + x)
                                                 }

                                                 //проверка: если первый клик не мина
                                                 if (field[y * size + x] !== Mine && firstDown === 0) {
                                                     setFirstDown(2)
                                                 }


                                                 if (mask[y * size + x] === Mask.Transparent) return; // проверка: открыта ли ячейка?

                                                 const clearing: [number, number][] = []; //инициализация массива для пустых ячеек
                                                 function clear(x: number, y: number) {
                                                     if (x >= 0 && x < size && y >= 0 && y < size) {
                                                         if (mask[y * size + x] === Mask.Transparent) return;
                                                         clearing.push([x, y])
                                                     }
                                                 }

                                                 clear(x, y);
                                                 while (clearing.length) { // цикл проверки: соседние ячейки пустые
                                                     const [x, y] = clearing.pop()!!;
                                                     mask[y * size + x] = Mask.Transparent;
                                                     if (field[y * size + x] !== 0) continue;
                                                     clear(x + 1, y)
                                                     clear(x - 1, y)
                                                     clear(x, y + 1)
                                                     clear(x, y - 1)
                                                 }

                                                 //проверка: если клик на мину или на флаг в котором ячейка = мина
                                                 if ((field[y * size + x] === Mine && firstDown === 2) || field[y * size + x] === Mask.SafeBomb) {
                                                     mask.forEach((_, i) => {
                                                         if (field[i] === Mine || field[i] === Mask.SafeBomb) {
                                                             mask[i] = Mask.Transparent
                                                         }
                                                     });
                                                     mask[y * size + x] = Mask.ThisBomb;
                                                      setFail(true)

                                                 }

                                                 setMask((prev) => [...prev]) // обновляем состояние
                                             }}
                                             onContextMenu={(e) => {
                                                 e.preventDefault();
                                                 e.stopPropagation();
                                                 if (win || fail) return;
                                                 if (mask[y * size + x] === Mask.Transparent) return;

                                                 //логика клика правой кнопкой мыши (флаг-вопрос-очистка)
                                                 if (mask[y * size + x] === Mask.Fill) {
                                                     mask[y * size + x] = Mask.Flag;
                                                 } else if (mask[y * size + x] === Mask.Flag) {
                                                     mask[y * size + x] = Mask.Question;
                                                 } else if (mask[y * size + x] === Mask.Question) {
                                                     mask[y * size + x] = Mask.Fill;
                                                 }
                                                 //проверка: наличия флага над полем с миной
                                                 if (mask[y * size + x] === Mask.Flag && field[y * size + x] === Mine) {
                                                     field[y * size + x] = Mask.SafeBomb;
                                                 }
                                                 //проверка: если вопрос и ячейка = мина
                                                 if (mask[y * size + x] === Mask.Question && field[y * size + x] === Mask.SafeBomb) {
                                                     field[y * size + x] = Mine;
                                                 }

                                                 setMask((prev) => [...prev])

                                             }}
                                             onMouseDown={() => {
                                                 if (mask[y * size + x] === Mask.Transparent
                                                     || mask[y * size + x] === Mask.Flag
                                                     || mask[y * size + x] === Mask.Question) return;
                                                 setMousedown(true)
                                             }}
                                             onMouseUp={() => {
                                                 if (mask[y * size + x] === Mask.Transparent
                                                     || mask[y * size + x] === Mask.Flag
                                                     || mask[y * size + x] === Mask.Question) return;
                                                 setMousedown(false)
                                             }}
                                >{
                                    mask[y * size + x] !== Mask.Transparent
                                        ? mapMasktoView[mask[y * size + x]]
                                        : field[y * size + x] === -2 ?
                                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem8"/>
                                            : field[y * size + x] === Mine ?
                                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem6"/>
                                                : field[y * size + x] === 0 ?
                                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="gameItem2"/>
                                                    : field[y * size + x] === 1 ?
                                                        <SpriteSheet filename={Sprite} data={spriteSheet}
                                                                     sprite="gameItem9"/>
                                                        : field[y * size + x] === 2 ?
                                                            <SpriteSheet filename={Sprite} data={spriteSheet}
                                                                         sprite="gameItem10"/>
                                                            : field[y * size + x] === 3 ?
                                                                <SpriteSheet filename={Sprite} data={spriteSheet}
                                                                             sprite="gameItem11"/>
                                                                : field[y * size + x] === 4 ?
                                                                    <SpriteSheet filename={Sprite} data={spriteSheet}
                                                                                 sprite="gameItem12"/>
                                                                    : field[y * size + x] === 5 ?
                                                                        <SpriteSheet filename={Sprite} data={spriteSheet}
                                                                                     sprite="gameItem13"/>
                                                                        : field[y * size + x] === 6 ?
                                                                            <SpriteSheet filename={Sprite}
                                                                                         data={spriteSheet}
                                                                                         sprite="gameItem14"/>
                                                                            : field[y * size + x] === 7 ?
                                                                                <SpriteSheet filename={Sprite}
                                                                                             data={spriteSheet}
                                                                                             sprite="gameItem15"/>
                                                                                : field[y * size + x] === 8 ?
                                                                                    <SpriteSheet filename={Sprite}
                                                                                                 data={spriteSheet}
                                                                                                 sprite="gameItem18"/>
                                                                                    : field[y * size + x]
                                }
                                </div>);
                            })
                            }
                        </div>)
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
