function entryWhen(entry, comparison)
{
    const now = new Date();
    const entryDate = new Date(entry.date);
    return comparison(entryDate, now);
}

function entryCurrent(entry)
{
    return entryWhen(entry, (entryDate, now) => {
        const diff = Math.abs(entryDate.getTime() - now.getTime());
        return diff < 1000 * 3600 * 48;
    });
}

function entryPublic(entry)
{
    return entryWhen(entry, (entryDate, now) => {
        return entryDate.getTime() < now.getTime();
    });
}

module.exports = {
    entryPublic,
    entryCurrent
};