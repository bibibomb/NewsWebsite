import React from 'react'
import AsyncSelect from 'react-select/async';
import debounce from 'debounce-promise'
import * as Constants from "../constants/Constants"
require("../stylesheets/SearchBar.css")


class SearchBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            inputValue:"",
            options : debounce(this.loadOptions,1000),
            placeholder:"Enter keyword.."
        }
    }
    
    componentDidMount() {
        let url = window.location.href
        console.log(url)
        let loc = url.search("/search")
        console.log(loc)
        if (loc !== -1) {
            let show = url.slice(loc+10).replace("%20"," ")
            this.setState({
                placeholder: show
            })
        } else {
            this.setState({
                placeholder: "Enter keyword.."
            })
        }
    }
    
    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue:inputValue });
        return inputValue;
    };
    
    handleChangeSelect = selectedOption => {
        
        window.location.hash = "/search?q=" + selectedOption.label
    }
    
    loadOptions = async (inputValue) => {
        let url = Constants.MICROSOFT_AUTOSUGGESTION_URL + `?q=` + inputValue
        const response = await fetch (url, {
            headers: {
                "Ocp-Apim-Subscription-Key": Constants.OCP_APIM_SUBSCRIPTION_KEY
            }
        })
         const data = await response.json()
        // console.log(data)
    
        const resultsRaw = data.suggestionGroups[0].searchSuggestions;
        const results = resultsRaw.map(result => (
            {label: result.displayText, value: result.displayText }
            ));
        // console.log(results)
        return results
    }
    
    
    
    render() {
        return (
                <div id="searchBarBody">
                    <AsyncSelect loadOptions={this.state.options}
                                 placeholder={this.state.placeholder}
                                 onInputChange={this.handleInputChange}
                                 noOptionsMessage={()=>"No Match"}
                                 onChange={this.handleChangeSelect}
        
                    />
                </div>
        )
    }
}

export default SearchBar
