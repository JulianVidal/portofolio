export class Algorithm {
  constructor () {
    this.index = 0
    this.jIndex = 0
    this.isSwapping = false
    this.swapOff = 0
    this.barWidth = parseInt(document.getElementById('size').value)
    this.arrayLength = -Infinity
  }

  /**
  * Shuffles an array
  * @param  {Array<Number>} arr The array that is going to be shuffled
  * @returns Number[] shuffled array
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
   * In does the first or next step for shuffling the array (Used when drawing)
   * @param  {Array<Number>} arr The array that is going to be partially shuffled
   * @returns Number[] partially shuffled array
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

  /**
   * Swaps two elements of an array
   * @param  {Array<Number>} arr The array that is going to be sorted
   * @param  {Number} i The index of the element that is going to be swapped
   * @param  {Number} j The index of the other element that is going to be swapped
   * @returns Number[] array with the swap
   */
  swap (arr, i, j) {
    const array = [...arr]

    const value1 = array[i]
    array[i] = array[j]
    array[j] = value1

    return array
  }

  /**
   * Swaps two elements of an array one pixel at a time
   * @param  {Number[]} arr The array that is going to be sorted
   * @param  {Number} i The index of the element that is going to be swapped
   * @param  {Number} j The index of the other element that is going to be swapped
   * @returns Number[] array with the swap
   */
  stepSwap (arr, i, j) {
    let array = [...arr]

    this.isSwapping = true
    if (this.swapOff <= this.barWidth) {
      this.swapOff += 1
    } else if (this.swapOff > this.barWidth) {
      array = this.swap(array, i, j)

      if (i < j) {
        this.index++
      } else {
        // noinspection JSUnresolvedVariable
        this.rIndex--
      }

      this.swapOff = 0
      this.isSwapping = false
      this.isRSwapping = false
    }

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
}
