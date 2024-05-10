const averageRating = (ratings) => {
    let sumRating = 0;
    for (let i = 0; i < ratings.length; i++) {
        sumRating += ratings[i].rating
    }
    return sumRating/ratings.length;
}

const averageCost = (costs) => {
    if (costs.length === 0) {
        return 0; // or return some default value, depending on your requirements
    }

    console.log('Costs:', costs);
    console.log('Length:', costs.length);

    let sumCost = 0;
    for (let i = 0; i < costs.length; i++) {
        const totalCost = parseFloat(costs[i].total_cost);
        sumCost += totalCost;
    }
    return sumCost / costs.length;
}

module.exports = { averageCost, averageRating };