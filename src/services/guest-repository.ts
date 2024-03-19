export const getId = (guests) => {
    return Math.max(...guests.map(o => o.userId)) + 1;
}