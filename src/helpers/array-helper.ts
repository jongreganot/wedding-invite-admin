
export const orderBy = (items) => {
    return items.filter(i => i.isActive).sort((a, b) => a.userId - b.userId);
}

export const filterItems = (items, query) => {
    return items.filter((item) => {
        if (!item.isActive) return false;

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