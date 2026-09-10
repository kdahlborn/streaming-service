export const createEpisode = (seriesId, season, episode) => {
    return {
        PK: `SERIES:${seriesId}`,
        SK: `SEASON:${season}#EPISODE:${episode.episodeNumber}`,
        seasonNumber: Number(season),
        type: 'episode',
        ...episode,
    };
};
