import React from "react";
import {withRouter} from "react-router";
import {NavMenu} from "../../../common/NavMenu/NavMenu";
import {getSingerInfo} from "../../../../../apis/singerDetailPage";
import './Header.css'
import {FileAddOutlined,UserOutlined} from "@ant-design/icons";

interface State{
    id:number,
    uid:number,
    menu:any,
    avatar:string,
    name:string,
    singleCount:number,
    albumCount:number,
    mvCount:number
}

class Header extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        uid:0,
        menu:[
            {key:"1",title:"专辑",click:()=>{this.props.history.push("/singer/album/"+this.state.id)}},
            {key:"2",title:"MV",click:()=>{this.props.history.push("/singer/mv/"+this.state.id)}},
            {key:"3",title:"歌手详情",click:()=>{this.props.history.push("/singer/description/"+this.state.id)}},
            {key:"4",title:"相似歌手",click:()=>{this.props.history.push("/singer/similar/"+this.state.id)}},
        ],
        avatar:"",
        name:"",
        singleCount:0,
        albumCount:0,
        mvCount:0
    }

    componentDidMount() {
        getSingerInfo(this.state.id).then(res=>{
            const data=res.data.data.artist
            this.setState(()=>({
                uid:res.data.data.user.userId,
                avatar:data.cover,
                name:data.name,
                singleCount:data.musicSize,
                albumCount:data.albumSize,
                mvCount:data.mvSize
            }),()=>{})
        })
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <div style={{width:"100%",display:"flex"}}>
                    <div style={{width:"15%",marginRight:"50px"}}>
                        <img src={this.state.avatar} style={{width:"200px",height:"200px",borderRadius:"6px"}} alt=""/>
                    </div>
                    <div>
                        <div className="singerDetailPageHeaderRow" style={{fontSize:"20px",fontWeight:"bolder"}}>
                            {this.state.name}
                        </div>
                        <div className="singerDetailPageHeaderRow">
                            <div className="singerDetailPageHeaderRowButton">
                                <FileAddOutlined />
                                收藏
                            </div>
                            <div
                                className="singerDetailPageHeaderRowButton"
                                 onClick={()=>{this.props.history.push("/account/"+this.state.uid)}}
                            >
                                <UserOutlined />
                                个人主页
                            </div>
                        </div>
                        <div className="singerDetailPageHeaderRow">
                            <div className="singerDetailPageHeaderRowItem">
                                单曲数：{this.state.singleCount}
                            </div>
                            <div className="singerDetailPageHeaderRowItem">
                                专辑数：{this.state.albumCount}
                            </div>
                            <div className="singerDetailPageHeaderRowItem">
                                MV数：{this.state.mvCount}
                            </div>
                        </div>
                    </div>
                </div>
                <NavMenu menu={this.state.menu} current={this.props.current}/>
            </div>
        )
    }
}

export default withRouter(Header)