import { HttpProvider } from "./providers/http-provider";
import { ApiProvider } from "./providers/api-provider";

let http = new HttpProvider();
let out = new ApiProvider(http);

out.FetchSiteInfo("norwich-pear-tree").then(siteInfo => {
    console.dir(siteInfo);
    let indexedDevices = out.IndexDevices(siteInfo['devices']);
    out.FilterOutages("2022-01-01T00:00:00.000Z", indexedDevices).then(outages => {
        let display = out.AttachDisplayNames(outages, indexedDevices);
        out.PostEnhancedSiteOutage(display, 'norwich-pear-tree');
    });
});