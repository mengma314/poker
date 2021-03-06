cc.Class({
    extends: cc.Component,

    properties: {
        // nodes
        pointup: cc.Sprite,
        pointdown: cc.Sprite,
        suitup: cc.Sprite,
        suitdown: cc.Sprite,
        mainPic: cc.Sprite,
        // cardBG: cc.Sprite,
        // resources
        // redTextColor: cc.Color.WHITE,
        // blackTextColor: cc.Color.WHITE,
        cardAlats:cc.SpriteAtlas,
        texFrontBG: cc.SpriteFrame,
        texBackBG: cc.SpriteFrame,
        
    },

    // use this for initialization
    init: function (card) {
        // var isFaceCard = card.point > 10;
        if(card == null){
            console.info("null__");
        }
        var isRed = card.isRedSuit ? "R" : "B";
        isRed = card.isJoker ? "J" : isRed;
        this.pointup.spriteFrame = this.cardAlats.getSpriteFrame("card_value_" + isRed +"_"+card.point);
        this.pointdown.spriteFrame = this.cardAlats.getSpriteFrame("card_value_" + isRed +"_"+card.point);
        var suit = card.suit -1;
        if (suit==4) {
            suit = suit + "_" + card.point;
            this.suitup.spriteFrame = null;
            this.suitdown.spriteFrame = null;
        }else{
        this.suitup.spriteFrame = this.cardAlats.getSpriteFrame("card_shape_S_"+suit);
        this.suitdown.spriteFrame = this.cardAlats.getSpriteFrame("card_shape_S_"+suit);
        }
        this.mainPic.spriteFrame = this.cardAlats.getSpriteFrame("card_shape_L_"+suit);
        // if (isFaceCard) {
        //     this.mainPic.spriteFrame = this.texFaces[card.point - 10 - 1];
        // }
        // else {
        //     this.mainPic.spriteFrame = this.texSuitBig[card.suit - 1];
        // }

        // // for jsb
        // this.point.string = card.pointName;

        // if (card.isRedSuit) {
        //     this.point.node.color = this.redTextColor;
        // }
        // else {
        //     this.point.node.color = this.blackTextColor;
        // }

        // this.suitup.spriteFrame = this.texSuitSmall[card.suit - 1];
        // this.suitdown.spriteFrame = this.texSuitSmall[card.suit - 1];
        this.touched = false;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.log('Drag stated ...');
            // this.opacity = 255;
        }, this.node);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        //     // cc.log('Drag end ...');
        //     // cc.log('Drag stated ...');
        //     if (!this.touched) {
        //         this.y = this.y + 80;
        //         this.touched = true;
        //     }else{
        //         this.y = this.y - 80;
        //         this.touched = false;
        //     }
        // }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            cc.log('Drag stated ...');
            if (!this.touched) {
                this.y = this.y + 80;
                this.touched = true;
            }else{
                this.y = this.y - 80;
                this.touched = false;
            }
            // this.opacity = 160;
        }, this.node);


    },
    change:function(){
        var isRedSui = true;
        var isRed = isRedSui ? "R" : "B";
        this.pointup.spriteFrame = this.cardAlats.getSpriteFrame("card_value_" + isRed +"_"+5);
        this.pointdown.spriteFrame = this.cardAlats.getSpriteFrame("card_value_R_5");
    },
    reveal: function (isFaceUp) {
        this.point.node.active = isFaceUp;
        this.suit.node.active = isFaceUp;
        this.mainPic.node.active = isFaceUp;
        this.cardBG.spriteFrame = isFaceUp ? this.texFrontBG : this.texBackBG;
    },
});
