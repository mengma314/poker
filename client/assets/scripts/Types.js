var Suit = cc.Enum({
    joker:5,  // 大小王
    Spade: 4,   // 黑桃
    Heart: 3,   // 红桃
    Club: 2,    // 梅花(黑)
    Diamond: 1, // 方块(红)
});

var A2_10JQK = 'NAN,2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',');

/**
 * 扑克牌类，只用来表示牌的基本属性，不包含游戏逻辑，所有属性只读，
 * 因此全局只需要有 54 个实例，不论有多少副牌
 * @class Card
 * @constructor
 * @param {Number} point - 可能的值为 1 到 13
 * @param {Suit} suit
 */
function Card (point, suit) {
    Object.defineProperties(this, {
        point: {
            value: point,
            writable: false
        },
        suit: {
            value: suit,
            writable: false
        },
        /**
         * @property {Number} id - 可能的值为 0 到 51
         */
        id: {
            value: (suit - 1) * 13 + (point - 1),
            writable: false
        },
        //
        pointName: {
            get: function () {
                return A2_10JQK[this.point];
            }
        },
        suitName: {
            get: function () {
                return Suit[this.suit];
            }
        },
        isBlackSuit: {
            get: function () {
                return this.suit === Suit.Spade || this.suit === Suit.Club;
            }
        },
        isRedSuit: {
            get: function () {
                return this.suit === Suit.Heart || this.suit === Suit.Diamond;
            }
        },
    });
}

Card.prototype.toString = function () {
    return this.suitName + ' ' + this.pointName;
};

// 存放 54 张扑克的实例
var cards = new Array(54);

/**
 * 返回指定 id 的实例
 * @param {Number} id - 0 到 51
 */
Card.fromId = function (id) {
    return cards[id];
};

// 初始化所有扑克牌
(function createCards () {
    for (var s = 1; s <= 4; s++) {
        for (var p = 1; p <= 13; p++) {
            var card = new Card(p, s);
            cards[card.id] = card;
        }
    }
    //小王
    var joker1 = new Card(1, 5);
    cards[joker1.id] = joker1;
    //大王
    var joker2 = new Card(2, 5);
    cards[joker2.id] = joker2;
})();



// 输赢
var Outcome = cc.Enum({
    Win: -1,
    Lose: -1,
    Tie: -1,
});


module.exports = {
    Suit: Suit,
    Card: Card,
    Outcome: Outcome,
};
