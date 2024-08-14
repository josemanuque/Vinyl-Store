import React, { useEffect, useState } from 'react';
import { VinylInterface } from '../../../interfaces/Vinyl.Interface';
import { getArtists } from '../../../services/ArtistService';


const VinylForm = ({ onSubmit }: { onSubmit: (values: VinylInterface) => Promise<void> }) => {
  const [artists, setArtists] = useState<{ value: string | undefined; label: string }[]>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistData = await getArtists();
        const artistOptions = artistData.map((artist) => ({
          value: artist._id,
          label: artist.name
        }));
        setArtists(artistOptions);
      } catch (error) {
        console.error('Failed to fetch artists', error);
      }
    };

    fetchArtists();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({
      title,
      artist,
      price: parseFloat(price),
      coverImage
    });
  }

  return (
    <form action="" onSubmit={handleSubmit} className="form-container">
      <div>
        <label htmlFor="" className="form-label">Name:</label>
        <input 
          name="title" 
          type="text" 
          placeholder="Enter vinyl name" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="" className="form-label">Name:</label>
        <select 
          value={artist}
          name="" 
          id=""
          onChange={(e) => setArtist(e.target.value)}
          required
          aria-label='Select an artist'
        >
          <option value="" disabled>Select an artist</option>
          {artists.map((artist) => (
            <option key={artist.value} value={artist.value}>{artist.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="" className="form-label">Price:</label>
        <input 
          name="price" 
          type="number" 
          placeholder="Enter the price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="" className="form-label">Cover Image:</label>
        <input 
          name="coverImage" 
          type="text" 
          placeholder="Enter the cover image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default VinylForm;