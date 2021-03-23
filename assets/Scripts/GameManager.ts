// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {


    spawned: boolean = false;

    private static _instance: GameManager = null;
    public static get instance() {
        if (this._instance == null) {
            this._instance = new GameManager();
        }
        return this._instance;
    }
    public spawnNextBlock(prefab: cc.Prefab, nodeParent: any , parent : any) {
        if (!this.spawned) {
            let nextBlock = cc.instantiate(prefab);
            nextBlock.parent = parent;
            nextBlock.setPosition(nodeParent);
            this.spawned = true;
            this.scheduleOnce(() => {
                this.spawned = false;
            },1);
        }
    }
}
