import { Algorithm } from "./Algorithm.js";

export class Quick extends Algorithm {
    constructor() {
        super()
    }

    /**
     * Sorts the array with quick sort
     * @param  {Array<Number>} arr The array that is going to be sorted
     * @param {Number} index the left most element index, used for recursion
     * @param {Number} jIndex the right most element index, used for recursion
     * @returns Number[] sorted array
     */
    sort (arr, index, jIndex) {
        let array = [...arr]

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
     * @returns Number[] partially sorted array
     */
    stepSort (arr) {
        let array = [...arr]

        if (this.isSorted(array)) return array

        this.arrayLength = Math.max(array.length, this.arrayLength)

       let pivotIndex = 0 // Index of the pivot

       const pivot = array[pivotIndex] // The value of the pivot

        let i = pivotIndex + 1 // The index of the left most element
        let j = array.length - 1 // The index of the right most element

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

           const leftArray = this.stepSort(array.slice(0, pivotIndex)) // Left side
           let rightArray = array.slice(pivotIndex + 1)  // Right side
           if (JSON.stringify(leftArray) === JSON.stringify(array.slice(0, pivotIndex))) {
               rightArray = this.stepSort(rightArray)
           }

           return leftArray.concat(array[pivotIndex]).concat(rightArray)
       } else if (i === j) {
           // If both indexes are the same due to the
           // Pivot being the biggest value
           // Switch it to the last index of the array
           if (pivot > left) {
               array = this.swap(array, pivotIndex, array.length - 1)
               pivotIndex = array.length - 1
           }

           const leftArray = this.stepSort(array.slice(0, pivotIndex)) // Left side
           let rightArray = array.slice(pivotIndex + 1)
           if (JSON.stringify(leftArray) === JSON.stringify(array.slice(0, pivotIndex))) {
               rightArray = this.stepSort(rightArray) // Right side
           }

           return leftArray.concat(array[pivotIndex]).concat(rightArray)
       }

       if (left > pivot && right < pivot) {
           this.index = (this.arrayLength - array.length) + i
           this.jIndex = (this.arrayLength - array.length) + j
           array = this.swap(array, i, j)
       }

        return array
    }
}