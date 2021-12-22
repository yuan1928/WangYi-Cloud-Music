import React from "react";
import {withRouter} from "react-router-dom";
import {NavMenu} from "../../common/NavMenu/NavMenu";
import Songs from "./Songs/Songs";
import Comments from "./Comments/Comments";
import Description from "./Description/Description";
import {getAlbumDetail} from "../../../../apis/albumPage";
import Header from "./Header/Header";
import {Redirect, Route} from "react-router";

interface State{
    menu:any,
    id:number
}

class AlbumPage extends React.Component<any, any>{
    state:State={
        menu:[
            {key:"1",title:"歌曲列表",click:()=>{this.click("songs")}},
            {key:"2",title:"评论",click:()=>{this.click("comments")}},
            {key:"3",title:"专辑详情",click:()=>{this.click("description")}},
        ],
        id:this.props.match.params.id
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(this.state.menu[1].title==="评论")
        {
            getAlbumDetail(this.state.id).then(res=>{
                const menu=this.state.menu
                menu[1].title="评论("+res.data.album.info.commentCount+")"
                this.forceUpdate()
            })
        }
    }

    componentDidMount() {
        //getAlbumDetail(this.state.id).then(res=>{console.log(res);})
    }

    click=(subPage:string)=>{
        this.props.history.push("/album/"+subPage+"/"+this.state.id)
    }

    render() {
        return (
            <div style={{width:"100%", height:"80vh", position:"relative",overflowY:"scroll",padding:'20px'}}>
                <Header id={this.state.id}/>
                <NavMenu menu={this.state.menu}/>
                <Route path="/album/songs/:id/:songID?" component={Songs}/>
                <Route path="/album/comments/:id" component={Comments}/>
                <Route path="/album/description/:id" component={Description}/>
                {this.props.location.pathname==="/album/"+this.state.id?
                    <Redirect to={"/album/songs/"+this.state.id}/>:null}
            </div>
        )
    }
}

export default withRouter(AlbumPage)
