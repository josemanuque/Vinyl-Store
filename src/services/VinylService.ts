import { gql } from "@apollo/client";

import client from "./ApolloClient"
import { VinylInputInterface, VinylInterface, VinylResponseInterface } from "../interfaces/Vinyl.Interface";

export const createVinyl = async (vinylInput: VinylInputInterface): Promise<VinylInterface> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation CreateVinyl($vinylInput: VinylInput!) {
                createVinyl(vinylInput: $vinylInput) {
                    id
                    title
                    coverImage
                    artist {
                        id
                        name
                    }
                    price
                    description
                    releaseDate
                }
            }
        `,
        fetchPolicy: 'no-cache',
        variables: {
            vinylInput
        }
    });
    return data.createVinyl;
};

export const getVinyls = async (): Promise<VinylInterface[]> => {
    const { data } = await client.query({
      query: gql`
        query findAllVinyls {
          findAllVinyls {
            id
            title
            coverImage
            artist {
                id
                name
            }
            price
            description
            releaseDate
          }
        }
      `,
      fetchPolicy: 'no-cache',
    });
    return data.findAllVinyls;
};
  
  // Get an artist by ID
export const getVinylById = async (id: string): Promise<VinylResponseInterface> => {
    const { data } = await client.query({
      query: gql`
        query findVinylById($id: ID!) {
          findVinylById(id: $id) {
            id
            title
            coverImage
            artist {
                id
                name
            }
            price
            tracks {
                id
                title
                time
                previewUrl
                url
                trackNumber
                spotifyTrackId
            }
            description
            releaseDate
          }
        }
      `,
      fetchPolicy: 'no-cache',
      variables: { id: id },
    });
    return data.findVinylById;
};
  
  // Update an artist by ID
export const updateVinyl = async (id: string, updates: Partial<VinylInterface>): Promise<VinylInterface> => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UpdateVinyl($id: ID!, $vinylInput: VinylInput!) {
          updateVinyl(id: $id, vinylInput: $vinylInput) {
            id
            title
            coverImage
            artist {
                id
                name
            }
            price
          }
        }
      `,
      fetchPolicy: 'no-cache',
      variables: { id, vinylInput: updates },
    });
    return data.updateVinyl;
};
  
  // Delete an artist by ID
  export const deleteVinyl = async (id: string): Promise<string> => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation DeleteVinyl($id: ID!) {
          deleteVinyl(id: $id)
        }
      `,
      fetchPolicy: 'no-cache',
      variables: { id },
    });
    return data.deleteVinyl;
  };
  
//   // Validate if artist is being used in a record
//   export const validateArtist = async (id: string): Promise<boolean> => {
//     const { data } = await client.query({
//       query: gql`
//         query IsArtistUsed($id: ID!) {
//           isArtistUsed(id: $id)
//         }
//       `,
//       variables: { id },
//     });
//     return data.isArtistUsed;
//   };