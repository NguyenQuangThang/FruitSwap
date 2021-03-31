// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Block from "./Block";
import GameManager from "./GameManager";
import Utils from "./Utils/Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    @property(cc.Prefab)
    blocksPrefab: cc.Prefab[] = [];
    @property(cc.Label)
    scoreLabel: cc.Label;
    nodeCurrent: cc.Node = null;
    onLoad() {
        GameManager.instance.score = 0;
        this.setTouch();
    }

    start() {
        GameManager.instance.gamePlay = this;
        this.spawnBlock(cc.v2(0, 400));
    }

    setTouch() {

        this.node.on('touchstart', function (event) {
            if (this.nodeCurrent == null)
                return;

            let pos_touch = event.getLocation();
            pos_touch = this.node.convertToNodeSpaceAR(pos_touch);
            this.rigidbody = this.nodeCurrent.getComponent(cc.RigidBody);
            this.nodeCurrent.setPosition(cc.v2(pos_touch.x, 400));
            this.rigidbody.type = cc.RigidBodyType.Dynamic;
            this.nodeCurrent = null;
            this.nextSpawn()
        }, this);
    }

    nextSpawn() {
        this.scheduleOnce(() => {
            this.spawnBlock(cc.v2(0, 400));
        }, 1);
    }

    spawnBlock(pos) {
        let newPos = cc.v2(pos.x, 400);
        // let rdBlock = Utils.randomNum(0, 5);
        let rdBlock =3;

        this.nodeCurrent = cc.instantiate(this.blocksPrefab[rdBlock]);
        this.nodeCurrent.parent = this.node;
        this.nodeCurrent.setPosition(newPos);
        let script = this.nodeCurrent.getComponent(Block);
        script.setData(false, false);
    }

    updateScoreUI() {
        this.scoreLabel.string = GameManager.instance.score.toString();
    }
}
