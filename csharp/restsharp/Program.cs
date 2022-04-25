using System;
using System.Net.Http;
using System.Text.Json.Nodes;

using MimeTypes;
using RestSharp;


/*
 * Use "demo" mode just to try api4ai for free. Free demo is rate limited.
 * For more details visit:
 *   https://api4.ai
 */

const String MODE = "demo";

String url;
Dictionary<String, String> headers = new Dictionary<String, String>();

switch (MODE) {
    case "demo":
        url = "https://demo.api4ai.cloud/ppe/v1/results";
        headers.Add("A4A-CLIENT-APP-ID", "sample");
        break;
    default:
        Console.WriteLine($"[e] Unsupported mode: {MODE}");
        return 1;
}

// Prepare request.
String image = args.Length > 0 ? args[0] : "https://storage.googleapis.com/api4ai-static/samples/ppe-3.jpg";
var client = new RestClient(new RestClientOptions(url) { ThrowOnAnyError = true });
var request = new RestRequest();
if (image.Contains("://")) {
    request.AddParameter("url", image);
} else {
    request.AddFile("image", image, MimeTypeMap.GetMimeType(Path.GetExtension(image)));
}

// Perform request.
var jsonResponse = (await client.ExecutePostAsync(request)).Content!;

// Print raw response.
Console.WriteLine($"[i] Raw response:\n{jsonResponse}\n");

// Parse response and print people count and detected equipment.
JsonNode docRoot = JsonNode.Parse(jsonResponse)!.Root;
var objects = from obj in docRoot["results"]![0]!["entities"]![0]!["objects"]!.AsArray()
              select obj!["entities"]![1]!["classes"]!;
Console.WriteLine($"[i] {objects.Count()} persons(s) detected:");
foreach (var (obj, idx) in objects.Select((v, i) => (v, i))) {
    Console.WriteLine($"  Person {idx + 1}:");
    var glasses = (double)obj["glass"]! > (double)obj["noglass"]! ? "HAS" : "NO ";
    Console.WriteLine($"    {glasses} Glasses");
    var helmet = (double)obj["helmet"]! > (double)obj["nohelmet"]! ? "HAS" : "NO ";
    Console.WriteLine($"    {helmet} Helmet");
    var vest = (double)obj["vest"]! > (double)obj["novest"]! ? "HAS" : "NO ";
    Console.WriteLine($"    {vest} Vest");
}

return 0;
