var Decks = require('Decks');
var Types = require('Types');
cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: cc.Prefab,
        player1: cc.Node,
        player2: cc.Node,
        player3: cc.Node,
        player4: cc.Node,
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.decks = new Decks(2);
        this.players = [];
        this.players.push(this.player1);
        this.players.push(this.player2);
        this.players.push(this.player3);
        this.players.push(this.player4);

    },
    random: function () {
        var x_pos = 0;
        for (var index = 0; index < this.players.length; index++) {
            var cards = [];
            for (var j = 0; j < 25; j++) {
                var cardinstance = this.decks.draw();
                cards.push(cardinstance);
                
            }
            cards.sort(function (a,b) {
                if (a.suit!=b.suit) {
                    return b.suit - a.suit;
                } else {
                    return b.point - a.point;
                }
            })
            for (var i = 0; i < cards.length; i++) {
                var newCard = cc.instantiate(this.cardPrefab).getComponent('Card');
                newCard.init(cards[i]);
                this.players[index].addChild(newCard.node);
                // var startPos = cc.p(x_pos, 0);
                // x_pos  += 15;
                // newCard.node.setPosition(startPos);
            }
        }


    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
