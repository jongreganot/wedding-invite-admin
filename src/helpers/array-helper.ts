
export const orderBy = (items) => {
    return items.sort((a, b) => a.userId - b.userId);
}

export const filterItems = (items, query) => {
    return items.filter((item) => {
        if (typeof(query) === "boolean") {
            if (query === true)
                return item.hasConfirmed;
            else
                return true;
        }
        else {
            return (
                item.firstName.toLowerCase().includes(query.toLowerCase()) ||
                item.lastName.toLowerCase().includes(query.toLowerCase())
            )
        }
    });
}