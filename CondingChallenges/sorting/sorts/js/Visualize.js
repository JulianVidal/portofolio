import * as Algorithms from '../algorithms/Algorithms.js'
import { Canvas } from '../../lib/Canvas.js'
import { Bar } from './Bar.js'

export class Visualize {
  /**
   * Creates a space for drawing onto the canvas
   * @param algorithm The algorithm name that will be used
   * @param array The array to be visualised
   */
  constructor (algorithm, array) {
    this.bgColor = '#f7f9fb'
    this.barColor = '#2F6CD0EE'

    this.canvas = new Canvas(window.innerWidth - 333, 370)
    this.canvas.background(this.bgColor)
    this.canvas.canvasElement.style.opacity = '1'

    this.barWidth = parseInt(document.getElementById('size').value)
    this.barHeight = 370 / ((this.canvas.width) / this.barWidth)

    this.speed = parseInt(document.getElementById('speed').value)

    this.algorithm = new Algorithms[algorithm]()
    this.algorithm.array = array

    if (array === undefined) {
      this.algorithm.array = []
      for (let i = 1; i < Math.floor(this.canvas.width / this.barWidth) + 1; i++) {
        this.algorithm.array.push(i)
      }
    }

    this.isSorting = false
    this.isShuffling = false
    this.isStopped = false
  }

  /**
   * Loops a method in this class at the fps given
   * @param  {String} method The string should be the name of the method
   * @param  {Number} fps The frames per second that it should be looping at
   */
  animate (method, fps) {
    if (!this.isShuffling && !this.isSorting) {
      this.loop = setInterval(
        (function (self) {
          return function () {
            self[method]()
          }
        })(this),
        1000 / fps
      )
    }
  }

  /**
   * Shuffles the array given at the constructor and draws it
   */
  shuffling () {
    if (!this.isShuffling) this.algorithm.animateShuffle(this.algorithm.array)

    this.isShuffling = true

    this.state()

    if (this.algorithm.index >= this.algorithm.array.length) {
      console.log(this.algorithm.array)
      this.algorithm.index = 0
      clearInterval(this.loop)
      this.isShuffling = false
    }
  }

  /**
   * Sorts the array given at the constructor and draws it
   */
  sorting () {
    if (!this.isSorting) this.algorithm.animateSort(this.algorithm.array)

    this.isSorting = true

    this.state()

    if (this.algorithm.isSorted(this.algorithm.array)) {
      console.log(this.algorithm.array)
      clearInterval(this.loop)
      this.algorithm.index = 0
      this.isSorting = false
    }
  }

  /**
   * Draws all the bars based on the array
   */
  state () {
    let color
    const rainbow = document.getElementById('rainbow').checked
    const track = document.getElementById('tracked').checked

    this.canvas.background(this.bgColor)

    this.algorithm.array.forEach((element, index) => {
      const hue = (360 / this.algorithm.array.length) * element
      if (rainbow) {
        color = `hsl( ${hue}, 100%, 50% )`
      } else {
        color = this.barColor
      }

      if (this.algorithm.index === index && track) {
        color = '#f00'
      }

      if (this.algorithm.rIndex === index && track) {
        color = '#f00'
      }

      // if ((this.algorithm.rIndex === index || this.algorithm.index === index || this.algorithm.jIndex === index) && track){
      //   color = '#f00'
      // }

      if (this.algorithm.pivotIndex === index && track){
        color = '#0f0'
      }

      let x = index * this.barWidth
      let y = rainbow ? 0 : this.canvas.height - (this.barHeight * element)
      let width =  rainbow ? this.barWidth : this.barWidth / 1.1
      let height = rainbow ? this.canvas.height : this.barHeight * element
      Bar.draw(x, y, width, height, color, this.canvas)
    })
  }

  /**
   * Stops all animations and makes an ordered array
   */
  reset () {
    if (this.isShuffling || this.isSorting) {
      this.algorithm.isStopped = !this.stopped
      clearInterval(this.loop)
    }

    this.isShuffling = false
    this.isSorting = false
    this.stopped = false

    this.barWidth = parseInt(document.getElementById('size').value)
    this.barHeight = (this.canvas.height - 10) / ((this.canvas.width / this.barWidth))

    this.algorithm.array = []

    for (let index = 1; index < (this.canvas.width / this.barWidth) + 1; index++) {
      this.algorithm.array.push(index)
    }

    this.state()
  }

  /**
   * Stops all animations
   */
  stop () {
    if ((!this.isSorting && !this.isShuffling) || this.stopped) return
    clearInterval(this.loop)
    this.algorithm.isStopped = true
    this.stopped = true
  }

  /**
   * Resumes animation based on what function was stopped
   */
  resume () {
    if (!this.stopped) return
    else this.stopped = false

    if (this.isSorting) {
      this.isSorting = false
      this.animate('sorting', this.speed)
    }

    if (this.isShuffling) {
      this.isShuffling = false
      this.animate('shuffling', 60)
    }
  }

  /**
   * Changes the algorithm variable
   * @param {Algorithms} algorithm The algorithm that will be used in the animations
   */
  changeAlgorithm (algorithm) {
    this.algorithm = new Algorithms[algorithm]()
    this.reset()
    this.algorithm.isStopped = false
  }
}
