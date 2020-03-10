import { Algorithm } from './Algorithm.js'

export class Insertion extends Algorithm {
  constructor() {
    super()
    this.rIndex = this.index
  }

  /**
   * Sorts the array with insertion sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @returns Number[] sorted array
   */
  sort(arr) {
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
  async animateSort(arr) {
    let array = [...arr]

    if (this.isSorted(array)) return

    let index = 0
    this.index = index

    let left = array[index]
    let right = array[index + 1]

    while (index < array.length - 1) {
      if (this.isStopped){
        this.isStopped = false
        return
      }

      if (left > right) {
        array = this.swap(array, index, index + 1)
        this.array = [...array]
        await this.sleep(100)

        let rIndex = index
        this.rIndex = rIndex

        right = array[rIndex]
        left = array[rIndex - 1]

        while (rIndex > 0) {
          if (this.isStopped){
            this.isStopped = false
            return
          }

          if (right < left) {
            array = this.swap(array, rIndex, rIndex - 1)
            this.array = [...array]
            await this.sleep(100)
          }

          rIndex--
          this.rIndex = rIndex - 1

          right = array[rIndex]
          left = array[rIndex - 1]
        }
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
  }
}
