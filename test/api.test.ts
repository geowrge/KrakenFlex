import { HttpProvider } from "../src/providers/http-provider";
import { ApiProvider } from "../src/providers/api-provider";

let http = new HttpProvider();
let api = new ApiProvider(http);

test('Tests Site Info endpoint fetches correct Site', () => {
    return api.FetchSiteInfo('norwich-pear-tree').then(response => {
        expect(response.name).toBe('Norwich Pear Tree');
    })
})

test('Tests Outages are correctly fetched and filtered', () => {
    return api.FilterOutages("2023-01-01T00:00:00.000Z", { "75e96db4-bba2-4035-8f43-df2cbd3da859": "Battery 8", }).then(response => {
        expect(response.length).toBe(1);
    })
})

test('Tests names are correctly assigned', () => {
    expect(api.AttachDisplayNames([{
        "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
        "begin": "2021-07-26T17:09:31.036Z",
        "end": "2021-08-29T00:37:42.253Z"
    }], { "002b28fc-283c-47ec-9af2-ea287336dc1b": "Battery 1" })).toEqual([{
        "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
        "name": "Battery 1",
        "begin": "2021-07-26T17:09:31.036Z",
        "end": "2021-08-29T00:37:42.253Z"
    }])
})

test('Tests devices are correctly indexed', () => {
    expect(api.IndexDevices([
        {
            "id": "002b28fc-283c-47ec-9af2-ea287336dc1b",
            "name": "Battery 1"
        },
        {
            "id": "086b0d53-b311-4441-aaf3-935646f03d4d",
            "name": "Battery 2"
        }
    ])).toEqual({
        "002b28fc-283c-47ec-9af2-ea287336dc1b": "Battery 1",
        "086b0d53-b311-4441-aaf3-935646f03d4d": "Battery 2"
    })
})