const fps = 30;
const scale = 10;
const MoveSpeed = 3;
const rotateSpeed = 0.12;

const doorSpeed = 0.025;
const pushSpeed = 0.05;

const resolution = 1;

const Gamewidth = 640;
const Gameheight = 480;

const pistoCoolDown = fps / 2;
const knifeCoolDown = fps / 2;
const smgCoolDown = 500;
let lastShot = pistoCoolDown;

let loopShoot;
let loopAnimate;
let timeShoot;

let moving = "";
let rotating = "";

let frames = 0;

let HUD_HUDCase;
let weapon;

let shootable = [];

let bright = 0;
let black = 0;

let gameOver = false;

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyUp);
document.addEventListener('mousedown', mouseDown);
document.addEventListener('mouseup', mouseUp);

document.getElementById("Map").addEventListener('click', getCords);

// const roofWorld = [
//     [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
//     [2, 0, 0, 2, 1, 0, 0, 0, 0, 1],
//     [2, 0, 0, 2, 1, 0, 0, 1, 0, 1],
//     [2, 0, 0, 2, 1, 0, 0, 0, 0, 1],
//     [2, 0, 0, 0, 0, 0, 1, 1, 1, 1],
//     [2, 2, 2, 2, 1, 0, 1, 3, 3, 3],
//     [1, 1, 1, 1, 1, 0, 0, 0, 0, 3],
//     [1, 0, 0, 0, 0, 0, 1, 3, 0, 3],
//     [1, 0, 0, 0, 0, 0, 1, 3, 0, 3],
//     [1, 1, 1, 1, 1, 1, 3, 3, 3, 3]
// ];

// const World = [
//     [2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
//     [2, 0, 0, 2, 1, 0, 0, 0, 0, 1],
//     [2, 0, 0, 2, 1, 0, 0, 0, 0, 1],
//     [2, 0, 0, 2, 1, 0, 0, 0, 0, 1],
//     [2, 0, 0, 0, 0, 0, 1, 1, 1, 1],
//     [2, 2, 2, 2, 1, 0, 1, 3, 3, 3],
//     [1, 1, 1, 1, 1, 0, 0, 0, 0, 3],
//     [1, 0, 0, 0, 0, 0, 1, 3, 0, 3],
//     [1, 0, 0, 0, 0, 0, 1, 3, 0, 3],
//     [1, 1, 1, 1, 1, 1, 3, 3, 3, 3]
// ];

let map;
let game;
let player;
let HUD;

// Begins the program
window.onload = setup();

// Runs before at the beginning of the program
function setup() {



    // Initialises both canvases
    map = new Map(document.getElementById("Map"));
    game = new Game(document.getElementById("Game"));

    HUD_HUDCase = new Screen(document.getElementById("HUD_HUDCase"));

    // Initialises player
    player = new Player(map.screen, 300, 505);

    HUD = new Hud(HUD_HUDCase, player);

    // Changes the size of the canvas
    map.screen.setSize(World[0].length * scale, World.length * scale);
    game.screen.setSize(Gamewidth, Gameheight);

    HUD_HUDCase.setSize(Gamewidth, Gameheight);

    // Changes the background of the canvas
    map.screen.background("#555");
    game.screen.background("#FFF");

    // Begins the game
    // setInterval(draw, 1000 / fps);

    // setTimeout(() => {
    //     draw();
    // }, 2000);


    for (let y = 0; y < World.length; y++) {
        for (let x = 0; x < World[y].length; x++) {

            if (`${World[y][x]}` [0] === '4') {
                if (!Doors[y]) {
                    Doors[y] = {};
                }
                Doors[y][x] = 1;
            }

        }
    }

    draw();
    HUD.draw();

    // window.onload needs a return
    return null;
}

function draw() {

    if (frames === 0) {
        document.getElementById("backgroundMusic").play();

    }

    if (frames % 2 === 0) {
        lastShot++;
        // Changes the background of the canvas
        map.screen.background("#555");
        game.screen.background("#000");
        map.draw();
        game.draw3D();

        player.move();
        player.draw();

        for (const enemy of enemies) {
            if (!enemy.alive) continue;
            if (enemy.patrolling) enemy.patroll();
            if (enemy.searching) enemy.search();

        }

        if (bright >= 0) {
            const c = `rgba(0,255,0, ${bright})`;
            game.screen.background(c);
        }

        if (black >= 0) {
            const c = `rgba(0,0,0, ${black})`;
            game.screen.background(c);
        }

        if (frames % 15 === 0) {
            HUD.face = Math.round(Math.random() * 2) + 1;
            HUD.draw();
        }

        // game.screen.background("rgba(0,255,0,0)")
        // const index = sprites.findIndex(
        //     obj => obj.y === 26.5 && obj.x === 33.5 && obj.id === "guard"
        // );


        if (frames % fps === 0) {
            // sprites[index].dir.unshift(sprites[index].dir.pop());
            // sprites[index].dir.push(sprites[index].dir.shift())
        }
    }
    frames++;

    if (!gameOver) {
        requestAnimationFrame(draw);
    }
}

function keyPressed(event) {

    switch (event.key) {
        case "w":
            console.log("forward");
            moving = "forward";
            break;

        case "s":
            console.log("backward");
            moving = "backward";
            break;

        case "d":
            console.log("turn-right");
            rotating = "turn-right";
            break;

        case "a":
            console.log("turn-left");
            rotating = "turn-left";
            break;
        case "e":
            console.log("Interact");
            player.open();
            player.push();
            player.switch();
            break;

        case "1":
            player.gun = player.weapons[0];
            HUD.draw();
            break;

        case "2":
            player.gun = player.weapons[1];
            HUD.draw();
            break;

        case "3":
            player.gun = player.weapons[2] ? player.weapons[2] : player.gun;
            HUD.draw();
            break;

        default:
            break;
    }
}

function keyUp(event) {

    switch (event.key) {
        case "w":
            moving = "";
            break;

        case "s":
            moving = "";
            break;

        case "d":
            rotating = "";
            break;

        case "a":
            rotating = "";
            break;

        default:
            break;
    }
}

function getImage(x, y, xImg, w, wImg, h, id) {
    const image = document.getElementById(id);

    const width = image.width;
    const height = image.height;

    game.screen.canvas.drawImage(image, Math.round(xImg * width), 0, Math.round(w), Math.round(height), Math.round(x), Math.round(y), Math.round(wImg), Math.round(h));

}

function mouseDown(event) {

    if (player.ammo > 0) {

        if (player.gun === "pistol" && lastShot >= pistoCoolDown) {

            const loop = setInterval(() => {
                game.pistolAnimation(loop)
            }, 1000 / 19);
            lastShot = 0;

        } else if (player.gun === "smg") {
            loopAnimate = setInterval(() => {
                game.smgAnimationInitial(loopAnimate)
            }, 1000 / 19);
        }
    }

    if (player.gun === "knife" && lastShot >= knifeCoolDown) {

        const loop = setInterval(() => {
            game.pistolAnimation(loop)
        }, 1000 / 19);
        lastShot = 0;
    }
}

function mouseUp(e) {
    if (player.gun === "smg") {
        clearInterval(loopShoot);
        clearInterval(loopAnimate);


        const loop = setInterval(() => {
            game.smgAnimationLast(loop)
        }, 1000 / 19);
    }
}

function getCords(event) {
    const rect = game.screen.element.getBoundingClientRect();
    // console.log( event.clientX - game.screen.canvas.canvas.offsetLeft, event.clientY - 80);
}

function passable(sprite, enemy) {


    switch (sprite.id) {
        case "greenLight":
            return true;
            break;
        case "chandelier":
            return true;
            break;
        case "foodPack":
            if (player.health < 100 && !enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);
                player.health = player.health + 10 >= 100 ? 100 : player.health + 10;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;
        case "ammoPack":
            if (player.ammo < 99 && !enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);
                if (!sprite.drop) {
                    player.ammo = player.ammo + 9 >= 99 ? 99 : player.ammo + 9;
                    sprites[sprites.indexOf(sprite)].x = 0;
                    HUD.draw();
                } else {
                    player.ammo = player.ammo + 4 >= 99 ? 99 : player.ammo + 4;
                    sprites[sprites.indexOf(sprite)].x = 0;
                    HUD.draw();
                }
            }
            return true;
            break;
        case "medPack":
            if (player.health < 100 && !enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();                
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);
                player.health = player.health + 25 >= 100 ? 100 : player.health + 25;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;

        case "stew":
            if (player.health < 100 && !enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();                
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);
                player.health = player.health + 4 >= 100 ? 100 : player.health + 4;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;

        case "crown":
            if (!enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);

                player.score += 5000;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;

        case "chest":
            if (!enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();                
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);

                player.score += 1000;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;

        case "cross":
            if (!enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);

                player.score += 100;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;

        case "chalice":
            if (!enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);

                player.score += 500;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;

        case "guardDeath_5":
            return true;
            break;

        case "smg":
            if (!enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();                
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);

                player.gun = "smg";
                player.weapons.push("smg");
                HUD.draw();
                sprites[sprites.indexOf(sprite)].x = 0;
            }
            return true;
            break;

        case "orb":
            if (!enemy) {
                document.getElementById("pickup").pause();
                document.getElementById("pickup").currentTime = 0;
                document.getElementById("pickup").play();                
                const loop = setInterval(() => {
                    flashing(loop);
                }, 1000 / fps);
                player.ammo = player.ammo + 25 >= 99 ? 99 : player.ammo + 25;
                player.health = 100;
                player.lives += 1;
                sprites[sprites.indexOf(sprite)].x = 0;
                HUD.draw();
            }
            return true;
            break;

        default:
            return false;
    }



}

function flashing(loop) {
    bright += 0.08;
    if (bright >= 0.3) {
        clearInterval(loop);
        const loop_2 = setInterval(() => unflashing(loop_2), 1000 / fps)
    }
}

function unflashing(loop) {
    bright -= 0.08;
    if (bright <= 0) {
        clearInterval(loop);
    }
}

function fadeBlack(loop) {
    black += 0.08;
    if (black >= 1) {
        gameOver = true;
        clearInterval(loop);
    }
}