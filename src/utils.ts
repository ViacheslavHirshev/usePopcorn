export function average(arr: number[])
{
    return arr.reduce<number>((acc, cur, i, arr) => acc + cur / arr.length, 0);
}