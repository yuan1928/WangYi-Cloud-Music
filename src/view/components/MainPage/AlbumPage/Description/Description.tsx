import React from "react";
import {getAlbumDetail} from "../../../../../apis/albumPage";

interface State{
    id:number,
    description:string
}
class Descriptions extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        description:''
    }

    componentDidMount() {
        getAlbumDetail(this.state.id).then(res=>{
            console.log(res);
            this.setState({description:res.data.album.description})
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div style={{width:"100%",textAlign:"start"}}>
                {this.state.description}
            </div>
        )
    }
}

export default Descriptions