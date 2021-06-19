import React, {useState} from "react"
import {FacebookShareButton} from "react-share";
import {TwitterShareButton} from "react-share";
import {EmailShareButton} from "react-share";
import {FacebookIcon} from "react-share";
import {TwitterIcon} from "react-share";
import {EmailIcon} from "react-share";
import Modal from "react-bootstrap/Modal";
import {IoMdShare} from 'react-icons/all'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


function SharingModal(props) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => {
        setShow(true)
    };
    
    let title
    if (props.favorite){
        title =  (<Modal.Title>
            <h4>{props.news.toUpperCase()}</h4>
            <h5>{props.title}</h5>
        </Modal.Title>)
    } else {
        title = ( <Modal.Title><h5>{props.title}</h5></Modal.Title>)
    }
     let size = 50
    // if (window.screen.width < 450) size = 35
    return (
        <>
            <IoMdShare onClick={handleShow}/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    {title}
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: "center"}}><h5>Share via</h5></p>
                    <div style={{margin:"0 auto"}}>
                        <Row xs={3}>
                            <Col xs={4}>
                                <FacebookShareButton children={FacebookIcon}
                                                     url={props.url}
                                                     hashtag={"#CSCI_571_NewsApp"}
                                                     style={{display:"block",
                                                         margin:"auto"}}
                                >
                                    <FacebookIcon size={size} round={true}  />
                                </FacebookShareButton>
                            </Col>
                            <Col xs={4}>
                                <TwitterShareButton  children={TwitterIcon}
                                                     url={props.url+"#CSCI_571_NewsApp"}
                                                     style={{display:"block",
                                                         margin:"auto"}}
                                >
                                    <TwitterIcon size={size} round={true}/>
                                </TwitterShareButton>
                            </Col>
                            <Col xs={4}>
                                <EmailShareButton children={EmailIcon}
                                                  url={props.url}
                                                  subject={"#CSCI_571_NewsApp"}
                                                  style={{display:"block",
                                                      margin:"auto"}}
                                >
                                    <EmailIcon size={size} round={true}/>
                                </EmailShareButton>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SharingModal
