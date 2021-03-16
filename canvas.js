class MyContext {
    static DEFAULT_SETTINGS = {
        width: 500,
        height: 500,
        withBorder: true,
        borderOptions: {
            before: () => {},
            after: () => {},
        },
        // withArrows = true,
        arrow_width: 10,
        arrow_height: 10,
        indent: 20,
        shiftX: 0,
        shiftY: 0,
        arrowsOptions: {
            beforeArrows: () => {},
            afterArrows: () => {},
        },
        linesOptions: {
            beforeLines: () => {},
            afterLines: () => {},
        },
        markupOptions: {
            needMarkup: true,
            length: 10,
            needSubscription: true,
            step: 1,
            font: '7px mono',
        },
        withMarkup: { // change name
            everyX: 0,
            everyY: 0,
        },
    }

    constructor(canvas, options = MyContext.DEFAULT_SETTINGS) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        Object.keys(MyContext.DEFAULT_SETTINGS)
            .forEach(opt => {
            if (options[opt] !== undefined) {
                this[opt] = options[opt]
            } else {
                this[opt] = MyContext.DEFAULT_SETTINGS[opt]
            }
        })
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.drawBorder()
        this.drawLines()
    }

    line(startX, startY, finishX, finishY, invertY = false) {
        const {ctx} = this
        if (!invertY) {
            startY = height - startY
            finishY = height - finishY
        }
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(finishX, finishY)
        ctx.stroke()
    }

    drawLines() {
        const {
            ctx,
            height,
            width,
            indent,
            shiftX,
            shiftY,
            arrow_width,
            arrow_height,
            withMarkup: {
                everyX,
                everyY,
            },
            linesOptions: {
                beforeLines,
                afterLines,
            },
            arrowsOptions: {
                beforeArrows,
                afterArrows,
            },
            markupOptions: {
                needMarkup,
                length,
                needSubscription,
                step,
                font,
            },
        } = this

        // lines
        beforeLines(ctx)

        ctx.beginPath()
        ctx.moveTo(indent, indent)
        ctx.lineTo(indent, height - indent)
        ctx.lineTo(width - indent, height - indent)
        ctx.stroke()

        afterLines(ctx)

        beforeArrows(ctx)

        // y arrow
        ctx.beginPath()
        ctx.moveTo(indent, indent)
        ctx.lineTo(indent - arrow_width / 2, indent + arrow_height)
        ctx.moveTo(indent, indent)
        ctx.lineTo(indent + arrow_width / 2, indent + arrow_height)
        ctx.stroke()

        // x arrow
        ctx.beginPath()
        ctx.moveTo(width - indent, height - indent)
        ctx.lineTo(width - indent - arrow_height, height - indent - arrow_width / 2)
        ctx.moveTo(width - indent, height - indent)
        ctx.lineTo(width - indent - arrow_height, height - indent + arrow_width / 2)
        ctx.stroke()

        afterArrows(ctx)

        if (needMarkup) {
            // y every
            for (let i = 1; i <= (height - arrow_height - indent * 2) / everyY; i++) {
                ctx.beginPath()
                ctx.moveTo(
                    indent - length / 2,
                    height - indent - i * everyY)
                ctx.lineTo(
                    indent + length / 2,
                    height - indent - i * everyY)
                ctx.stroke()
                if (needSubscription) {
                    ctx.font = font
                    ctx.textAlign = 'right'
                    ctx.textBaseline = 'middle'
                    ctx.strokeText(`${shiftY + i * step}`, indent - length / 2,
                        height - indent - i * everyY)
                }
            }
            // x every
            for (let i = 1; i <= (width - arrow_height - indent * 2) / everyX; i++) {
                ctx.beginPath()
                ctx.moveTo(
                    indent + i * everyX,
                    height - indent + length / 2)
                ctx.lineTo(
                    indent + i * everyX,
                    height - indent - length / 2)
                ctx.stroke()
                if (needSubscription) {
                    ctx.font = font
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'top'
                    ctx.strokeText(`${shiftX + i * step}`, indent + i * everyX,
                        height - indent + length / 2)
                }
            }
        }
        return ctx
    }

    drawBorder() {
        const {
            ctx,
            borderOptions: {
                before,
                after,
            },
            height,
            width,
        } = this

        before(ctx)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, height)
        ctx.lineTo(width, height)
        ctx.lineTo(width, 0)
        ctx.closePath()
        ctx.stroke()

        after(ctx)

        return this
    }

    drawFunction({
                     f = (x) => x,
                     startX = 0,
                     finishX = 10,
                     step = 1,
                     dotty = true,
                     funcOptions: {
                         beforeFunc = () => {},
                         afterFunc = () => {},
                     } = {},
                 } = {}) {
        const {
            ctx,
            height,
            width,
            indent,
            shiftX,
            shiftY,
            withMarkup: {
                everyX,
                everyY,
            },
        } = this

        beforeFunc(ctx)
        ctx.beginPath()
        for (let x = startX; x <= finishX; x += step) {
            let y = f(x)
            // console.log(x, y)
            let eX = (-shiftX + x) * everyX // !!!
            let eY = (-shiftY + y) * everyY // !!!
            if (eX >= 0 && eX <= width - 2 * indent && eY >= 0 && eY <= height - 2 * indent) {
                if (dotty) {
                    ctx.arc(indent + eX, height - indent - eY,
                        1, 0, 2 * Math.PI, true)
                } else {
                    if (x === startX) ctx.moveTo(indent + eX, height - indent - eY)
                    ctx.lineTo(indent + eX, height - indent - eY)
                }
            } else {
                console.error(`eX >= 0 && eX <= width - 2 * indent && eY >= 0 && eY <= height - 2 * indent`)
            }
        }
        if (dotty) ctx.fill()
        else ctx.stroke()
        afterFunc(ctx)

        return this
    }

    getCanvas() {
        return this.canvas
    }
}

class Lab1Graph extends MyContext {
    constructor(canvas) {
        const options = {
            width: 1000,
            height: 700,
            borderOptions: {
                before: (ctx) => ctx.strokeStyle = 'green',
                after: (ctx) => ctx.strokeStyle = 'black',
            },
            withMarkup: {
                everyY: 10,
                everyX: 10,
            },
            // shiftY: -2,
            arrowsOptions: {
                beforeArrows: (ctx) => ctx.strokeStyle = 'green',
                afterArrows: (ctx) => ctx.strokeStyle = 'black',
            },
        }
        super(canvas, options)
    }
}