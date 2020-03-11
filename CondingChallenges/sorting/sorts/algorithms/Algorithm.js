export class Algorithm {
  constructor () {
    this.index = -1
    this.jIndex = -1
    this.array = []
    this.speed = (1 / 50) * 1000
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
  async animateShuffle (arr) {
    let array = [...arr]
    this.jIndex = -1
    for (this.index = 0; this.index < array.length; this.index++) {
      const randomIndex = Math.round(Math.random() * (array.length - 1))
      array = this.swap(array, this.index, randomIndex)
      this.array = [...array]
      await this.sleep(this.speed)
    }
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

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
