import { VinylInterface } from "../interfaces/Vinyl.Interface";

const API_URL = "http://localhost:3000/vinyls";

const createVinyl = async (vinyl: VinylInterface): Promise<any> => {
    console.log(vinyl);
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vinyl),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const getVinyls = async(): Promise<VinylInterface[]> =>{
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const getVinyl = async(id: string): Promise<VinylInterface> =>{
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


const updateVinyl = async(vinyl: VinylInterface) =>{
    const response = await fetch(`${API_URL}/${vinyl._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vinyl),
    });
    if (!response.ok){
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const deleteVinyl = async(id: string) =>{
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
    createVinyl,
    getVinyl,
    getVinyls,
    deleteVinyl,
    updateVinyl
}