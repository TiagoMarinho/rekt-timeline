export default [
	{"title": "rekto", "start-date": "06-10-2020", "end-date": "16-10-2020"},
	{"title": "refinado", "start-date": "17-11-2020", "end-date": "17-11-2020"},
	{"title": "deprektion", "start-date": "04-12-2020", "end-date": "14-12-2020"},
	{"title": "natal 2020", "start-date": "15-12-2020", "end-date": "25-12-2020"},
	{"title": "periodo rpg", "start-date": "29-12-2020", "end-date": "18-01-2021"},
	{"title": "periodo gacha", "start-date": "23-01-2021", "end-date": "08-02-2021"},
	{"title": "kawaii", "start-date": "20-04-2021", "end-date": "04-05-2021"},
	{"title": "periodo minecraft 1", "start-date": "04-05-2021", "end-date": "12-05-2021"},
	{"title": "rekto 2", "start-date": "24-07-2021", "end-date": "12-08-2021"},
	{"title": "niver genshin", "start-date": "11-09-2021", "end-date": "01-10-2021"},
	{"title": "gaykt", "start-date": "25-02-2022", "end-date": "04-03-2022"},
	{"title": "contando", "start-date": "15-03-2022", "end-date": "25-03-2022"},
	{"title": "periodo minecraft 2", "start-date": "5-04-2022", "end-date": "30-04-2022"},
	{"title": "national georekt", "start-date": "11-06-2022", "end-date": "20-06-2020"},
	{"title": "periodo /R9KT/", "start-date": "8-08-2022", "end-date": "14-08-2022"},
	{"title": "rekt records", "start-date": "23-08-2022", "end-date": "30-08-2022"},
	{"title": "rekt o' thieves", "start-date": "14-09-2022", "end-date": "22-09-2022"},
	{"title": "copa do mundo 2022", "start-date": "23-11-2022", "end-date": "9-12-2022"},
	{"title": "my little rekt", "start-date": "17-12-2022", "end-date": "24-12-2022"},
	{"title": "natal 2022", "start-date": "25-12-2022", "end-date": "26-12-2022"},
	{"title": "united states of rekt", "start-date": "10-01-2023", "end-date": "14-01-2023"},
	{"title": "periodo ryuichiano", "start-date": "31-03-2023", "end-date": "02-04-2023"},
	{"title": "periodo minecraft 3", "start-date": "16-05-2023", "end-date": "08-06-2023"},
	{"title": "united states of rekt 2", "start-date": "19-06-2023", "end-date": "01-07-2023"},
].map(event => {
	const startDateParts = event["start-date"].split(`-`)
	const endDateParts = event["end-date"].split(`-`)
	const result = {
		title: event.title,
		"start-date": startDateParts[1] + "-" + startDateParts[0] + "-" + startDateParts[2],
		"end-date": endDateParts[1] + "-" + endDateParts[0] + "-" + endDateParts[2]
	}
	return result
})
