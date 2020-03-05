export class Insertion {
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
  }
}
