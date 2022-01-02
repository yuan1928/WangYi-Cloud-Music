import React from "react";
import Header from "../Header/Header";
import {withRouter} from "react-router";

interface State{
    id:number
}
class SimilarSingers extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id
    }

    render() {
        return (
            <div>
                <Header current="4"/>
                similar
            </div>
        )
    }
}

export default withRouter(SimilarSingers)