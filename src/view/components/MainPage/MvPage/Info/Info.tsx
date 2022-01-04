import React from "react";
import {withRouter} from "react-router-dom";

class Info extends React.Component<any, any>{
    render() {
        return (
            <div style={{width:"100%",border:"red solid"}}>
                info{this.props.match.params.id}
            </div>
        )
    }
}

export default withRouter(Info)