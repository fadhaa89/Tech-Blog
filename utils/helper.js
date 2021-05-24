function formatDate(date) {
    // return `${new Date(date).getMonth() 0}
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
}

// formatDate
// }
module.exports = {
    formatDate
}