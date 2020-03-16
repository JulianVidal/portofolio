import { Algorithm } from './Algorithm.js'

export class Quick extends Algorithm {
  /**
   * Sorts the array with quick sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @param {Number} i the left element index, used to optimise recursion
   * @param {Number} j the right element index, used to optimise recursion
   * @returns Number[] sorted array
   */
  sort (arr, i, j) {
    let array = [].concat(arr) // Copies the array

    // checks if the array is already sorted
    if (this.isSorted(array)) return array

    let pivotIndex = 0 // Index of the pivot

    const pivot = array[pivotIndex] // The value of the pivot

    let index = i || pivotIndex + 1 // The index of the left most element
    let jIndex = j || array.length - 1 // The index of the right most element

    let left = array[1] // The value of the left element
    let right = array[jIndex] // The value of the right element

    // Gets a left item that is lower than pivot
    while (left <= pivot && index <= array.length - 1) {
      index++
      left = array[index]
    }

    // Gets a right item that is bigger than the pivot
    while (right >= pivot && jIndex > 1) {
      jIndex--
      right = array[jIndex]
    }

    // If index > Jindex then the partitioning is done
    if (index > jIndex) {
      // Swaps jIndex with pivot
      array = this.swap(array, pivotIndex, jIndex)
      pivotIndex = jIndex

      // The left and right side of the pivot that will be sorted
      const leftArray = this.sort(array.slice(0, pivotIndex)) // Left side
      const rightArray = this.sort(array.slice(pivotIndex + 1)) // Right side

      // returns sorted array
      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    } else if (index === jIndex) {
      // If both indexes are the same due to the
      // Pivot being the biggest or smallest value

      // Switch it to the last index of the array if it is the biggest
      if (pivot > left) {
        array = this.swap(array, pivotIndex, array.length - 1)
        pivotIndex = array.length - 1
      }

      // The left and right side of the pivot that will be sorted
      const leftArray = this.sort(array.slice(0, pivotIndex)) // Left side
      const rightArray = this.sort(array.slice(pivotIndex + 1)) // Right side

      // returns sorted array
      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    }

    // Swaps both indexes
    if (left > pivot && right < pivot) {
      array = this.swap(array, index, jIndex)
    }

    // Keeps calling partitioning
    return this.sort(array, index, jIndex)
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @param {Number} relI Where the current array is in terms of this.array, for drawing
   * @param {Number} i The left item is, used to optimise recursion
   * @param {Number} j The right element index, used to optimise recursion
   * @returns {Number[]} The sorted array
   */
  async animateSort (arr, relI = 0, i, j) {
    let array = [].concat(arr) // Copies the array

    // checks if the array is already sorted

    if (this.isSorted(array)) {
      this.done = true
      return array
    }

    let pivotIndex = 0 // Index of the pivot

    const pivot = array[pivotIndex] // The value of the pivot

    let index = i || pivotIndex + 1 // The index of the left most element
    let jIndex = j || array.length - 1 // The index of the right most element

    // The two bars that will be tracked
    this.index = index + relI
    this.jIndex = jIndex + relI

    let left = array[1] // The value of the left element
    let right = array[jIndex] // The value of the right element

    // Gets a left item that is lower than pivot
    while (left <= pivot && index <= array.length - 1) {
      index++
      left = array[index]
    }

    // Gets a right item that is bigger than the pivot
    while (right >= pivot && jIndex > 1) {
      jIndex--
      right = array[jIndex]
    }

    // If index > Jindex then the partitioning is done
    if (index > jIndex) {
      // Swaps jIndex with pivot
      array = this.swap(array, pivotIndex, jIndex)

      // Switches this.array that will be drawn
      this.array = this.swap(this.array, pivotIndex + relI, jIndex + relI)
      await this.sleep(this.speed)
      pivotIndex = jIndex

      // The left and right side of the pivot that will be sorted
      const leftArray = await this.animateSort(array.slice(0, pivotIndex), relI) // Left side
      const rightArray = await this.animateSort(array.slice(pivotIndex + 1), pivotIndex + 1 + relI) // Right side

      // returns sorted array
      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    } else if (index === jIndex) {
      // If both indexes are the same due to the
      // Pivot being the biggest or smallest value

      // Switch it to the last index of the array if it is the biggest
      if (pivot > left) {
        array = this.swap(array, pivotIndex, array.length - 1)

        // Switches this.array that will be drawn
        this.array = this.swap(this.array, pivotIndex + relI, array.length - 1 + relI)
        await this.sleep(this.speed)

        pivotIndex = array.length - 1
      }

      // The left and right side of the pivot that will be sorted
      const leftArray = await this.animateSort(array.slice(0, pivotIndex), relI) // Left side
      const rightArray = await this.animateSort(array.slice(pivotIndex + 1), pivotIndex + 1 + relI) // Right side

      // returns sorted array
      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    }

    // Swaps both indexes
    if (left > pivot && right < pivot) {
      array = this.swap(array, index, jIndex)

      // Switches this.array that will be drawn
      this.array = this.swap(this.array, index + relI, jIndex + relI)
      await this.sleep(this.speed)
    }

    // Keeps calling partitioning
    return this.animateSort(array, relI, index, jIndex)
  }
}
