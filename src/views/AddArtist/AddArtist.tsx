
import { FC, useState } from 'react';
import { createArtist } from '../../services/ArtistService';
import { BsFileEarmarkText, BsFileMusic, BsImage } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { ApolloError } from '@apollo/client';

const AddArtistView: FC = () => {
    
    const [name, setName] = useState<string>('');
    const [imageURL, setImageURL] = useState<string>('');
    const [biography, setBiography] = useState<string>('');

    const navigate = useNavigate();

    const onGoBack = () => {
        navigate('/artists');
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const createdArtist = await createArtist({name, imageURL, biography});
            //const createdArtist = await createArtist();
            // Redirect to the vinyl details page
            navigate(`/artists/${createdArtist.id}`);
        } catch (error) {
            if (error instanceof ApolloError) {
                console.error('ApolloError:', error.message);
                console.error('GraphQL Errors:', error.graphQLErrors);
                console.error('Network Error:', error.networkError);
            } else {
                console.error('Failed to create vinyl:', error);
            }
        }
    }

    return (
        <div className="main-container add-edit-vinyl-container">
            <div className="add-edit-vinyl-heading">
                <h1>New Artist</h1>
            </div>
            <form onSubmit={onSubmit}>
                <div className="add-edit-vinyl-form-container">
                    <section className="add-edit-vinyl-form-information">
                        <h2>Information</h2>
                        <div className='add-edit-vinyl-form-group'>
                            <span>
                                <BsFileMusic className='icon-wrapper'/>
                                <label htmlFor="name">Name</label>
                            </span>
                            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} required/>
                        </div>
                        <div className="add-edit-vinyl-form-group">
                            <span>
                                <BsImage className='icon-wrapper'/>
                                <label htmlFor="coverImage">Image Url</label>
                            </span>
                            <input type="text" name="coverImage" id="coverImage" onChange={(e) => setImageURL(e.target.value)} value={imageURL}/>
                        </div>
                        <div className="add-edit-vinyl-form-group">
                            <span>
                                <BsFileEarmarkText className='icon-wrapper'/>
                                <label htmlFor="description">Biography</label>
                            </span>
                            <textarea name="description" id="description" onChange={(e) => setBiography(e.target.value)} value={biography}></textarea>
                        </div>
                    </section>
                </div>
                <div className="ava-action-buttons-container">
                    <button type="button" onClick={()=> onGoBack()}>Cancel and Go Back</button>
                    <button type="submit">Add Artist</button>
                </div>
            </form>
        </div>
    );
}

export default AddArtistView;