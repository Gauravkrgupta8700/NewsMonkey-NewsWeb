import React, { Component } from 'react'


export class NewsItem extends Component {
 
  render() {
    let {title, description, imageUrl ,newsUrl, author, date, source }= this.props;
    return (
      <div className='my-3'>
         <div className="card" >
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }} >
          <span class=" badge rounded-pill bg-danger" >{source}</span>
          </div>
          
        <img src=   {imageUrl? imageUrl:"https://i.ytimg.com/vi/oZJTgMDqrfw/maxresdefault.jpg"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href="{url}" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
