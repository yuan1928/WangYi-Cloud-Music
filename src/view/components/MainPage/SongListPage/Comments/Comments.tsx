import React from "react";
import {getComments, getSongListDetailInfo} from "../../../../../apis/songListDetailPage";
import {CommentOutlined, LikeOutlined, ShareAltOutlined} from "@ant-design/icons";
import {Divider, Pagination} from "antd";
import Header from "../Header/Header";
import {NavMenu} from "../../../common/NavMenu/NavMenu";

interface Comment{
    user:string,
    avatar:string,
    comment:string,
    time:string,
    likeCount:number,
    replyUser:string,
    replyComment:string
}
interface State{
    id:number,
    menu:any,
    comments:Comment[],
    commentsNum:number,
    curPage:number
}
class Comments extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        menu:[
            {key:"1",title:"歌曲列表",click:()=>{this.click("songs")}},
            {key:"2",title:"评论",click:()=>{this.click("comments")}},
            {key:"3",title:"收藏者",click:()=>{this.click("collectors")}},
        ],
        comments:[],
        commentsNum:0,
        curPage:1
    }
    componentDidMount() {
        if(this.state.menu[1].title==="评论")
        {
            getSongListDetailInfo(this.state.id).then(res=>{
                const menu=this.state.menu
                menu[1].title="评论("+res.data.playlist.commentCount+")"
                this.forceUpdate()
            })
        }
        this.getCurComments()
        getSongListDetailInfo(this.state.id).then(res=>{
            this.setState({commentsNum:res.data.playlist.commentCount})
        })
    }

    getCurComments=()=>{
        getComments(this.state.id,(this.state.curPage-1)*10).then(res=>{
            for(let comment of res.data.comments)
            {
                this.state.comments.push({
                    user:comment.user.nickname,
                    avatar:comment.user.avatarUrl,
                    comment:comment.content,
                    time:comment.timeStr,
                    likeCount:comment.likeCount,
                    replyUser:comment.beReplied.length?comment.beReplied[0].user.nickname:" ",
                    replyComment:comment.beReplied.length?comment.beReplied[0].content:" "
                })
            }
            this.forceUpdate()
        })
    }

    switchPage=(targetPage:number)=>{
        this.setState(()=>({curPage:targetPage,comments:[]}),()=>{this.getCurComments()})
    }

    click=(subPage:string)=>{
        this.props.history.push("/song-list/"+subPage+"/"+this.state.id)
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <Header id={this.state.id}/>
                <NavMenu menu={this.state.menu} current="2"/>
                <div style={{width:"100%",display:"flex",flexWrap:"wrap"}}>
                    {
                        this.state.comments.map((item,k)=>(
                            <div style={{width:"100%",margin:"30px",display:"flex"}}>
                                <img
                                    src={item.avatar}
                                    alt=""
                                    style={{width:"30px",height:"30px",objectFit:"cover",borderRadius:"50%",margin:"10px"}}
                                />
                                <div style={{width:"100%"}}>
                                    <div style={{width:"100%",display:"flex",justifyContent:"flex-start", flexWrap:"wrap",
                                        marginBottom:"6px"}}>
                                        <div style={{color:"cornflowerblue"}}>{item.user}:</div>
                                        <div style={{textAlign:"start"}}>{item.comment}</div>
                                    </div>
                                    {
                                        item.replyUser!==" "?
                                            <div style={{width:"100%",display:"flex", justifyContent:"flex-start",
                                                flexWrap:"wrap",backgroundColor:"rgba(0,0,0,0.05)",borderRadius:"6px",
                                                padding:"6px"
                                            }}>
                                                <div style={{color:"cornflowerblue"}}>@{item.replyUser}:</div>
                                                <div style={{textAlign:"start"}}>{item.replyComment}</div>
                                            </div>:null
                                    }
                                    <div style={{width:"100%",display:"flex",justifyContent:"space-between",color:"gray",
                                        marginTop:"6px"}}>
                                        <div>{item.time}</div>
                                        <div style={{display:"flex",alignItems:"center"}}>
                                            <LikeOutlined/>
                                            {item.likeCount>0?item.likeCount:null}
                                            <div style={{color:"lightgrey",marginLeft:"5px",marginRight:"5px"}}>|</div>
                                            <ShareAltOutlined />
                                            <div style={{color:"lightgrey",marginLeft:"5px",marginRight:"5px"}}>|</div>
                                            <CommentOutlined />
                                        </div>
                                    </div>
                                    {k!==9? <Divider/>:null}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{width:"100%",margin:"20px"}}>
                    <Pagination
                        total={this.state.commentsNum}
                        defaultPageSize={10}
                        defaultCurrent={1}
                        onChange={this.switchPage}
                    />
                </div>
            </div>
        )
    }
}

export default Comments