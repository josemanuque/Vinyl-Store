import { useState } from 'react';
import { ArtistInterface } from '../../../interfaces/Artist.Interface';

const ArtistForm = ({ onSubmit }: { onSubmit: (values: ArtistInterface) => Promise<void> }) => {
  const [name, setName] = useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({
      name
    });
  }

  return (
    <form action="" onSubmit={handleSubmit} className="form-container">
      <div>
        <label htmlFor="" className="form-label">Name:</label>
        <input 
          name="name" 
          type="text" 
          placeholder="Enter vinyl name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default ArtistForm;