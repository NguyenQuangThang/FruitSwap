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
    firstEnter: boolean = false;
    @property(cc.Prefab)
    fx: cc.Prefab;
    @property(cc.AudioClip)
    breakAudio: cc.AudioClip;
    @property(cc.AudioClip)
    chamdatAudio: cc.AudioClip;
    audioChamDat: boolean = false;
    @property(Number)
    point: number = 0;
    onLoad() {
        this.node.scale = 0.1;
    }
    start() {
        var scale = cc.scaleTo(0.3, 1);
        this.node.runAction(scale);
    }
    setData(isFallen: boolean = false, audio: boolean) {
        this.audioChamDat = audio;
        this.rigidbody = this.node.getComponent(cc.RigidBody);
        if (!isFallen)
            this.rigidbody.type = cc.RigidBodyType.Static;
        else
            this.rigidbody.type = cc.RigidBodyType.Dynamic;
    }


    onCollisionEnter(other, self) {

        if (!this.audioChamDat) {
            this.audioChamDat = true;
            cc.audioEngine.playEffect(this.chamdatAudio, false);
        }
        if (this.firstEnter) {
            return;
        }

        if (other.name == self.name && other.node.position.y >= self.node.position.y) {
            console.log("other.name: " + other.name);
            this.firstEnter = true;
            if (this.nextBlockPre == null)
                return;
            other.node.getComponent(cc.PhysicsCircleCollider).active = false;
            other.node.getComponent(cc.RigidBody).active = false;
            other.node.getComponent(cc.CircleCollider).active = false;

            var moveTo = cc.moveTo(0.2, self.node.position);
            other.node.runAction(moveTo);
            this.scheduleOnce(() => {
                if (other.node != null)
                    other.node.destroy();
                if (self.node != null)
                    self.node.destroy();
                cc.audioEngine.playEffect(this.breakAudio, false);
                GameManager.instance.spawnNextBlock(this.nextBlockPre, self.node.position, this.node.parent);

                let _fx = cc.instantiate(this.fx);
                _fx.parent = this.node.parent;
                _fx.setPosition(self.node.position);
            }, 0.2)
        }

    }
}
