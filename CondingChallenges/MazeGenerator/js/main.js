import { Maze } from "../algorithms/Maze.js";

window.maze = new Maze(30, 30)

// window.maze.animateGenerate()

window.maze.maze = window.maze.generate()

window.maze.draw()