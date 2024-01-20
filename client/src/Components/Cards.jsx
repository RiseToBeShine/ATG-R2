import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { UserContext } from '../UserProvider'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Cards = (props) => {

    const {username, updateUser, currUserId} = useContext(UserContext)
    const [err,setErr] = useState()
    // const [currlike,setCurrLike] = useState(props.likedBy)
    let currlike = props.likedBy
    console.log(currlike, " ", props.likedBy)
    const BASE_URL = "http://localhost:8800/api/"

    useEffect(()=>{
        console.log(props.likedBy)
    },[])

    const handleDeletePost = async () => {
        try {
            await axios.delete(BASE_URL + 'post/' + props.id).then((res)=>{
                console.log('Deleted')
                setErr(<span style={{fontSize: '0.65rem', fontWeight: '500', color: 'green'}}>Deleted Successfully</span>)
            })
            .catch(()=>{
                console.log('You are not the owner')
                setErr(<span style={{fontSize: '0.65rem', fontWeight: '500', color: 'red'}}>Owner only..!</span>)
            })
        } catch (error) {
            console.log('You are not the owner',error)
            setErr(<span style={{fontSize: '0.65rem', fontWeight: '500', color: 'red'}}>Owner only..!</span>)
        }
    }

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(props.id)
            alert("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };
    
    const handleLikeClick = async () => {
        console.log(currlike, " ", currUserId)
        if(!currlike){
            try {
                await axios.put(BASE_URL + 'user/like/' + props.id).
                then(()=>{
                    console.log('liked successfully')
                    window.alert('Like Added')
                })
                
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.put(BASE_URL + 'user/unlike/' + props.id).
                then(()=>{
                    console.log('unliked successfully')
                    window.alert('unliked')
                })
                
            } catch (error) {
                console.log(error)
            }
        }
        currlike = !currlike
    }

    // const likedBy = props.likedBy

  return (
    <Card className='' style={{marginBottom: '1.2rem'}}>
        <Card.Header className='d-flex justify-content-between'>
            <div>
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp" className='border-circle' style={{width:'2rem'}} alt="" />
                <span style={{fontSize:'0.8rem' , fontWeight: '600', marginLeft: '1rem'}}>Mradul</span>
            </div>
            <div>
                {err}
                <Button variant="outline-secondary" style={{fontSize: '0.72rem', fontWeight: '500', color:'white', background: 'red'}} onClick={handleDeletePost}>Delete Post</Button>
            </div>
        </Card.Header>
        <Card.Img src={props.img} />
        <Card.Body style={{fontSize:'0.75rem', fontWeight: '500'}}>
            <div style={{fontSize:'0.75rem', fontWeight:'700', textDecoration: 'underline'}}>Caption: </div>
            {props.caption}
        </Card.Body>
        {
            props.fromComments ? '' 
            : 
            <Card.Footer className='d-flex w-100 justify-content-between'>
                {
                    currlike
                    ? 
                    <div style={{fontSize:'0.8rem', fontWeight: '700', flex:1, cursor: 'pointer', color: 'red'}} className='d-flex justify-content-center' onClick={handleLikeClick}>Like</div> 
                    :
                    <div style={{fontSize:'0.8rem', fontWeight: '500', flex:1,cursor: 'pointer'}} className='d-flex justify-content-center' onClick={handleLikeClick}>Like</div>  
                }
                <Link to={{pathname: `/post/${props.id}`}} style={{textDecoration:'none', color: 'black', fontSize:'0.8rem', fontWeight: '500', flex:1, borderLeft: '1px solid black',cursor: 'pointer'}} className='d-flex justify-content-center'>View</Link>
                <div style={{fontSize:'0.8rem', fontWeight: '500', flex:1, borderLeft: '1px solid black',cursor: 'pointer'}} className='d-flex justify-content-center' onClick={handleCopyClick}>CopyId</div>
            </Card.Footer>
        }
    </Card>
  )
}

export default Cards