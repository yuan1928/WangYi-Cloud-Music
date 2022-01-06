import React from "react";
import {getAlbumDetail} from "../../../../../apis/albumPage";
import Header from "../Header/Header";
import {NavMenu} from "../../../common/NavMenu/NavMenu";

interface State{
    id:number,
    menu:any,
    description:string
}
class Descriptions extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        menu:[
            {key:"1",title:"歌曲列表",click:()=>{this.click("songs")}},
            {key:"2",title:"评论",click:()=>{this.click("comments")}},
            {key:"3",title:"专辑详情",click:()=>{this.click("description")}},
        ],
        description:''
    }

    click=(subPage:string)=>{
        this.props.history.push("/album/"+subPage+"/"+this.state.id)
    }

    componentDidMount() {
        if(this.state.menu[1].title==="评论")
        {
            getAlbumDetail(this.state.id).then(res=>{
                const menu=this.state.menu
                menu[1].title="评论("+res.data.album.info.commentCount+")"
                this.forceUpdate()
            })
        }

        getAlbumDetail(this.state.id).then(res=>{
            console.log(res);
            this.setState({description:res.data.album.description})
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <Header id={this.state.id}/>
                <NavMenu menu={this.state.menu} current="3"/>
                <div style={{width:"100%",textAlign:"start"}}>
                    {this.state.description}
                </div>
            </div>
        )
    }
}

export default Descriptions