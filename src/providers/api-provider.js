"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiProvider = void 0;
class ApiProvider {
    constructor(http) {
        this.http = http;
        this.endpointPrefix = "https://api.krakenflex.systems/interview-tests-mock-api/v1/";
        this.http.AddHeader("x-api-key", "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23");
    }
    PostEnhancedSiteOutage(outages, site) {
        return __awaiter(this, void 0, void 0, function* () {
            console.dir("Sending...");
            console.dir(outages);
            let post = yield this.http.Post(this.endpointPrefix + "site-outages/" + site, JSON.stringify(outages));
            console.dir("Response...");
            console.dir(post);
            return post;
        });
    }
    AttachDisplayNames(outages, siteInfo) {
        let siteOutages = [];
        for (let i = 0; i < outages.length; i++) {
            if (siteInfo[outages[i]['id']] != null) {
                let temp = { id: outages[i]['id'], name: siteInfo[outages[i]['id']], begin: outages[i]['begin'], end: outages[i]['end'] };
                siteOutages.push(temp);
            }
        }
        return siteOutages;
    }
    FilterOutages(date, devices) {
        return __awaiter(this, void 0, void 0, function* () {
            let outages = yield this.http.Get(this.endpointPrefix + "outages");
            outages = outages.filter(outage => new Date(outage['begin']) >= new Date(date));
            outages = outages.filter(outage => devices[outage['id']] != null);
            return outages;
        });
    }
    IndexDevices(devices) {
        let indexedDevices = {};
        for (let i = 0; i < devices.length; i++) {
            indexedDevices[devices[i]['id']] = devices[i]['name'];
        }
        return indexedDevices;
    }
    FetchSiteInfo(site) {
        return __awaiter(this, void 0, void 0, function* () {
            let siteInfo = yield this.http.Get(this.endpointPrefix + "site-info/" + site);
            return siteInfo;
        });
    }
}
exports.ApiProvider = ApiProvider;
