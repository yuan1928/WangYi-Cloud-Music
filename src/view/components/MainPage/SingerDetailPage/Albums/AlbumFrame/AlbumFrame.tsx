import React from "react";
import './AlbumFrame.css'
import {HeartOutlined,DownloadOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {getMusicUrl,isMusicUsable} from "../../../../../../apis/singerDetailPage";
import {playSingerSong} from "../../../MainPage";

class AlbumFrame extends React.Component<any, any>{
    play=(id:number)=>{
        isMusicUsable(id).then(()=>{
            getMusicUrl(id).then(res=>{
                console.log(res);
                playSingerSong.emit("play",id,res.data.data[0].url,this.props.singerID)
            })
        },()=>{alert("暂无播放源")})
    }

    render() {
        return (
            <div style={{width:"100%",display:"flex",margin:"50px 0 50px 0"}}>
                <div style={{width:"15%",marginRight:"50px"}}>
                    <img
                        src={this.props.album.cover}
                        style={{width:"100%",objectFit:"cover",borderRadius:"3px",cursor:"pointer"}}
                        onClick={()=>{this.props.history.push("/album/"+this.props.album.id)}}
                        alt=""
                    />
                </div>
                <div style={{width:"85%"}}>
                    <div style={{width:"100%",textAlign:"start",fontWeight:"bolder",fontSize:"15px",marginBottom:"10px"}}>
                        {this.props.album.name}
                    </div>
                    {
                        this.props.album.songs.map((item,idx)=>(
                            <div
                                className={idx%2===0?"singerDetailPageAlbumListRowEven":"singerDetailPageAlbumListRowOdd"}
                                onClick={()=>{this.play(item.id)}}
                            >
                                <div style={{width:"5%"}} className="singerDetailPageAlbumListRowItem">{idx+1}</div>
                                <div style={{width:"5%"}} className="singerDetailPageAlbumListRowItem"><HeartOutlined/></div>
                                <div style={{width:"5%"}} className="singerDetailPageAlbumListRowItem"><DownloadOutlined/></div>
                                <div style={{width:"75%"}} className="singerDetailPageAlbumListRowItem">{item.title}</div>
                                <div style={{width:"10%"}} className="singerDetailPageAlbumListRowItem">{item.duration}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(AlbumFrame)