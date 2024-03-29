import { millisecondsToDays } from './utils.mjs'
import rawEventsList from './eventslist.mjs'

const SCALE = 2 // each day will take this amount of pixels of space

/*const data = [ // temporary, intended to be moved to its own file later on
	{
		"start-date": "2021-01-23",
		"end-date": "2021-02-08",
		"type": "period",
		"style": "red",
		"title": "Test1",
		"desc": "Período de gacha da Mudae, quando o servidor se dividiu em facções para conquistas waifus e husbandos no servidor"
	},
	{
		"start-date": "2020-12-01",
		"end-date": "2021-01-02",
		"style": "green",
		"type": "event",
		"title": "Test2",
	},
	{
		"start-date": "2021-01-01",
		"end-date": "2021-03-29",
		"style": "blue",
		"type": "event",
		"title": "Test3",
	},
	{
		"start-date": "2021-01-01",
		"end-date": "2021-03-29",
		"style": "blue",
		"type": "event",
		"title": "Test3",
	},
	{
		"start-date": "2020-12-01",
		"end-date": "2021-01-02",
		"style": "green",
		"type": "event",
		"title": "Test2",
	},
	{
		"start-date": "2020-09-06",
		"end-date": "2020-10-06",
		"type": "event",
		"title": "Test4",
		"desc": "Evento chinês do REKT, inspirado pelo lançamento de Genshin Impact"
	},
	{
		"start-date": "2022-03-18",
		"end-date": "2022-03-19",
		"type": "event",
		"title": "Test5",
		"desc": "just a test"
	}
]*/

// TODO: add support for singular incidents, w/o end-date

// TODO: work on adding titles/desc to events

// TODO: add types of segments, so as to theme the timeline a bit. 
//		chinese event could have a chinese-themed background to its segment, 
//		spears-vs-swords could have an icon of sorts, etc



// parses events so that start-date and end-date are actual date objects and we have a duration property
const parseEvents = data => {
	const events = data.map(event => {
		const startDate = new Date(event[`start-date`])
		const endDate = new Date(event[`end-date`] ?? event[`start-date`])
		const durationInMilliseconds = endDate.getTime() - startDate.getTime()

		const parsedResult = {
			type: event.type,
			title: event.title,
			desc: event.desc,
			style: event.style,
			startDate: startDate,
			endDate: endDate,
			layer: 0,
			durationInMilliseconds: durationInMilliseconds
		}

		return parsedResult
	})

	return events
}

const assignEventLayers = events => {
	for (let i = 1; i < events.length; i++) {
		for (let j = 0; j < i; j++) {
			const currentEvent = events[i]
			const previousEvent = events[j]

			const currentStart = currentEvent.startDate.getTime()
			const currentEnd = currentEvent.endDate.getTime()
			const previousStart = previousEvent.startDate.getTime()
			const previousEnd = previousEvent.endDate.getTime()

			const isSharingSameSpace = 
				currentStart < previousEnd &&
				currentEnd > previousStart

			if (!isSharingSameSpace)
				continue

			const previousLayer = previousEvent.layer ?? 0
			currentEvent.layer = previousLayer + 1
		}
	}
}
const eventsListToLayers = events => {
	const layers = []
	for (const event of events) {
		if (!layers[event.layer]?.length)
			layers[event.layer] = []

		layers[event.layer].push(event)
	}
	return layers
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
	drawSegment(-1, 0, millisecondsToDays(totalDuration), ["main", "disabled"])
	timelineElement.style.height = `${millisecondsToDays(totalDuration) * SCALE}px`

	assignEventLayers(events)
	const layers = eventsListToLayers(events)

	for (const event of events) {
		const durationInDays = millisecondsToDays(event.durationInMilliseconds)
		const startInDays = millisecondsToDays(event.startDate.getTime() - events[0].startDate.getTime())
		drawSegment(event.layer, startInDays, durationInDays, event.style ? [event.style] : [])
	}
}

// only responsible for drawing, does not care about anything else
const drawSegment = (x, y, height, styles = []) => {
	const line = document.createElement(`div`)
	line.classList.add(`line`)

	line.classList.add(...styles)

	const finalHeight = height * SCALE
	line.style.top = `${y * SCALE}px`
	line.style.height = `${finalHeight}px`
	line.style.left = `${x * 28}px`

	timelineElement.appendChild(line)
}

const main = (_ => {
	const events = parseEvents(rawEventsList)

	// sorts events by start date
	events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

	renderTimeline(events)
})()