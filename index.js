#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    decreseHealth() {
        this.fuel -= 25;
    }
    increseHealth() {
        this.fuel += 30;
        if (this.fuel > 100) {
            this.fuel = 100;
        }
    }
}
class Enemy {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    decreseHealth() {
        this.fuel -= 25;
    }
    increseHealth() {
        this.fuel = 100;
    }
}
let answer = await inquirer.prompt([
    {
        name: "Name",
        type: "input",
        message: "player name:",
    },
    {
        name: "enemies",
        type: "list",
        message: "Select enemy to fight with...",
        choices: ["worrier", "zombie", "skeleton"],
    },
]);
let player = new Player(answer.Name);
let enemy = new Enemy(answer.enemies);
console.log(chalk.bold.yellowBright(`${answer.Name} VS  ${answer.enemies}`));
let condition = true;
while (condition) {
    let select = await inquirer.prompt({
        name: "action",
        type: "list",
        message: "Select action...",
        choices: ["attack", "health potion", "run"]
    });
    switch (select.action) {
        case "attack":
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                player.decreseHealth();
                console.log(chalk.bold.blueBright(`${answer.Name} fuel is ${player.fuel}`));
                console.log(chalk.bold.green(`${answer.enemies} fuel is ${enemy.fuel}`));
                if (player.fuel <= 0) {
                    console.log(chalk.italic.redBright(`${answer.Name} you loss! GAME OVER`));
                    condition = false;
                }
            }
            else if (num <= 0) {
                enemy.decreseHealth();
                console.log(chalk.bold.red(`${answer.Name} fuel is ${player.fuel}`));
                console.log(chalk.bold.green(`${answer.enemies} fuel is ${enemy.fuel}`));
            }
            if (enemy.fuel <= 0) {
                console.log(chalk.bold.redBright(`${answer.enemies} has dead! GAME OVER`));
                condition = false;
            }
            break;
        case "health potion":
            player.increseHealth();
            console.log(chalk.italic.yellow(`${answer.Name} used a health potion`));
            console.log(chalk.bold.green(`${answer.Name} fuel is ${player.fuel}`));
            break;
        case "run":
            console.log(chalk.italic.greenBright(`${answer.Name} Run away ...Better luck next time`));
            condition = false;
            break;
    }
}
