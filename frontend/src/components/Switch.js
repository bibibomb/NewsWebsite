import React, { Component } from "react";
import Switch from "react-switch";
require("../stylesheets/NavBar.css")

class NavSwitch extends Component {
    constructor(props) {
        super(props);
        // this state's checked is string
        this.state = { checked: this.props.checked };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(checked) {
        // checked argument is a boolean type
        this.props.func()
        this.setState({
            checked: checked.toString()
        });
    }
    
    render() {
        //eslint-disable-next-line
        let checked = (this.state.checked == 'true')
        return (
            <span id="navSwitch">
                {/*this props's checked is boolean type*/}
                <Switch   height={20} width={40} uncheckedIcon={false} checkedIcon={false} onChange={this.handleChange}
                        checked={checked} offColor={"#a3c1cc"} onColor={"#26a6f0"} key={Date.now()}/>
            </span>
        );
    }
}

export default NavSwitch