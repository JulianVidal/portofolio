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
    this.barWidth = 12
    this.barHeight = 7

    this.array = array
    this.canvas = new Canvas(window.innerWidth - 333, 370)

    this.barHeight = 370 / ((window.innerWidth - 333) / this.barWidth)

    this.canvas.background()
    this.canvas.canvasElement.style.opacity = '1'
    this.algorithm = new Algorithms[algorithm]()

    if (array === undefined) {
      this.array = []

      for (let index = 1; index < (this.canvas.width / this.barWidth) + 1; index++) {
        this.array.push(index)
      }
    }

    this.loop = 0
    this.loopMax = 1

    this.speed = parseInt(document.getElementById('speed').value)

    this.isSorting = false
    this.isShuffling = false
    this.isStopped = false

    this.bgColor = '#f7f9fb'
    this.barColor = '#2F6CD0'
  }

  /**
   * Loops a method in this class at the fps given
   * @param  {String} method The string should be the name of the method
   * @param  {Number} fps The frames per second that it should be looping at
   */
  animate (method, fps) {
    if (this.loop < this.loopMax && !this.isShuffling && !this.isSorting) {
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
    this.isShuffling = true

    this.state()

    if (this.algorithm.index < this.array.length - 1) {
      this.array = this.algorithm.stepShuffle(this.array)
    } else {
      console.log(this.array)
      this.algorithm.index = 0
      this.loopMax += this.loop + 1
      clearInterval(this.loop)
      this.isShuffling = false
    }
  }

  /**
   * Sorts the array given at the constructor and draws it
   */
  sorting () {
    this.isSorting = true
    this.array = this.algorithm.stepSort(this.array)

    this.state()

    if (this.algorithm.isSorted(this.array)) {
      console.log(this.array)
      clearInterval(this.loop)
      this.loopMax += this.loop + 1
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

    // this.canvas.color = '#fbf9fa'
    this.canvas.background(this.bgColor)

    this.array.forEach((element, index) => {
      const hue = (360 / this.array.length) * element
      if (rainbow) {
        color = `hsl( ${hue}, 100%, 50% )`
      } else {
        color = this.barColor
        // color = '#fd0054'
      }

      if (this.algorithm.index === index && track) {
        color = '#f00'
      }

      let swapOff = 0

      if (this.algorithm.index === index) {
        swapOff = this.algorithm.swapOff
      } else if (this.algorithm.index + 1 === index) {
        swapOff = -this.algorithm.swapOff
      }

      if (this.algorithm.isRegressing) {
        if (this.algorithm.rIndex - 1 === index) {
          swapOff = this.algorithm.swapOff
        } else if (this.algorithm.rIndex === index) {
          swapOff = -this.algorithm.swapOff
        }
      }

      Bar.draw(
        (index * this.barWidth) + swapOff,
        this.canvas.height - (this.barHeight * element),
        this.barWidth / 1.1,
        this.barHeight * element,
        color,
        this.canvas
      )
    })
  }

  /**
   * Changes the size of the canvas
   */
  resize () {
    this.canvas.setSize(window.innerWidth, window.innerHeight)
  }

  /**
   * Stops all animations and makes an ordered array
   */
  reset () {
    if (this.isShuffling || this.isSorting) {
      clearInterval(this.loop)
      this.loopMax += this.loop + 1
      this.isShuffling = false
      this.isSorting = false
    }

    this.algorithm.index = 0
    this.algorithm.swapOff = 0
    this.algorithm.isSwapping = false

    this.array = []

    for (let index = 1; index < (this.canvas.width / this.barWidth) + 1; index++) {
      this.array.push(index)
    }

    this.barHeight = (this.canvas.height - 10) / ((this.canvas.width / this.barWidth))
  }

  /**
   * Changes how quickly, stepsorted is called, increases speed on animation
   * @param {Number} speed The speed of the animation in fps
   */
  changeSpeed (speed) {
    if (this.isSorting) {
      this.speed = speed
      clearInterval(this.loop)
      this.loopMax += this.loop + 1
      this.isSorting = false
      this.animate('sorting', this.speed)
    }
  }

  /**
   * Changes the width of the bars, will be made to fit the canvas
   * @param {Number} size The widht of the bar in px
   */
  changeSize (size) {
    this.barWidth = size
    this.algorithm.barWidth = size
    this.reset()
    this.state()
  }

  /**
   * Stops all animations
   */
  stop () {
    clearInterval(this.loop)
    this.loopMax += this.loop + 1
    this.isStopped = true
  }

  /**
   * Resumes animation based on what function was stopped
   */
  resume () {
    if (!this.isStopped) return
    if (this.isSorting) {
      this.isSorting = false
      this.animate('sorting', this.speed)
      this.isStopped = false
    }
    if (this.isShuffling) {
      this.isShuffling = false
      this.animate('shuffling', 60)
      this.isStopped = false
    }
  }

  /**
   * Changes the algorithm variable
   * @param {Algorithms} algorithm The algorithm that will be used in the animations
   */
  changeAlgorithm (algorithm) {
    this.algorithm = new Algorithms[algorithm]()
    this.reset()
    this.state()
  }
}
