import { Algorithm } from './Algorithm.js'

export class Bubble extends Algorithm {

  /**
   * Sorts the array with bubble sort
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

    // While index hasn't gone outside the array lenght + one
    // because of right needs the next index
    while (index < array.length - 1) {
      // If the left value is bigger than the right value
      if (left > right) {
        // Swap left and right
        array = this.swap(array, index, index + 1)
      }

      // Next bar regardless of swap
      index++
      // Updates to the next values that are going to be comapred
      left = array[index]
      right = array[index + 1]
    }

    // Checks if the array is sorted
    if (!this.isSorted(array)) {
      // If no, keep sorting
      return this.sort(array)
    } else {
      // If yes, return the arrat
      return array
    }
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @returns The partially sorted array
   */
  stepSort (arr) {
    let array = [...arr]
    if (this.index < array.length - 1 && !this.isSorted(array) && !this.isSwapping) {
      const left = array[this.index]
      const right = array[this.index + 1]

      if (left > right) {
        this.stepSwap(array, this.index, this.index + 1)
      } else {
        this.index++
        return this.stepSort(array)
      }
    } else if (this.index >= array.length - 1) {
      this.index = 0
    }

    if (this.isSwapping) {
      array = this.stepSwap(array, this.index, this.index + 1)
    }

    return array
  }
}
