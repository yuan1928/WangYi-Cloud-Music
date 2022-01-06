import React from "react";
import CarouselFigure from "./CarouselFigure/CarouselFigure";
import RecommendSongsList from "./RecommendSongsList/RecommendSongsList";
import Broadcast from "./SpetialBroadcast/Broadcast";
import MV from './MV/MV'
import NewMusic from "./NewMusic/NewMusic";
import MenuBar from "../MenuBar/MenuBar";


class RecommendPage extends React.Component<any, any>{
    componentDidMount() {
    }

    render() {
        return (
            <div style={{position:"relative",height:"80vh",display:"flex",flexWrap:"wrap",overflowY:"scroll"}}>
                <div style={{width:"100%",marginBottom:"10px"}}>
                    <MenuBar current="1"/>
                </div>
                <CarouselFigure/>
                <RecommendSongsList/>
                <Broadcast/>
                <NewMusic/>
                <MV/>
            </div>
        )
    }
}

export default RecommendPage