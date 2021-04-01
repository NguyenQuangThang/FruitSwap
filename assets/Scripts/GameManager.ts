// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Block from "./Block";
import GamePlay from "./GamePlay";
import Utils from "./Utils/Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    //
    // spawned: boolean = false;
    private static _instance: GameManager = null;
    public static get instance() {
        if (this._instance == null) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    gamePlay: GamePlay;
    score: number = 0;

    public spawnNextBlock(prefab: cc.Prefab, nodeParent: any, parent: any) {
        // if (!this.spawned) {
        let nextBlock = cc.instantiate(prefab);
        nextBlock.parent = parent;
        nextBlock.setPosition(nodeParent);
        let script = nextBlock.getComponent(Block);
        script.setData(true, true);
        this.score += Number(script.point);
        this.gamePlay.updateScoreUI();

        // Mỗi lần hoạt động là check cảnh báo
        // this.checkWarning();
    }

    public checkWarning() {
        this.gamePlay.checkWarning();
    }

    public randomPercent() {
        let rd = Utils.randomNum(0, 100);
        if (0 <= rd && rd <= 30)
            return 0;
        else if (35 < rd && rd <= 65)
            return 1;
        else if (65 < rd && rd <= 80)
            return 2;
        else if (80 < rd && rd <= 90)
            return 3;
        else if (90 < rd && rd <= 100)
            return 4;

    }

}

    // public callSpawnBlock() {

    // }
