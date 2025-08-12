
const fetchApiClient = async ({ url, option }: any) => {

    const res = await fetch(url.toString(), {
        cache: 'no-cache',
        ...option,
    });

    if (res.status === 204 || res.status === 401) return [];
    const data = await res.json();
    return data;
};

export default fetchApiClient;
