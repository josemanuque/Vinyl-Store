import { useEffect, useState } from "react"
import { VinylInterface } from "../interfaces/Vinyl.Interface"
import { createVinyl, deleteVinyl, getVinyls, updateVinyl } from "../services/VinylService";

const useVinyls = () => {
    const [vinyls, setVinyls] = useState<VinylInterface[]>([]);

    useEffect(() => {
        const fetchVinyls = async () => {
            const data = await getVinyls();
            setVinyls(data);
        }
        fetchVinyls();
    },[]);

    const addNewVinyl = async (vinyl: VinylInterface) => {
        try {
          const newVinyl = await createVinyl(vinyl);
          setVinyls((prevData) => [...prevData, newVinyl]);
        } catch (error) {
          console.error('Failed to add vinyl:', error);
        }
    };

    const updateExistingVinyl = async (updatedVinyl: VinylInterface) => {
        try {
          const updated = await updateVinyl(updatedVinyl);
          setVinyls((prevData) =>
            prevData.map((vinyl) => (vinyl._id === updatedVinyl._id ? updated : vinyl))
          );
        } catch (error) {
          console.error('Failed to update vinyl:', error);
        }
      };
    
      const deleteVinylById = async (_id: string) => {
        try {
          await deleteVinyl(_id);
          setVinyls((prevData) => prevData.filter((vinyl) => vinyl._id !== _id));
        } catch (error) {
          console.error('Failed to delete vinyl:', error);
        }
      };
    
      return {
        vinyls,
        addNewVinyl,
        updateExistingVinyl,
        deleteVinylById,
      };
}

export default useVinyls;