class Hud {
    constructor(screen, player) {
        this.screen = screen;
        this.player = player;
        this.face = 1;
    }

    draw() {
        this.screen.canvas.drawImage(document.getElementById("HUD"), 17, 393)
        this.screen.canvas.drawImage(document.getElementById("HUDCase"), 0, 0)

        // Floor
        this.drawNumber(45, 425, 1);

        // Score 
        this.drawNumber(175, 425, player.score);

        // Lives 
        this.drawNumber(225, 426, player.lives);

        // Face
        this.screen.canvas.drawImage(document.getElementById("face_" + this.face ), 267, 395)


        // Health
        this.drawNumber(365, 425, player.health);

        // Ammo
        this.drawNumber(450, 425, player.ammo);

        // Gun Shadow
        this.screen.canvas.drawImage(document.getElementById(player.gun + "_HUD"), 500, 400, 120, 60)

    }

    drawNumber(x, y, number) {
        const num = `${number}`.split("").reverse().join("");

        for (let i = 0; i < num.length; i++) {
            this.screen.canvas.drawImage(document.getElementById(num[i]), x - (i * 16), y, 16, 32)
        }
        
    }
}