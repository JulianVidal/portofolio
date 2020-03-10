import { Algorithm } from "./Algorithm.js";

export class Quick extends Algorithm {
    constructor() {
        super()
        this.it = 0
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
     * @param start
     * @param end
     * @param index
     * @param jIndex
     * @returns Number[] partially sorted array
     */
    async animateSort (arr, start = 0, end = this.array.length - 1, index, jIndex) {
        this.array = [...arr]

        // if (this.isSorted(this.array)) return
        if (start >= end) return

        let pivotIndex = start

        const pivot = this.array[pivotIndex]

        let i = index || start + 1
        let j = jIndex || end

        let left = this.array[1]
        let right = this.array[j]

        while (right > pivot && j >= start + 1) {
            j--
            right = this.array[j]
        }

        while (left < pivot && i < end) {
            i++
            left = this.array[i]
        }

        if (i >= j) {

            if (pivot > left && i === j) {
                this.array = this.swap(this.array, pivotIndex, end)
                pivotIndex = end
            } else {
                this.array = this.swap(this.array, pivotIndex, j)
                pivotIndex = j
            }

            this.animateSort(this.array, start, pivotIndex - 1)
            this.animateSort(this.array, pivotIndex + 1, end)

        } else if (left > pivot && right < pivot) {
            this.array = this.swap(this.array, i, j)
            this.animateSort(this.array, start, end, i, j)
        }


    }
}