import { Algorithm } from './Algorithm.js'

export class Bubble extends Algorithm {
  /**
   * Sorts the array with bubble sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @param {Number} passes The amount of times the function has been called, for recursion
   * @returns Number[] sorted array
   */
  sort (arr, passes = 0) {
    // Copies the array to make function more pure

    let array = [].concat(arr) // The arrays won't be references to each other

    // Checks if the array is sorted
    if (this.isSorted(array)) return array

    let index = 0 // Starts at the beginning of the array

    // The two values that are going to be compared
    let left = array[index]
    let right = array[index + 1]

    // While index hasn't gone outside the array length + one
    // because of right needs the next index
    while (index < array.length - 1 - (passes || 0)) {
      // If the left value is bigger than the right value
      if (left > right) {
        array = this.swap(array, index, index + 1) // Swap left and right
      }

      index++ // Next bar regardless of swap

      // Updates to the next values that are going to be compared
      left = array[index]
      right = array[index + 1]
    }

    // Keep sorting
    return this.sort(array, passes)
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @param {Number} passes The amount of times the function has been called, for recursion
   * @returns Number[] partially sorted array
   */
  async animateSort (arr, passes = 0) {
    let array = [].concat(arr) // The arrays won't be references to each other

    // Checks if the array is sorted
    if (this.isSorted(array)) {
      this.done = true
      return array
    }

    let index = 0 // Starts at the beginning of the array

    // The two values that are going to be compared
    let left = array[index]
    let right = array[index + 1]

    // While index hasn't gone outside the array length + one
    // because of right needs the next index
    while (index < array.length - 1 - (passes || 0)) {
      // If the left value is bigger than the right value
      if (left > right) {
        array = this.swap(array, index, index + 1)

        // Switches this.array that will be drawn
        this.array = [...array]
        await this.sleep(this.speed)
      }

      index++ // Next bar regardless of swap
      this.index = index + 1 // The bar that will be tracked

      // Updates to the next values that are going to be compared
      left = array[index]
      right = array[index + 1]
    }

    // Keep sorting
    this.animateSort(array, passes)
  }
}
