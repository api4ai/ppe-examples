#!/usr/bin/env python3

"""Example of using API4AI personal protective equipment detection."""

import asyncio
import sys

import aiohttp


# Use 'demo' mode just to try api4ai for free. Free demo is rate limited.
# For more details visit:
#   https://api4.ai
#
MODE = 'demo'


OPTIONS = {
    'demo': {
        'url': 'https://demo.api4ai.cloud/ppe/v1/results',
        'headers': {'A4A-CLIENT-APP-ID': 'sample'}
    }
}


async def main():
    """Entry point."""
    image = sys.argv[1] if len(sys.argv) > 1 else 'https://storage.googleapis.com/api4ai-static/samples/ppe-1.jpg'

    async with aiohttp.ClientSession() as session:
        if '://' in image:
            # Data from image URL.
            data = {'url': image}
        else:
            # Data from local image file.
            data = {'image': open(image, 'rb')}
        # Make request.
        async with session.post(OPTIONS[MODE]['url'],
                                data=data,
                                headers=OPTIONS[MODE]['headers']) as response:
            resp_json = await response.json()
            resp_text = await response.text()

        # Print raw response.
        print(f'💬 Raw response:\n{resp_text}\n')

        # Parse response and print people count and detected equipment.
        objects = [x['entities'][1]['classes']
                   for x in resp_json['results'][0]['entities'][0]['objects']]

        print(f'💬 {len(objects)} person(s) detected:')
        for num, obj in enumerate(objects, start=1):
            print(f'  Person {num}:')
            glasses = '✅' if obj['glass'] > obj['noglass'] else '❌'
            print(f'    {glasses} glasses')
            helmet = '✅' if obj['helmet'] > obj['nohelmet'] else '❌'
            print(f'    {helmet} helmet')
            vest = '✅' if obj['vest'] > obj['novest'] else '❌'
            print(f'    {vest} vest')


if __name__ == '__main__':
    # Run async function in asyncio loop.
    asyncio.run(main())
