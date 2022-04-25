#!/bin/bash


# Use 'demo' mode just to try api4ai for free. Free demo is rate limited.
# For more details visit:
#   https://api4.ai
MODE="demo"



# Define URL and headers.
if [[ "${MODE}" == "demo" ]]; then
    URL="https://demo.api4ai.cloud/ppe/v1/results"
    HEADERS="A4A-CLIENT-APP-ID: sample"  # optional header
else
    echo "Unsupported sample mode"
    exit 1
fi


# Path or URL to image.
IMAGE=${1:-"https://storage.googleapis.com/api4ai-static/samples/ppe-3.jpg"}

# POST.
if [[ "${IMAGE}" =~ "://" ]]; then
    # POST image via URL.
    curl -s -X POST -H "${HEADERS}" "${URL}" -F "url=${IMAGE}"
else
    # POST image as file.
    curl -s -X POST -H "${HEADERS}" "${URL}" -F "image=@${IMAGE}"
fi
