import { SiteOutage } from "../objects/site-outage";
import { HttpProvider } from "./http-provider";

export class ApiProvider {

    endpointPrefix;

    constructor(private http: HttpProvider) {
        this.endpointPrefix = "https://api.krakenflex.systems/interview-tests-mock-api/v1/";
        this.http.AddHeader("x-api-key", "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23");
    }

    async PostEnhancedSiteOutage(outages: SiteOutage[], site: string) {
        console.dir("Sending...");
        console.dir(outages);
        let post = await this.http.Post(this.endpointPrefix + "site-outages/" + site, JSON.stringify(outages));
        console.dir("Response...");
        console.dir(post);
        return post;
    }

    AttachDisplayNames(outages, siteInfo): SiteOutage[] {
        let siteOutages = [];
        for (let i = 0; i < outages.length; i++) {
            if (siteInfo[outages[i]['id']] != null) {
                let temp: SiteOutage = { id: outages[i]['id'], name: siteInfo[outages[i]['id']], begin: outages[i]['begin'], end: outages[i]['end'] };
                siteOutages.push(temp);
            }
        }
        return siteOutages;
    }

    async FilterOutages(date, devices) {
        let outages = await this.http.Get(this.endpointPrefix + "outages");
        outages = outages.filter(outage => new Date(outage['begin']) >= new Date(date));
        outages = outages.filter(outage => devices[outage['id']] != null);
        return outages;
    }

    IndexDevices(devices) {
        let indexedDevices = {}
        for (let i = 0; i < devices.length; i++) {
            indexedDevices[devices[i]['id']] = devices[i]['name'];
        }
        return indexedDevices;
    }

    async FetchSiteInfo(site) {
        let siteInfo = await this.http.Get(this.endpointPrefix + "site-info/" + site);
        return siteInfo;
    }
}


