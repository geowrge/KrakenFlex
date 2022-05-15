import fetch, { Headers } from 'node-fetch';


export class HttpProvider {

    headers: Headers;
    pause = ms => new Promise(r => setTimeout(r, ms));

    constructor() {
        this.headers = new Headers();
    }

    async Get(url: string) {
        let response = await fetch(url, { headers: this.headers });
        let data = await response.json();
        if (response.status === 500) {
            for (let attempt = 1; attempt <= 3; attempt++) {
                response = await fetch(url, { headers: this.headers });
                if (response.status === 200) {
                    data = await response.json();
                    break;
                }
            }
        }
        return data;
    }

    async Post(url: string, body: any) {
        let response = await fetch(url, { headers: this.headers, method: 'POST', body: body });
        let data = await response.json();
        console.dir(response);
        if (response.status === 500) {
            for (let attempt = 1; attempt <= 3; attempt++) {
                response = await fetch(url, { headers: this.headers, method: 'POST', body: body });
                if (response.status === 200) {
                    data = await response.json();
                    break;
                }
            }
        }
        return data;
    }

    AddHeader(name: string, value: string) {
        this.headers.set(name, value)
    }

}