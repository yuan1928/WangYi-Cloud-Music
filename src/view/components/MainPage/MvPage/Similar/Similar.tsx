import React from "react";
import {withRouter} from "react-router-dom";
import {getSimilarVideo, getRecommendMv} from "../../../../../apis/mvPage";
import './Similar.css'
import {Tooltip} from "antd";
import {PlayCircleOutlined} from "@ant-design/icons";

interface SimilarMv{
    id:any,
    type:string,
    cover:string,
    title:string,
    duration:string,
    playCount:number,
    creator:string
}
interface State{
    id:any,
    type:string,
    similarMvs:SimilarMv[]
}

class Similar extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        type:this.props.match.params.type,
        similarMvs:[]
    }

    componentDidMount() {
        this.getCurInfo()
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(this.props.match.params.id!==this.state.id)
        {
            this.setState(()=>({
                id:this.props.match.params.id,
                type:this.props.match.params.type,
                similarMvs:[]
            }),()=>{this.getCurInfo()})
        }
    }

    getCurInfo=()=>{
        if(this.state.type==="mv")
        {
            getRecommendMv().then(res=>{
                console.log(res);
            })
        }
        else if(this.state.type==="video")
        {
            getSimilarVideo(this.state.id).then(res=>{
                let count=1
                for(let video of res.data.data)
                {
                    if(count>6)break
                    this.state.similarMvs.push({
                        id:video.vid,
                        type:(typeof video.vid==="string"?"video":'mv'),
                        cover:video.coverUrl,
                        title:video.title,
                        duration:this.getDuration(video.durationms),
                        playCount:video.playTime,
                        creator:video.creator[0].userName
                    })
                    count+=1
                }
                this.forceUpdate()
            })
        }
    }

    getDuration=(time:number)=>{
        time=Math.floor(time/1000)
        const h=Math.floor(time/3600)
        const m=Math.floor((time-3600*h)/60)
        const s=time-3600*h-60*m
        const H=(h>0)?(String(h).padStart(2,"0")+":"):""
        const M=String(m).padStart(2,"0")+":"
        const S=String(s).padStart(2,"0")
        return H+M+S
    }

    render() {
        return (
            <div style={{width:"100%",paddingLeft:"20px"}}>
                {
                    this.state.similarMvs.map(item=>(
                        <div className="MvPageSimilarRow">
                            <div style={{width:'50%',position:"relative"}}>
                                <img
                                    style={{width:"100%",objectFit:"cover",borderRadius:"3px",cursor:"pointer"}}
                                    src={item.cover}
                                    alt=""
                                    onClick={()=>{this.props.history.push("/mv/"+item.id+"/"+item.type)}}
                                />
                                <div style={{position:"absolute",top:"2px",right:"2px",color:"white"}}>
                                    <PlayCircleOutlined/>
                                    {item.playCount>=10000?(Math.floor(item.playCount/10000)+"万"):item.playCount}
                                </div>
                                <div style={{position:"absolute",bottom:"2px",right:"2px",color:"white"}}>
                                    {item.duration}
                                </div>
                            </div>
                            <div style={{width:'50%',marginLeft:"3px",padding:"5px",display:"flex",flexDirection:"column",
                                justifyContent:"space-between"}}>
                                <Tooltip title={item.title}>
                                    <div style={{textAlign:"start",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>
                                        {item.title}
                                    </div>
                                </Tooltip>
                                <Tooltip title={item.creator}>
                                    <div style={{textAlign:"start",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",
                                        color:"rgba(0,0,0,0.4)"}}>
                                        by               {item.creator}
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default withRouter(Similar)