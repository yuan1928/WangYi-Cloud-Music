import React from "react";
import {withRouter} from "react-router";
import {Route,Redirect} from "react-router-dom";
import Albums from "./Albums/Albums";
import MVs from "./MVs/MVs";
import Description from "./Description/Description";
import SimilarSingers from "./SimilarSingers/SimilarSingers";

interface State{
    id:number
}

class SingerDetailPage extends React.Component<any, any>{
    state:State={id:this.props.match.params.id}

    render() {
        return (
            <div  style={{width:"100%", height:"80vh", overflowY:"scroll",padding:"20px"}}>
                <Route path="/singer/album/:id" component={Albums}/>
                <Route path="/singer/mv/:id" component={MVs}/>
                <Route path="/singer/description/:id" component={Description}/>
                <Route path="/singer/similar/:id" component={SimilarSingers}/>
                {
                    this.props.location.pathname==="/singer/"+this.state.id?
                        <Redirect to={"/singer/album/"+this.state.id}/>:null
                }
            </div>
        )
    }
}

export default withRouter(SingerDetailPage)