import { millisecondsToDays } from './utils.mjs'

const SCALE = 3

const data = [ // temporary, intended to be moved to its own file later on
	{
		"start-date": "2021-01-23",
		"end-date": "2021-02-08",
		"type": "period",
		"style": "red",
		"title": "Gacha Mudae",
		"desc": "Período de gacha da Mudae, quando o servidor se dividiu em facções para conquistas waifus e husbandos no servidor"
	},
	{
		"start-date": "2020-12-01",
		"end-date": "2021-01-02",
		"style": "green",
		"type": "event",
		"title": "Test",
	},
	{
		"start-date": "2021-01-01",
		"end-date": "2021-03-29",
		"style": "blue",
		"type": "event",
		"title": "Test",
	},
	{
		"start-date": "2020-09-06",
		"end-date": "2020-10-06",
		"type": "event",
		"title": "REKTO",
		"desc": "Evento chinês do REKT, inspirado pelo lançamento de Genshin Impact"
	},
	{
		"start-date": "2022-03-18",
		"end-date": "2022-03-19",
		"type": "event",
		"title": "something that happened recently",
		"desc": "just a test"
	}
]

// TODO: add support for singular incidents, w/o end-date

// TODO: work on adding titles/desc to events

// TODO: add types of segments, so as to theme the timeline a bit. 
//		chinese event could have a chinese-themed background to its segment, 
//		spears-vs-swords could have an icon of sorts, etc



// parses events so that start-date and end-date are actual date objects and we have a duration property
const parseEvents = data => {
	const events = data.map(event => {
		const startDate = new Date(event[`start-date`])
		const endDate = new Date(event[`end-date`])
		const durationInMilliseconds = endDate.getTime() - startDate.getTime()

		const parsedResult = { // maybe .map'ing it works as well? this kinda ugly
			type: event.type,
			title: event.title,
			desc: event.desc,
			style: event.style,
			startDate: startDate,
			endDate: endDate,
			durationInMilliseconds: durationInMilliseconds
		}

		return parsedResult
	})

	return events
}

// not very elegant but will do for now
const moveSegmentsLeft = _ => {
	const lines = Array.from(document.querySelectorAll(".line"));
	
	lines.sort((a, b) => parseFloat(a.style.top) - parseFloat(b.style.top));

	const marginLeft = 2; // px

	for (let i = 1; i < lines.length; i++) {
		for (let j = 0; j < i; j++) {
			const currentLine = lines[i]
			const previousLine = lines[j]

			const currentTop = parseFloat(currentLine.style.top)
			const currentHeight = parseFloat(currentLine.style.height)
			const previousTop = parseFloat(previousLine.style.top)
			const previousHeight = parseFloat(previousLine.style.height)

			const isSharingSameSpace = 
				currentTop < previousTop + previousHeight &&
				currentTop + currentHeight > previousTop

			if (!isSharingSameSpace)
				continue

			const prevTop = parseFloat(previousLine.style.left || "0")
			const prevWidth = parseFloat(previousLine.offsetWidth)
			currentLine.style.left = `${prevTop + prevWidth + marginLeft}px`
		}
	}
}

const getTimelineDuration = events => {
	const startTime = events[0].startDate.getTime()
	const endTime = Date.now()
	const totalDuration = endTime - startTime
	return totalDuration
}

const timelineElement = document.createElement(`div`)
timelineElement.classList.add(`timeline`)
document.body.appendChild(timelineElement)

// drawing is actually delegated to drawSegment
const renderTimeline = events => {
	const totalDuration = getTimelineDuration(events)
	drawSegment(0, millisecondsToDays(totalDuration), ["main", "disabled"])
	timelineElement.style.height = `${millisecondsToDays(totalDuration) * SCALE}px`

	for (const event of events) {
		const durationInDays = millisecondsToDays(event.durationInMilliseconds)
		const startInDays = millisecondsToDays(event.startDate.getTime() - events[0].startDate.getTime())
		drawSegment(startInDays, durationInDays, event.style ? [event.style] : [])
	}

	moveSegmentsLeft()
}

// only responsible for drawing, does not care about anything else
const drawSegment = (y, height, styles = []) => {
	const line = document.createElement(`div`)
	line.classList.add(`line`)

	line.classList.add(...styles)

	const MINIMUM_SIZE = 10
	const finalHeight = Math.max(height * SCALE, MINIMUM_SIZE) // FIXME: magic numbers
	line.style.top = `${y * SCALE}px`
	line.style.height = `${finalHeight}px`

	timelineElement.appendChild(line)
}

const main = (_ => {
	const events = parseEvents(data)

	// sorts events by start date
	events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

	renderTimeline(events)
})()