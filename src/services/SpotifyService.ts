import axios, { AxiosRequestConfig } from "axios";
import { SpotifyAlbumInterface, SpotifyAlbumSearchResult } from "../interfaces/Spotify.Interface";

class SpotifyService {
  private token: string = '';
  private tokenExpirationTime: number = 0; // Store the token expiration time
  private clientId: string = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
  private clientSecret: string = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string;
  private idAndSecret: string = btoa(this.clientId + ':' + this.clientSecret);
  private tokenUrl: string = 'https://accounts.spotify.com/api/token'; // Replace with your actual token URL

  private async fetchAccessToken(): Promise<string> {
    const body = 'grant_type=client_credentials';
    const options: AxiosRequestConfig = {
      headers: {
        Authorization: 'Basic ' + this.idAndSecret,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    try {
      const response = await axios.post(this.tokenUrl, body, options);
      this.token = response.data.access_token;
      this.tokenExpirationTime = Date.now() + response.data.expires_in * 1000; // Set expiration time
      return this.token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      return '';
    }
  }

  public async getAccessToken(): Promise<string> {
    if (this.token && Date.now() < this.tokenExpirationTime) {
      return this.token; // Return the existing token if it's still valid
    }
    return await this.fetchAccessToken(); // Fetch a new token if the existing one has expired
  }

  public async getMatchingVinyls(searchTerm: string): Promise<SpotifyAlbumSearchResult[]> {
    const token = await this.getAccessToken();
    const options: AxiosRequestConfig = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=album`,
        options
      );
      return response.data.albums.items;
    } catch (error) {
      console.error('Error fetching matching vinyls:', error);
      return [];
    }
    }

    public async getAlbumById(albumId: string): Promise<SpotifyAlbumInterface> {
        const token = await this.getAccessToken();
        const options: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/albums/${albumId}`,
                options
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching album by ID:', error);
            return {} as SpotifyAlbumInterface;
        }
    }
}

export default new SpotifyService();