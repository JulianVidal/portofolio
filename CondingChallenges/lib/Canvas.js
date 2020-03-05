export class Canvas {
  /**
   * Creates a canvas element that can be used at a higher level
   * @param  {Number} width The width of the canvas element
   * @param  {Number} height The height of the canvas element
   */
  constructor (width, height) {
    this.width = width || 300
    this.height = height || 300

    this.canvasElement = document.createElement('canvas')
    this.ctx = this.canvasElement.getContext('2d')
    this.ctx.imageSmoothingEnabled = false
    document.body.appendChild(this.canvasElement)

    this.setSize(width, height)

    this.color = '#000'
    this.stroke = '#000'
    this.weight = 1

    this.fps = 60
  }

  /**
   * Puts the canvas element inside another element
   * @param  {HTMLElement} element The element the canvas will be in
   */
  append (element) {
    element.appendChild(this.canvasElement)
  }

  /**
   * Changes the background color to the given color
   * @param  {Color} color Color can be a string, number, rgb, check canvas context fill documentation
   */
  background (color) {
    this.color = color || this.color
    this.rectangle(0, 0, this.width, this.height)
  }

  /**
   * Creates a loop of the callback given, the functin will loop at 60fps
   * @param  {Callback} callback The functin that will be looped
   */
  loop (callback) {
    this.drawLoop = setInterval(callback, 1000 / this.fps)
  }

  /**
   * Stopds the function that has been looped and saved in this.draw_loop
   */
  noLoop () {
    clearInterval(this.drawLoop)
  }

  /**
   * Changes the height and width of the canvas
   * @param  {Number} width The width of the canvas element
   * @param  {Number} height The height of the canvas element
   */
  setSize (width, height) {
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
    this.height = height
    this.width = width
  }

  /**
   * Draws a rectangle on the canvas
   * @param  {Number} x The x-cordinate of the top-left corner of the rectangle
   * @param  {Number} y The y-cordinate of the top-left corner of the rectangle
   * @param  {Number} width The width of the rectangle from the top-left corner
   * @param  {Number} height The height of the rectangle from the top-left corner
   * @param  {Boolean} noFill Whether or not the rectangle should be filled
   */
  rectangle (x, y, width, height, noFill) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, width, height)
    this.ctx.fillStyle = this.color
    if (!noFill) this.ctx.fill()
  }

  /**
   * Draws a circle on the canvas
   * @param  {Number} x The x-cordinate of the center of the circle
   * @param  {Number} y The y-cordinate of the center of the circle
   * @param  {Number} radius The radius of the circle
   * @param  {Boolean} noFill Whether or not the rectangle should be filled
   * @param  {Color} stroke Color can be a string, number, rgb, check canvas context fill documentation
   */
  circle (x, y, radius, noFill) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI)
    this.ctx.fillStyle = this.color
    if (!noFill) this.ctx.fill()
  }

  /**
   * Draws an image on the canvas
   * @param  {Number} x The x-cordinate of the top-left corner of the image
   * @param  {Number} y The y-cordinate of the top-left corner of the image
   * @param  {ImageElement} image The element of the image to be drawn
   */
  image (image, x, y) {
    this.ctx.drawImage(image, x, y)
  }

  /**
   * Draws a lune on the canvas
   * @param  {Number} x1 The x-cordinate of the first point of the line
   * @param  {Number} y1 The y-cordinate of the first point of the line
   * @param  {Number} x2 The x-cordinate of the second point of the line
   * @param  {Number} y2 2The y-cordinate of the second point of the line
   */
  line (x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.lineWidth = this.weight
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  /**
   * Draws a heart on the canvas
   * @param  {Number} x The x-cordinate of the center of the heart
   * @param  {Number} y The y-cordinate of the center of the heart
   * @param  {Number} radius The radius of the heart
   * @param  {Boolean} noFill Whether or not the rectangle should be filled
   */
  heart (x, y, radius, noFill) {
    let angle = 0

    this.ctx.beginPath()
    this.ctx.moveTo(x, y)

    while (angle < Math.PI * 2) {
      const posX = radius * (16 * Math.pow(Math.sin(angle), 3)) + x
      const posY = -radius * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) + y

      this.ctx.lineTo(posX, posY)
      this.ctx.moveTo(posX, posY)
      this.circle(posX, posY, 1)
      angle += 0.01
    }
    this.ctx.fillStyle = this.color
    if (!noFill) this.ctx.fill()
  }
}
