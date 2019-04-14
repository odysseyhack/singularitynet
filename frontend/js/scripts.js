const chartCanvas = document.getElementById("chart").getContext("2d")
const datasetsTable = document.getElementById("datasetsTable")
const dataContainer = document.getElementById("dataContainer")

window.Chart.defaults.global.maintainAspectRatio = false

const datasets = [
  {
    "name": "Fonio yield",
    "timeframe": "Weekly",
    "goalDataURI": "#",
    "realDataURI": "#",
    "label": "Yield in tonnes",
    "labels": ["1", "2", "3"],
    "data": [10, 15, 3],
    "goalData": [11, 2, 4]
  },
  {
    "name": "Death rate",
    "timeframe": "Monthly",
    "goalDataURI": "#",
    "realDataURI": "#",
    "label": "Death rate (per 100 inhabitants)",
    "labels": ["1", "2", "3"],
    "data": [10, 15, 3],
    "goalData": [11, 2, 4]
  },
  {
    "name": "Malnutrition",
    "timeframe": "Yearly",
    "goalDataURI": "#",
    "realDataURI": "#",
    "label": "Malnutrition (per 100 inhabitants)",
    "labels": ["1", "2", "3"],
    "data": [10, 15, 3],
    "goalData": [11, 2, 4]
  }
]

function createTableRow(dataset) {
  const { name, timeframe, goalDataURI, realDataURI, label, labels, data, goalData } = dataset

  const chartLink = document.createElement("span")
  const timeframeSpan = document.createElement("span")
  const goalDataLink = document.createElement("a")
  const realDataLink = document.createElement("a")

  chartLink.classList.add("chart-link", "text-primary")
  timeframeSpan.classList.add("text-pale-sky")
  goalDataLink.classList.add("text-primary")
  realDataLink.classList.add("text-primary")

  chartLink.style.cursor = "pointer"
  chartLink.innerHTML = name

  goalDataLink.innerHTML = realDataLink.innerHTML = "Link"

  timeframeSpan.innerHTML = timeframe

  goalDataLink.setAttribute("href", goalDataURI)

  realDataLink.setAttribute("href", realDataURI)

  chartLink.addEventListener("click", () => {
    if (!chartLink.hasAttribute("active")) {
      for (var element of document.getElementsByClassName("chart-link")) {
        element.removeAttribute("active")
      }
      chartLink.setAttribute("active", "")
      dataContainer.removeAttribute("hidden")
      createLineChart(data, goalData, label, labels)
    } else {
      chartLink.removeAttribute("active")
      dataContainer.setAttribute("hidden", "")
    }
  })

  const row = document.createElement("tr")
  row.appendChild(document.createElement("td")).appendChild(chartLink)
  row.appendChild(document.createElement("td")).appendChild(timeframeSpan)
  row.appendChild(document.createElement("td")).appendChild(goalDataLink)
  row.appendChild(document.createElement("td")).appendChild(realDataLink)

  return row
}

function createLineChart(data, goalData, label, labels) {
  return new window.Chart(chartCanvas, {
    "type": "line",
    "data": {
      "labels": labels,
      "datasets": [{
        "label": label,
        "data": data,
        "fill": false,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "borderColor": "rgba(200, 120, 200, 1)"
      }, {
        "label": `${label} (goal)`,
        "data": goalData,
        "fill": false,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "borderColor": "rgba(120, 200, 200, 1)"
      }]
    }
  })
}

datasets.forEach(dataset => {
  datasetsTable.append(createTableRow(dataset))
})
