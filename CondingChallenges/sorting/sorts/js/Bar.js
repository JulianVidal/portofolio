import { Vector } from '../../lib/Vector.js'

export class Bar extends Vector {
  /**
   * Creates a bar at x, y with height and width
   * @param  {Number} x The x-coordinate of the bar
   * @param  {Number} y The y-coordinate of the bar
   * @param  {Number} width The width of the bar
   * @param  {Number} height The height of the bar
   */
  constructor (x, y, width, height) {
    super(x, y)
    this.width = width
    this.height = height
  }

  /**
   * Creates a bar at x, y with height and width
   * @param  {Number} x The x-coordinate of the bar
   * @param  {Number} y The y-coordinate of the bar
   * @param  {Number} width The width of the bar
   * @param  {Number} height The height of the bar
   * @param  {String} color The color of the bar
   * @param  {Canvas} canvas The canvas were the bar will be draw
   */
  static draw (x, y, width, height, color, canvas) {
    canvas.color = color
    canvas.rectangle(x, y, width, height)
  }

  /**
 * Creates a bar at x, y with height and width
 * @param  {Canvas} canvas The canvas were the bar will be draw
 */
  draw (canvas) {
    canvas.color = '#ffffff'
    canvas.rectangle(this.x, this.y, this.width, this.height)
  }
}
