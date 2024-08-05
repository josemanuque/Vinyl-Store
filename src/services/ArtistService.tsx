import { ArtistInterface } from "../interfaces/Artist.Interface";


const API_URL = "http://localhost:3000/artist";

const createArtist = async (artist: ArtistInterface) => {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(artist),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const getArtists = async(): Promise<ArtistInterface[]> =>{
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const getArtist = async(id: string): Promise<ArtistInterface> =>{
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


const updateArtist = async(artist: ArtistInterface) =>{
    const response = await fetch(`${API_URL}/${artist._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(artist),
    });
    if (!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const deleteArtist = async(id: string) =>{
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export {
    createArtist,
    getArtist,
    getArtists,
    deleteArtist,
    updateArtist
}