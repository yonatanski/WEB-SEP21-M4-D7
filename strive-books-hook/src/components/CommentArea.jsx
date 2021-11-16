import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

class CommentArea extends Component {

    state = {
        comments: [], // comments will go here
        isLoading: false,
        isError: false
    }

    componentDidUpdate = async (prevProps) => {
        if (prevProps.asin !== this.props.asin) {
            this.setState({
                isLoading: true
            })
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + this.props.asin, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI3OWY5NTgxNmI1YjAwMTU5NDA3NDAiLCJpYXQiOjE2MjI2NDY2NzcsImV4cCI6MTYyMzg1NjI3N30.y-rBwB5WAQOWBvWrLlAgTQUrbGulxd2M6cWH3VLyGLw'
                    }
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    this.setState({ comments: comments, isLoading: false, isError: false })
                } else {
                    console.log('error')
                    this.setState({ isLoading: false, isError: true })
                }
            } catch (error) {
                console.log(error)
                this.setState({ isLoading: false, isError: true })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.isLoading && <Loading />}
                {this.state.isError && <Error />}
                <AddComment asin={this.props.asin} />
                <CommentList commentsToShow={this.state.comments} />
            </div>
        )
    }
}

export default CommentArea