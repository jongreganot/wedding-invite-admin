export async function fetchData(resource) {
    let response = await fetch(`https://vyqjr19af0.execute-api.ap-northeast-1.amazonaws.com/dev${resource}`);
    let data = await response.json();

    return data;
}