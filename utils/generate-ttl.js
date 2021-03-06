// Add 7 days time to live for each data
function generateTtl() {
    let currentData = new Date();
    return new Date(currentData.setDate(currentData.getDate() + 7));
}

module.exports = generateTtl;