import React from 'react'
import ColoredTag from "./ColoredTag";
import {Media} from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import SharingModal from "./SharingModal";
require("../stylesheets/NewsCard.css")

class NewsCard extends React.Component {
    
    
    handleClick = () =>{
        window.location.hash = "/article?id=" + this.props.id
    }
    
    
    
    render() {
        // console.log("render newscard")
        return (
            <Media id="media">
                <Row id="row">
                    <Col  lg={"auto"} xl={3}>
                        <div id="imgDiv">
                            <img id="mediaImg"
                                 src={this.props.src}
                                 alt="Generic placeholder"
                            />
                        </div>
                    </Col>
                    <Col>
                        <Media.Body id="mediaBody">
                            <h5 className="mediaLink">
                                    <b onClick={this.handleClick}>{this.props.title}</b>
                                <span id="sharingModal">
                                    <SharingModal title={this.props.title}
                                                  url={this.props.url}
                                                  favorite={false}
                                    />
                                </span>
                            </h5>
                                <p id="ncDescription" className="mediaLink" onClick={this.handleClick}>
                                    {this.props.description}
                                </p>
                                <div>
                                    <span id="date1">{this.props.date.slice(0,10)}</span>
                                    <ColoredTag id="coloredTag" type={this.props.type}/>
                                </div>
                        </Media.Body>
                    </Col>
                </Row>
            </Media>
        )
    }
}

export default NewsCard