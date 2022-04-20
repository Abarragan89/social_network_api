function formatDate (date) {
    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear;

    return `${month}/${date}/${year}`
}

module.exports = formatDate;