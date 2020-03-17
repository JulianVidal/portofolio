import { Algorithm } from './Algorithm.js'

export class Merge extends Algorithm {
  /**
   * Sorts the array with merge sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @returns Number[] sorted array
   */
  sort (arr) {
    const array = [].concat(arr)

    if (array.length !== 1) {
      // Separates the array into two halves and sorts them separately
      const left = this.sort(array.slice(0, Math.round(array.length / 2)))
      const right = this.sort(array.slice(Math.round(array.length / 2)))

      // Combines the left and right arrays
      return this.combine(left, right)
    } else {
      // If the array only has one element then return the array
      return array
    }
  }

  combine (arr1, arr2) {
    // Initialises all arrays to remove references
    const array1 = [].concat(arr1)
    const array2 = [].concat(arr2)
    let array3 = []

    // Starts that the beginning of both arrays
    let i = 0
    let j = 0

    // The values at the beginning of the array
    let value1 = array1[i]
    let value2 = array2[j]

    // While i and j are within their array length
    while (i < array1.length && j < array2.length) {
      if (value1 < value2) {
        array3.push(value1) // Pushes the smaller value
        i++ // Next element
        value1 = array1[i] // Updates value
      } else {
        array3.push(value2) // Pushes the smaller value
        j++ // Next element
        value2 = array2[j] // Updates value
      }
    }

    // Add the last part of the remaining array
    if (i < array1.length) {
      array3 = array3.concat((array1.slice(i)))
    } else if (j < array2.length) {
      array3 = array3.concat((array2.slice(j)))
    }

    return array3
  }

  async animateCombine (arr1, arr2, relI, relJ) {
    const array1 = [].concat(arr1)
    const array2 = [].concat(arr2)
    let array3 = []

    // Starts that the beginning of both arrays
    let i = 0
    let j = 0

    // The values at the beginning of the array
    let value1 = array1[i]
    let value2 = array2[j]

    // While i and j are within their array length
    while (i < array1.length && j < array2.length) {
      if (value1 < value2) {
        array3.push(value1) // Pushes the smaller value
        i++ // Next element
        value1 = array1[i] // Updates value
      } else {
        array3.push(value2) // Pushes the smaller value
        j++ // Next element
        value2 = array2[j] // Updates value
      }

      // Updates this.array
      this.array.forEach((element, elIndex) => {
        if (elIndex >= relI && elIndex <= (relJ || (arr1.length + arr2.length)) && (elIndex - relI) < array3.length) {
          this.index = elIndex
          this.array[elIndex] = array3[elIndex - relI]
        }
      })

      await this.sleep(this.speed)
    }
    await this.sleep(this.speed)

    // Add the last part of the remaining array
    if (i < array1.length) {
      array3 = array3.concat((array1.slice(i)))
    } else if (j < array2.length) {
      array3 = array3.concat((array2.slice(j)))
    }

    // Updates this.array
    this.array.forEach((element, elIndex) => {
      if (elIndex >= relI && elIndex <= (relJ || (arr1.length + arr2.length)) && (elIndex - relI) < array3.length) {
        this.index = elIndex
        this.array[elIndex] = array3[elIndex - relI]
      }
    })

    this.done = false

    // Updates this.array once array is sorted
    if (!relJ) {
      this.array = [].concat(array3)
      this.sleep(100)
      this.done = true
    }

    return array3
  }

  /**
   * Sorts the array with merge sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @param {Number} i Keeps track of the start index, for recursion
   * @param {Number} j Keeps track of the end index, for recursion
   * @returns Number[] sorted array
   */
  async animateSort (arr, i = 0, j) {
    const array = [].concat(arr)

    // Checks if the array is sorted
    if (this.isSorted(array)) {
      this.done = true
      return array
    }

    let left, right

    if (array.length !== 1) {
      const halfIndex = array.length / 2 // The index in the middle of teh array

      // Separates the array into two halves and sorts them separately
      left = await this.animateSort(array.slice(0, Math.round(halfIndex)), i, Math.round(halfIndex) - 1 + i)
      right = await this.animateSort(array.slice(Math.round(halfIndex)), Math.round(halfIndex) + i, j || array.length - 1)
    } else {
      // If the array only has one element then return the array
      return array
    }

    // Combines the left and right arrays
    return this.animateCombine(left, right, i, j)
  }
}
