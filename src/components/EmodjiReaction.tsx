import React, {FC} from 'react';
import {spriteSheet} from "../spriteSheet/SpriteSheet";
// @ts-ignore
import Sprite from "../spriteSheet/minesweeper.png";
// @ts-ignore
import {SpriteSheet} from 'react-spritesheet';

export interface IEmodjiReaction {
    fail: boolean,
    win: boolean,
    mousedown: boolean,
    func: any,
}

const EmodjiReaction:FC<IEmodjiReaction> = ({fail, win , mousedown,func}) => {
    return (
        <div className="minesweeper_info-emoji"
        onClick={func}
        >
            {
                fail  ?
                    <SpriteSheet filename={Sprite} data={spriteSheet} sprite="emoji5"/>
                    : win ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="emoji4"/>
                    : mousedown ?
                        <SpriteSheet filename={Sprite} data={spriteSheet} sprite="emoji3"/>
                        : <SpriteSheet filename={Sprite} data={spriteSheet} sprite="emoji1"/>
            }
        </div>
    );
};

export default EmodjiReaction;