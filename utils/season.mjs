export const createSeason = (seriesId, seasonNumber) => {
    return {
        PK: `SERIES:${seriesId}`,
        SK: `SEASON:${seasonNumber}`,
        type: 'season',
        seasonNumber,
        title: `Season ${seasonNumber}`,
    };
};
