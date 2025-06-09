export function average(arr: number[]): number
{
    return arr.reduce<number>((acc, cur, i, arr) => acc + cur / arr.length, 0);
}

export async function getDataFromApi<T>(url: string, signal?: { signal: AbortSignal }): Promise<T>
{
    const response = await fetch(url, signal);

    if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

    const data: T = await response.json();

    return data;
}