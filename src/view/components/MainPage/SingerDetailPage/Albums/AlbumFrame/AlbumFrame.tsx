import React from "react";
import './AlbumFrame.css'
import {HeartOutlined,DownloadOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";

class AlbumFrame extends React.Component<any, any>{
    render() {
        console.log("in")
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
                            <div className={idx%2===0?"singerDetailPageAlbumListRowEven":"singerDetailPageAlbumListRowOdd"}>
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