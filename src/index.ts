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
  if (!initialized) {
    gsApp = new Godspeed();
    await gsApp.initialize();
    console.log("XXX",gsApp)
    expressApp = gsApp.eventsources.http.client;
    initialized = true;
  }
  return expressApp(req, res);
}

// // Add this for local/serverful mode:
if (require.main === module) {
  (async () => {
    const gsApp = new Godspeed();
    await gsApp.initialize();
    console.log("zzz",gsApp)
  })();
}
