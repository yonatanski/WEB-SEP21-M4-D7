import {  useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap'

const AddComment =({asin})=> {
 const [comment,setcomment] = useState({
    comment: '',
    rate: 1,
    elementId: null
})
    // state = {
    //     comment: {
    //         comment: '',
    //         rate: 1,
    //         elementId: null
    //     }
    // }


    useEffect(()=>{
   setcomment({
       ...comment,
       elementId:asin
   })
    },[asin,])
    
    
    // componentDidUpdate(prevProps) {
    //     if (prevProps.asin !== this.props.asin) {
    //         this.setState({
    //             comment: {
    //                 ...this.state.comment,
    //                 elementId: this.props.asin
    //             }
    //         })
    //     }
    // }

  const  sendComment = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments', {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOWFhZmFhY2FhMjAwMTU1MmExZjIiLCJpYXQiOjE2MzcwNzc0NjgsImV4cCI6MTYzODI4NzA2OH0.PIR6N78YUAF0T7PPviKi3X2U-swJGqMAHavCjsRG3F4'
                }
            })
            if (response.ok) {
                // the comment has been sent succesfully!!
                alert('Comment was sent!')
            } else {
                console.log('error')
                alert('something went wrong')
            }
        } catch (error) {
            console.log('error')
        }
    }

    // render() 
        return (
            <div>
                <Form onSubmit={sendComment}>
                    <Form.Group>
                        <Form.Label>Comment text</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add comment here"
                            value={comment.comment}
                            onChange={e => setcomment({
                                ...comment,
                                comment: e.target.value
                            })}
                            //     comment: {
                            //         ...comment,
                            //         comment: e.target.value
                            //     }
                            // })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={comment.rate}
                            onChange={e => setcomment({
                                ...comment,
                                rate: e.target.value
                            })}
                            //     comment: {
                            //         ...comment,
                            //         rate: e.target.value
                            //     }
                            // })}
                            >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    
}

export default AddComment