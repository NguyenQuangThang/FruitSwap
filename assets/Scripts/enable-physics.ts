import GameManager from "./Manager/GameManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnablePhysics extends cc.Component {

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // GameManager.instance.screenWidth = cc.Camera.main.getScreenToWorldPoint(cc.v3(screen.width, 0, 0)).x;;
        // console.log("this.screenWidth" + GameManager.instance.screenWidth);

    }
    onEnable() {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    }

    onDisable() {
        cc.director.getCollisionManager().enabled = false;
        // cc.director.getCollisionManager().enabledDebugDraw = false;
    }
}
