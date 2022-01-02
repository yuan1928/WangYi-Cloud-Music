import React from "react";
import Header from "../Header/Header";
import {withRouter} from "react-router";

interface State{
    id:number
}
class Description extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id
    }

    render() {
        return (
            <div>
                <Header current="3"/>
                desc
            </div>
        )
    }
}

export default withRouter(Description)