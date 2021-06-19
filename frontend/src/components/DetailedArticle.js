import React from 'react'
import ReactTooltip from 'react-tooltip'
import {Events, animateScroll as scroll, scrollSpy} from 'react-scroll'
import {IoIosArrowDown} from "react-icons/io"
import { trackPromise } from 'react-promise-tracker'
import {Card} from "react-bootstrap";
import CommentBox from "./CommentBox";
import {FacebookShareButton} from "react-share";
import {TwitterShareButton} from "react-share";
import {EmailShareButton} from "react-share";
import {FacebookIcon} from "react-share";
import {TwitterIcon} from "react-share";
import {EmailIcon} from "react-share";
import {MdBookmarkBorder} from "react-icons/all";
import {MdBookmark} from "react-icons/all";
import {ToastContainer, toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIndicator from "./LodingIndicator";
import * as Constants from "../constants/Constants"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {IoIosArrowUp} from "react-icons/io";
const axios = require('axios').default;
require("../stylesheets/DetailedArticle.css")


class DetailedArticle extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: window.location.hash.slice(13),
            cardInfo: {},
            showUp: "show",
            component: [],
            collect:this.props.hasCollected
        }
        
    }
    
    componentDidMount() {
        // console.log(this.state.id)
        this.getCardInfo()
        Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", arguments);
        });
        Events.scrollEvent.register('end', function(to, element) {
            console.log("end", arguments);
        });
        scrollSpy.update();
    }
    
    componentWillUnmount=()=> {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
    
    scrollTo = (direction) => {
        let logo = document.getElementsByClassName('arrow')[0];
        let logoTextRectangle = logo.getBoundingClientRect();
        
        // console.log(logoTextRectangle)
    
        if (direction === "down"){
            scroll.scrollTo(logoTextRectangle.top + 190, {
                duration:500
            });
        } else {
            scroll.scrollTo(logoTextRectangle.top,{
                duration:200
            });
        }
        
    }
    
    getCardInfo = () => {
        let newsType
        if (this.state.id.slice(0,4) !== "http") {
            newsType = "guardian"
        } else {
            newsType = "nyTimes"
        }
        let url = Constants.BACKEND_URL+"/news/" + newsType + "/article?id=" + this.state.id
        // console.log(url)
        trackPromise(
            axios.get(url)
                .then((response) => {
                    this.setState({
                        cardInfo: response.data
                    })
                    this.setState({
                        component: this.buildComponent(this.state.collect,false)
                    })
                    this.setState({
                        showUp: this.shouldShow(),
                    })
                    this.setState({
                        component: this.buildComponent(this.state.collect,false)
                    })
                })
        )
    }
    
    handleClickArrowDown = () => {
        scroll.scrollToBottom({
            duration:800
        })
        this.setState({
            component:this.buildComponent(this.state.collect,true)
        })
    }
    
    handleClickArrowUp = () => {
        scroll.scrollToTop({
            duration:800
        })
        setTimeout(function (){this.setState({
                component:this.buildComponent(this.state.collect,false)
            })}.bind(this), 1000
        )
    }
    
    shouldShow = () => {
        let para = document.getElementById("desP")
        let comStyles = window.getComputedStyle(para)
        let totalHeight = parseInt(comStyles.getPropertyValue("height"),10)
        let lineHeight = parseInt(comStyles.getPropertyValue("line-height"),10)
        if (Math.round(totalHeight/lineHeight) < 6){
            return "notShow"
        }
        return "show"
    }
    
    buildComponent = (collect,clickArrow) => {
        let bookmark,description
        if (collect) {
            bookmark = <MdBookmark size={25}
                                   color="red"
                                   onClick={this.handleClick}
                                   key={Date()}
            />
        } else {
            bookmark = <MdBookmarkBorder size={25}
                                         color="red"
                                         onClick={this.handleClick}
                                         key={Date()}

            />
        }
        if (this.state.showUp !== "notShow"){
            if (clickArrow) {
                description = <><div>
                    <p id="desP">
                        {this.state.cardInfo.description}
                    </p>
                </div>
                    <div style={{float:"right"}}>
                            <IoIosArrowUp className="arrow" size={25}  onClick={this.handleClickArrowUp}/>
                        
                    </div></>
            } else {
                description = <><div>
                    <p style={{width: "100%",
                        display: "-webkit-box",
                        webkitBoxOrient: "vertical",
                        webkitLineClamp: "6",
                        overflow: "hidden"}}
                       id="desP"
                    >
                        {this.state.cardInfo.description}
            
                    </p>
                </div>
                    <div style={{float:"right",display:this.state.showUp}}>
                        <IoIosArrowDown className="arrow" size={25} onClick={this.handleClickArrowDown}/>
                    </div></>
            }
        } else {
            description = <div>
                <p id="desP">
                    {this.state.cardInfo.description}
                </p>
            </div>
        }

        return (
            <>
                <Card id="article">
                    <div id="articleBody">
                        <Card.Title><i>{this.state.cardInfo.title}</i></Card.Title>
                        <div id="info">
                            <Row xs={3}>
                                <Col id="colN1" xs={6} sm={8} md={9} lg={9} xl={10} className="pr-xl-5 mr-xl-2">
                                    <span id="date2">{this.state.cardInfo.date}</span>
                                </Col>
                                <Col id="colN2" xs={"auto"}  xl={"auto"} lg={2} md={"auto"} className="pl-xl-5">
                                    <span id="icon2">
                                    <FacebookShareButton children={FacebookIcon}
                                                         url={this.state.cardInfo.url}
                                                         hashtag={"#CSCI_571_NewsApp"}>
                                        <FacebookIcon data-tip={"Facebook"} data-for={"Facebook"} size={20} round={true}  />
                                        <ReactTooltip id="Facebook" className={"customTheme"} place="top" type="dark" effect="solid"/>
                                    </FacebookShareButton>
                                    <TwitterShareButton  children={TwitterIcon}
                                                         url={this.state.cardInfo.url+"#CSCI_571_NewsApp"}
                                    >
                                        <TwitterIcon  data-tip={"Twitter"} data-for={"Twitter"} size={20} round={true}/>
                                        <ReactTooltip className={"customTheme"} id="Twitter" place="top" type="dark" effect="solid"/>
    
                                    </TwitterShareButton>
                                    <EmailShareButton children={EmailIcon}
                                                      url={this.state.cardInfo.url}
                                                      subject={"#CSCI_571_NewsApp"}
                                    >
                                        <EmailIcon  data-tip={"Email"} data-for={"Email"} size={20} round={true}/>
                                        <ReactTooltip id="Email" className={"customTheme"} place="top" type="dark" effect="solid"/>
                                        
                                    </EmailShareButton>
                                </span>
                                </Col>
                                <Col xs={1}  lg={"auto"} className="pl-xl-5 pl-md-5 pl-lg-3">
                                    <span id="bookmark"  data-for={"bookmarkInDA"}   data-tip={" Bookmark "}>
                                {bookmark}
                            </span>
                                    <ReactTooltip id="bookmarkInDA" className={"customTheme"} place="top" type="dark" effect="solid"/>
                                </Col>
                            </Row>
                        </div>
                        <img id="img"
                             variant="top"
                             src={this.state.cardInfo.img}
                             alt=""
                        />
                    {description}
                    </div>
                </Card>
                <div id="comment">
                    <CommentBox id={this.state.id}/>
                </div>
                <ToastContainer enableMultiContainer containerId={"detailToaster"}  transition={Zoom} />
            </>)
    }
    
    notifyAdd = () => toast("Saving " + this.state.cardInfo.title,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className:'toastNotify',
        containerId:"detailToaster"
    })
    notifyDel = () => toast("Removing - " + this.state.cardInfo.title,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className:'toastNotify',
        containerId:"detailToaster"
    })
    
    handleClick = () => {
        let articleInfo = {
            "id": this.state.id,
            "type": this.state.cardInfo.section,
            "news": this.props.news,
            "title": this.state.cardInfo.title,
            "img": this.state.cardInfo.img,
            "url": this.state.cardInfo.url,
            "date": this.state.cardInfo.date
        }
        this.setState((preState)=>{
            if (!preState.collect) {
                localStorage.setItem(this.state.id, JSON.stringify(articleInfo))
                this.notifyAdd()
            } else {
                localStorage.removeItem(this.state.id)
                this.notifyDel()
            }
            return {
                collect:!preState.collect,
                component: this.buildComponent(!preState.collect)
            }
        })
    }
    
    render() {
        return (
            <>
            <div>
                {this.state.component}
            </div>
                <LoadingIndicator />
</>
                )
    }
}



export default DetailedArticle
