// This uses "Deno" as a server host on local machine. Find more info on their website. 
import { serve } from "https://deno.land/std@0.199.0/http/server.ts";

// Serve static files
async function serveStaticFile(path, contentType) {
    try {
        const data = await Deno.readFile(path);
        return new Response(data, {
            headers: { "Content-Type": contentType },
        });
    } catch {
        return new Response("File not found", { status: 404 });
    }
}

// Handle incoming requests, basically just add routes to new pages you make in here following examples here. GET, PUT, DELETE, UPDATE are probably your main methods you will ever use.
async function handler(req) {
    const url = new URL(req.url);

    // Route: Serve static files
    if (url.pathname.startsWith("/static/")) {
        const filePath = `.${url.pathname}`;
        const contentType = getContentType(filePath);
        return await serveStaticFile(filePath, contentType);
    }

    // Route: First index page
    if (url.pathname === "/" && req.method === "GET") {
        const response = await serveStaticFile('./views/index.html', 'text/html');
        // These are content headers used to make websites more secure and to allow or deny certain features from working. They are also very effective way to break functionalities.

        /*response.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'");
        response.headers.set("X-Frame-Options", "DENY");
        response.headers.set("X-Content-Type-Options", "nosniff");*/
        return response;
    }

    // Route: Second index page
    if (url.pathname === "/secondIndexPage" && req.method === "GET") {
        const response = await serveStaticFile('./views/secondIndex.html', 'text/html');
        // These are content headers used to make websites more secure and to allow or deny certain features from working. They are also very effective way to break functionalities.

        /*response.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self'; connect-src 'self'");
        response.headers.set("X-Frame-Options", "DENY");
        response.headers.set("X-Content-Type-Options", "nosniff");*/
        return response;
    }

    // Base response for website not found
    return new Response("Not Found", { status: 404 });
}

// Utility: Get content type for static files.
// Used t just tell what anything is. Not really necessary but cool to have.
function getContentType(filePath) {
    const ext = filePath.split(".").pop();
    const mimeTypes = {
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        gif: "image/gif",
        svg: "image/svg+xml",
        json: "application/json",
    };
    return mimeTypes[ext] || "application/octet-stream";
}

// This starts the server
serve(handler, { port: 8000 });
// Browswer URL localhost:8000 for index page, localhost:8000/secondIndexPage for second.

// Command to run application: deno run --allow-net --allow-env --allow-read --watch app.js
