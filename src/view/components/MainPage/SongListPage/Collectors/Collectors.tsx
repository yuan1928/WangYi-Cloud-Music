import React from "react";
import {getSongListDetailInfo} from "../../../../../apis/songListDetailPage";
import {ManOutlined,WomanOutlined} from "@ant-design/icons"
import {withRouter} from "react-router";
import Header from "../Header/Header";
import {NavMenu} from "../../../common/NavMenu/NavMenu";

interface Collector{
    id:number,
    name:string,
    img:string,
    signature:string,
    gender:number
}
interface State{
    id:number,
    menu:any,
    collectors:Collector[]
}
class Collectors extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        menu:[
            {key:"1",title:"歌曲列表",click:()=>{this.click("songs")}},
            {key:"2",title:"评论",click:()=>{this.click("comments")}},
            {key:"3",title:"收藏者",click:()=>{this.click("collectors")}},
        ],
        collectors:[]
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
        getSongListDetailInfo(this.state.id).then(res=>{
            for(let person of res.data.playlist.subscribers)
            {
                this.state.collectors.push({
                    id:person.userId,
                    name:person.nickname,
                    img:person.avatarUrl,
                    signature:person.signature,
                    gender:person.gender
                })
            }
            this.forceUpdate()
        })
    }

    click=(subPage:string)=>{
        this.props.history.push("/song-list/"+subPage+"/"+this.state.id)
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <Header id={this.state.id}/>
                <NavMenu menu={this.state.menu} current="3"/>
                <div style={{width:"100%",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                    {
                        this.state.collectors.map(item=>(
                            <div style={{width:"28%",display:"flex",alignItems:"center",margin:"30px"}}>
                                <img
                                    src={item.img}
                                    style={{width:"25%",objectFit:"cover",borderRadius:"50%",cursor:"pointer"}}
                                    alt=""
                                    onClick={()=>{this.props.history.push("/account/"+item.id)}}
                                />
                                <div style={{width:"70%",marginLeft:"30px",display:"flex",alignItems:"center",flexWrap:"wrap"}}>
                                    <div style={{width:"100%",display:"flex"}}>
                                        {item.name}
                                        {item.gender===1?<div style={{color:"cornflowerblue"}}><ManOutlined/></div>:null}
                                        {item.gender===2?<div style={{color:"pink"}}><WomanOutlined/></div>:null}
                                    </div>
                                    <div style={{color:"rgba(0,0,0,0.3)",textAlign:"start"}}>
                                        {item.signature}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Collectors)