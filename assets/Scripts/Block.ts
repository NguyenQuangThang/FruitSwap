// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";
import { GameTag } from "./Utils/Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    
    @property(cc.Prefab)
    nextBlockPre: cc.Prefab;
    onCollisionEnter(other, self) {
        if (other.name == self.name) {
            if (this.nextBlockPre == null)
                return;
            other.node.destroy();
            self.node.destroy();
            // let nextBlock = cc.instantiate(this.nextBlockPre);
            // nextBlock.parent = this.node.parent;
            // nextBlock.setPosition(self.node.position);

            GameManager.instance.spawnNextBlock(this.nextBlockPre, self.node.position, this.node.parent);
        }
    }
}
