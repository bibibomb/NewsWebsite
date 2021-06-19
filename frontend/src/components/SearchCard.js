import React from 'react'
import {Card} from "react-bootstrap";
import SharingModal from "./SharingModal";
import ColoredTag from "./ColoredTag";
require("../stylesheets/FavoriteCards.css")


class SearchCard extends React.Component {
    
    handleClick = () => {
        window.location.hash = "/article?id=" + this.props.id
    }
    
    
    render() {
        let title = this.props.title
        if (title.length > 70) {
            title = title.slice(0,60) + "..."
        }
        return (
            <>
                <Card id="favArticle">
                    <div id="favArticleBody">
                        <div>
                            <b className="cardLink" onClick={this.handleClick}><i>{title}</i></b>
                            <span style={{paddingLeft:"3px"}}>
                                <SharingModal title={this.props.title}
                                              url={this.props.url}
                                              favorite={false}
                                />
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
                            <ColoredTag type={this.props.type} margin={"0.3em"} font={"0.7em"}/>
                        </div>
                    </div>
                </Card>
            </>
        )
    }
}



export default SearchCard