try {
    if (process.env.OTEL_ENABLED == 'true') {
        require('@godspeedsystems/tracing').initialize();
    }
} catch (error) {
    console.error("OTEL_ENABLED is set, unable to initialize opentelemetry tracing.");
    console.error(error);
    process.exit(1);
}

import Godspeed from "@godspeedsystems/core";

let gsApp: any;
let expressApp: any;
let initialized = false;

export default async function handler(req: any, res: any) {
  try {
    if (!initialized) {
      gsApp = new Godspeed();
      await gsApp.initialize();
      expressApp = gsApp.eventsources.http.client;
      initialized = true;
    }
    return expressApp(req, res);
  } catch (error) {
    console.error('Function error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Export the Express app (http client) for advanced use cases
export const app = expressApp;

// // Add this for local/serverful mode:
if (require.main === module) {
  (async () => {
    const gsApp = new Godspeed();
    await gsApp.initialize();
    const app = gsApp.eventsources.http.client;
    const port = process.env.PORT || 3000;
    if (app && typeof app.listen === 'function') {
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } else {
      console.error('Express app instance not found or does not have a listen method.');
    }
  })();
}
