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
    rigidbody: cc.RigidBody;

    setData(isFallen: boolean = false) {
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        if (!isFallen)
            this.rigidbody.type = cc.RigidBodyType.Static;
        else
            this.rigidbody.type = cc.RigidBodyType.Dynamic;
    }


    onCollisionEnter(other, self) {
        if (other.name == self.name) {
            if (this.nextBlockPre == null)
                return;

            GameManager.instance.spawnNextBlock(this.nextBlockPre, self.node.position, this.node.parent);
            other.node.destroy();
            self.node.destroy();
        }
    }
}
