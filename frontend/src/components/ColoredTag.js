import React from 'react'

class ColoredTag extends React.Component{

    state = {
        backgroundColor: "",
        color: "",
        fontSize: (this.props.font === undefined)? "1em": this.props.font,
        borderRadius: "4px",
        float: "right",
        margin: (this.props.margin === undefined)? "": this.props.margin
    }
    
    componentDidMount() {
        this.changeColor()
    }
    
    changeColor() {
        let tagColor = {
            world: "#7c4eff",
            politics: "#419488",
            business: "#4696ec",
            technology: "#cedc39",
            sports: "#f6c244",
            others: "#6e757c",
            guardian: "#14284a",
            nytimes: "#dddddd"
        }

        let tagType = this.props.type.toLowerCase()

        this.setState({
            backgroundColor: tagColor.hasOwnProperty(tagType)?
                tagColor[tagType]: tagColor["others"],
            color: (tagType === "technology" || tagType === "sports"
                || tagType === "nytimes")?
                "black" : "white"
        })
    }
    
    render() {
        return (
            <span style={this.state}>
                <p style={{padding:"0 8px",margin:"0"}}><b>{this.props.type.toUpperCase()}</b></p>
            </span>
        )
    }
}

export default ColoredTag
