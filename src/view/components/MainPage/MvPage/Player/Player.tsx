import React from "react";
import {withRouter} from "react-router-dom";
import {getMvUrl,getVideoUrl} from "../../../../../apis/mvPage";
import {PlayCircleOutlined,PauseOutlined} from "@ant-design/icons";

interface State{
    id:any,
    type:string,
    url:string,
    videoRef:any,
    progressRef:any,
    progressBGRef:any,
    isPause:boolean,
    curTime:string,
    endTime:string,
    mouseDown:boolean
}

class Player extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        type:this.props.match.params.type,
        url:"",
        videoRef:React.createRef(),
        progressRef:React.createRef(),
        progressBGRef:React.createRef(),
        isPause:false,
        curTime:"00:00",
        endTime:"00:00",
        mouseDown:false
    }

    componentDidMount() {
        this.getSrc()
        const video=document.getElementById("video")
        if(video)
        {video.addEventListener("timeupdate",this.updateControls)}
    }

    getSrc=()=>{
        if(this.state.type==="mv")
        {
            getMvUrl(this.state.id).then(res=>{
                if(res.data.data.url!==undefined)
                {this.setState({url:res.data.data.url})}
            })
        }
        else if(this.state.type==="video")
        {
            getVideoUrl(this.state.id).then(res=>{
                if(res.data.urls.length)
                {this.setState({url:res.data.urls[0].url})}
                else
                {
                    getMvUrl(this.state.id).then(res=>{
                        if(res.data.data && res.data.data.url!==undefined)
                        {this.setState({url:res.data.data.url})}
                    })
                }
            })
        }
    }

    play=()=>{
        if(!this.state.isPause)
        {
            this.setState(()=>({isPause:true}),()=>{this.state.videoRef.current.pause()})
        }
        else
        {
            this.setState(()=>({isPause:false}),()=>{this.state.videoRef.current.play()})
        }
    }

    getTime(time:number){
        const h=Math.floor(time/3600)
        const m=Math.floor((time-h*3600)/60)
        const s=String(Math.round(time-3600*h-60*m)).padStart(2,"0")
        return (h>0?(String(h).padStart(2,"0")+":"):"")+String(m).padStart(2,"0")+":"+s
    }

    updateControls=()=>{
        const player=this.state.videoRef.current
        const progress=this.state.progressRef.current
        //更新当前时间
        this.setState({curTime:this.getTime(player.currentTime)})
        //更新终止时间
        if(this.state.endTime==="00:00" && !isNaN(player.duration))
        {this.setState({endTime:this.getTime(player.duration)})}
        //更新进度条
        progress.style.width=String(100*player.currentTime/player.duration)+"%"
        //更新isPause
        if(player.currentTime===player.duration)
        {this.setState({isPause:true})}
    }

    click=(e:any)=>{
        let start=this.state.progressBGRef.current.offsetLeft
        let end=this.state.progressBGRef.current.offsetWidth+start
        let cur=e.clientX
        if(cur>=start && cur<=end)
        {
            const bar=this.state.progressRef
            const player=this.state.videoRef
            let ratio=((cur-start)/(end-start))
            bar.current.width=(100*ratio)+"%"//改变进度条长度
            let curTime=player.current.duration*ratio
            player.current.currentTime=curTime//改变播放器当前时间
            this.setState({curTime:this.getTime(curTime)})//改变显示的当前时间
            if(cur===end)
            {this.setState({isPause:true})}
        }
    }

    render() {
        return (
            <div style={{width:"100%",border:"red solid"}}>
                <div style={{width:"70%",backgroundColor:"black",padding:"30px",marginLeft:"20%"}}>
                    <video autoPlay src={this.state.url} ref={this.state.videoRef} id="video" width="100%"/>
                </div>
                <div
                    style={{width:"70%",height:"20px",marginLeft:"20%",backgroundColor:"rgba(0,0,0,0.95)",cursor:"pointer"}}
                    ref={this.state.progressBGRef}
                    onClick={(e)=>{this.click(e)}}
                    onMouseDown={()=>{this.setState({mouseDown:true})}}
                    onMouseMove={(e)=>{if(this.state.mouseDown){this.click(e)}}}
                    onMouseUp={()=>{this.setState({mouseDown:false})}}
                >
                    <div style={{width:'100%',height:"1px",backgroundColor:"rgba(256,256,256,0.8)",display:"flex",alignItems:"center",overflow:"visible"}}>
                        <div style={{height:"1px",backgroundColor:"rgb(201,38,32)"}} ref={this.state.progressRef}/>
                        <div style={{width:"6px",height:"6px",borderRadius:'3px',backgroundColor:"rgb(201,38,32)"}}/>
                    </div>
                </div>
                <div style={{width:"70%",marginLeft:"20%",padding:"5px 10px 10px 10px",backgroundColor:"rgba(0,0,0,0.95)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div onClick={()=>{this.play()}} style={{color:"rgba(256,256,256,0.8)",cursor:"pointer"}}>
                        {this.state.isPause?<PlayCircleOutlined/>:<PauseOutlined/>}
                    </div>
                    <div style={{color:"rgba(256,256,256,0.8)",cursor:"pointer",margin:"0 10px 0 10px"}}>
                        {this.state.curTime}   /   {this.state.endTime}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Player)