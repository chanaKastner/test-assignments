import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { addNewPost } from '../api';
import TextField from '@mui/material/TextField';


export const NewPost = ({ userId, updatePosts, setShowNewPost, id }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [validationT, setValidationT] = useState('');
    const [validationB, setValidationB] = useState('');
    //בדיקות תקינות
    const validate = () => {
        if (postTitle === '') {
            setValidationT('required');
        }
        if (postBody === '') {
            setValidationB('required');
        }
        if (!/^[a-zA-Zא-ת\s]+$/.test(postTitle)) {
            setValidationT('only letters!');
        }
        if (!/^[a-zA-Zא-ת\s]+$/.test(postBody)) {
            setValidationB('only letters!');
        }
        else {
            setValidationT('');
            setValidationB('');

        }
    }
    //יצירת הודעה חדשה
    const createPost = async (e) => {
        e.preventDefault();
        if (validationT === '' && validationB === '') {
            const newP = {
                "userId": userId,
                "id": id,
                "title": postTitle,
                "body": postBody
            };
            try {
                //הוספת הפוסט
                const newPost = await addNewPost(newP);
                updatePosts(newPost);
                setShowNewPost(false)
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    return <>
        <div>
            <form onSubmit={createPost}>
                <span onClick={() => setShowNewPost(false)} className='close'>&times;</span>
                <br />
                <TextField id="outlined-basic" label="Title" required variant="outlined" onChange={(e) => { validate(); setPostTitle(e.target.value) }} />
                {validationT && <p>{validationT}</p>}
                <br /><br />
                <TextField id="outlined-multiline-static" label="Body" multiline required
                    rows={4} variant="outlined" onChange={(e) => { validate(); setPostBody(e.target.value) }} />
                {validationB && <p>{validationB}</p>}
                <br /><br />
                <Button id="addButton" variant="contained" type='submit'>OK</Button>
                <br /><br />
            </form>
        </div>
    </>
}
