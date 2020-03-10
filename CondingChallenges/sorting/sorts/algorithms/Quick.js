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
     * @param relI
     * @param relJ
     * @param index
     * @param jIndex
     * @returns Number[] partially sorted array
     */
    async animateSort (arr,relI = 0, i, j) {
        let array = [...arr]

        if (this.isSorted(array)) return array

        // Checks if the sorting has been stopped
        if (this.isStopped) {
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
            const rightArray = await this.animateSort(array.slice(pivotIndex + 1), pivotIndex + 1 + relI) // Right side


            return leftArray.concat(array[pivotIndex]).concat(rightArray)
        } else if (index === jIndex) {
            // If both indexes are the same due to the
            // Pivot being the biggest value
            // Switch it to the last index of the array
            if (pivot > left) {
                array = this.swap(array, pivotIndex, array.length - 1)
                this.array = this.swap(this.array, pivotIndex + relI, array.length - 1 + relI)
                await this.sleep(this.speed)
                pivotIndex = array.length - 1
            }

            const leftArray = await this.animateSort(array.slice(0, pivotIndex), relI) // Left side
            const rightArray = await this.animateSort(array.slice(pivotIndex + 1), pivotIndex + 1 + relI) // Right side


            return leftArray.concat(array[pivotIndex]).concat(rightArray)
        }

        if (left > pivot && right < pivot) {
            array = this.swap(array, index, jIndex)
            this.array = this.swap(this.array, index + relI, jIndex + relI)
            await this.sleep(this.speed)
        }

        return this.animateSort(array, relI, index, jIndex,);
    }
}