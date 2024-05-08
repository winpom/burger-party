const averageRating = (ratings) => {
    let sumRating = 0;
    for (let i = 0; i < ratings.length; i++) {
        sumRating += ratings[i].rating
    }
    return sumRating/ratings.length;
}

const averageCost = (costs) => {
    let sumCost = 0;
    for (let i = 0; i < costs.length; i++) {
        sumCost += costs[i].total_cost
    }
    return sumCost/costs.length;
}

module.exports = { averageCost, averageRating };