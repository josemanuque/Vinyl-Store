import { gql } from "@apollo/client";
import { ArtistInputInterface, ArtistInterface } from "../interfaces/Artist.Interface"
import client from "./ApolloClient"

export const createArtist = async (artistInput: ArtistInputInterface): Promise<ArtistInterface> => {
    const { data } = await client.mutate({
        mutation: gql`
            mutation CreateArtist($artistInput: ArtistInput!) {
                createArtist(artistInput: $artistInput) {
                    id
                    name
                    biography
                    imageURL
                }
            }
        `,
        variables: {
            artistInput
        }
    });
    return data.createArtist;
};

export const getArtists = async (): Promise<ArtistInterface[]> => {
    const { data } = await client.query({
      query: gql`
        query findAllArtists {
          findAllArtists {
            id
            name
            biography
            imageURL
          }
        }
      `,
      fetchPolicy: 'no-cache', // Example fetch policy, adjust as needed
    });
    return data.findAllArtists;
};
  
  // Get an artist by ID
export const getArtistById = async (id: string): Promise<ArtistInterface> => {
    const { data } = await client.query({
      query: gql`
        query findArtistById($id: ID!) {
          findArtistById(id: $id) {
            id
            name
            biography
            imageURL
            vinyls {
              id
              title
              price
              coverImage
              artist {
                name
              }
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
      variables: { id: id },
    });
    return data.findArtistById;
};
  
  // Update an artist by ID
export const updateArtist = async (id: string, updates: Partial<ArtistInterface>): Promise<ArtistInterface> => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation UpdateArtist($id: ID!, $artistInput: ArtistInput!) {
          updateArtist(id: $id, artistInput: $artistInput) {
            id
            name
            biography
            imageURL
          }
        }
      `,
      fetchPolicy: 'no-cache',
      variables: { id, artistInput: updates },
    });
    return data.updateArtist;
};
  
  // Delete an artist by ID
  export const deleteArtist = async (id: string): Promise<string> => {
    const { data } = await client.mutate({
      mutation: gql`
        mutation DeleteArtist($id: ID!) {
          deleteArtist(id: $id)
        }
      `,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
    return data.deleteArtist;
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