import React from "react";
import Songs from "./Songs/Songs";
import Comments from "./Comments/Comments";
import Collectors from "./Collectors/Collectors";
import {withRouter,Route,Redirect} from "react-router";

interface State{
    id:number
}

class SongListPage extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id
    }

    render() {
        return (
            <div style={{width:"100%", height:"80vh", position:"relative",overflowY:"scroll",padding:'20px'}}>
                <Route path="/song-list/songs/:id/:songID?" component={Songs}/>
                <Route path="/song-list/comments/:id" component={Comments}/>
                <Route path="/song-list/collectors/:id" component={Collectors}/>
                {this.props.location.pathname==="/song-list/"+this.state.id?
                    <Redirect to={"/song-list/songs/"+this.state.id}/>:null}
            </div>
        )
    }
}

export default withRouter(SongListPage)