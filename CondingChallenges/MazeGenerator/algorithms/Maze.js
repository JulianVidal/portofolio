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
    this.height = height - 1
    this.width = width - 1

    this.maze = []
    this.walls = []
    this.frontiers = []

    for (let y = 0; y < this.height; y++) {
      this.maze[y] = []

      for (let x = 0; x < this.width; x++) {
        this.maze[y][x] = 1
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
            this.canvas.color = "#f00"
            break
          case 2:
            this.canvas.color = "#00f"
            break
          default:
            this.canvas.color = "#000"
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

  generate(array) {
    let maze
    if (!array) {
      maze = []
      for (let y = 0; y < this.height; y++) {
        maze[y] = []

        for (let x = 0; x < this.width; x++) {
          maze[y][x] = 1
        }

      }
    } else {
      maze = JSON.parse(JSON.stringify(array))
    }

    // Start at the top left
    const startCell = {
      x: 0,
      y: 0
    }

    // Updates the cell in maze
    maze[startCell.y][startCell.x] = 0

    // Array containing the frontiers
    const frontiers = []

    // Frontiers of the cell
    for (const direction of this.directions) {
      const y = startCell.y + direction.y * 2
      const x = startCell.x + direction.x * 2
      if ((maze[y] || [])[x] === 1) {
        maze[y][x] = 2
        frontiers.push({x, y})
      }
    }

    while (frontiers.length > 0) {
      // Pick a random frontier
      const frontier = frontiers.splice(Math.floor(Math.random() * frontiers.length), 1)[0]
      maze[frontier.y][frontier.x] = 0

      const neighbors = []
      for (const direction of this.directions) {
        const y = frontier.y + direction.y * 2
        const x = frontier.x + direction.x * 2

        if ((maze[y] || [])[x] === 0) {
          neighbors.push({x,y})
        }
      }

      // console.log(JSON.stringify(neighbors))
      const neighbor =  neighbors.splice(Math.floor(Math.random() * neighbors.length), 1)[0]
      // console.log(JSON.stringify(neighbor), JSON.stringify(frontier))

      maze[frontier.y + (neighbor.y - frontier.y) / 2][frontier.x + (neighbor.x - frontier.x) / 2] = 0

      for (const direction of this.directions) {
        const y = frontier.y + direction.y * 2
        const x = frontier.x + direction.x * 2
        if ((maze[y] || [])[x] === 1) {
          maze[y][x] = 2
          frontiers.push({x, y})
        }
      }
    }

    return maze
  }

  async animateGenerate() {
    // Start at the top left
    const startCell = {
      x: 0,
      y: 0
    }

    // Updates the cell in maze
    this.maze[startCell.y][startCell.x] = 0

    // Array containing the frontiers
    this.frontiers = []

    // Frontiers of the cell
    for (const direction of this.directions) {
      const y = startCell.y + direction.y * 2
      const x = startCell.x + direction.x * 2
      if ((this.maze[y] || [])[x] === 1) {
        this.maze[y][x] = 2
        this.frontiers.push({x, y})
      }
    }

    while ( this.frontiers.length > 0) {
      // Pick a random frontier
      const frontier = this.frontiers.splice(Math.floor(Math.random() * this.frontiers.length), 1)[0]
      this.maze[frontier.y][frontier.x] = 0

      const neighbors = []
      for (const direction of this.directions) {
        const y = frontier.y + direction.y * 2
        const x = frontier.x + direction.x * 2

        if ((this.maze[y] || [])[x] === 0) {
          neighbors.push({x,y})
        }
      }

      // console.log(JSON.stringify(neighbors))
      const neighbor =  neighbors.splice(Math.floor(Math.random() * neighbors.length), 1)[0]
      // console.log(JSON.stringify(neighbor), JSON.stringify(frontier))

      this.maze[frontier.y + (neighbor.y - frontier.y) / 2][frontier.x + (neighbor.x - frontier.x) / 2] = 0

      for (const direction of this.directions) {
        const y = frontier.y + direction.y * 2
        const x = frontier.x + direction.x * 2
        if ((this.maze[y] || [])[x] === 1) {
          this.maze[y][x] = 2
          this.frontiers.push({x, y})
        }
      }


      this.draw()
      await this.sleep(0)
    }
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
