class Player {
  constructor(screen, x, y) {
    this.pos = {
      x: x,
      y: y
    }
    this.speed = MoveSpeed
    this.screen = screen
    this.FOV = Math.PI / 3
    this.ray = new Ray(screen, x, y, Math.PI / 6)
    this.rayAmount = Gamewidth / resolution
    this.rays = []

    this.rot = (0 * Math.PI) / 2

    for (
      let i = -this.FOV / 2 + this.rot;
      i < this.FOV / 2 + this.rot;
      i += this.FOV / this.rayAmount
    ) {
      this.rays.push(new Ray(screen, x, y, i))
    }

    this.health = 100
    this.lives = 3
    this.ammo = 8
    this.score = 0

    this.spriteDir = 1

    this.gun = 'pistol'

    this.weapons = ['knife', 'pistol']
  }

  draw() {
    this.screen.circle(this.pos.x, this.pos.y, scale / 6, '#DDD')

    // this.ray.draw();

    for (let ray of this.rays) {
      ray.distance(this.rot)
    }
  }

  move() {
    switch (moving) {
      case 'forward':
        this.forward()
        break
      case 'backward':
        this.backward()
        break
      default:
        break
    }

    switch (rotating) {
      case 'turn-right':
        this.turn_right()
        break
      case 'turn-left':
        this.turn_left()
        break
    }

    while (this.rot > Math.PI * 2) {
      this.rot -= Math.PI * 2
    }

    while (this.rot < 0) {
      this.rot += Math.PI * 2
    }

    this.rays = []

    for (
      let i = -this.FOV / 2 + this.rot;
      i < this.FOV / 2 + this.rot;
      i += this.FOV / this.rayAmount
    ) {
      this.rays.push(new Ray(this.screen, this.pos.x, this.pos.y, i))
    }

    for (let ray of this.rays) {
      ray.pos = this.pos
    }

    this.ray.pos = this.pos

    if (this.rot < Math.PI / 4 || this.rot > (7 * Math.PI) / 4) {
      this.spriteDir = 1
    } else if (this.rot >= Math.PI / 4 && this.rot < (3 * Math.PI) / 4) {
      this.spriteDir = 2
    } else if (this.rot >= (3 * Math.PI) / 4 && this.rot < (4 * Math.PI) / 4) {
      this.spriteDir = 3
    } else {
      this.spriteDir = 4
    }
  }

  forward() {
    if (frames % 10 === 0) {
      // document.getElementById("step").cloneNode(true).play();
    }
    const newMapPosX = Math.floor(
      (this.pos.x + Math.cos(this.rot) * MoveSpeed * 2) / scale
    )
    const newMapPosY = Math.floor(
      (this.pos.y + Math.sin(this.rot) * -1 * MoveSpeed * 2) / scale
    )

    const mapPosX = Math.floor(this.pos.x / scale)
    const mapPosY = Math.floor(this.pos.y / scale)

    const wall = parseInt(`${World[newMapPosY][newMapPosX]}`[0])

    let spriteHitY
    let spriteHitX

    for (const sprite of sprites) {
      if (
        Math.floor(sprite.x) === newMapPosX &&
        Math.floor(sprite.y) === newMapPosY &&
        !passable(sprite)
      ) {
        spriteHitY = true
        spriteHitX = true
      }

      if (
        Math.floor(sprite.x) === mapPosX &&
        Math.floor(sprite.y) === newMapPosY &&
        !passable(sprite)
      ) {
        spriteHitY = true
        spriteHitX = false
        break
      }

      if (
        Math.floor(sprite.x) === newMapPosX &&
        Math.floor(sprite.y) === mapPosY &&
        !passable(sprite)
      ) {
        spriteHitX = true
        spriteHitY = false
        break
      }

      if (spriteHitX && spriteHitY) break
    }

    if (
      (wall === 0 ||
        (wall === 4 && Math.round(Doors[newMapPosY][newMapPosX]) === 0)) &&
      !spriteHitX && !spriteHitY
    ) {
      this.pos.x += Math.cos(this.rot) * this.speed
      this.pos.y += Math.sin(this.rot) * -1 * this.speed
    } else if (World[newMapPosY][mapPosX] === 0 && !spriteHitY) {
      this.pos.y += Math.sin(this.rot) * -1 * this.speed
    } else if (World[mapPosY][newMapPosX] === 0 && !spriteHitX) {
      this.pos.x += Math.cos(this.rot) * this.speed
    }
  }

  backward() {
    if (frames % 10 === 0) {
      // document.getElementById("step").cloneNode(true).play();
    }
    const newMapPosX = Math.floor(
      (this.pos.x - Math.cos(this.rot) * MoveSpeed * 2) / scale
    )
    const newMapPosY = Math.floor(
      (this.pos.y - Math.sin(this.rot) * -1 * MoveSpeed * 2) / scale
    )

    const mapPosX = Math.floor(this.pos.x / scale)
    const mapPosY = Math.floor(this.pos.y / scale)

    const wall = parseInt(`${World[newMapPosY][newMapPosX]}`[0])

    let spriteHitY
    let spriteHitX

    for (const sprite of sprites) {
      if (
        Math.floor(sprite.x) === newMapPosX &&
        Math.floor(sprite.y) === newMapPosY &&
        !passable(sprite)
      ) {
        spriteHitY = true
        spriteHitX = true
      }

      if (
        Math.floor(sprite.x) === mapPosX &&
        Math.floor(sprite.y) === newMapPosY &&
        !passable(sprite)
      ) {
        spriteHitY = true
        spriteHitX = false
        break
      }

      if (
        Math.floor(sprite.x) === newMapPosX &&
        Math.floor(sprite.y) === mapPosY &&
        !passable(sprite)
      ) {
        spriteHitX = true
        spriteHitY = false
        break
      }

      if (spriteHitX && spriteHitY) break
    }

    if (
      (wall === 0 ||
        (wall === 4 && Math.round(Doors[newMapPosY][newMapPosX]) === 0)) &&
      !spriteHitX && !spriteHitY
    ) {
      this.pos.x -= Math.cos(this.rot) * this.speed
      this.pos.y -= Math.sin(this.rot) * -1 * this.speed
    } else if (World[newMapPosY][mapPosX] === 0 && !spriteHitY) {
      this.pos.y -= Math.sin(this.rot) * -1 * this.speed
    } else if (World[mapPosY][newMapPosX] === 0 && !spriteHitX) {
      this.pos.x -= Math.cos(this.rot) * this.speed
    }
  }

  turn_right() {
    this.rot -= rotateSpeed
  }

  turn_left() {
    this.rot += rotateSpeed
  }

  open() {
    for (
      let i = Math.floor(player.rays.length / 3);
      i < Math.floor((2 * player.rays.length) / 3);
      i++
    ) {
      const ray = player.rays[i]
      if (
        `${World[ray.distance()[2].y][ray.distance()[2].x]}`[0] === '4' &&
        ray.distance()[0] < 2 &&
        Doors[ray.distance()[2].y][ray.distance()[2].x] === 1
      ) {
        document
          .getElementById('doorOpen')
          .cloneNode(true)
          .play()
        const x = ray.distance()[2].x
        const y = ray.distance()[2].y
        const loop = setInterval(() => {
          this.opening(y, x, loop)
        }, 1000 / fps)
        break
      }
    }
  }

  opening(y, x, loop) {
    if (Doors[y][x] > 0) {
      Doors[y][x] -= doorSpeed
    }

    if (
      Doors[y][x] <= 0 &&
      x !== Math.floor(player.pos.x / scale) &&
      y !== Math.floor(player.pos.y / scale)
    ) {
      clearInterval(loop)
      setTimeout(() => {
        const newLoop = setInterval(() => {
          this.closing(x, y, newLoop)
        }, 1000 / fps)
      }, 1000)
    }
  }

  push() {
    for (const ray of player.rays) {
      if (Push[ray.distance()[2].y]) {
        if (Push[ray.distance()[2].y][ray.distance()[2].x]) {
          if (
            ray.distance()[0] < 2 &&
            Push[ray.distance()[2].y][ray.distance()[2].x][0] <
              Push[ray.distance()[2].y][ray.distance()[2].x][1]
          ) {
            document
              .getElementById('secretPush')
              .cloneNode(true)
              .play()
            const x = ray.distance()[2].x
            const y = ray.distance()[2].y
            const loop = setInterval(() => {
              this.pushing(y, x, loop)
            }, 1000 / fps)
            break
          }
        }
      }
    }
  }

  pushing(y, x, loop) {
    Push[y][x][0] += pushSpeed
    console.log('pushing')
    if (Push[y][x][0] >= Push[y][x][1]) {
      clearInterval(loop)
    }
  }

  closing(x, y, loop) {
    Doors[y][x] += doorSpeed

    if (Doors[y][x] >= 1) {
      clearInterval(loop)
    }
  }

  shoot() {
    if (shootable[0]) {
      const index = enemies.indexOf(shootable[0][0])
      const enemy = enemies[index]

      if (player.gun === 'knife' && shootable[0][1] < 3) {
        enemy.health--
        if (enemy.type === 'guard')
          document
            .getElementById('guardPaint')
            .cloneNode(true)
            .play()
      } else if (player.gun !== 'knife') {
        enemy.health--
        if (enemy.type === 'guard')
          document
            .getElementById('guardPaint')
            .cloneNode(true)
            .play()
      }

      if (enemy.health <= 0) {
        enemy.alive = false
        enemy.id = enemy.type + 'Walk_' + enemy.walkFoot + '_'
        clearInterval(enemy.shootingLoop)
        if (enemy.drop) {
          sprites.push({
            x: enemy.x + 0.5,
            y: enemy.y + 0.5,
            id: enemy.drop,
            drop: true
          })
        }
        enemy.id = enemy.type + 'Death_' + enemy.deathFrame
        const loop = setInterval(() => {
          player.kill(enemy)
        }, 100)
      }
    }
  }

  kill(enemy) {
    if (enemy.deathFrame <= enemy.lastDeathFrame) {
      enemy.id = enemy.type + 'Death_' + enemy.deathFrame
      enemy.deathFrame++
    }

    if (enemy.deathFrame === 2) {
      enemy.deathSound.play()
      player.score += 100
    }
  }

  switch() {
    for (
      let i = Math.floor(player.rays.length / 3);
      i < Math.floor((2 * player.rays.length) / 3);
      i++
    ) {
      const ray = player.rays[i]
      if (
        World[ray.distance()[2].y][ray.distance()[2].x] === 5 &&
        ray.distance()[0] < 2
      ) {
        document
          .getElementById('flipSwitch')
          .cloneNode(true)
          .play()
        World[ray.distance()[2].y][ray.distance()[2].x] = 51
        const loop = setInterval(() => fadeBlack(loop), 1000 / fps)
      }
    }
  }
}
