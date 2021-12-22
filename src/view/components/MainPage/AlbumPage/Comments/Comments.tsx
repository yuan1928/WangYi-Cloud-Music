import React from "react";
import {getAlbumComments} from "../../../../../apis/albumPage";
import {CommentOutlined, LikeOutlined, ShareAltOutlined} from "@ant-design/icons";
import {Divider, Pagination} from "antd";

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
    comments:Comment[],
    commentsNum:number,
    curPage:number
}
class Comments extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        comments:[],
        commentsNum:0,
        curPage:1
    }

    getInfo(){
        getAlbumComments(this.state.id,(this.state.curPage-1)*20).then(res=>{
            console.log(res);
            this.setState({commentsNum:res.data.total})
            for(let comment of res.data.comments)
            {
                this.state.comments.push({
                    user:comment.user.nickname,
                    avatar:comment.user.avatarUrl,
                    comment:comment.content,
                    time:comment.timeStr,
                    likeCount:comment.likeCount,
                    replyUser:(comment.beReplied[0]!==undefined)?comment.beReplied[0].user.nickname:" ",
                    replyComment:(comment.beReplied[0]!==undefined)?comment.beReplied[0].content:" "
                })
            }
            this.forceUpdate()
        })
    }

    switchPage=(targetPage:number)=>{
        this.setState(()=>({curPage:targetPage,comments:[]}),()=>{this.getInfo()})
    }

    componentDidMount() {
        this.getInfo()
    }

    render() {
        return (
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