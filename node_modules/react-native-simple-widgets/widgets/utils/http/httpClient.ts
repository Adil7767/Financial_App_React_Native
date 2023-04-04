async function parseResponse(response) {
    const bodyText = await response.text();
    const { ok, status, statusText, serverTime } = response;

    try {
        const body = JSON.parse(bodyText);
        return { ok, status, statusText, body, url: response.url, serverTime };
    } catch (error) {
        return { ok, status, statusText, body: bodyText, url: response.url };
    }
}

function removeURLTrailingSlash(url) {
    return url.length > 0 && url.endsWith("/") ? url.slice(0, -1) : url;
}

async function get(url, requestConfig = {} as any) {
    const { baseUrl, params, headers = {}, requireServerTime } = requestConfig;
    const urlWithParams = new URL(url, baseUrl);
    if (params) {
        Object.keys(params)
            .filter(key => params[key] && params[key] !== "")
            .forEach(key => {
                if (Array.isArray(params[key])) {
                    params[key].forEach(value => {
                        urlWithParams.searchParams.append(key, value);
                    });
                } else {
                    urlWithParams.searchParams.append(key, params[key]);
                }
            });
    }

    // Fix React Native URL issue with trailing slash added automatically at the end. https://github.com/facebook/react-native/issues/24428
    const requestUrl = removeURLTrailingSlash(urlWithParams.toString());

    return fetch(requestUrl, {
        method: "GET",
        headers,
    })
        .then(async response => {
            const { ok, status, statusText, body } = await parseResponse(response);
            return {
                ok,
                status,
                statusText,
                extraData: {
                    serverTime:
                        requireServerTime && new Date(response.headers.get("Date")),
                },
                body,
            };
        })
        .catch(error => {
            // console.log(`Error : ${requestUrl}`, error);
            return {
                ok: false,
                status: 500,
                body: error,
            };
        });
}

const createRequest = method => async (url, requestConfig = {} as any) => {
    const { baseUrl = "", params, headers = {} } = requestConfig;
    const requestUrl = removeURLTrailingSlash(baseUrl.toString());

    return fetch(`${requestUrl}${url}`, {
        method,
        headers,
        body: JSON.stringify(params),
    })
        .then(parseResponse)
        .catch(error => ({
            ok: false,
            status: 500,
            body: error,
        }));
};

const createPostUrlencodedRequest = method => async (url, requestConfig = {} as any) => {
    const { baseUrl = "", params, headers = {} } = requestConfig;
    const requestUrl = removeURLTrailingSlash(baseUrl.toString());

    const formBody = [];
    for (const property in params) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    return fetch(`${requestUrl}${url}`, {
        method,
        headers,
        body: formBody.join("&"),
    })
        .then(parseResponse)
        .catch(error => ({
            ok: false,
            status: 500,
            body: error,
        }));
};

const createPostFileRequest = method => async (url, requestConfig = {} as any) => {
    const { baseUrl = "", params, headers = {} } = requestConfig;
    const requestUrl = removeURLTrailingSlash(baseUrl.toString());

    const fd = new FormData();
    fd.append("file", params.file);

    Object.keys(params)
        .filter((key) => params[key] && params[key] !== "")
        .forEach((key) => {
            fd.append(key, params[key]);
        });

    return fetch(`${requestUrl}${url}`, {
        method,
        headers,
        body: fd,
    })
        .then(parseResponse)
        .catch(error => ({
            ok: false,
            status: 500,
            body: error,
        }));
};

const put = createRequest("PUT");
const remove = createRequest("DELETE");
const post = createRequest("POST");
const postUrlencoded = createPostUrlencodedRequest("POST");
const postFile = createPostFileRequest("POST");

const request = { get, put, remove, post, postUrlencoded, postFile  };

export { get, put, remove, post, postUrlencoded, postFile };
export default request;
