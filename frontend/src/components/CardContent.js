import React from 'react'
import { trackPromise } from 'react-promise-tracker'
import NewsCard from "./NewsCard";
import * as Constants from "../constants/Constants"
const axios = require('axios').default;


class CardContent extends React.Component {
    
    state = {
        newsData: [],
        flag: this.props.news
    }
    
    componentDidMount() {
        this.getResults()
        // console.log("cdm " + this.props.news)
    
    }
    
    static  getDerivedStateFromProps(props,state) {
        if (props.news !== state.flag) {
            return {
                flag:props.news
            }
        }
    }
    
    
    componentDidUpdate(preProps,preState,snapshot) {
        if (preState.flag !== this.state.flag) {
            this.getResults()
        }
    }

    
    getResults = () => {
        let url = Constants.BACKEND_URL + '/news/'
        let section = window.location.hash
        if (section.length > 2) {
            url = url + this.state.flag + '/' + section.slice(2)
        } else {
            url = url + this.state.flag + '/'
        }
        // console.log(url)
        trackPromise(
            axios.get(url)
                .then((response) => {
                    this.setState({newsData: response.data})
                })
        )
     }
     
    mapResults = () => {
        let mapData
        mapData = this.state.newsData.map(news => {
            let src = news.image
            let title = news.title
            let description = news.description
            let date = news.date
            let type = news.type.toLowerCase()
            let url =  news.url
            let id = (this.props.news === "nyTimes")? url: news.id
            return (
                <NewsCard
                    key={news.id}
                    id={id}
                    src={src}
                    title={title}
                    description={description}
                    date={date}
                    type={type}
                    url={url}
                    func={this.props.section}
                />
            )
        })
        // console.log(mapData)
        return mapData
    }
    
    render()
    
    {
        // console.log("CardContent:" + this.state.flag)
        // console.log(this.state)
        return (
            <>
            <div>
                <p>{this.mapResults()}</p>
            </div>

            </>
        )
    }
}

export default CardContent
