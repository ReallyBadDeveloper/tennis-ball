var ball = document.querySelector('.ball')

var bwidth = 100
var bheight = 100

var holdingBall = false

var bx = 0
var by = 0

var xv = 0
var yv = 0
var gravity = 0.6
var airres = 0.1
var unbounciness = 4
var flinginess = 2.5

var grounded = false

var mouse = { x: 0, y: 0, px: 0, py: 0 }

var balloffx = 0
var balloffy = 0

document.addEventListener('mousemove', (event) => {
	mouse.px = mouse.x
	mouse.py = mouse.y
	mouse.x = event.clientX
	mouse.y = event.clientY
})

ball.addEventListener('mousedown', (event) => {
    event.preventDefault()
	holdingBall = true
	balloffx = mouse.x - bx
	balloffy = mouse.y - by
	xv = 0
	yv = 0
})

document.addEventListener('mouseup', (event) => {
    event.preventDefault()
	if (holdingBall == true) {
		holdingBall = false
		xv = (mouse.x - mouse.px) * flinginess
		yv = (mouse.y - mouse.py) * flinginess
	}
})

function serializeCSS(val) {
	var newVal = val.split(0, val.length - 2)
	newVal = Number(newVal)
	return newVal
}

function clearSelection() {
    if (window.getSelection) {
        window.getSelection().removeAllRanges()
    } else if (document.selection) {
        document.selection.empty()
    }
}

setInterval(() => {
	if (holdingBall) {
		bx = mouse.x - balloffx
		by = mouse.y - balloffy
	}
	if (!holdingBall) {
		bx += xv
		by += yv
		yv += gravity
		if (by == 0) {
			by = 5
		}
		if (xv > 0.1) {
			xv -= airres
		}
		if (xv < -0.1) {
			xv += airres
		}
		if (xv > -0.1 && xv < 0.1) {
			xv = 0
		}
		if (bx < 0) {
			bx = 0
			xv = -(xv + unbounciness)
		}
		if (by < -1) {
			by = 0
			yv = -(yv + unbounciness)
		}
		if (bx + bwidth > window.innerWidth) {
			bx = window.innerWidth - bwidth
			xv = -(xv - unbounciness)
		}
		if (by + bheight > window.innerHeight) {
			by = window.innerHeight - bheight
			yv = -(yv - unbounciness)
		}
		if (by + bheight > window.innerHeight - 5) {
			grounded = true
		} else {
			grounded = false
		}
	}
	ball.style.top = by + 'px'
	ball.style.left = bx + 'px'
    clearSelection()
}, 10)
