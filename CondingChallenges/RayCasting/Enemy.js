const enemyAngles = [
    'Back',
    'BackLeft',
    'Left',
    'FrontLeft',
    'Front',
    'FrontRight',
    'Right',
    'BackRight',
];

class Enemy {
    constructor(x, y, id, score, health, direction) {
        this.x = x;
        this.y = y;

        this.type = id;

        this.walkFoot = Math.round(Math.random() + 1);
        this.id = id + "Walk_" + this.walkFoot + "_";

        this.dir = [
            'Back',
            'BackLeft',
            'Left',
            'FrontLeft',
            'Front',
            'FrontRight',
            'Right',
            'BackRight',
        ];

        this.heading = 0;

        this.rotate(direction);

        this.score = score;
        this.health = health;
        this.deathFrame = 1;
        this.moveSpeed = 0.1;
        this.alive = true;
        this.patrolling = true;
        this.searching = false;
        this.shooting = false;

        this.doorOpening = false;

        this.shotFrame = 1;
        this.shootingLoop;

        this.lastShot = 0;
        this.shotCooldown = 10;

        if (id === 'dog') {
            this.lastDeathFrame = 4;
            this.lastShootFrame = 4;
            this.shotFrameSpeed = 10;
            this.drop = "";
            this.sound = document.getElementById("dogSound").cloneNode(true);
            this.deathSound= document.getElementById("dogDeathSound").cloneNode(true);

        }
        if (id === 'guard') {
            this.lastDeathFrame = 5;
            this.lastShootFrame = 4;
            this.shotFrameSpeed = 5;
            this.drop = "ammoPack";
            this.sound = document.getElementById("guardSound").cloneNode(true);
            this.deathSound= document.getElementById("guardDeathSound").cloneNode(true);
        }
    }

    move() {
        if (frames % 15 === 0) {
            if (this.walkFoot === 1) this.walkFoot = 2;
            else if (this.walkFoot === 2) this.walkFoot = 1;

            this.id = this.type + "Walk_" + this.walkFoot + "_";
        }
        const theta = -this.heading;

        const newMapPosX = Math.floor(((this.x * scale) + (Math.cos(theta) * MoveSpeed) * 2) / scale);
        const newMapPosY = Math.floor(((this.y * scale) + (Math.sin(theta) * -1 * MoveSpeed) * 2) / scale);

        const mapPosX = Math.floor(this.x);
        const mapPosY = Math.floor(this.y);

        const wall = parseInt(`${World[newMapPosY][newMapPosX]}` [0]);

        let spriteHitY;
        let spriteHitX;


        for (const sprite of sprites) {

            if (Math.floor(sprite.x) === newMapPosX && Math.floor(sprite.y) === newMapPosY && !passable(sprite, true)) {
                spriteHitY = true;
                spriteHitX = true;
            }

            if (Math.floor(sprite.x) === mapPosX && Math.floor(sprite.y) === newMapPosY && !passable(sprite, true)) {
                spriteHitY = true;
                spriteHitX = false;
                break;

            }

            if (Math.floor(sprite.x) === newMapPosX && Math.floor(sprite.y) === mapPosY && !passable(sprite, true)) {
                spriteHitX = true;
                spriteHitY = false;
                break;
            }


            if (spriteHitX && spriteHitY) break;
        }

        if (wall === 4 && !this.doorOpening && this.type != 'dog') {
            if (World[newMapPosY][newMapPosX] !== 41) {
                this.open(newMapPosY, newMapPosX);   
            } 
        }

        if (((wall === 0) || (wall === 4 && Math.round(Doors[newMapPosY][newMapPosX]) === 0)) && (!spriteHitX && !spriteHitY)) {
            this.x += Math.cos(theta) * this.moveSpeed;
            this.y += Math.sin(theta) * -1 * this.moveSpeed;


        } else if (World[newMapPosY][mapPosX] === 0 && !spriteHitY && Math.abs(Math.sin(theta)) > 0.00001) {
            this.y += Math.sin(theta) * -1 * this.moveSpeed;

        } else if (World[mapPosY][newMapPosX] === 0 && !spriteHitX) {
            this.x += Math.cos(theta) * this.moveSpeed;
        } else {
            return false;
        }

        return true;
    }

    rotate(direction) {

        this.heading += direction;
        while (this.heading > Math.PI) this.heading -= Math.PI * 2;
        while (this.heading < -Math.PI) this.heading += Math.PI * 2;

        let rotateBy;

        if (this.heading >= 7 * Math.PI / 8 || (this.heading <= -7 * Math.PI / 8 && this.heading >= -Math.PI)) {
            rotateBy = -4;
        } else if (this.heading >= -7 * Math.PI / 8 && this.heading <= -5 * Math.PI / 8) {
            rotateBy = -3;
        } else if (this.heading >= -5 * Math.PI / 8 && this.heading <= -3 * Math.PI / 8) {
            rotateBy = -2;
        } else if (this.heading >= -3 * Math.PI / 8 && this.heading <= -1 * Math.PI / 8) {
            rotateBy = -1;
        } else if ((this.heading >= -1 * Math.PI / 8 && this.heading <= 0) || (this.heading <= 1 * Math.PI / 8 && this.heading >= 0)) {
            rotateBy = 0;
        } else if (this.heading >= 1 * Math.PI / 8 && this.heading <= 3 * Math.PI / 8) {
            rotateBy = 1;
        } else if (this.heading >= 3 * Math.PI / 8 && this.heading <= 5 * Math.PI / 8) {
            rotateBy = 2;
        } else if (this.heading >= 5 * Math.PI / 8 && this.heading <= 7 * Math.PI / 8) {
            rotateBy = 3;
        }

        this.dir = [...enemyAngles];

        if (rotateBy >= 0) {
            this.dir = this.dir.splice(-rotateBy, rotateBy).concat(this.dir);
        } else {
            this.dir = this.dir.concat(this.dir.splice(0, -rotateBy));
        }

    }

    patroll() {
        if (!this.move()) this.rotate(Math.PI);

        if (this.inSight()) {
            this.patrolling = false;
            this.searching = true;
            this.sound.play();
        }
    }

    inSight() {

        const playerX = player.pos.x / scale;
        const playerY = player.pos.y / scale;

        const dX = playerX - this.x;
        const dY = playerY - this.y;

        const dir = Math.atan2(dY, dX);
        const dist = Math.sqrt(dX * dX + dY * dY);

        const ray = new Ray(map.screen, this.x * scale, this.y * scale, this.heading);

        let playerDirection;

        if (dir >= 7 * Math.PI / 8 || (dir <= -7 * Math.PI / 8 && dir >= -Math.PI)) {
            playerDirection = this.dir[0]
        } else if (dir >= -7 * Math.PI / 8 && dir <= -5 * Math.PI / 8) {
            playerDirection = this.dir[1]
        } else if (dir >= -5 * Math.PI / 8 && dir <= -3 * Math.PI / 8) {
            playerDirection = this.dir[2]
        } else if (dir >= -3 * Math.PI / 8 && dir <= -1 * Math.PI / 8) {
            playerDirection = this.dir[3]
        } else if ((dir >= -1 * Math.PI / 8 && dir <= 0) || (dir <= 1 * Math.PI / 8 && dir >= 0)) {
            playerDirection = this.dir[4]
        } else if (dir >= 1 * Math.PI / 8 && dir <= 3 * Math.PI / 8) {
            playerDirection = this.dir[5]
        } else if (dir >= 3 * Math.PI / 8 && dir <= 5 * Math.PI / 8) {
            playerDirection = this.dir[6]
        } else if (dir >= 5 * Math.PI / 8 && dir <= 7 * Math.PI / 8) {
            playerDirection = this.dir[7]
        }

        if ((playerDirection === "Front" || playerDirection === "FrontLeft" || playerDirection === "FrontRight") && (dist < Math.abs(ray.distance()[0]))) return true;

        return false;
    }

    search() {
        const playerX = player.pos.x / scale;
        const playerY = player.pos.y / scale;

        const dX = playerX - this.x;
        const dY = playerY - this.y;

        const dist = Math.sqrt(dX * dX + dY * dY);
        const dir = Math.atan2(dY, dX);

        this.rotate(dir - this.heading);
        // if (!this.move()) {
        //     this.patrolling = true;
        //     this.searching = false;
        // }

        this.move();

        if (dist < 2 && frames - this.lastShot  > this.shotCooldown) {
            this.patrolling = false;
            this.searching = false;
            this.shooting = true;
            this.id = this.type + "Shoot_1";
            this.shootingLoop = setInterval(() => this.shot(this.shootingLoop), 1000 / this.shotFrameSpeed);
        }
    }

    shot(loop) {
        this.id = this.type + "Shoot_" + this.shotFrame;

        if (this.shotFrame === 3 && this.type === 'guard') document.getElementById("pistolShot").cloneNode(true).play(); 
        if (this.shotFrame === this.lastShootFrame) {

            if (this.inSight()) {
                document.getElementById("playerPain").cloneNode(true).play();
                player.health -= 10;
                console.log("hit");

                if (player.health <= 0) {
                    document.getElementById("playerDeath").cloneNode(true).play();
                    const loop = setInterval( () => fadeBlack(loop), 1000 /fps );
                }
            }


            clearInterval(loop);
            this.lastShot = frames;
            this.shotFrame = 1;
            this.patrolling = true;
            this.shooting = false;
            this.id = this.type + "Walk_" + this.walkFoot + "_";
            this.rotate(Math.PI);
        }

        this.shotFrame++;
    }

    open(y, x) {
        document.getElementById("doorOpen").cloneNode(true).play();
        this.doorOpening = true;
        const loop = setInterval(() => {
                this.opening(y, x, loop)
            },
            1000 / fps
        );
    }

    opening(y, x, loop) {
        if (Doors[y][x] > 0) {
            Doors[y][x] -= doorSpeed;
        }

        if (Doors[y][x] <= 0) {
            this.doorOpening = false;
            clearInterval(loop);
            setTimeout(() => {
                    const newLoop = setInterval(() => {
                            this.closing(x, y, newLoop);
                        },
                        1000 / fps)
                },
                1000)
        }
    }

    closing(x, y, loop) {
        Doors[y][x] += doorSpeed;

        if (Doors[y][x] >= 1) {
            clearInterval(loop);
        }
    }

}