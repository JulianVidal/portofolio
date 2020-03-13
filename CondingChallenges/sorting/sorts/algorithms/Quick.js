import { Algorithm } from './Algorithm.js'

export class Quick extends Algorithm {
  /**
   * Sorts the array with quick sort
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @param {Number} index the left most element index, used for recursion
   * @param {Number} jIndex the right most element index, used for recursion
   * @returns Number[] sorted array
   */
  sort (arr, index, jIndex) {
    let array = [].concat(arr)

    if (this.isSorted(array)) return array

    let pivotIndex = 0 // Index of the pivot

    const pivot = array[pivotIndex] // The value of the pivot

    let i = index || pivotIndex + 1 // The index of the left most element
    let j = jIndex || array.length - 1 // The index of the right most element

    let left = array[1] // The value of the left element
    let right = array[j] // The value of the right element

    while (left < pivot && i < array.length - 1) {
      i++
      left = array[i]
    }

    while (right > pivot && j > 1) {
      j--
      right = array[j]
    }

    if (i > j) {
      array = this.swap(array, pivotIndex, j)
      pivotIndex = j

      const leftArray = this.sort(array.slice(0, pivotIndex)) // Left side
      const rightArray = this.sort(array.slice(pivotIndex + 1)) // Right side

      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    } else if (i === j) {
      // If both indexes are the same due to the
      // Pivot being the biggest value
      // Switch it to the last index of the array
      if (pivot > left) {
        array = this.swap(array, pivotIndex, array.length - 1)
        pivotIndex = array.length - 1
      }

      const leftArray = this.sort(array.slice(0, pivotIndex)) // Left side
      const rightArray = this.sort(array.slice(pivotIndex + 1)) // Right side

      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    }

    if (left > pivot && right < pivot) {
      array = this.swap(array, i, j)
    }

    return this.sort(array, i, j)
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @param relI
   * @param relJ
   * @param index
   * @param jIndex
   * @returns Number[] partially sorted array
   */
  async animateSort (arr, relI = 0, i, j) {
    let array = [].concat(arr)

    if (this.isSorted(array)) {
      this.done = true
      return array
    }

    let pivotIndex = 0 // Index of the pivot

    const pivot = array[pivotIndex] // The value of the pivot

    let index = i || pivotIndex + 1 // The index of the left most element
    let jIndex = j || array.length - 1 // The index of the right most element

    this.index = index + relI
    this.jIndex = jIndex + relI

    let left = array[1] // The value of the left element
    let right = array[jIndex] // The value of the right element

    while (left < pivot && index < array.length - 1) {
      index++
      left = array[index]
    }

    while (right > pivot && jIndex > 1) {
      jIndex--
      right = array[jIndex]
    }

    if (index > jIndex) {
      array = this.swap(array, pivotIndex, jIndex)
      this.array = this.swap(this.array, pivotIndex + relI, jIndex + relI)
      await this.sleep(this.speed)
      pivotIndex = jIndex

      const leftArray = await this.animateSort(array.slice(0, pivotIndex), relI) // Left side
      const rightArray = await this.animateSort(
        array.slice(pivotIndex + 1),
        pivotIndex + 1 + relI
      ) // Right side

      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    } else if (index === jIndex) {
      // If both indexes are the same due to the
      // Pivot being the biggest value
      // Switch it to the last index of the array
      if (pivot > left) {
        array = this.swap(array, pivotIndex, array.length - 1)
        this.array = this.swap(
          this.array,
          pivotIndex + relI,
          array.length - 1 + relI
        )
        await this.sleep(this.speed)
        pivotIndex = array.length - 1
      }

      const leftArray = await this.animateSort(array.slice(0, pivotIndex), relI) // Left side
      const rightArray = await this.animateSort(
        array.slice(pivotIndex + 1),
        pivotIndex + 1 + relI
      ) // Right side

      return leftArray.concat(array[pivotIndex]).concat(rightArray)
    }

    if (left > pivot && right < pivot) {
      array = this.swap(array, index, jIndex)
      this.array = this.swap(this.array, index + relI, jIndex + relI)
      await this.sleep(this.speed)
    }

    return this.animateSort(array, relI, index, jIndex)
  }

  eSort (arr, start, end, index, jIndex) {

    if (start >= end) return arr
    if (this.isSorted(arr)) return arr

    let array = arr

    let pivotIndex = start || 0

    const pivot = array[pivotIndex]

    let i = index || pivotIndex + 1
    let j = jIndex || (end || array.length - 1)

    let left = array[i]
    let right = array[j]

    while (left < pivot && i < end) {
      i++
      left = array[i]
    }

    while (right > pivot && j > start + 1) {
      j--
      right = array[j]
    }

    if (i > j) {
      array = this.swap(array, pivotIndex, j)
      pivotIndex = j

      const leftArray = this.eSort(array, start, pivotIndex - 1)
      const rightArray = this.eSort(leftArray, pivotIndex + 1, end)

      return rightArray
    } else if (i === j) {

      if (pivot > left) {
        array = this.swap(array, pivotIndex, end)
        pivotIndex = end
      }

      let leftArray = array

      if (pivotIndex !== start) {
        leftArray = this.eSort(array, start, pivotIndex - 1)
      }

      let rightArray = leftArray

      if (pivotIndex !== end) {
        rightArray = this.eSort(leftArray, pivotIndex + 1, end)
      }

      return rightArray
    }

    if (left > pivot && right < pivot) {
      array = this.swap(array, i, j)
    }

    return this.eSort(array, start, end, i, j)
  }
}
