// Example of using API4AI Personal Protective Equipment detection.

// Use 'demo' mode just to try api4ai for free. Free demo is rate limited.
// For more details visit:
//   https://api4.ai
const MODE = 'demo'

const OPTIONS = {
  demo: {
    url: 'https://demo.api4ai.cloud/ppe/v1/results',
    headers: { 'A4A-CLIENT-APP-ID': 'sample' }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  const input = document.getElementById('file')
  const raw = document.getElementById('raw')
  const sectionRaw = document.getElementById('sectionRaw')
  const parsed = document.getElementById('parsed')
  const sectionParsed = document.getElementById('sectionParsed')
  const spinner = document.getElementById('spinner')

  input.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (!file) {
      return false
    }

    sectionRaw.hidden = true
    sectionParsed.hidden = true
    spinner.hidden = false

    // Preapare request: form.
    const form = new FormData()
    form.append('image', file)

    // Make request.
    // eslint-disable-next-line  no-undef -- axios appended to the html file via cdn.
    axios.post(OPTIONS[MODE].url, form, { headers: OPTIONS[MODE].headers })
      .then(function (response) {
        // Print raw response.
        raw.textContent = JSON.stringify(response.data, undefined, 2)
        sectionRaw.hidden = false
        // Parse response and print people count and detected equipment.
        const objects = response.data.results[0].entities[0].objects
          .map((obj) => obj.entities[1].classes)
        parsed.textContent = `${objects.length} person(s) detected:\n`
        objects.forEach((obj, index) => {
          parsed.textContent += `  Person ${index + 1}:\n`
          const glasses = obj.glass > obj.noglass ? '✅' : '❌'
          parsed.textContent += `    ${glasses} glasses\n`
          const helmet = obj.helmet > obj.nohelmet ? '✅' : '❌'
          parsed.textContent += `    ${helmet} helmet\n`
          const vest = obj.vest > obj.novest ? '✅' : '❌'
          parsed.textContent += `    ${vest} vest\n`
        })
        sectionParsed.hidden = false
      })
      .catch(function (error) {
        // Error can be handled here.
        console.error(error)
      })
      .then(function () {
        spinner.hidden = true
      })
  })
})
