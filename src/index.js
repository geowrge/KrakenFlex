"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_provider_1 = require("./providers/http-provider");
const api_provider_1 = require("./providers/api-provider");
let http = new http_provider_1.HttpProvider();
let out = new api_provider_1.ApiProvider(http);
out.FetchSiteInfo("norwich-pear-tree").then(siteInfo => {
    console.dir(siteInfo);
    let indexedDevices = out.IndexDevices(siteInfo['devices']);
    out.FilterOutages("2022-01-01T00:00:00.000Z", indexedDevices).then(outages => {
        let display = out.AttachDisplayNames(outages, indexedDevices);
        out.PostEnhancedSiteOutage(display, 'norwich-pear-tree');
    });
});
