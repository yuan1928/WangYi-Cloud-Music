import React from "react";
import icon from "../../../../assets/icon.png"
import 'antd/dist/antd.css'
import {Button, Tooltip, Input, Avatar} from "antd";
import { LeftOutlined , RightOutlined, SearchOutlined, AudioOutlined, UserOutlined, SkinOutlined, SettingOutlined,
    MailOutlined, MinusOutlined, BorderOutlined, FullscreenExitOutlined, CloseOutlined, CaretDownOutlined} from '@ant-design/icons';
import  "./NavBar.css"
import {withRouter} from "react-router";
import EventEmitter from "events";
import {isLogin} from "../../MainPage/MainPage";
import {loginEvent} from "../../MainPage/MainPage";
import {logout} from "../../../../apis/LoginPage";
import wyy from "../../../../assets/wyy.svg"
import {getAccountInfo,getUserInfo} from "../../../../apis/LoginPage";

const updateKeyword=new EventEmitter()
interface Button{
    title:string,
    icon:any
}
interface State{
    buttonGroup1:Button[],
    buttonGroup2:Button[],
    buttonGroup3:Button[],
    searchValue:string,
    clear:boolean,
    clearButtonActive:any,
    clearButtonDeactive:any,
    login:any,
    history:any,
    avatarUrl:string,
    userName:""
}

class NavBar extends React.Component<any, any>{
    state:State={
        buttonGroup1:[{title:"后退",icon:LeftOutlined},{title:"前进",icon:RightOutlined}],
        buttonGroup2:[{title:"1",icon:<SkinOutlined/>},{title:"2",icon:<SettingOutlined/>},{title:"3",icon:<MailOutlined/>}],
        buttonGroup3:[{title:"mini模式",icon:<FullscreenExitOutlined/>},{title:"最小化",icon:<MinusOutlined/>},
                      {title:"最大化",icon:<BorderOutlined/>},{title:"关闭",icon:<CloseOutlined/>}],
        searchValue:"",
        clear:false,
        clearButtonActive:(<Button icon={<CloseOutlined/>} style={{border:"none"}}
                                   onClick={()=>{this.setState({searchValue:'',clear:false})}}/>),
        clearButtonDeactive:(<Button icon={<CloseOutlined/>} style={{color:"white",border:"none"}}/>),
        login:React.createRef(),
        history:null,
        avatarUrl:"",
        userName:""
    }

    componentDidMount() {
        //this.state.login.current.focus()
        loginEvent.addListener("login",()=>{
            if(window.localStorage.getItem("id")!==null)
            {
                getUserInfo(window.localStorage.getItem("id")).then(res=>{
                    this.setState({avatarUrl:res.data.profile.avatarUrl,userName:res.data.profile.nickname})
                    this.forceUpdate()
                })
            }
        })
        if(isLogin && window.localStorage.getItem("id")!==null)
        {
            getUserInfo(window.localStorage.getItem("id")).then(res=>{
                this.setState({avatarUrl:res.data.profile.avatarUrl,userName:res.data.profile.nickname})
            })
        }
    }

    changeSearch=(e:any)=>{
        this.setState({searchValue:e.target.value})
        if(e.target.value.length)
        {this.setState({clear:true})}
        else
        {this.setState({clear:false})}
    }

    getSearch=()=>{
        updateKeyword.emit("update",this.state.searchValue,this.props.location.pathname.split("/")[2])
        this.props.history.push("/search/"+this.state.searchValue+"/Infinity")
    }

    clear=()=>{
        this.setState({searchValue:""})
    }

    login=()=>{
        //const node=this.state.login
        //跳出登录页面
        this.props.history.push("/login")
    }

    logout_=()=>{
        logout().then(res=>{
            console.log(res);
            if(res.data.code===200)
            {
                loginEvent.emit("logout")
                window.localStorage.removeItem("id")
                window.localStorage.removeItem("cookie")
                window.localStorage.removeItem("token")
                this.setState({avatarUrl:"",userName:""})
                this.props.history.push("/login")
            }
        })
    }

    prev=()=>{
        const path=this.props.location.pathname.split("/")
        path.shift()
        const page=path[0]
        const subPage=path[1]
        const key=path[2]
        const searchDict=['singles','singers','albums','videos','song-lists','lyrics','users']
        //if((page==="song-list" || page==="album") && this.state.searchValue.length){this.props.history.push("/search/"+this.state.searchValue+"/Infinity")}
        //else if(page==="search" && key===this.state.searchValue){this.props.history.push("/search/"+this.state.searchValue+"/Infinity")}
        //else {this.props.history.push("/user")}
        this.props.history.push("/user")
        //this.props.history.goBack()
    }

    next=()=>{}

    render() {
        return (
            <div id="navRoot">
                <div id="navLeft">
                    <img style={{width:"180px",objectFit:"cover"}} src={wyy}/>
                </div>
                <div id="navCenter">
                    {
                        this.state.buttonGroup1.map((item)=>
                            (<Tooltip title={item.title} key={item.title}>
                                <Button size="small" type="primary" shape="circle" icon={<item.icon/>}  className="navItem"
                                         style={{backgroundColor:'rgba(0,0,0,0.1)',border:"none",color:"azure"}}
                                        onClick={item.title==="后退"?this.prev:this.next}
                                />
                            </Tooltip>)
                        )
                    }
                    <div id="navTextInput">
                        <Input  placeholder="搜索"
                                value={this.state.searchValue}
                                prefix={<Button icon={<SearchOutlined/>} style={{border:"none"}}/>}
                                suffix={this.state.clear?(this.state.clearButtonActive):(this.state.clearButtonDeactive)}
                                style={{border:"none",borderRadius:"16px",color:"black"}}
                                onChange={this.changeSearch}
                                onPressEnter={this.getSearch}
                        />
                    </div>
                    <Tooltip title="听歌识曲">
                        <Button size="small" type="primary" shape="circle" icon={<AudioOutlined/>}  className="navItem"
                                style={{backgroundColor:'rgba(0,0,0,0.1)',border:"none",color:"azure"}}/>
                    </Tooltip>
                </div>
                <div id="navRight">
                    {
                        this.state.avatarUrl===""?
                            <Avatar icon={<UserOutlined />}  className="navItem"/>:
                            <img
                                src={this.state.avatarUrl}
                                style={{width:"50px",height:"50px",objectFit:"cover",borderRadius:"50%"}}
                                className="navItem"
                            />
                    }
                    {
                        this.state.userName===""?
                            null:
                            <div className="navItem" style={{color:"white",fontWeight:"bolder"}}>{this.state.userName}</div>
                    }
                    {
                        isLogin?
                            <Button size="small" className="navItem" icon={<CaretDownOutlined/>}
                                    style={{backgroundColor:'rgb(201,38,32)',border:"none",color:"azure"}}
                                    onClick={this.logout_}
                            >
                                退出
                            </Button>:
                            <Button size="small" className="navItem" icon={<CaretDownOutlined/>} ref={this.state.login}
                                    style={{backgroundColor:'rgb(201,38,32)',border:"none",color:"azure"}} onClick={this.login}>
                                未登录
                            </Button>
                    }
                    <Button size="small"  className="navItem"
                            style={{backgroundColor:'rgb(201,38,32)',border:"none",color:"azure"}}>
                        开通VIP
                    </Button>
                    {
                        this.state.buttonGroup2.map((item)=>
                            (<Button size="small" type="primary" shape="circle" icon={item.icon}  className="navItem"
                                     key={item.title} style={{ backgroundColor:'rgb(201,38,32)',border:"none",color:"azure"}}/>)
                        )
                    }
                    <span className="navItem span">|</span>
                    {
                        this.state.buttonGroup3.map((item)=>
                            (<Tooltip title={item.title} key={item.title}>
                                <Button size="small" type="primary" shape="circle" icon={item.icon}  className="navItem test"
                                         style={{ backgroundColor:'rgb(201,38,32)',border:"none",color:"azure"}}/>
                            </Tooltip>)
                        )
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(NavBar)
export {updateKeyword}