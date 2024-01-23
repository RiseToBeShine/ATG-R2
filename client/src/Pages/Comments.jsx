import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import Cards from '../Components/Cards';

const Comments = ({mobile}) => {
  const [allComment,setAllComments] = useState([]);
  const [post,setPost] = useState({})
  const BASE_URL = 'https://atr-r2-server.onrender.com/api/'
  const [postId,setPostId] = useState(useParams().id)
  const [body, setBody] = useState()

  const fetchComments = async () => {
    const url = BASE_URL + 'post/comments/' + postId
    await axios.get(url).then((res)=>{
      setAllComments(res.data.comments)
      setPost(res.data.post)
      console.log(res.data.post, res.data.comments)
    })
    .catch((err)=>console.log(err))
  }

  const handleChange = (e) =>{
    setBody(e.target.value)
  }

  const handleAddComment = async () => {
    await axios.post(BASE_URL+'comment/'+postId, {body: body}).then(()=>{
      console.log("Commented Successfully")
      window.alert("comment added")
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  
  useEffect(()=>{
    fetchComments()
  },[])
  return (
    <Container className={`d-flex ${mobile? 'flex-column-reverse' :''}`}>
      <Container style={{flex: 1}} className='mx-4'>
        <Cards 
          caption={post.caption}
          img={post.imgUrl}
          id={post._id}
          fromComments = {true}
        />
        <hr/>
        <Form>
          <Row>
            <Form.Control onChange={handleChange} placeholder='Add A Comment' style={{fontSize: '0.75rem', fontWeight: '500'}} name='body' />
          </Row>
          <Row>
            <Button onClick={handleAddComment} className='' style={{width: 'fit-content', fontSize: '0.75rem', fontWeight: '500', padding: '0.3rem 0.8rem', background: 'green', marginTop: '1rem'}}>Add Comment +</Button>
          </Row>
        </Form>
      </Container>
      <Container style={{flex: 1}} className=' mx-4'>
        <div className='my-2' style={{fontWeight:'700'}}>Comments:</div>
        {
          allComment.map((comment,index)=>(
            <Card style={{margin: '1rem 0rem'}}>
              <Card.Header>
                <img src={comment.image} alt="" style={{width: '1.5rem', marginRight: '0.6rem'}} />
                <span style={{fontSize: '0.75rem', fontWeight: '500'}}> {comment.username} </span>
              </Card.Header>            
              <Card.Body>
                {comment.body}
              </Card.Body>
            </Card>
          ))
        }
      </Container>
    </Container>
  )

}

export default Comments
