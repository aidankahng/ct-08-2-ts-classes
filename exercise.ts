// Homework
// Design a flexible OOP system to describe characters in a RPG game

// There are 4 Unique Characters which use Different Types of Attacking mechanisms and Defending mechanisms.

// Barbarian - fights with club and defends with shield

// Peons - fights with club and defends with shield

// Knights - fights with a Sword and defends with Armor

// Archer - fights with Bow and Arrow and has only is tunic to protect them

// All Characters can collect gold and this will always be the same for every new type of character

// At the end of this each character should be able to attack and defend and collect gold. 
// If needed any character should be able to change his fighting style, say if a knight losing his sword, 
// but finds a club he should be able to change his fighting mechanism to use the club

// Hint: To complete this assignment you will need multiple classes and interfaces and an Abstract class

// You can use our Final Rubber Ducky Walkthrough example as a guide

interface AttackStyle {
    basic_attack():void;
    special_attack():void;
}

interface DefenseStyle {
    basic_defense():void;
}

class Club implements AttackStyle{
    basic_attack():void{
        console.log("attacks with a hefty club")
    }
    special_attack():void{
        console.log("Slams their club down on their opponent's skull")
    };
}
class Sword implements AttackStyle{
    basic_attack():void{
        console.log("stabs with their short sword")
    }
    special_attack():void{
        console.log("slashes their opponent's chest")
    };
}
class Bow implements AttackStyle{
    basic_attack():void{
        console.log("attacks by shooting an arrow")
    }
    special_attack():void{
        this.basic_attack()
    };
}

class Shield implements DefenseStyle {
    basic_defense():void {
        console.log("hides behind their shield")
    }
}
class Armor implements DefenseStyle {
    basic_defense():void {
        console.log("lets their armor absorb the impact")
    }
}
class Tunic implements DefenseStyle {
    basic_defense():void {
        console.log("hopes their peper-thin tunic can somehow protect them")
    }
}


abstract class Fighter implements AttackStyle, DefenseStyle {
    protected weapon$: AttackStyle;
    protected defense$: DefenseStyle;
    protected gold$:number;

    constructor(protected name$:string){ this.gold$ = 0}

    get name():string{ return this.name$ }

    set weapon(weaponType:AttackStyle) {
        this.weapon$ = weaponType;
    }

    set defense(defenseType:DefenseStyle) {
        this.defense$ = defenseType;
    }

    basic_attack():void{
        this.weapon$.basic_attack();
    }

    special_attack():void{
        this.weapon$.special_attack();
    }

    basic_defense():void{
        this.defense$.basic_defense();
    }

    public lootChest(coins:number) {
        this.gold$ += Math.abs(coins)
        console.log(`${this.name$} looted a chest for ${coins} gold`)
        console.log(`and now has ${this.gold$} gold coins total`)
    }

    public spendGold(coins:number) {
        coins = Math.abs(coins)
        if (this.gold$ >= coins) {
            this.gold$ = this.gold$ - coins
            console.log(`${this.name$} spent ${coins} gold on some stuff`)
            console.log(`and now has ${this.gold$} gold coins left`)
        }
        
    }

}

class Barbarian extends Fighter {
    get name():string{ return `Barbarian: ${this.name$}` }
    weapon$:AttackStyle = new Club();
    defense$:DefenseStyle = new Shield();
}
class Peon extends Fighter {
    get name():string{ return `Peon: ${this.name$}` }
    weapon$:AttackStyle = new Club();
    defense$:DefenseStyle = new Shield();
}
class Knight extends Fighter {
    get name():string{ return `Knight: ${this.name$}` }
    weapon$:AttackStyle = new Sword();
    defense$:DefenseStyle = new Armor();
}
class Archer extends Fighter {
    get name():string{ return `Archer: ${this.name$}` }
    weapon$:AttackStyle = new Bow();
    defense$:DefenseStyle = new Tunic();
}

let thor = new Barbarian('Thor')
let james = new Peon('James')
let sirLawry = new Knight('Sir Lawry')
let robin = new Archer('Robin')
let party: Fighter[] = [thor, james, sirLawry, robin]
for (let adventurer of party) {
    console.log(`--------${adventurer.name}-------`)
    adventurer.basic_attack();
    adventurer.basic_defense();
    adventurer.special_attack();
}

// Robin's adventure
console.log(`#####################################`)
console.log(`----- ${robin.name}'s Adventure -----`)
robin.basic_attack();
console.log(`Robin has killed a small goblin`)
console.log('The goblin dropped a short sword')
robin.weapon = new Sword()
console.log("Robin gets attacked by a wolf")
robin.basic_defense();
robin.basic_attack();
robin.special_attack();
console.log("luckily they managed to slay the wolf and found some treasure")
robin.lootChest(300);
console.log("Afterwards, Robin went to town to buy armor")
robin.spendGold(150);
robin.defense = new Armor()
console.log("The next time they are attacked:")
robin.basic_defense()