import { Algorithm } from "./Algorithm.js"

export class Selection extends Algorithm {

    /**
     * Sorts the array with merge sort
     * @param  {Array<Number>} arr The array that is going to be sorted
     * @param passes
     * @returns Number[] sorted array
     */
    sort (arr, passes = 0) {
        // Copies the array to make function more pure
        let array = [...arr]  // The arrays won't be references to each other

        // Checks if the array is sorted
        if (this.isSorted(array)) return array

        let minimumIndex = passes // starts minimum at the left most index
        let minimum = array[minimumIndex] // The value of the minimum

        let index = passes + 1 // The index of the item that will be compared
        let current = array[index] // The value of the value compared

        // Loops through the array
        while (index < array.length) {

            // If the current is lower than minimum
            if (current < minimum) {
                // Changes the minimum to current
                minimumIndex = index
                minimum = array[minimumIndex]
            }

            // The index keeps moving and updates the current item
            index++
            current = array[index]
        }

        // Swaps the minimum with the left most index
        array = this.swap(array, minimumIndex, passes)

        // Passes through the array again
        return this.sort(array, passes + 1)
    }

    /**
     * Sorts the array with merge sort
     * @param  {Array<Number>} arr The array that is going to be sorted
     * @param passes
     * @returns Number[] sorted array
     */
    async animateSort (arr, passes = 0) {
        // Copies the array to make function more pure
        let array = [...arr] // The arrays won't be references to each other

        // Checks if the array is sorted
        if (this.isSorted(array)) {
            this.done = true
            return array
        }
        let minimumIndex = passes // starts minimum at the left most index
        let minimum = array[minimumIndex] // The value of the minimum

        let index = passes + 1 // The index of the item that will be compared
        let current = array[index] // The value of the value compared

        // Loops through the array
        while (index < array.length) {

            // If the current is lower than minimum
            if (current < minimum) {
                // Changes the minimum to current
                minimumIndex = index
                minimum = array[minimumIndex]
            }

            // The index keeps moving and updates the current item
            index++
            current = array[index]
        }

        // Swaps the minimum with the left most index
        array = this.swap(array, minimumIndex, passes)

        // Index that the track is going to show
        this.index = minimumIndex

        // Updates the array that is being visualised
        this.array = array
        // Waits for it to be drawn
        await this.sleep(this.speed)

        // Passes through the array again
        return this.animateSort(array, passes + 1)
    }
}