import React from "react";
import {withRouter} from "react-router";
import {getAccountInfo} from "../../../../../apis/accountPage";
import './Header.css'
import {ManOutlined, WomanOutlined, MailOutlined, PlusOutlined, StopOutlined, WarningOutlined} from "@ant-design/icons";
import {Divider} from "antd";
import {city,province} from "../../../../../enums/area"

interface State{
    id:number,
    avatar:string,
    name:string,
    level:number,
    gender:number,
    newsCount:number,
    subscribeCount:number,
    fansCount:number,
    province:number,
    city:number,
    description:string
}
class Header extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        avatar:"",
        name:"",
        level:0,
        gender:-1,
        newsCount:0,
        subscribeCount:0,
        fansCount:0,
        province:-1,
        city:-1,
        description:""
    }

    componentDidMount() {
        getAccountInfo(this.props.match.params.id).then(res=>{
            const data=res.data.profile
            this.setState({
                avatar:data.avatarUrl,
                name:data.nickname,
                level:res.data.level,
                gender:data.gender,
                newsCount:data.eventCount,
                subscribeCount:data.follows,
                fansCount:data.followeds,
                province:data.province,
                city:data.city,
                description:data.description
            })
        })
    }

    render() {
        return (
            <div style={{width:"100%",display:"flex",marginBottom:"10px"}}>
                <div style={{width:"15%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <img src={this.state.avatar} style={{width:"100%",objectFit:"cover",borderRadius:'50%',marginRight:"30px"}} alt=""/>
                </div>
                <div style={{width:"85%"}}>
                    <div style={{fontSize:'25px',fontWeight:"bolder",textAlign:"start"}} className="accountPageHeaderRow">
                        {this.state.name}
                    </div>
                    <div className="accountPageHeaderRow" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div style={{padding:"1px 5px 1px 5px",backgroundColor:'rgba(0,0,0,0.1)',borderRadius:"5px"}}>
                                Lv{this.state.level}
                            </div>
                            {this.state.gender===1?<div style={{color:"cornflowerblue"}}><ManOutlined/></div>:null}
                            {this.state.gender===2?<div style={{color:"pink"}}><WomanOutlined/></div>:null}
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div className="accountPageHeaderButton"><MailOutlined/>发私信</div>
                            <div className="accountPageHeaderButton"><PlusOutlined/>关注</div>
                            <div className="accountPageHeaderButton"><StopOutlined/>加黑名单</div>
                            <div className="accountPageHeaderButton"><WarningOutlined/>举报</div>
                        </div>
                    </div>
                    <div style={{height:"5px"}} className="accountPageHeaderRow"><Divider/></div>
                    <div style={{display:"flex",alignItems:"center"}}  className="accountPageHeaderRow">
                        <div>
                            <div style={{fontSize:"20px",fontWeight:"bolder"}}>{this.state.newsCount}</div>
                            <div style={{color:"dimgray"}}>动态</div>
                        </div>
                        <Divider type="vertical"/>
                        <div>
                            <div style={{fontSize:"20px",fontWeight:"bolder"}}>{this.state.subscribeCount}</div>
                            <div style={{color:"dimgray"}}>关注</div>
                        </div>
                        <Divider type="vertical"/>
                        <div>
                            <div style={{fontSize:"20px",fontWeight:"bolder"}}>{this.state.fansCount}</div>
                            <div style={{color:"dimgray"}}>粉丝</div>
                        </div>
                    </div>
                    <div className="accountPageHeaderRow" style={{textAlign:"start",color:"dimgray"}}>
                        所在地区：
                        {province[this.state.province]!==undefined?province[this.state.province]:"未知"}
                        {city[this.state.city]!==undefined?city[this.state.city]:"未知"}
                    </div>
                    <div className="accountPageHeaderRow" style={{textAlign:"start",color:"dimgray"}}>
                        个人介绍：
                        {this.state.description.length?this.state.description:"无"}
                    </div>
                </div>
            </div>)
    }
}

export default withRouter(Header)