const data = [ // temporary, intended to be moved to its own file later on
	{
		"start-date": "2021-01-23",
		"end-date": "2021-02-08",
		"type": "period",
		"title": "Gacha Mudae",
		"desc": "Período de gacha da Mudae, quando o servidor se dividiu em facções para conquistas waifus e husbandos no servidor"
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

// TODO: figure out what to do if two events overlap. or do we just assume they wont?

// TODO: add support for singular incidents, w/o end-date

// TODO: work on adding titles/desc to events

// TODO: add types of segments, so as to theme the timeline a bit. 
//		chinese event could have a chinese-themed background to its segment, 
//		spears-vs-swords could have an icon of sorts, etc



// parses events so that start-date and end-date are actual date objects and we have a duration property
const parseEvents = data => {
	events = []
	for (const event of data) {
		const startDate = new Date(event[`start-date`])
		const endDate = new Date(event[`end-date`])
		const durationInMilliseconds = endDate.getTime() - startDate.getTime()

		const parsedResult = { // maybe .map'ing it works as well? this kinda ugly
			type: event.type,
			title: event.title,
			desc: event.desc,
			startDate: startDate,
			endDate: endDate,
			durationInMilliseconds: durationInMilliseconds
		}

		events.push(parsedResult)
	}

	return events
}

// drawing is actually delegated to drawSegment
const drawTimeline = data => {
	let lastEndTime = false
	for (const [index, event] of data.entries()) {

		if (lastEndTime) {
			const durationInMilliseconds = event.startDate.getTime() - lastEndTime
			const durationInDays = Utils.millisecondsToDays(durationInMilliseconds)

			// draws "empty space" between events, could be its own function maybe? also not robust enough rn
			drawSegment(durationInDays, false)
		}

		const durationInDays = Utils.millisecondsToDays(event.durationInMilliseconds)
		lastEndTime = event.endDate.getTime()
		drawSegment(durationInDays)
	}
}

// only responsible for drawing, does not care about anything else
const drawSegment = (height, active = true) => {
	const line = document.createElement(`div`)
	line.classList.add(`line`)

	if (!active)
		line.classList.add(`disabled`)

	const finalHeight = Math.max(height * 2, 10) // FIXME: magic numbers
	line.style.height = `${finalHeight}px`

	document.body.appendChild(line) // FIXME: maybe we should be drawing to a wrapper element made by drawTimeline instead?
}

const main = _ => {
	const events = parseEvents(data)

	// sorts events by start date
	events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

	drawTimeline(events)
}