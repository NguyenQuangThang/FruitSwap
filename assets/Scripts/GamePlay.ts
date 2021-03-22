// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Utils from "./Utils/Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePlay extends cc.Component {

    @property(cc.Prefab)
    blocksPrefab: cc.Prefab[] = [];

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.setTouch();
    }
    setTouch() {
        this.node.on('touchstart', function (event) {
            let pos_touch = event.getLocation();
            pos_touch = this.node.convertToNodeSpaceAR(pos_touch);
            this.spawnBlock(pos_touch);
        }, this);
    }

    spawnBlock(pos) {
        let newPos = cc.v2(pos.x, 500);
        let rdBlock = Utils.randomNum(0, 4);
        let block = cc.instantiate(this.blocksPrefab[rdBlock]);
        block.parent = this.node;
        block.setPosition(newPos);
    }
}
