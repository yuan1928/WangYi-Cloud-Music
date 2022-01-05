import React from "react";
import Comments from "./Comments/Comments";
import Info from "./Info/Info";
import Player from "./Player/Player";
import Similar from "./Similar/Similar";
import {withRouter} from "react-router-dom";

class MvPage extends React.Component<any, any>{
    render() {
        return (
            <div  style={{width:"100%", height:"80vh", overflowY:"scroll",padding:"20px"}}>
                <div style={{width:"100%",display:"flex"}}>
                    <div style={{width:"60%"}}>
                        <Player/>
                        <Info/>
                    </div>
                    <div style={{width:"40%"}}>
                        <Similar/>
                    </div>
                </div>
                <div style={{width:"60%"}}>
                    <div style={{width:"70%",marginLeft:"30%"}}>
                        <Comments/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MvPage)