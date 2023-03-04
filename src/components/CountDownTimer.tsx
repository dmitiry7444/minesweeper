import React, {FC, useState} from 'react'
// @ts-ignore
import {SpriteSheet} from 'react-spritesheet';
import {spriteSheet} from "../spriteSheet/SpriteSheet";
// @ts-ignore
import Sprite from '../spriteSheet/minesweeper.png'
import EmodjiReaction, {IEmodjiReaction} from './EmodjiReaction';


interface ICountdown {
    minutes: number;
    seconds: number;
    overFunc?: any;
}
type Prop = ICountdown & IEmodjiReaction;

const CountDownTimer: FC<Prop> = ({minutes = 0, seconds = 60, mousedown, win, fail, func, overFunc}) => {

    const [time, setTime] = useState<ICountdown>({minutes, seconds});

    const tick = () => {

        if (time.minutes === 0 && time.seconds === 0) {
            reset()
            overFunc()
        } else if (time.seconds === 0) {
            setTime({minutes: time.minutes - 1, seconds: 59});
        } else {
            setTime({minutes: time.minutes, seconds: time.seconds - 1});
        }
        if (fail || win) {
            reset()
        }
    };


    const reset = () => setTime({minutes: time.minutes, seconds: time.seconds});


    React.useEffect(() => {
        const timerId = setInterval(() => tick(), 1000);
        return () => clearInterval(timerId);
    });

    const min = time.minutes.toString().padStart(3, '0').split("");
    const sec = time.seconds.toString().padStart(3, '0').split("");

    const min0 = min[0];
    const min1 = min[1];
    const min2 = min[2];
    const sec0 = sec[0];
    const sec1 = sec[1];
    const sec2 = sec[2];



    return (
        <div className="mine">
            <div className="mine_time">
                {
                    +min0 === 1 ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite={"number1"}/>
                        : +min0 === 2 ?
                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number2"/>
                            : +min0 === 3 ?
                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number3"/>
                                : +min0 === 4 ?
                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number4"/>
                                    : +min0 === 5 ?
                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number5"/>
                                        : +min0 === 6 ?
                                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number6"/>
                                            : +min0 === 7 ?
                                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number7"/>
                                                : +min0 === 8 ?
                                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number8"/>
                                                    : +min0 === 9 ?
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number9"/>
                                                        :
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number0"/>
                }
                {
                    +min1 === 1 ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number1"/>
                        : +min1 === 2 ?
                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number2"/>
                            : +min1 === 3 ?
                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number3"/>
                                : +min1 === 4 ?
                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number4"/>
                                    : +min1 === 5 ?
                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number5"/>
                                        : +min1 === 6 ?
                                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number6"/>
                                            : +min1 === 7 ?
                                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number7"/>
                                                : +min1 === 8 ?
                                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number8"/>
                                                    : +min1 === 9 ?
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number9"/>
                                                        :
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number0"/>
                }
                {
                    +min2 === 1 ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number1"/>
                        : +min2 === 2 ?
                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number2"/>
                            : +min2 === 3 ?
                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number3"/>
                                : +min2 === 4 ?
                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number4"/>
                                    : +min2 === 5 ?
                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number5"/>
                                        : +min2 === 6 ?
                                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number6"/>
                                            : +min2 === 7 ?
                                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number7"/>
                                                : +min2 === 8 ?
                                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number8"/>
                                                    : +min2 === 9 ?
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number9"/>
                                                        :
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number0"/>
                }
            </div>
            <EmodjiReaction fail={fail} win={win} mousedown={mousedown} func={func}/>
            <div className="mine_time">
                {
                    +sec0 === 1 ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number1"/>
                        : +sec0 === 2 ?
                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number2"/>
                            : +sec0 === 3 ?
                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number3"/>
                                : +sec0 === 4 ?
                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number4"/>
                                    : +sec0 === 5 ?
                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number5"/>
                                        : +sec0 === 6 ?
                                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number6"/>
                                            : +sec0 === 7 ?
                                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number7"/>
                                                : +sec0 === 8 ?
                                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number8"/>
                                                    : +sec0 === 9 ?
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number9"/>
                                                        :
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number0"/>
                }

                {
                    +sec1 === 1 ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number1"/>
                        : +sec1 === 2 ?
                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number2"/>
                            : +sec1 === 3 ?
                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number3"/>
                                : +sec1 === 4 ?
                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number4"/>
                                    : +sec1 === 5 ?
                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number5"/>
                                        : +sec1 === 6 ?
                                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number6"/>
                                            : +sec1 === 7 ?
                                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number7"/>
                                                : +sec1 === 8 ?
                                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number8"/>
                                                    : +sec1 === 9 ?
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number9"/>
                                                        :
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number0"/>
                }
                {
                    +sec2 === 1 ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number1"/>
                        : +sec2 === 2 ?
                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number2"/>
                            : +sec2 === 3 ?
                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number3"/>
                                : +sec2 === 4 ?
                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number4"/>
                                    : +sec2 === 5 ?
                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number5"/>
                                        : +sec2 === 6 ?
                                            <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number6"/>
                                            : +sec2 === 7 ?
                                                <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number7"/>
                                                : +sec2 === 8 ?
                                                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number8"/>
                                                    : +sec2 === 9 ?
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number9"/>
                                                        :
                                                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="number0"/>
                }
            </div>
        </div>
    );
}

export default CountDownTimer;