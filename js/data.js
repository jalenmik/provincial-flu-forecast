export async function loadDataset(name) {

    const response = await fetch(`./data/${name}.json`);

    if (!response.ok)
        throw new Error(`Cannot load ${name}`);

    return await response.json();

}
