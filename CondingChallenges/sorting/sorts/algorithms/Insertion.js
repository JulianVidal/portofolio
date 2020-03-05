import { Algorithm } from './Algorithm.js'

export class Insertion extends Algorithm {
  constructor () {
    super()
    this.rIndex = this.index
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
}
