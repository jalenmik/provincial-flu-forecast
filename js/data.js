export async function loadDataset(name) {

    const DATA_DATE = "2026-11-19";
    const response = await fetch(`./data/${name}${DATA_DATE}.json`, {
        cache: 'no-store'
    });

    if (!response.ok)
        throw new Error(`Cannot load ${name}`);

    return await response.json();

}
