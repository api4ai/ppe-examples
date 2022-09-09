#!/usr/bin/env node

// Example of using API4AI personal protective equipment detection.
const fs = require('fs')
const path = require('path')
const axios = require('axios').default
const FormData = require('form-data')

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

// Parse args: path or URL to image.
const image = process.argv[2] || 'https://storage.googleapis.com/api4ai-static/samples/ppe-3.jpg'

// Preapare request: form.
const form = new FormData()
if (image.includes('://')) {
  // Data from image URL.
  form.append('url', image)
} else {
  // Data from local image file.
  const fileName = path.basename(image)
  form.append('image', fs.readFileSync(image), fileName)
}

// Preapare request: headers.
const headers = {
  ...OPTIONS[MODE].headers,
  ...form.getHeaders(),
  'Content-Length': form.getLengthSync()
}

// Make request.
axios.post(OPTIONS[MODE].url, form, { headers })
  .then(function (response) {
    // Print raw response.
    console.log(`💬 Raw response:\n${JSON.stringify(response.data)}\n`)

    // Parse response and print people count and detected equipment.
    const objects = response.data.results[0].entities[0].objects
      .map((obj) => obj.entities[1].classes)

    console.log(`💬 ${objects.length} person(s) detected:`)
    objects.forEach((obj, index) => {
      console.log(`  Person ${index + 1}:`)
      const glasses = obj.glass > obj.noglass ? '✅' : '❌'
      console.log(`    ${glasses} glasses`)
      const helmet = obj.helmet > obj.nohelmet ? '✅' : '❌'
      console.log(`    ${helmet} helmet`)
      const vest = obj.vest > obj.novest ? '✅' : '❌'
      console.log(`    ${vest} vest`)
    })
  })
