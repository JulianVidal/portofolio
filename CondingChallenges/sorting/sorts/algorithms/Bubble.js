import { Algorithm } from './Algorithm.js'

export class Bubble extends Algorithm {

  /**
   * Sorts the array with bubble sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @returns Number[] sorted array
   */
  sort (arr) {
    // Copies the array to make function more pure

    let array = [...arr] // The arrays won't be references to each other


    let index = 0 // Starts at the beginning of the array

    // The two values that are going to be compared
    let left = array[index]
    let right = array[index + 1]

    // While index hasn't gone outside the array length + one
    // because of right needs the next index
    while (index < array.length - 1) {
      // If the left value is bigger than the right value
      if (left > right) {
        array = this.swap(array, index, index + 1)  // Swap left and right
      }

      index++ // Next bar regardless of swap

      // Updates to the next values that are going to be compared
      left = array[index]
      right = array[index + 1]
    }

    // Checks if the array is sorted
    if (!this.isSorted(array)) {
      // If no, keep sorting
      return this.sort(array)
    } else {
      // If yes, return the array
      return array
    }
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
      if (this.index < array.length - 1) {
        const left = array[this.index]
        const right = array[this.index + 1]

        if (left > right) {
          array = this.swap(array, this.index, this.index + 1)
          this.index++
          // this.stepSwap(array, this.index, this.jIndex)
        } else {
          this.index++
          return this.stepSort(array)
        }
      } else if (this.index >= array.length - 1) {
        this.index = 0
      }

    } else {
      this.jIndex = this.index + 1
      array = this.stepSwap(array, this.index, this.jIndex)
    }

    return array
  }
}
