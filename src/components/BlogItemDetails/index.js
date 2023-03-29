// Write your JS code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class BlogItemDetails extends Component {
  state = {blogDetails: {}, isLoading: true}

  componentDidMount() {
    this.gettingBlogData()
  }

  gettingBlogData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const blogData = await response.json()

    const formattedData = {
      author: blogData.author,
      avatarUrl: blogData.avatar_url,
      id: blogData.id,
      imageUrl: blogData.image_url,
      title: blogData.title,
      topic: blogData.topic,
      content: blogData.content,
    }

    this.setState({blogDetails: formattedData, isLoading: false})
  }

  displayingBlogData = () => {
    const {blogDetails} = this.state
    const {author, avatarUrl, imageUrl, title, content, id} = blogDetails

    return (
      <>
        <h1 className="title">{title}</h1>
        <div className="avatar-container">
          <img src={avatarUrl} alt={`avatar${id}`} className="avatar" />
          <p className="author">{author}</p>
        </div>
        <img src={imageUrl} alt={title} className="image" />
        <p className="content">{content}</p>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="content-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={50}
              width={50}
              className="loader"
            />
          </div>
        ) : (
          this.displayingBlogData()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
