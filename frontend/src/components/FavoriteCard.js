import React from 'react'
import {FaTrash} from "react-icons/fa"
import {Card} from "react-bootstrap";
import SharingModal from "./SharingModal";
import ColoredTag from "./ColoredTag";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require("../stylesheets/FavoriteCards.css")


class FavoriteCard extends React.Component {
    
    handleClick = () =>{
        window.location.hash = "/article?id=" + this.props.id
    }
    
    notifyTrashing = () => toast("Removing - " + this.props.title,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        containerId:"favContainer",
        className:"favToast"
    })
    
    render() {
        let title = this.props.title
        if (title.length > 70) {
            title = title.slice(0,60) + "..."
        }
        return (
            <>
                <Card id="favArticle">
                    <div id="favArticleBody">
                        <div className="cardLink">
                                <b><i>{title}</i></b>
                            <span style={{paddingLeft:"3px"}}>
                                <SharingModal title={this.props.title}
                                              url={this.props.url}
                                              news={this.props.news}
                                              favorite={this.props.favorite}
                                />
                            </span>
                            <span onClick={()=>{
                                this.notifyTrashing()
                                this.props.func(this.props.id)
                            }}>
                                <FaTrash/>
                            </span>
                        </div>
                        <div id="imgDiv2" className="cardLink" onClick={this.handleClick}>
                                <img id="mediaImg"
                                     src={this.props.src}
                                     alt="Generic placeholder"
                                />
                        </div>
                        <div>
                            <span><i>{this.props.date}</i></span>
                            <ColoredTag type={this.props.news} margin={"0.3em"} font={"0.7em"}/>
                            <ColoredTag type={this.props.type} margin={"0.3em"} font={"0.7em"}/>
                        </div>
                    </div>
                </Card>
                </>
    )
    }
}



export default FavoriteCard