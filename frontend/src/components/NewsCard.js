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
        const {src, title, url, description, date, type} = this.props;
        return (
            <Media id="media">
                <Row id="row">
                    <Col  lg={"auto"} xl={3}>
                        <div id="imgDiv">
                            <img id="mediaImg"
                                 src={src}
                                 alt="Generic placeholder"
                            />
                        </div>
                    </Col>
                    <Col>
                        <Media.Body id="mediaBody">
                            <h5 className="mediaLink">
                                    <b onClick={this.handleClick}>{title}</b>
                                <span id="sharingModal">
                                    <SharingModal title={title}
                                                  url={url}
                                                  favorite={false}
                                    />
                                </span>
                            </h5>
                            <p id="ncDescription" className="mediaLink" onClick={this.handleClick}>
                                {description}
                            </p>
                            <div>
                                <span id="date1">{date.slice(0,10)}</span>
                                <ColoredTag id="coloredTag" type={type}/>
                            </div>
                        </Media.Body>
                    </Col>
                </Row>
            </Media>
        )
    }
}

export default NewsCard
