// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GameTag } from "./Utils/Constants";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Block extends cc.Component {

    onCollisionEnter(other, self) {
        console.log("block ============== ");
        if(other.tag == GameTag.Block)
        {
            console.log("block ============== ");
            
        }
    }

    onCollisionStay(other, self) {
        console.log("block ============== ");
        if(other.tag == GameTag.Block)
        {
            console.log("block ============== ");
            
        }
    }

}
