import { Algorithm } from './Algorithm.js'

export class Merge extends Algorithm {
    /**
     * Sorts the array with merge sort
     * @param  {Array<Number>} arr The array that is going to be sorted
     * @returns Number[] sorted array
     */
     sort (arr) {
        let array = [...arr]

        if (array.length !== 1) {
            let left = this.sort(array.slice(0, Math.round(array.length / 2)))
            let right = this.sort(array.slice(Math.round(array.length / 2)))

            return this.combine(left, right)

        } else {
            return array
        }
    }

    combine (arr1, arr2) {
        let array1 = [...arr1]
        let array2 = [...arr2]
        let array3 = []

        let i = 0
        let j = 0

        let value1 = array1[i]
        let value2 = array2[j]

        while (i < array1.length && j < array2.length) {
            if (value1 < value2) {
                array3.push(value1)
                i++
                value1 = array1[i]
            } else {
                array3.push(value2)
                j++
                value2 = array2[j]
            }
        }

        if (i < array1.length) {
            array3 = array3.concat((array1.slice(i)))
        } else if (j < array2.length) {
            array3 = array3.concat((array2.slice(j)))
        }

        return array3
    }


    async stepCombine (arr1, arr2, index, jIndex) {
         await this.sleep(100)
        let array1 = [...arr1]
        let array2 = [...arr2]
        let array3 = []

        let i = 0
        let j = 0

        let value1 = array1[i]
        let value2 = array2[j]

        while (i < array1.length && j < array2.length) {
            if (value1 < value2) {
                array3.push(value1)
                i++
                value1 = array1[i]
            } else {
                array3.push(value2)
                j++
                value2 = array2[j]
            }
        }

        if (i < array1.length) {
            array3 = array3.concat((array1.slice(i)))
        } else if (j < array2.length) {
            array3 = array3.concat((array2.slice(j)))
        }
        console.log(array3, index, jIndex)
        this.array.forEach((element, elIndex) => {
            if (elIndex >= i && elIndex <= j) {
                element = array3[elIndex - i]
            }
        })
        return array3
    }

    /**
     * Sorts the array with merge sort
     * @param  {Array<Number>} arr The array that is going to be sorted
     * @returns Number[] sorted array
     */
    async stepSort (arr, i, j) {
        let array = [...arr]

        let left, right

        if (array.length !== 1) {
            const halfIndex = array.length / 2
            left = await this.stepSort(array.slice(0, Math.round(halfIndex)), i || 0, Math.round(halfIndex) - 1 + (i || 0))
            right = await this.stepSort(array.slice(Math.round(halfIndex)), Math.round(halfIndex) + (i || 0), j || array.length - 1)

        } else {
            return array
        }

        return await this.stepCombine(left, right, i, j)
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

}
