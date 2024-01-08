/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { getPostsByUserId } from "../api";
import { ThreeDots } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import { NewPost } from './NewPost'
import '../style/UsersTable.css'
import '../style/UserPosts.css'

export const UserPost = ({ userId }) => {
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewPost, setShowNewPost] = useState(false);
    const [count, setCount] = useState(100);
    const [isOpen, setIsOpen] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPostsByUserId({ userId });
                setUserPosts(data);
                setLoading(false);
            }
            catch (err) {
                console.error(err);
            }
        }
        setIsOpen(true);
        fetchData();
    }, [userId]);

    // let users = useSelector((s) => {
    //     return s.users
    // })
    // let currentUser = users.find((x)=>x.id={userId})

    //פונקציה לפתיחת וסגירת הדיב עם הפוסטים
    const ToggleSidebar = () => {
        isOpen === true ? setIsOpen(false) : setIsOpen(true);
        setShowNewPost(false)
    }
    //פתיחת הטופס להוספת פוסט
    const onClickNewPost = async () => {
        setShowNewPost(true);
        setCount(count + 1);
    }
    //הוספת הפוסט לרשימת הפוסטים
    const updatePosts = (newPost) => {
        setUserPosts((posts) => [...posts, newPost]);
    };
    return <>
        <div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
            <div className="sd-header">
                <h4 className="mb-0">user posts</h4>
                <div className="btn btn-primary" onClick={ToggleSidebar}>❌</div>
            </div>
            <div className="sd-body">
                {/* 'כפתור 'הוספת פוסט */}
                <Button id='NewPostButton' onClick={() => onClickNewPost()} variant="contained" > + Add New Post</Button>
                {showNewPost && <NewPost userId={userId} updatePosts={updatePosts} setShowNewPost={setShowNewPost} id={count}></NewPost>}
                {/* הצגת כל הפוסטים של המשתמש שנבחר */}
                <ul>
                    {loading ? (<ThreeDots type="ThreeDots"/>) :
                        (userPosts.length > 0 ? (
                            userPosts.map((post) =>
                            (<li>
                                <a className="sd-link" id="title">{post.title}</a>
                                <a className="sd-link">{post.body}</a>
                            </li>))) :
                            (userPosts.error ? (
                                <p>{userPosts.error}</p>) : (<p>Not found</p>))
                        )
                    }
                </ul>
            </div>
        </div>
        <div className={`sidebar-overlay ${isOpen === true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
    </>
}