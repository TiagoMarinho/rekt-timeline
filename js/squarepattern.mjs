const drawSquarePattern = parent => {
	const createCanvas = parent => {
		const canvas = document.createElement(`canvas`)
		canvas.classList.add(`square-pattern`)
		parent.appendChild(canvas)
		return canvas
	}

	const fullscreen = element => {
		element.style.position = `fixed`
		element.style.top = 0
		element.style.left = 0
		const adjustSize = element => {
			element.width = innerWidth
			element.height = innerHeight
		}
		adjustSize(element)
		window.addEventListener(`resize`, _ => {
			adjustSize(element)
		})
	}

	const renderSquarePattern = ctx => {
		ctx.fillStyle = `#000`
		ctx.fillRect(0, 0, innerWidth, innerHeight)
		ctx.fillStyle = `#fff`
		for (let x = 0; x < innerWidth; x += 6) {
			for (let y = 0; y < innerHeight; y += 6) {
				ctx.fillRect(x, y, 4, 4)
			}
		}
	}


	class PixelNoiseGame {
		run () {
			const canvas = createCanvas(document.body)
			canvas.id = `myCanvas`
			const ctx = canvas.getContext(`2d`)

			fullscreen(canvas)

			this.loop(ctx)
		}

		loop (ctx) {
			renderSquarePattern(ctx)

			//requestAnimationFrame(_ => {
				//this.loop(ctx)
			//})
		}
	}

	const myGame = new PixelNoiseGame()
	myGame.run()
}