import { gql } from "@apollo/client";
import client from "./ApolloClient";
import { TrackInputInterface, TrackInterface } from "../interfaces/Track.Interface";

// Fetch all tracks
export const getTracks = async (): Promise<TrackInterface[]> => {
    const { data } = await client.query({
        query: gql`
            query findAllTracks {
                findAllTracks {
                    id
                    title
                    album {
                        id
                        title
                    }
                    artist {
                        id
                        name
                    }
                    time
                    spotifyTrackId
                    url
                    previewUrl
                    trackNumber
                }
            }
        `,
        fetchPolicy: 'no-cache',
    });
    return data.findAllTracks;
};

// Fetch a track by ID
export const getTrackById = async (id: string): Promise<TrackInterface> => {
    const { data } = await client.query({
        query: gql`
            query findTrackById($id: ID!) {
                findTrackById(id: $id) {
                    id
                    title
                    album {
                        id
                        title
                    }
                    artist {
                        id
                        name
                    }
                    time
                    spotifyTrackId
                    url
                    previewUrl
                    trackNumber
                }
            }
        `,
        fetchPolicy: 'no-cache',
        variables: { id },
    });
    return data.findTrackById;
};

// Create a new track
export const createTrack = async (trackInput: TrackInterface): Promise<TrackInterface> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation createTrack($trackInput: TrackInput!) {
                createTrack(trackInput: $trackInput) {
                    id
                    title
                    album {
                        id
                        title
                    }
                    artist {
                        id
                        name
                    }
                    time
                    spotifyTrackId
                    url
                    previewUrl
                    trackNumber
                }
            }
        `,
        fetchPolicy: 'no-cache',
        variables: { trackInput },
    });
    return data.createTrack;
};

// Update an existing track
export const updateTrack = async (id: string, trackInput: Partial<TrackInterface>): Promise<TrackInterface> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation updateTrack($id: ID!, $trackInput: TrackInput!) {
                updateTrack(id: $id, trackInput: $trackInput) {
                    id
                    title
                    album {
                        id
                        title
                    }
                    artist {
                        id
                        name
                    }
                    time
                    spotifyTrackId
                    url
                    previewUrl
                    trackNumber
                }
            }
        `,
        fetchPolicy: 'no-cache',
        variables: { id, trackInput },
    });
    return data.updateTrack;
};

// Delete a track by ID
export const deleteTrack = async (id: string): Promise<string> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation deleteTrack($id: ID!) {
                deleteTrack(id: $id)
            }
        `,
        fetchPolicy: 'no-cache',
        variables: { id },
    });
    return data.deleteTrack;
};

// Create multiple tracks
export const createTracks = async (trackInputList: TrackInputInterface[]): Promise<TrackInterface[]> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation createTracks($trackInputList: [TrackInput]!) {
                createTracks(trackInputList: $trackInputList) {
                    id
                    title
                    album {
                        id
                        title
                    }
                    artist {
                        id
                        name
                    }
                    time
                    spotifyTrackId
                    url
                    previewUrl
                    trackNumber
                }
            }
        `,
        fetchPolicy: 'no-cache',
        variables: { trackInputList },
    });
    return data.createTracks;
};

// Update multiple tracks
export const updateTracks = async (trackUpdates: { id: string, trackInput: Partial<TrackInputInterface> }[]): Promise<TrackInterface[]> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation updateTracks($trackUpdates: [TrackUpdateInput]!) {
                updateTracks(trackUpdates: $trackUpdates) {
                    id
                    title
                    album {
                        id
                        title
                    }
                    artist {
                        id
                        name
                    }
                    time
                    spotifyTrackId
                    url
                    previewUrl
                    trackNumber
                }
            }
        `,
        fetchPolicy: 'no-cache',
        variables: { trackUpdates },
    });
    return data.updateTracks;
};

// Delete multiple tracks
export const deleteTracks = async (trackIds: string[]): Promise<string> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation deleteTracks($trackIds: [ID]!) {
                deleteTracks(trackIds: $trackIds)
            }
        `,
        fetchPolicy: 'no-cache',
        variables: { trackIds },
    });
    return data.deleteTracks;
};
