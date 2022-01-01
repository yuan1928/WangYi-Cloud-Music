import React from "react";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import {NavMenu} from "../../../common/NavMenu/NavMenu";
import {getAccountSongList} from "../../../../../apis/accountPage";
import ShowFramI from "../../../common/ShowFramI/ShowFramI";
import img from "../../../../../assets/noData.svg"

interface SongList{
    id:number,
    imgUrl:string,
    title:string,
    size:number,
    playCount:number
}
interface State{
    id:number,
    menu:any,
    songLists:SongList[]
}

class Subscribe extends React.Component<any, any>{
    state:State={
        id:this.props.match.params.id,
        menu:[
            {key:"1",title:"创建的歌单",click:()=>{this.props.history.push("/account/create/"+this.state.id)}},
            {key:"2",title:"收藏的歌单",click:()=>{this.props.history.push("/account/subscribe/"+this.state.id)}}
        ],
        songLists:[]
    }

    componentDidMount() {
        getAccountSongList(this.state.id).then(res=>{
            for(let list of res.data.playlist)
            {
                if(list.creator.userId.toString()!==this.state.id)
                {
                    this.state.songLists.push({
                        id:list.id,
                        imgUrl:list.coverImgUrl,
                        title:list.name,
                        size:list.trackCount,
                        playCount:list.playCount
                    })
                }
            }
            this.forceUpdate()
        })
    }

    render() {
        return (
            <div style={{width:"100%"}}>
                <Header/>
                <NavMenu menu={this.state.menu} current="2"/>
                <div style={{width:"100%",display:"flex",flexWrap:"wrap"}}>
                    {
                        this.state.songLists.map(item=>(
                            <div style={{width:"20%",padding:"0 0 0 20px",position:'relative',marginTop:'20px'}}>
                                <ShowFramI item={item}/>
                            </div>
                        ))
                    }
                </div>
                {
                    this.state.songLists.length===0?
                        <img src={img} style={{width:'500px',marginTop:"50px"}} alt=""/>: null
                }
            </div>
        )
    }
}

export default withRouter(Subscribe)