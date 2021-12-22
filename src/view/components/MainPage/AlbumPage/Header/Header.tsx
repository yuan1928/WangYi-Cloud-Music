import React from "react";
import {PlayCircleFilled, PlusOutlined, FileAddOutlined, ShareAltOutlined,
    DownloadOutlined, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import {getAlbumDetail} from "../../../../../apis/albumPage";
import './Header.css'

interface State{
    id:number,
    imgUrl:string,
    title:string,
    singer:string,
    createTime:string,
    subscribeCount:number,
    shareCount:number
}
class Header extends React.Component<any, any>{
    state:State={
        id:this.props.id,
        imgUrl:"",
        title:"",
        singer:"",
        createTime:"",
        subscribeCount:0,
        shareCount:0
    }

    componentDidMount() {
        getAlbumDetail(this.state.id).then(res=>{
            const data=res.data.album
            this.setState(()=>({
                imgUrl:data.picUrl,
                title:data.name,
                singer:data.artist.name,
                createTime:this.getCreateTime(data.publishTime),
                subscribeCount:data.info.likedCount,
                shareCount:data.info.shareCount
            }),()=>{this.forceUpdate()})
        })
    }

    getCreateTime=(time:number)=>{
        const Time=new Date(time)
        return Time.getFullYear()+"年"+Time.getMonth()+"月"+Time.getDate()+"日"
    }

    render() {
        return (
            <div style={{width:"100%",display:"flex",alignItems:"flex-start"}}>
                <img src={this.state.imgUrl} style={{width:"20%",objectFit:"cover",borderRadius:"6px",marginRight:"10px"}} alt=""/>
                <div style={{width:"68%"}}>
                    <div className="albumPageHeaderRow">
                        <div style={{padding:"0 5px 0 5px", color:"rgb(201,38,32)",marginRight:"6px",
                            border:"rgb(201,38,32) solid 0.05px",borderRadius:"3px"}}>
                            专辑
                        </div>
                        <div style={{fontSize:"25px",fontWeight:"bolder"}}>{this.state.title}</div>
                    </div>
                    <div className="songListPageHeaderRow">
                        <div className="songListPageHeaderButtonSelected">
                            <PlayCircleFilled/>
                            播放全部
                            <PlusOutlined/>
                        </div>
                        <div className="songListPageHeaderButton">
                            <FileAddOutlined/>
                            收藏({this.state.subscribeCount})
                        </div>
                        <div className="songListPageHeaderButton">
                            <ShareAltOutlined/>
                            分享({this.state.shareCount})
                        </div>
                        <div className="songListPageHeaderButton">
                            <DownloadOutlined/>
                            下载全部
                        </div>
                    </div>
                    <div className="albumPageHeaderRow">
                        歌手：
                        <div style={{color:"cornflowerblue",margin:"0 10px 0 3px"}}>{this.state.singer}</div>
                    </div>
                    <div className="albumPageHeaderRow">
                        创建时间：
                        <div style={{color:"cornflowerblue",margin:"0 10px 0 3px"}}>{this.state.createTime}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header