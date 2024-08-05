import { useEffect, useState } from "react";
import { ArtistInterface } from "../interfaces/Artist.Interface";
import { createArtist, deleteArtist, getArtists, updateArtist } from "../services/ArtistService";

const useArtist = () => {
    const [artists, setArtists] = useState<ArtistInterface[]>([]);

    useEffect(() => {
        const fetchArtists = async () => {
            const data = await getArtists();
            setArtists(data);
        }
        //fetchArtists();
    },[]);

    const addNewArtist = async (artist: ArtistInterface) => {
        try {
          const newVinyl = await createArtist(artist);
          setArtists((prevData) => [...prevData, newVinyl]);
        } catch (error) {
          console.error('Failed to add artist:', error);
        }
    };

    const updateExistingArtist = async (updatedArtist: ArtistInterface) => {
        try {
          const updated = await updateArtist(updatedArtist);
          setArtists((prevData) =>
            prevData.map((artist) => (artist._id === updatedArtist._id ? updated : artist))
          );
        } catch (error) {
          console.error('Failed to update artist:', error);
        }
      };
    
    const deleteArtistById = async (_id: string) => {
        try {
            await deleteArtist(_id);
            setArtists((prevData) => prevData.filter((artist) => artist._id !== _id));
        } catch (error) {
            console.error('Failed to delete artist:', error);
        }
    };

    return {
        artists,
        addNewArtist,
        updateExistingArtist,
        deleteArtistById,
    };
}

export default useArtist;