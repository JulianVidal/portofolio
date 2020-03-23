import { Maze } from "../algorithms/Maze.js";

window.maze = new Maze(1000 / 10, 800 / 10)

window.maze.animateGenerate()

// window.maze.maze = window.maze.generate()

window.maze.draw()