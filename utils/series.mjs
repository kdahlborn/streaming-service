export const createSeries = (series) => {
    const seriesId = crypto.randomUUID().slice(0, 5);

    return {
        PK: `SERIES:${seriesId}`,
        SK: `SERIES:${seriesId}`,
        type: 'series',
        ...series,
    };
};
