const datasetsURL = "https://public.singularitynet.io/nature20/chad-datasets.json"

const chartCanvas = document.getElementById("chart").getContext("2d")
const datasetsTable = document.getElementById("datasetsTable")
const dataContainer = document.getElementById("dataContainer")

window.Chart.defaults.global.maintainAspectRatio = false

window.currentChart = null

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

  const row = document.createElement("tr")
  row.appendChild(document.createElement("td")).appendChild(chartLink)
  row.appendChild(document.createElement("td")).appendChild(timeframeSpan)
  row.appendChild(document.createElement("td")).appendChild(goalDataLink)
  row.appendChild(document.createElement("td")).appendChild(realDataLink)

  chartLink.addEventListener("click", () => {
    if (!chartLink.hasAttribute("active")) {
      for (var element of document.getElementsByClassName("chart-link")) {
        element.removeAttribute("active")
      }
      chartLink.setAttribute("active", "")
      if (window.currentChart !== null && typeof(window.currentChart) !== "undefined") {
        window.currentChart.destroy()
      }
      window.currentChart = dataContainer.removeAttribute("hidden")
      createLineChart(data, goalData, label, labels)
    } else {
      chartLink.removeAttribute("active")
      dataContainer.setAttribute("hidden", "")
    }
  })

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
        "data": Array(labels.length - goalData.length -1).fill(null).concat(goalData),
        "fill": false,
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "borderColor": "rgba(120, 200, 200, 1)"
      }]
    }
  })
}

fetch(datasetsURL)
  .then(data => data.json())
  .then(datasets => {
    datasets.forEach(dataset => {
      datasetsTable.append(createTableRow(dataset))
    })
  })
