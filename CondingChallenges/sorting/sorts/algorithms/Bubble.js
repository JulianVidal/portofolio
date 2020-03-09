import { Algorithm } from './Algorithm.js'

export class Bubble extends Algorithm {

  /**
   * Sorts the array with bubble sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @returns Number[] sorted array
   */
  sort (arr, passes) {
    // Copies the array to make function more pure

    let array = [...arr] // The arrays won't be references to each other

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
        array = this.swap(array, index, index + 1)  // Swap left and right
      }

      index++ // Next bar regardless of swap

      // Updates to the next values that are going to be compared
      left = array[index]
      right = array[index + 1]
    }

      // Keep sorting
      return this.sort(array, passes ? passes + 1 : 1)
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @returns Number[] partially sorted array
   */
  async animateSort (arr, passes) {
    let array = [...arr]

    if (this.isSorted(array)) return

    let index = 0

    let left = array[index]
    let right = array[index + 1]

    while (index < array.length - 1 - (passes || 0)) {
      if (this.isStopped){
        this.isStopped = false
        return
      }
      if (left > right) {
        array = this.animateSwap(array, index, index + 1)
        await this.sleep(10)
      }

      index++
      this.index = index + 1

      left = array[index]
      right = array[index + 1]
    }

    if (this.isStopped){
      this.isStopped = false
      return
    }

    this.animateSort(array, passes ? passes + 1 : 1)
  }
}
