export async function fetchData(resource) {
    let response = await fetch(`https://vyqjr19af0.execute-api.ap-northeast-1.amazonaws.com/dev${resource}`);
    let data = await response.json();

    return data;
}

export async function postData(resource, body) {
    let response = await fetch(`https://vyqjr19af0.execute-api.ap-northeast-1.amazonaws.com/dev${resource}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    let data = await response.json();

    return data;
}