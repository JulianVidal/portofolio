export class Bubble {
  constructor () {
    this.index = 0
  }

  /**
   * Shuffles an array
   * @param  {Array<Number>} arr The array that is going to be shuffled
   * @returns The shuffled array
   */
  shuffle (arr) {
    let array = [...arr]

    for (let index = 0; index < array.length; index++) {
      const randomIndex = Math.round(Math.random() * (array.length - 1))
      array = this.swap(array, index, randomIndex)
    }

    return array
  }

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
   * Swaps two elements of an array
   * @param  {Array<Number>} arr The array that is going to be sorte
   * @param  {Number} i The index of the element that is going to be swapped
   * @param  {Number} j The index of the other element that is going to be swapped
   * @returns The array with the swap
   */
  swap (arr, i, j) {
    const array = [...arr]

    const value1 = array[i]
    const value2 = array[j]
    array[i] = value2
    array[j] = value1

    return array
  }

  /**
   * Checks if the array is sorted
   * @param  {Array<Number>} arr The array that is going checked
   * @returns A boolean that is true when the array is sorted
   */
  isSorted (arr) {
    const array = [...arr]
    let inOrder = true

    array.forEach((element, i) => {
      const nextElement = array[i + 1]

      if (nextElement) {
        if (element > nextElement) {
          inOrder = false
        }
      }
    })

    return inOrder
  }

  /**
   * It does the first or next step for sorting (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially sorted
   * @returns The partially sorted array
   */
  stepSort (arr) {
    let array = [...arr]

    if (this.index < array.length - 1 && !this.isSorted(array)) {
      const left = array[this.index]
      const right = array[this.index + 1]

      if (left > right) {
        array = this.swap(array, this.index, this.index + 1)
        this.index++
      } else {
        this.index++
        return this.stepSort(array)
      }
    } else {
      this.index = 0
    }

    return array
  }

  /**
   * In does the first or next step for shuffling the array (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially shuffled
   * @returns The partially shuffled array
   */
  stepShuffle (arr) {
    let array = [...arr]

    if (this.index < array.length) {
      const randomIndex = Math.round(Math.random() * (array.length - 1))
      array = this.swap(array, this.index, randomIndex)
      this.index++
    } else {
      this.index = 0
    }

    return array
  }
}
