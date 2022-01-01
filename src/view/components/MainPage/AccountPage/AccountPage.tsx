import React from "react";
import {withRouter} from "react-router";
import {Redirect, Route} from "react-router-dom";
import Create from "./createSongLists/Create";
import Subscribe from "./subscribeSongLists/Subscribe";

interface State{
    id:number
}

class AccountPage extends React.Component<any, any>{
    state:State={id:this.props.match.params.id}

    render() {
        return (
            <div style={{width:"100%", height:"80vh", overflowY:"scroll",padding:"20px"}}>
                <Route path="/account/create/:id" component={Create}/>
                <Route path="/account/subscribe/:id" component={Subscribe}/>
                {
                    this.props.location.pathname==="/account/"+this.state.id?
                        <Redirect to={"/account/create/"+this.state.id}/>:null
                }
            </div>
        )
    }
}

export default withRouter(AccountPage)