import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
    article:[]
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
  async componentDidMount() {
    this.props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63234c43aa564da59e75a51c4b74cdd2&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    this.props.setProgress(50);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles , totalResults:parsedData.totalResults, loading:false});
    this.props.setProgress(100);
  }
  handleNextClick = async () => {
    if(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63234c43aa564da59e75a51c4b74cdd2"&page=${this.state.page + 1 }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    });
  }
  };
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63234c43aa564da59e75a51c4b74cdd2"&page=${this.state.page - 1 }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false

    });
  };
  fetchMoreData = async ()=>{
    this.setState({page:this.state.page+1})
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63234c43aa564da59e75a51c4b74cdd2&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
  
    this.setState({ articles: this.state.articles.concat(parsedData.articles) , totalResults:parsedData.totalResults, loading:false});
  }
  

  render(){
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkeys-Top  {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>
       { this.state.loading &&<Spinner />}
       <InfiniteScroll
    dataLength={this.state.articles.length}
    next={this.fetchMoreData}
    style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
    
    hasMore={this.state.articles.length !== this.state.totalResults}
    loader={<Spinner /> }
    
  >       <div className="container">
        <div className="row">
          { this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            )
             
           
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
          disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            class="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }

}
export default News;
