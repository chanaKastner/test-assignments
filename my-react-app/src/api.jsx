import axios from "axios"

export const getAllUsers = async () => {
    try {
        const response =await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log(response.data);
       return response.data;   
               }
    catch (err) {
        debugger
        return err;
    }
}
export const getPosts = async () => {
    try {
        const response =await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data);
       return response.data;   
               }
    catch (err) {
        debugger
        return err;
    }
}

export const getPostsByUserId = async ({userId}) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`,requestOptions);
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        return err;
    }}

export const addNewPost = async (newPost) => {
    let requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newPost)
    };
    try{
        await fetch('https://jsonplaceholder.typicode.com/posts',requestOptions);
        return newPost;
    }
    catch(err){
        return err;
    }
}