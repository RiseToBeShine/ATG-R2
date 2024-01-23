import React, { useContext, useEffect, useState } from 'react'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytesResumable, getStorage } from 'firebase/storage'
import Cards from '../Components/Cards'
import {storage} from '../Firebase'
import { UserContext } from '../UserProvider'
import { Link } from 'react-router-dom'

const AllPosts = ({mobile}) => {
    const storage = getStorage()
    const {username, updateUser, currUserId} = useContext(UserContext)
    const [postId,setPostId] = useState('')
    const BASE_URL = 'https://atr-r2-server.onrender.com/api/'
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState({
        caption: '',
        imgUrl: ''
    })
    const [progress, setProgress] = useState('')

    const fetchPosts = async () => {
        await axios.get(BASE_URL + 'post/rand').then
            ((res) => {
                console.log(res.data)
                setPosts(res.data)
            }).catch((error) => {
                console.log('Error', error)
            })
    }

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setNewPost(prev => ({...prev,imgUrl: e.target.files[0] }))
        console.log(newPost)
    }

    const saveNewPost = async (downloadURL) => {
        const url = BASE_URL + 'post/'
        console.log(newPost)
        await axios.post(url,{imgUrl: downloadURL, caption: newPost.caption}).then(()=>console.log("posted successfully"))
        .catch((err)=>console.log("err",err))
    }

    const updateNewPost = async () => {
        const url = BASE_URL + 'post/' + props.id
        console.log(newPost)
        await axios.put(url,{imgUrl: newPost.imgUrl, caption: newPost.caption}).then(()=>console.log("posted successfully"))
        .catch((err)=>console.log("err",err))
    }

    const handleAddPost = async () => {
        console.log("here")
        const filename = new Date().getTime + newPost.imgUrl
        const imgRef = ref(storage, `files/${filename}`)
        const uploadTask = uploadBytesResumable(imgRef, newPost.imgUrl)
        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot)
                const currprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + currprogress + '% done');
                setProgress(<span style={{fontSize: '0.75rem',fontWeight: '500', color: 'blue'}}>Uploading...</span>)
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setNewPost(prev=>({...prev, imgUrl: downloadURL}))
                    saveNewPost(downloadURL)
                    setProgress(<span style={{fontSize: '0.75rem',fontWeight: '500', color: 'green'}}>Uploaded</span>)
                }).then(()=>{
                    console.log(newPost)
                })
            })
    }

    const handlePostIdChange = (e) => {
        setPostId(e.target.value)
        console.log(postId)
    }

    const handleUpdatePost = () => {
        const filename = new Date().getTime + newPost.imgUrl
        const imgRef = ref(storage, `files/${filename}`)
        const uploadTask = uploadBytesResumable(imgRef, newPost.imgUrl)
        uploadTask.on('state_changed',
            (snapshot) => {
                console.log(snapshot)
                const currprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + currprogress + '% done');
                setProgress(<span style={{fontSize: '0.75rem',fontWeight: '500', color: 'blue'}}>Uploading...</span>)
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log('File available at', downloadURL);
                    setNewPost(prev=>({...prev, imgUrl: downloadURL}))
                    setProgress(<span style={{fontSize: '0.75rem',fontWeight: '500', color: 'green'}}>Uploaded</span>)
                }).then(()=>{
                    console.log(newPost)
                    updateNewPost()
                })
            })
    }

    const handleChangePost = (e) => {
            setProgress('')
            const { name, value } = e.target
            console.log(newPost)
            setNewPost((prev) => ({
                ...prev,
                [name]: value
            }))
        }

        useEffect(() => {
            fetchPosts()
        }, [currUserId])

        return (
            <Container className={`d-flex ${mobile ? 'flex-column-reverse' :''}`}>
                
                <Container className='no-scrollbar' style={{ flex: 1, margin: '0px 1rem', height: '37rem', overflow: 'scroll' }}>
                    {
                        posts.map((post, index) => (
                            <Cards
                                key={index}
                                caption={post.caption}
                                img={post.imgUrl}
                                id={post._id}
                                name= {post.username}
                                likedBy = {post.likedBy.includes(currUserId)}
                            />
                        ))
                    }
                </Container>
                <Container className='' style={{ flex: 1, margin: '0px 1rem' }}>
                    <Form>
                        <Row>
                            <Form.Control placeholder='Enter postId to update' name='postID' onChange={handlePostIdChange} />
                        </Row>
                        <Row className='d-flex py-2'>
                            <Form.Control onChange={handleChangePost} name='caption' style={{ fontSize: '0.9rem', fontWeight: '400', borderWidth: '1.5px' }} placeholder="What's in your mind...?" />
                        </Row>
                        <Row className='g-0 d-flex align-items-center py-2'>
                            <Col className='g-0'>
                                {
                                    postId != ''
                                    ?
                                    <Button onClick={handleUpdatePost} style={{ background: 'green', fontSize: '0.75rem', fontWeight: '500' }}>Update Post +</Button>
                                    :
                                    <Button onClick={handleAddPost} style={{ background: 'green', fontSize: '0.75rem', fontWeight: '500' }}>Add Post +</Button>
                                }
                            </Col>
                            <Col>
                                <Form.Control type="file" onChange={(e)=>handleFileChange(e)} />
                            </Col>
                        </Row>
                    </Form>
                    <hr />
                    {progress}
                </Container>
            </Container>
        )
    }

    export default AllPosts
