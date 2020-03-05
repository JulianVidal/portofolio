class Screen {
    constructor(element) {
        this.canvas = element.getContext("2d");
        this.element = element;

        this.canvas.imageSmoothingEnabled = false;

        this.width  = this.canvas.canvas.width;
        this.height = this.canvas.canvas.height;
    }

    setSize(width, height) {
        this.canvas.canvas.width  =  width;
        this.canvas.canvas.height =  height;

        this.width  = this.canvas.canvas.width;
        this.height = this.canvas.canvas.height;
    }

    background(color) {
        this.canvas.fillStyle = color;
        this.canvas.fillRect(0, 0, this.width, this.height);

    }

    square(x, y, l, color) {
        this.canvas.fillStyle = color;
        this.canvas.fillRect(x, y, l, l);
    }

    rect(x, y, b, h, color, center = false) {
        this.canvas.fillStyle = color;
        if (!center) {
            this.canvas.fillRect(x, y, b, h);
        } else {
            this.canvas.fillRect(x - (b / 2), y - (h / 2), b, h);
        }
    }

    circle(x, y, r, color) {
        const circle = new Path2D();
        circle.arc(x, y, r, 0, 2 * Math.PI);
        this.canvas.fillStyle = color;
        this.canvas.fill(circle);
    }

    line(x1, y1, x2, y2, width = 1, color) {
        const line = new Path2D();
        line.moveTo(x1,y1);
        line.lineTo(x2, y2);
        this.canvas.strokeStyle = color;
        this.canvas.lineWidth = width;
        this.canvas.stroke(line);
    }
}