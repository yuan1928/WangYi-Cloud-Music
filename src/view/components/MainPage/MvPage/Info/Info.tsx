import React from "react";
import {withRouter} from "react-router-dom";
import {getMvInfo,getVideoInfo} from "../../../../../apis/mvPage";
import {PlusOutlined,LikeOutlined,FileAddOutlined,ShareAltOutlined} from "@ant-design/icons";
import './Info.css'

interface State{
    id:any,
    type:string,
    creatorName:string,
    creatorAvatar:string,
    creatorId:number,
    title:string,
    description:string,
    publishTime:string,
    playCount:number,
    likeCount:number,
    subscribeCount:number,
    shareCount:number,
    tags:string[]
}

class Info extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        type:this.props.match.params.type,
        creatorName:"",
        creatorAvatar:"",
        creatorId:-1,
        title:"",
        description:"",
        publishTime:"",
        playCount:0,
        likeCount:0,
        subscribeCount:0,
        shareCount:0,
        tags:[]
    }

    getCurInfo=()=>{
        if(this.state.type==="mv")
        {
            getMvInfo(this.state.id).then(res=>{
                console.log(res);
            })
        }
        else if(this.state.type==="video")
        {
            getVideoInfo(this.state.id).then(res=>{
                const data=res.data.data
                if(data)
                {
                    this.setState(()=>({
                        creatorName:data.creator.nickname,
                        creatorAvatar:data.creator.avatarUrl,
                        creatorId:data.creator.userId,
                        title:data.title,
                        description:data.description,
                        publishTime:this.getTimeStr(data.publishTime),
                        playCount:data.playTime,
                        likeCount:data.praisedCount,
                        subscribeCount:data.subscribeCount,
                        shareCount:data.shareCount,
                        tags:data.videoGroup.map(item=>(item.name))
                    }),()=>{this.forceUpdate()})
                }
            })
        }
    }

    getTimeStr=(time:number)=>{
        const date=new Date(time)
        return date.getFullYear()+"年"+date.getMonth()+"月"+date.getDate()+"日"
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
                    creatorName:"",
                    creatorAvatar:"",
                    creatorId:-1,
                    title:"",
                    description:"",
                    publishTime:"",
                    playCount:0,
                    likeCount:0,
                    subscribeCount:0,
                    shareCount:0,
                    tags:[]
                }),
                ()=>{this.getCurInfo()})
        }
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}  className="MvPageInfoRow">
                    <div style={{display:"flex",alignItems:"center"}}>
                        <img
                            src={this.state.creatorAvatar}
                            style={{width:"60px",height:"60px",objectFit:"cover",borderRadius:"50%",marginRight:"10px",cursor:"pointer"}}
                            alt=""
                            onClick={()=>{this.props.history.push("/account/"+this.state.creatorId)}}
                        />
                        <div>{this.state.creatorName}</div>
                    </div>
                    <div className="MvPageInfoRowButtonI">
                        <PlusOutlined/>关注
                    </div>
                </div>
                <div className="MvPageInfoRow" style={{textAlign:"start",fontSize:"20px",fontWeight:"bolder"}}>
                    {this.state.title}
                </div>
                <div className="MvPageInfoRow" style={{display:"flex"}}>
                    <div style={{marginRight:"20px",color:"rgba(0,0,0,0.4)"}}>
                        发布：{this.state.publishTime}
                    </div>
                    <div style={{color:"rgba(0,0,0,0.4)"}}>
                        播放量：{this.state.playCount>=10000?(Math.floor(this.state.playCount/10000)+"万"):this.state.playCount}
                    </div>
                </div>
                <div className="MvPageInfoRow" style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                    {this.state.tags.map(item=>(<div className="MvPageInfoRowTag">{item}</div>))}
                </div>
                <div className="MvPageInfoRow" style={{textAlign:"start"}}>
                    {this.state.description}
                </div>
                <div className="MvPageInfoRow" style={{display:"flex",alignItems:"center"}}>
                    <div className="MvPageInfoRowButtonII">
                        <LikeOutlined/>赞({this.state.likeCount})
                    </div>
                    <div className="MvPageInfoRowButtonII">
                        <FileAddOutlined/>收藏({this.state.subscribeCount})
                    </div>
                    <div className="MvPageInfoRowButtonII">
                        <ShareAltOutlined/>分享({this.state.shareCount})
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Info)