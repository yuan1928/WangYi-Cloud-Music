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
    history:any
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
        history:null
    }

    componentDidMount() {
        this.state.login.current.focus()
        loginEvent.addListener("login",()=>{

        })
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
                this.props.history.push("/login")
            }
        })
    }

    prev=()=>{
        /*const path=this.props.location.pathname.split("/")
        path.shift()
        const page=path[0]
        const subPage=path[1]
        const key=path[2]
        const searchDict=['singles','singers','albums','videos','song-lists','lyrics','users']*/
        this.props.history.push("/user")
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
                    <Avatar icon={<UserOutlined />}  className="navItem"/>
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