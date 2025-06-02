import { GSCloudEvent, GSContext, PlainObject, GSStatus } from "@godspeedsystems/core";
export default function (ctx: GSContext, args: PlainObject) {
  
    return new GSStatus(true, 200, undefined, 'Hello welcome to godspeed', undefined);  
}