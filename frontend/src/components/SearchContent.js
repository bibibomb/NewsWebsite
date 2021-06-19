import React from 'react'
import { trackPromise } from 'react-promise-tracker'
import SearchCard from "./SearchCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as Constants from "../constants/Constants"
const axios = require('axios').default;


class SearchContent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newsData: [],
            newsMap: [],
            component:""
            // query:this.props.query
        }
    }
    
    componentDidMount() {
        this.getResults()
    }
    
    
    getResults() {
        // let url = "https://newsengine-irving.appspot.com/search/news?q="+this.props.query\
        console.log(window.location.href)
        let url = Constants.BACKEND_URL + "/search/news"+ window.location.hash.slice(8)
        console.log(url)
        trackPromise(
            axios.get(url)
                .then((response) => {
                    console.log(response.data)
                    this.setState({newsData: response.data})
                    this.setState({newsMap: this.mapResults()})
                })
        )
    }
    
    mapResults = () => {
        let mapData
        mapData = this.state.newsData.map(news => {
            let src = news.image
            let title = news.title
            let date = news.date
            let type = news.type.toLowerCase()
            let url =  news.url
            let id = news.id
            let newsType = news.news
            return (
                <SearchCard
                    key={news.id}
                    id={id}
                    src={src}
                    title={title}
                    date={date}
                    type={type}
                    url={url}
                    news={newsType}
                    func={this.handleClick}
                />
            )
        })
        return mapData
    }
    
    render()
    
    {
        return (
            <div style={{margin:"20px 15px"}}>
                <h2><b>Results</b></h2>
                <Row>
                    {this.state.newsMap.map(card=>{
                        return <Col md={3} style={{padding:"0"}}>{card}</Col>
                    })}
                </Row>
            </div>
        )
    }
}

export default SearchContent
