import React from 'react'
import FavoriteCard from "./FavoriteCard";
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, Zoom} from "react-toastify";


class FavoriteCollection extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cardsMap:[],
            savedArticles: localStorage
        }
    }
    
    componentDidMount() {
        this.setState({
            cardsMap: this.mapResults()
        })
    }
    
    handleClick = (id)=> {
        this.setState((preState)=>{
            localStorage.removeItem(id)
            return {
                savedArticles: localStorage,
                cardsMap: this.mapResults()
            }
        })
    }
    
    getCardInfo = () => {
        let arr = []
        for (let i=0;i<localStorage.length;i++){
            let obj
            if (localStorage.key(i) !== "checked") {
                obj = JSON.parse(localStorage[localStorage.key(i)])
                arr.push(obj)
            }
        }
        console.log(arr)
        return arr
    }
    
    mapResults = () => {
        let arr = this.getCardInfo()
        
        let mapData
        mapData = arr.map(news => {
            let src = news.img
            let title = news.title
            let date = news.date
            let type = news.type.toLowerCase()
            let url =  news.url
            let id = news.id
            let newsType = news.news
            return (
                <FavoriteCard
                    key={news.id}
                    id={id}
                    src={src}
                    title={title}
                    date={date}
                    type={type}
                    url={url}
                    news={newsType}
                    favorite={true}
                    func={this.handleClick}
                    notify={this.notifyTrashing}
                />
            )
        })
        return mapData
    }
    
    handleNoSaved = () => {
        if (localStorage.getItem("checked") === null) {
            if (this.state.savedArticles.length === 0) {
                return (
                    <div style={{margin:"20px 15px", textAlign:"center"}}>
                        <p><b>You have no saved articles</b></p>
                    </div>
                )
            } else {
                return (
                    <div style={{margin:"20px 15px"}}>
                        <h2><b>Favorite</b></h2>
                        <Row>
                            {this.state.cardsMap.map(card=>{
                                return <Col md={3} style={{padding:"0"}}>{card}</Col>
                            })}
                        </Row>
                    </div>
                )
            }
        } else {
            if (this.state.savedArticles.length === 1) {
                return (
                    <div style={{margin:"20px 15px", textAlign:"center"}}>
                        <p><b>You have no saved articles</b></p>
                    </div>
                )
            } else {
                return (
                    <div style={{margin:"20px 15px"}}>
                        <h2><b>Favorite</b></h2>
                        <Row>
                            {this.state.cardsMap.map(card=>{
                                return <Col md={3} style={{padding:"0"}}>{card}</Col>
                            })}
                        </Row>
                    </div>
                )
            }
        }
    }
    
    render()
    {
        return (
            <>
                {this.handleNoSaved()}
                <ToastContainer enableMultiContainer containerId={"favContainer"} transition={Zoom}/>
            </>
        )
    }
}

export default FavoriteCollection