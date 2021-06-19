import React from 'react';
import NavBar from "./NavBar";
import NavBarDetail from "./NavBarDetail"
import NavBarFavorite from "./NavBarFavorite";
import CardContent from "./CardContent";
import DetailedArticle from "./DetailedArticle";
import SearchContent from "./SearchContent"
import '../stylesheets/App.css';
import FavoriteCollection from "./FavoriteCollection";
import LoadingIndicator from "./LodingIndicator";

class App extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            checked:(localStorage.getItem("checked") === "false" ||
                localStorage.getItem("checked") === null)? "false":"true",
            news: (localStorage.getItem("checked") == "false" ||
                localStorage.getItem("checked") == null)?"nyTimes":"guardian",
            routeName:  window.location.hash,
            section:""
        }
        console.log("version: 0.2.0")
    }
    
    handleChangeNews = () => {
        this.setState((preState)=>{
            let checked = (preState.checked === "true")? "false":"true"
            localStorage.setItem("checked", checked)
            return{
                news : ((preState.news === "nyTimes")? "guardian":"nyTimes"),
                checked: ((preState.checked === "false")? "true":"false"),
            }
        }
        
        )
    };
    
    componentDidMount() {
        window.addEventListener("hashchange", ()=>{
            // console.log("change route")
            // console.log(window.location.hash)
            this.setState({
                routeName: window.location.hash
            })
        })
    }
    
    getNewsSection = (section) => {
        this.setState({
            section:section
        })
    }
    
    render() {
        let content
        if (this.state.routeName === "#/") {
            // console.log("/#/ render")
            content =
                <>
                    <NavBar switchFunc={this.handleChangeNews}
                            checked={this.state.checked}
                            news={this.state.news}
                            route={this.state.routeName}
                    />
                    <CardContent news={this.state.news}
                                 key={Date.now()}
                                 checked={this.state.checked}
                    />
                </>
        } else if (this.state.routeName.slice(0,11) === "#/favorites") {
            // console.log("/#/favorites render")
    
            content =
                <>
                    <NavBarFavorite news={this.state.news}
                                    route={this.state.routeName}

                    />
                    <FavoriteCollection news={this.state.news}
                    />
                </>
        } else if (this.state.routeName.slice(0,8) === "#/search") {
            // console.log("/#/search render")
            content =
                <>
                    <NavBarDetail news={this.state.news}
                                  route={this.state.routeName}
                                  key={this.state.routeName}


                    />
                    <SearchContent
                        key={Date.now()}
                        news={this.state.news}
                    />
                </>
        } else if (this.state.routeName.slice(0,9) === "#/article") {
            // console.log("/#/article render")
            content =
                <>
                    <NavBarDetail news={this.state.news}
                                  route={this.state.routeName}


                    />
                    <DetailedArticle hasCollected={localStorage.hasOwnProperty(this.state.routeName.slice(13))}
                                     key={Date.now()}
                                     news={this.state.news}
                                     section={this.state.section}
                    />
                </>
        } else {
            // console.log("/#/section render")
    
            content =
                <>
                    <NavBar switchFunc={this.handleChangeNews}
                            checked={this.state.checked}
                            news={this.state.news}
                            route={this.state.routeName}

                    />
                    <CardContent
                                 key={Date.now()}
                                 news={this.state.news}
                                 checked={this.state.checked}
                                 section={this.getNewsSection}
                    />
                </>
        }
        return (
            <>
                <div className="App">
                        {content}
                </div>
                <LoadingIndicator className="loadingIndicator"/>
            </>
        );
    }
}

// export default withRouter(App);
export default App;