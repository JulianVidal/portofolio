import { Canvas} from "../lib/Canvas.js";

const UP = {
  x: 0,
  y: -1
}
const RIGHT = {
  x: 1,
  y: 0
}

const DOWN = {
  x: 0,
  y: 1
}

const LEFT = {
  x: -1,
  y: 0
}

export class Maze {
  constructor(width, height) {
    this.scale = 10
    this.height = height
    this.width = width

    this.maze = []
    this.walls = []
    this.frontiers = []

    for (let y = 0; y < height; y++) {
      this.maze[y] = []

      for (let x = 0; x < width; x++) {
        this.maze[y][x] = 0
      }

    }

    this.canvas = new Canvas(width * this.scale, height * this.scale)

    this.draw()

    this.directions = [UP, RIGHT, DOWN, LEFT]
  }

  draw() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        switch (this.maze[y][x]) {
          case 1:
            this.canvas.color = "#0f0"
            break
          case 2:
            this.canvas.color = "#00f"
            break
          default:
            this.canvas.color = "#f00"
            break
        }

        this.canvas.rectangle(
          x * this.scale,
          y * this.scale,
          this.scale,
          this.scale
        )
      }
    }

    for (const wall of this.walls) {
      const p1 = wall.p1
      const p2 = wall.p2
      this.canvas.weight = 2
      this.canvas.line(p1.x * this.scale, p1.y * this.scale, p2.x * this.scale, p2.y * this.scale)
    }
  }

  async generate() {
    // Start at the top left
    const startCell = {
      x: 0,
      y: 0
    }

    // Updates the cell in maze
    this.maze[startCell.y][startCell.x] = 1

    // Array containing the frontiers
    this.frontiers = []

    // Frontiers of the cell
    for (const direction of this.directions) {
      const y = startCell.y + direction.y
      const x = startCell.x + direction.x
      if ((this.maze[y] || [])[x] === 0) {
        this.maze[y][x] = 2
        this.frontiers.push({x, y})
      }
    }


    while ( this.frontiers.length > 0) {
      // Pick a random frontier
      const cell = this.frontiers.splice(Math.floor(Math.random() * this.frontiers.length), 1)[0]
      this.maze[cell.y][cell.x] = 1

      const inMazeFrontiers = []
      for (const direction of this.directions) {
        const y = cell.y + direction.y
        const x = cell.x + direction.x

        if ((this.maze[y] || [])[x] === 0) {
          this.frontiers.push({x,y})
          this.maze[y][x] = 2

        } else if ((this.maze[y] || [])[x] === 1) {
          inMazeFrontiers.push({x, y})
        }
      }

      if (inMazeFrontiers.length > 1) {
        const inMazeFrontier = inMazeFrontiers[Math.floor(Math.random() * inMazeFrontiers.length)]
        const p1 = JSON.parse(JSON.stringify(inMazeFrontier))
        const p2 = JSON.parse(JSON.stringify(inMazeFrontier))

        if (p1.x - cell.x < 0) {
          p1.x++

          p2.x++
          p2.y++
        } else if (p1.x - cell.x > 0) {
          p2.y++
        } else if (p1.y - cell.y < 0) {
          p1.y++

          p2.y++
          p2.x++
        } else if (p1.y - cell.y > 0) {
          p2.x++
        }

        this.walls.push({p1, p2})
      }

      this.draw()
      await this.sleep(0)
    }




    this.draw()
  }

  /**
   *
   * @param {Number} ms The amount of time the function should stop, ms
   * @returns Resolved Promise
   */
  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
