# API4AI personal protective equipment detection sample

This directory contains a minimalistic sample that sends requests to the API4AI Personal Protective Equipment Detection API.
The sample is implemented in `C#` using [.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0).


## Overview

The service allows to perform people detection and classify if the found person has any personal protective equipment.


## Getting started (Visual Studio)

Open `sample.sln` solution file in Visual Studio as usual and click "Run". 


## Getting started (Command line)

Try sample with default args:

```bash
dotnet run
```

Try sample with your local image:

```bash
dotnet run -- image.jpg
```


## About API keys

This demo by default sends requests to free endpoint at `demo.api4ai.cloud`.
Demo endpoint is rate limited and should not be used in real projects.

Use [RapidAPI marketplace](https://rapidapi.com/api4ai-api4ai-default/api/personal-protective-equipment/details) to get the API key. The marketplace offers both
free and paid subscriptions.

[Contact us](https://api4.ai/contacts?utm_source=ppe_example_repo&utm_medium=readme&utm_campaign=examples) in case of any questions or to request a custom pricing plan
that better meets your business requirements.


## Links

* 📩 Email: hello@api4.ai
* 🔗 Website: [http://api4.ai](https://api4.ai?utm_source=ppe_example_repo&utm_medium=readme&utm_campaign=examples)
* 🤖 Telegram demo bot: https://t.me/a4a_ppe_bot
* 🔵 Our API at RapidAPI marketplace: https://rapidapi.com/api4ai-api4ai-default/api/personal-protective-equipment/details
