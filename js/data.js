export async function loadDataset(name) {

    const response = await fetch(`./data/${name}.json`, {
        cache: 'no-store'
    });

    if (!response.ok)
        throw new Error(`Cannot load ${name}`);

    return await response.json();

}
