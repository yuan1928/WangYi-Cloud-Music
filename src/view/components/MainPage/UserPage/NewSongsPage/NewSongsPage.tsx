import React from "react";
import {Route,withRouter,Redirect} from "react-router-dom";
import NewSongs from "./NewSongs/NewSongs";
import NewCDs from "./NewCDs/NewCDs";
import './NewSongsPage.css'

interface State{
    newSongButtonRef:any,
    newCdButtonRef:any
}
class NewSongsPage extends React.Component<any, any>{
    state:State={
        newSongButtonRef:React.createRef(),
        newCdButtonRef:React.createRef()
    }

    click=(type:string)=>{
        const buttonSelected=(type==="song")?this.state.newSongButtonRef.current:this.state.newCdButtonRef.current
        const buttonOther=(type==="song")?this.state.newCdButtonRef.current:this.state.newSongButtonRef.current
        buttonSelected.id="newSongsPageSelectedButton"
        buttonOther.id="newSongsPageAnotherButton"
        this.props.history.push("/user/new/"+type)
    }

    render() {
        return (
            <div
                style={{width:"100%", height:"80vh", display:"flex",flexWrap:"wrap",justifyContent:"center",
                        position:"relative",overflowY:"scroll",padding:'20px'}}
            >
                <div
                    style={{width:"30%",height:'30px',border:"rgba(0,0,0,0.2) solid 0.5px",
                            borderRadius:"10px",display:"flex",alignItems:"center",justifySelf:"center"}}
                >
                    <div
                        ref={this.state.newSongButtonRef}
                        onClick={()=>{this.click("song")}}
                        id="newSongsPageSelectedButton"
                    >
                        新歌速递
                    </div>
                    <div
                        ref={this.state.newCdButtonRef}
                        onClick={()=>{this.click("cd")}}
                        id="newSongsPageAnotherButton"
                    >
                        新碟上架
                    </div>
                </div>

                <Route path="/user/new/song" component={NewSongs}/>
                <Route path="/user/new/cd" component={NewCDs}/>
                {this.props.location.pathname==="/user/new"? <Redirect to="/user/new/song"/>:null}

            </div>
        )
    }
}

export default withRouter(NewSongsPage)