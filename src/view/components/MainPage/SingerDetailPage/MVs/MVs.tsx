import React from "react";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import {getMVs,getSingerInfo} from "../../../../../apis/singerDetailPage";
import {Tooltip} from "antd";
import {PlayCircleOutlined} from "@ant-design/icons";
import {Pagination} from "antd";

interface MV{
    id:number,
    cover:string,
    title:string,
    playCount:number,
    duration:string
}
interface State{
    id:number,
    curPage:number,
    total:number,
    mvs:MV[]
}
class MVs extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        curPage:1,
        total:0,
        mvs:[]
    }

    componentDidMount() {
        getSingerInfo(this.state.id).then(res=>{
            this.setState({total:res.data.data.artist.mvSize})
        })
        this.getCurMVs()
    }

    getCurMVs=()=>{
        getMVs(this.state.id,(this.state.curPage-1)*20).then(res=>{
                for(let mv of res.data.mvs)
                {
                    this.state.mvs.push({
                        id:mv.id,
                        cover:mv.imgurl,
                        title:mv.name,
                        playCount:mv.playCount,
                        duration:this.getDuration(mv.duration)
                    })
                }
                this.forceUpdate()
            }
        )
    }

    getDuration=(time:number)=>{
        time=Math.floor(time/1000)
        const h=Math.floor(time/3600)
        const m=Math.floor((time-h*3600)/60)
        const s=time-m*60-h*3600
        return (h?(String(h).padStart(2,"0")+":"):"")+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0")
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <Header current="2"/>
                <div style={{width:'100%',display:"flex",flexWrap:"wrap"}}>
                    {
                        this.state.mvs.map(item=>(
                            <div style={{width:"20%",padding:"10px",position:"relative"}}>
                                <img src={item.cover} style={{width:'100%',objectFit:"cover",borderRadius:'3px'}} alt=""/>
                                <Tooltip title={item.title}>
                                    <div
                                        style={{marginTop:"5x",textAlign:"start",whiteSpace:"nowrap",
                                                textOverflow:"ellipsis",overflow:"hidden",cursor:"pointer"}}>
                                        {item.title}
                                    </div>
                                </Tooltip>
                                <div style={{position:"absolute",top:'12px',right:'12px',color:"white"}}>
                                    <PlayCircleOutlined/>
                                    {item.playCount>=10000?(Math.floor(item.playCount/10000)+"万"):item.playCount}
                                </div>
                                <div style={{position:"absolute",bottom:'30px',right:'12px',color:"white"}}>
                                    {item.duration}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{width:'100%'}}>
                    <Pagination
                        total={this.state.total}
                        defaultCurrent={2}
                        pageSize={20}
                        onChange={(page)=>{
                            this.setState(()=>({curPage:page,mvs:[]}),()=>{this.getCurMVs()})
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(MVs)