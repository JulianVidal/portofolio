import { Algorithm } from './Algorithm.js'

export class Insertion extends Algorithm {
  constructor () {
    super()
    this.rIndex = this.index

    this.isRegressing = false
    this.isProgressing = true
  }

  /**
   * Sorts the array with insertion sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @returns The sorted array
   */
  sort (arr) {
    // Copies the array to make function more pure
    // The arrays won't be references to eachother
    let array = [...arr]

    // Starts at the begining of the array
    let index = 0

    // The two values that are going to be compared
    let left = array[index]
    let right = array[index + 1]

    while (index < array.length - 1) {
      // If the left value is bigger than the right value
      if (left > right) {
        // Swap left and right
        array = this.swap(array, index, index + 1)

        // Sets index that is going backwards
        let rIndex = index

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

          // Previous bar regardless of swap
          rIndex--
          // Updates to the next values that are going to be comapred
          right = array[rIndex]
          left = array[rIndex - 1]
        }
      }

      // Next bar regardless of swap
      index++
      // Updates to the next values that are going to be comapred
      left = array[index]
      right = array[index + 1]
    }

    return array
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @returns The partially sorted array
   */
  stepSort (arr) {
    let array = [...arr]

    if (this.index < array.length - 1 && !this.isSorted(array) && this.isProgressing) {
      const left = array[this.index]
      const right = array[this.index + 1]
      if (left > right) {
        array = this.swap(array, this.index, this.index + 1)
        this.index++
        this.isProgressing = false
        this.isRegressing = true
        this.rIndex = this.index - 1
        return array
      } else {
        this.index++
        return this.stepSort(array)
      }
    } else if (this.index >= array.length - 1) {
      this.index = 0
    }

    if (this.rIndex > 0 && !this.isSorted(array) && this.isRegressing) {
      const right = array[this.rIndex]
      const left = array[this.rIndex - 1]
      if (right < left) {
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

    return array
  }
}
