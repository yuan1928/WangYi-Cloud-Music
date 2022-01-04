import React from "react";
import {withRouter} from "react-router-dom";

class Similar extends React.Component<any, any>{
    render() {
        return (
            <div style={{width:"100%",border:"red solid"}}>
                similar{this.props.match.params.id}
            </div>
        )
    }
}

export default withRouter(Similar)