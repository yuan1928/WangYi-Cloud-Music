import React from "react";
import {withRouter} from "react-router-dom";
import Songs from "./Songs/Songs";
import Comments from "./Comments/Comments";
import Description from "./Description/Description";
import {Redirect, Route} from "react-router";

interface State{
    id:number
}

class AlbumPage extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id
    }

    render() {
        return (
            <div style={{width:"100%", height:"80vh", position:"relative",overflowY:"scroll",padding:'20px'}}>
                <Route path="/album/songs/:id/:songID?" component={Songs}/>
                <Route path="/album/comments/:id" component={Comments}/>
                <Route path="/album/description/:id" component={Description}/>
                {this.props.location.pathname==="/album/"+this.state.id?
                    <Redirect to={"/album/songs/"+this.state.id}/>:null}
            </div>
        )
    }
}

export default withRouter(AlbumPage)
