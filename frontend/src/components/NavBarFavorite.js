import React from 'react'
import {Navbar} from "react-bootstrap"
import {Nav} from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import {MdBookmark} from "react-icons/all";
import {Col} from "react-bootstrap";
import SearchBar from "./SearchBar"
import ReactTooltip from 'react-tooltip'

require("../stylesheets/NavBar.css")


class NavBarFavorite extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            keyMap: {
                "#/":"1",
                "#/world":"2",
                "#/politics":"3",
                "#/business":"4",
                "#/technology":"5",
                "#/sports":"6"
            }
        }
    }
    
    getEventKey  = (route) => {
        return this.state.keyMap[route]
    }
    
    
    render() {
        return (
            <Navbar id="navBar" expand="lg" variant="dark">
                <Row lg={3} xs={2} style={{width:"100%"}} xl={3}>
                    <Col className="pr-lg-0 pl-3 " id="col1" xs={"auto"} lg={2} >
                        <Nav id="searchBar">
                            <SearchBar func={this.props.changeSelect}/>
                        </Nav>
                    </Col>
                    <Col className="p-0  mr-0" xs={1} lg={"auto"}>
                        <Navbar.Toggle id="toggle" aria-controls="basic-navbar-nav" />
                    </Col>
                    <Col id="col2" lg={10}>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto" id={"linkNav"} activeKey={this.getEventKey(this.props.route)}>
                                <Nav.Link  eventKey="1" href="/#/" exact>Home</Nav.Link>
                                <Nav.Link  eventKey="2" href={ "/#/world"}>World</Nav.Link>
                                <Nav.Link  eventKey="3" href={ "/#/politics"}>Politics</Nav.Link>
                                <Nav.Link  eventKey="4" href={ "/#/business"}>Business</Nav.Link>
                                <Nav.Link  eventKey="5" href={ "/#/technology"}>Technology</Nav.Link>
                                <Nav.Link  eventKey="6" href={"/#/sports"} >Sports</Nav.Link>
                            </Nav>
                                <Nav id="navBookmark2" className="justify-content-end">
                                <MdBookmark data-for={"reactTipFav"} data-tip={"Bookmark"} size={30} color="white" className="icon1"/>
                                <ReactTooltip id="reactTipFav" className={"customTheme2"} place="bottom" type="dark" effect="solid"/>
                                </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Navbar>
        )
    }
}
export default NavBarFavorite

