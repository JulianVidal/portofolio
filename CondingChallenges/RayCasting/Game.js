class Game {

    constructor(element) {
        this.screen = new Screen(element);
        this.gunFrame = 1;
    }

    draw3D() {
        const distances = [];

        for (const ray of player.rays) {
            distances.unshift(ray.distance());
        }

        const width = resolution;

        let maxDistance = 0;

        for (let i = 0; i < distances.length; i++) {
            const height = Gameheight / distances[i][0];
            let image = "greyStone";
            let color = "#2233FF";

            let wallHit = World[distances[i][2].y][distances[i][2].x];

            if (distances[i][0] > maxDistance) maxDistance = distances[i][0];


            if (distances[i][5]) wallHit = 42;

            switch (wallHit) {
                case 1:
                    image = "greyStone";
                    break;
                case 11:
                    image = "greyStonePortrait";
                    break;
                case 12:
                    image = "greyStoneEagle";
                    break;
                case 13:
                    image = "greyStoneBanner";
                    break;


                case 2:
                    image = "wood";
                    break;
                case 21:
                    image = "woodEagle";
                    break;
                case 22:
                    image = "woodPortrait";
                    break;

                case 3:
                    image = "blueBrick";
                    break;
                case 31:
                    image = "blueBrickCell";
                    break;
                case 32:
                    image = "blueBrickCellBone";
                    break;


                case 4:
                    image = "door";
                    break;
                case 41:
                    image = "doorElevator";
                    break;
                case 42:
                    image = "doorSide";
                    break;

                case 5:
                    image = "elevatorSwitchOn";
                    break;
                case 51:
                    image = "elevatorSwitchOff";
                    break;
                case 52:
                    image = "elevatorHandle";
                    break;
            }

            color = "#333";

            this.screen.rect(i * width, 0, width, (this.screen.height / 2) - (height / 2), color);
            this.screen.rect(Math.round(i * width), ((this.screen.height / 2) - (height / 2) ) + height, width, (this.screen.height / 2) - (height / 2) + 2, "#666"/*"#55AA55"*/);

            getImage(Math.round(i * width * 10) / 10, Math.round(((this.screen.height / 2) - height / 2) * 10 ) / 10, distances[i][3], width, width + 1000, height, image);

            if (distances[i][1]) this.screen.rect(i * width + (width / 2 ), (this.screen.height / 2), width, height, "#00000066"/*`rgba(0, 0, 0, ${distances[i][0] / 7})`*/, true)
        }

        const allSprites = sprites.concat(enemies);


        const playerX =  player.pos.x / scale;
        const playerY =  player.pos.y / scale;

        allSprites.sort(
            (a, b) => {
                const spriteXA = a.x - playerX;
                const spriteYA = a.y - playerY;
    
                const spriteXB = b.x - playerX;
                const spriteYB = b.y - playerY;
    
                return ( spriteXB * spriteXB  +  spriteYB * spriteYB ) - (spriteXA * spriteXA  +  spriteYA * spriteYA )
            }
        );

        let spritesDrawn = 0;

        shootable = [];

        for (let i = 0; i < allSprites.length; i++) {

            const spriteX = allSprites[i].x - playerX;
            const spriteY = allSprites[i].y - playerY;

            const distance = Math.sqrt( spriteX * spriteX  +  spriteY * spriteY );

            if (distance > maxDistance) {
                continue;
            }

            const height   = Math.round(Gameheight / distance);


            let spriteAng = Math.atan2(-spriteY, spriteX);
            // while (spriteAng > Math.PI * 2) spriteAng -= Math.PI * 2;
            while (spriteAng < 0) spriteAng += Math.PI * 2;


            let theta;


            if ((player.rot + (Math.PI / 6)) > Math.PI * 2 && spriteAng > 0 && spriteAng < Math.PI / 3) {
                theta = spriteAng - (player.rot - (Math.PI * 2));
            } else if ((spriteAng + (Math.PI / 6)) > Math.PI * 2 && player.rot > 0 && player.rot < Math.PI / 3){
                theta = (spriteAng - (Math.PI * 2)) - player.rot;
            } else {
                theta = spriteAng - player.rot;
            }

            while (theta > Math.PI * 2) theta -= Math.PI * 2;

            const spriteScreenX  = Math.round(( 1 - (theta / (Math.PI / 6)) ) * (Gamewidth / 2));
            
            if (spriteScreenX < 0 || spriteScreenX > Gamewidth) {
                continue;
            }
            

            while (theta < 0) theta += Math.PI * 2;
            spritesDrawn++;
            for (let j = 0; j < height; j += resolution) {
                const columnX = Math.round((spriteScreenX + j) - height / 2);
                const distIndex = Math.round(columnX / resolution);

                if (distances[distIndex]){
                    if (distances[distIndex][0] > distance) {
                        let imageId = allSprites[i].id;
 
                        const dX = playerX  - allSprites[i].x; 
                        const dY = playerY  - allSprites[i].y; 

                        const dir = Math.atan2(dY, dX);

                        if (allSprites[i].alive && !allSprites[i].shooting) {

                            if (dir >= 7 * Math.PI / 8 || (dir <= -7 * Math.PI / 8 && dir >= -Math.PI)) {
                                imageId = imageId + allSprites[i].dir[0]
                            } else if (dir >= -7 * Math.PI / 8 && dir <= -5 * Math.PI / 8) {
                                imageId = imageId + allSprites[i].dir[1]
                            } else if (dir >= -5 * Math.PI / 8 && dir <= -3 * Math.PI / 8) {
                                imageId = imageId + allSprites[i].dir[2]
                            } else if (dir >= -3 * Math.PI / 8 && dir <= -1 * Math.PI / 8) {
                                imageId = imageId + allSprites[i].dir[3]
                            } else if ((dir >= -1 * Math.PI / 8 && dir <= 0) || (dir <= 1 * Math.PI / 8 && dir >= 0)) {
                                imageId = imageId + allSprites[i].dir[4]
                            } else if (dir >= 1 * Math.PI / 8 && dir <= 3 * Math.PI / 8) {
                                imageId = imageId + allSprites[i].dir[5]
                            } else if (dir >= 3 * Math.PI / 8 && dir <= 5 * Math.PI / 8) {
                                imageId = imageId + allSprites[i].dir[6]
                            } else if (dir >= 5 * Math.PI / 8 && dir <= 7 * Math.PI / 8) {
                                imageId = imageId + allSprites[i].dir[7]
                            }   
                        }

                        getImage(columnX, (this.screen.height / 2) - height / 2, j / height, 1, resolution, height, imageId);

                        if (distIndex > (Gamewidth / resolution)  / 4 && distIndex < (3 * Gamewidth / resolution)  / 4 && allSprites[i].alive) {
                            
                            const repeat = shootable.findIndex( arr => arr[0].x === allSprites[i].x && arr[0].y === allSprites[i].y);

                            if (repeat === -1) {
                                shootable.unshift([allSprites[i], distance])
                            }
                        }
                    }
                }

            }

        }

        // console.log(spritesDrawn)

        getImage((this.screen.width / 2) - 150, this.screen.height - 400, 0, 64, 300, 300, player.gun + "_" +  this.gunFrame);
        // getImage(260, this.screen.height - 330, 0, 128, 100, 3);

    }

    pistolAnimation(loop) {

        if (this.gunFrame >= 5) {
            this.gunFrame = 1;
            clearInterval(loop);
        } else {
            this.gunFrame++;
        }

        if (this.gunFrame === 3) {
            if (player.gun === "pistol") {
                // document.getElementById("pistolShot").cloneNode(true).play();
                player.ammo--;

                const playerX = player.pos.x / scale;
                const playerY = player.pos.y / scale;

                for (const enemy of enemies) {
                    const dX = enemy.x - playerX;
                    const dY = enemy.y - playerY;

                    const dist = Math.sqrt(dX * dX + dY * dY);

                    if (dist < 10 && !enemy.shooting) {
                        enemy.patrolling = false;
                        enemy.searching = true;
                    }
                }
            }
            // if (player.gun === "knife") document.getElementById("knifeSwing").cloneNode(true).play();

            player.shoot();
            HUD.draw();
        }

    }

    smgAnimationInitial(loop) {
        if (this.gunFrame === 3) {
            // document.getElementById("smgShot").cloneNode(true).play();
            player.ammo--;
            player.shoot();
            HUD.draw();
        }

        if (this.gunFrame < 3) {
            clearInterval(loop);
            loopShoot = setInterval( () => this.smgAnimationDuring(loopShoot), 1000 / 19);
        } else {
            this.gunFrame++;
        }
    }

    smgAnimationDuring(loop) {
        if (this.gunFrame === 3) {
            // document.getElementById("smgShot").cloneNode(true).play();
            player.ammo--;
            player.shoot();
            HUD.draw();
        }

        if (this.gunFrame > 4) {
            this.gunFrame = 3;
        } else {
            this.gunFrame++;
        }
    }

    smgAnimationLast(loop) {
        if (this.gunFrame === 3) {
            // document.getElementById("smgShot").cloneNode(true).play();
            player.ammo--;
            player.shoot();
            HUD.draw();
        }

        if (this.gunFrame >= 5) {
            this.gunFrame = 1;
            clearInterval(loop);
        } else {
            this.gunFrame++;
        }
    }

} 