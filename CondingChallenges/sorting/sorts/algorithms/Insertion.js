import { Algorithm } from './Algorithm.js'

export class Insertion extends Algorithm {
  constructor () {
    super()
    this.rIndex = this.index

    this.isRegressing = false
    this.isProgressing = true

    this.isRSwapping = false
  }

  /**
   * Sorts the array with insertion sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @returns Number[] sorted array
   */
  sort (arr) {
    // Copies the array to make function more pure
    let array = [...arr]    // The arrays won't be references to each other

    let index = 0  // Starts at the beginning of the array

    // The two values that are going to be compared
    let left = array[index]
    let right = array[index + 1]

    while (index < array.length - 1) {
      // If the left value is bigger than the right value
      if (left > right) {

        array = this.swap(array, index, index + 1) // Swap left and right


        let rIndex = index // Sets index that is going backwards

        // If the bar you swapped with is smaller than the one before
        right = array[rIndex]
        left = array[rIndex - 1]

        // While the rIndex is bigger than 0
        while (rIndex > 0) {
          // Check if the right bar is smaller
          if (right < left) {
            // If yes then swap them both
            array = this.swap(array, rIndex, rIndex - 1)
          }


          rIndex-- // Previous bar regardless of swap
          // Updates to the next values that are going to be compared
          right = array[rIndex]
          left = array[rIndex - 1]
        }
      }


      index++ // Next bar regardless of swap

      // Updates to the next values that are going to be compared
      left = array[index]
      right = array[index + 1]
    }

    return array
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @returns Number[] partially sorted array
   */
  stepSort (arr) {
    let array = [...arr]
    if (this.isSorted(array)) return array
    if (!this.isSwapping) {
      if (this.index < array.length - 1 && this.isProgressing) {
        const left = array[this.index]
        const right = array[this.index + 1]
        if (left > right) {
          // this.stepSwap(array, this.index, this.jIndex)
          // remove this.index++
          array = this.swap(array, this.index, this.index + 1)
          this.rIndex = this.index
          this.index++
          this.isProgressing = false
          this.isRegressing = true
          return array
        } else {
          this.index++
          return this.stepSort(array)
        }
      } else if (this.index >= array.length - 1) {
        this.index = 0
      }

      if (this.rIndex > 0 && this.isRegressing) {
        const right = array[this.rIndex]
        const left = array[this.rIndex - 1]
        if (right < left) {
          // this.stepSwap(array, this.rIndex, this.rIndex - 1)
          this.isRSwapping = true
          // remove this.rIndex--
          array = this.swap(array, this.rIndex, this.rIndex - 1)
          this.rIndex--
          return array
        } else {
          this.isProgressing = true
          this.isRegressing = false
          return this.stepSort(array)
        }
      } else if (this.rIndex <= 0) {
        this.isProgressing = true
        this.isRegressing = false
        return this.stepSort(array)
      }
    } else {

      if (this.isRSwapping) {
        array = this.stepSwap(array, this.rIndex, this.rIndex - 1)
      } else {
        this.jIndex = this.index + 1
        array = this.stepSwap(array, this.index, this.jIndex)
      }
    }

    return array
  }
}
