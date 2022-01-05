import React from "react";
import {withRouter} from "react-router-dom";
import {getVideoComments,getMvComments} from "../../../../../apis/mvPage";
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
    id:any,
    type:string,
    total:number,
    curPage:1,
    comments:Comment[]
}
class Comments extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        type:this.props.match.params.type,
        total:0,
        curPage:1,
        comments:[]
    }

    getCurInfo=()=>{
        if(this.state.type==="mv")
        {
            getMvComments(this.state.id,(this.state.curPage-1)*20).then(res=>{
                console.log(res);
            })
        }
        else if(this.state.type==="video")
        {
            getVideoComments(this.state.id,(this.state.curPage-1)*10).then(res=>{
                this.setState({total:res.data.total})
                for(let comment of res.data.comments)
                {
                    this.state.comments.push({
                        user:comment.user.nickname,
                        avatar:comment.user.avatarUrl,
                        comment:comment.content,
                        time:comment.timeStr,
                        likeCount:comment.likedCount,
                        replyUser:(comment.beReplied.length)?comment.beReplied[0].user.nickname:" ",
                        replyComment:(comment.beReplied.length)?comment.beReplied[0].content:" "
                    })
                }
                this.forceUpdate()
            })
        }
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
                total:0,
                curPage:1,
                comments:[]
            }),()=>{this.getCurInfo()})
        }
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                {
                    this.state.comments.map((item,k)=>(
                        <div style={{margin:"30px 0 30px 0",display:"flex"}}>
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
                <div style={{width:"100%"}}>
                    <Pagination
                        total={this.state.total}
                        pageSize={10}
                        onChange={(page)=>{
                            this.setState(()=>({curPage:page,comments:[]}),()=>{this.getCurInfo()})
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default withRouter(Comments)