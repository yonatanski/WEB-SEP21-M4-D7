import {useEffect, useState } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({asin})=> {

 const [comments,setcomments] = useState([])
 const [isLoading,setisLoading] = useState(false)
 const [isError,setisError] = useState(false)
   
 // state = {
    //     comments: [], // comments will go here
    //     isLoading: false,
    //     isError: false
    // }

 useEffect(()=>{
     const getAllComments= async() =>{
        
        setisLoading(true)
        // this.setState({
        //     isLoading: true
        // })
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgyOWFhZmFhY2FhMjAwMTU1MmExZjIiLCJpYXQiOjE2MzcwNzc0NjgsImV4cCI6MTYzODI4NzA2OH0.PIR6N78YUAF0T7PPviKi3X2U-swJGqMAHavCjsRG3F4'
                }
            })
            console.log(response)
            if (response.ok) {
                let comments = await response.json()
                setcomments(comments)
                setisLoading(false)
                setisError(false)
                // this.setState({ comments: comments, isLoading: false, isError: false })
            } else {
                console.log('error')
                setisLoading(false)
                setisError(true)
                // this.setState({ isLoading: false, isError: true })
            }
        } catch (error) {
            console.log(error)
            setisLoading(false)
            setisError(true)
            // this.setState({ isLoading: false, isError: true })
        }
     }
     getAllComments()
 },[asin])


    // componentDidUpdate = async (prevProps) => {
    //     if (prevProps.asin !== this.props.asin) {
            
    //     }
    // }

    // render() 
        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={asin} />
                <CommentList commentsToShow={comments} />
            </div>
        )
    
}

export default CommentArea