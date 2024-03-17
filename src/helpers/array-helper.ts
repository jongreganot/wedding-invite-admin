
export const orderBy = (items) => {
    return items.sort((a, b) => a.userId - b.userId);
}

export const filterItems = (items, query) => {
    return items.filter((item) => {
        return (
            item.firstName.toLowerCase().includes(query.toLowerCase()) ||
            item.lastName.toLowerCase().includes(query.toLowerCase())
        )
    });
}