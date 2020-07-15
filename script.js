
class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, resilience) {
        super(name, cost);
        // these are numbers
        this.resilience = resilience;
        this.power = power;
    }
    attack(target) {
        if (target instanceof Unit) {
            target.resilience -= this.power;
        } else {
            throw new Error("Target must be a unit!");
        }
    }
}

class Effect extends Card {
    constructor(name, cost, text, stat, magnitude) {
        super(name, cost);
        // strings
        this.text = text;
        this.stat = stat; // resilience or power
        // number
        this.magnitude = magnitude;
    }
    play(target) {
        if (target instanceof Unit) {
            // Effects increase or devrease EITHER the power or resilience of a Unit that is targeted. 
            // Units can attack other units by decreasing the target's resilience by the attacker's power. 
            // determine if the card is going to change the target's power or resilience. 
            // 
            if (this.stat === "resilience") {
                target.resilience += this.magnitude;
            } else if (this.stat === "power") {
                target.power += this.magnitude;
            }
            console.log(this.text)
        } else {
            throw new Error("Target must be a unit!");
        }
    }
}

const rBNinja = new Unit("Red Belt Ninja", 3, 3, 4);
const bBNinja = new Unit("Black Belt Ninja", 4, 5, 4);

const hardAlgo = new Effect("Hard Algorithm", 2, "increase target's resilience by 3.", "resilience", 3);
const uPRej = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2.", "resilience", -2);
const pairProg = new Effect("Pair Programming", 3, "increase target's power by 2.", "power", 2);

hardAlgo.play(rBNinja); // play hard algo on Red belt ninja. RBN resilience +3

uPRej.play(rBNinja); // play unhandled... on Red Belt Ninja. RBN resilience -2

pairProg.play(rBNinja); // play pair programming on Red Belt Ninja. RBN power +2 

rBNinja.attack(bBNinja); // Red Belt Ninja attacks Black Belt Ninja. BBN resilience - RBN power. 
