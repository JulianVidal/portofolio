export class Vector {
  /**
   * Creates a vector at x, y, it can be used in operations
   * @param  {Number} x The x-cordinate of the vector
   * @param  {Number} y The y-cordinate of the vector
   */
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  /**
   * Adds a vector to the current vector
   * @param  {Vector} vector The vector or object with x, y
   */
  add (vector) {
    this.x += vector.x
    this.y += vector.y
  }

  /**
   * Adds two vectors and returns another one
   * @param  {Vector} vectorA The first vector or object with x, y
   * @param  {Vector} vectorB The second vector or object with x, y
   * @returns The sum of vectorA and vectorB as a vector
   */
  static add (vectorA, vectorB) {
    const x = vectorA.x + vectorB.x
    const y = vectorA.y + vectorB.y

    return new Vector(x, y)
  }
}
