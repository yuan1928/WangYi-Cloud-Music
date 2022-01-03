import React from "react";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import {getSimilarSingers} from "../../../../../apis/singerDetailPage";

interface Similar{
    id:number,
    name:string,
    avatar:string
}
interface State{
    id:number,
    similarSingers:Similar[]
}
class SimilarSingers extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        similarSingers:[]
    }

    componentDidMount() {
        getSimilarSingers(this.state.id).then(res=>{
            for(let singer of res.data.artists)
            {
                this.state.similarSingers.push({
                    id:singer.id,
                    avatar:singer.picUrl,
                    name:singer.name
                })
            }
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div style={{width:'100%'}}>
                <Header current="4"/>
                <div style={{width:"100%",display:"flex",flexWrap:"wrap"}}>
                    {
                        this.state.similarSingers.map(item=>(
                            <div style={{width:"20%",padding:"10px"}}>
                                <img
                                    src={item.avatar}
                                    style={{width:"100%",objectFit:"cover",borderRadius:"3px",cursor:"pointer"}}
                                    onClick={()=>{this.props.history.push("/singer/"+item.id)}}
                                    alt=""
                                />
                                <div style={{textAlign:"start"}}>{item.name}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(SimilarSingers)