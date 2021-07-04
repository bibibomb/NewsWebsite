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
        trackPromise(
            axios.get(url).then((response) => {
                this.setState({newsData: response.data})
            })
        )
     }
     
    mapResults = () => {
        let mapData
        mapData = this.state.newsData.map(news => {
            const newsInfo = {
                src: news.image,
                title: news.title,
                description: news.description,
                date: news.date,
                type: news.type.toLowerCase(),
                url: news.url,
            }
            let id = (this.props.news === "nyTimes")? newsInfo.url: news.id
            return (
                <NewsCard
                    key={news.id}
                    func={this.props.section}
                    id={id}
                    {...newsInfo}
                />
            )
        })
        return mapData
    }
    
    render() {
        return (
            <div>
                <p>{this.mapResults()}</p>
            </div>
        )
    }
}

export default CardContent
