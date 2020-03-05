class Map {
  constructor(element) {
    this.screen = new Screen(element)
  }

  draw() {
    this.drawWorld()
  }

  drawWorld() {
    for (let y = 0; y < World.length; y++) {
      for (let x = 0; x < World[y].length; x++) {
        let color

        switch (World[y][x]) {
          case 0:
            color = '#000'
            break
          case 1:
            color = '#888'
            break
          case 2:
            color = '#AA8855'
            break
          case 3:
            color = '#5555AA'
            break
          case 4:
            color = '#FF0000'
            break
          case 41:
            color = '#FF0000'
            break
          default:
            color = '#888'
            break
        }

        this.screen.square(x * scale, y * scale, scale, color)

        this.screen.line(
          (x + 1) * scale,
          (y + 1) * scale,
          (x + 1) * scale,
          y + 1,
          2,
          '#000'
        )
        this.screen.line(
          (x + 1) * scale,
          (y + 1) * scale,
          x + 1,
          (y + 1) * scale,
          2,
          '#000'
        )
      }
    }
  }
}
