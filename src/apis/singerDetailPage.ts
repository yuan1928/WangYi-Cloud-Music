import request from "./request";

//header
export function getSingerInfo(id:number){
    return request({
        url:"/artist/detail?id="+id,
        method:"get"
    })
}

//专辑
export function getAlbums(id:number,offset:number){
    return request({
        url:"/artist/album?limit=10&id="+id+"&offset="+offset,
        method:"get"
    })
}

export function getAlbum(id:number){
    return request({
        url:"/album?id="+id,
        method:"get"
    })
}

//MV
export function getMVs(id:number){
    return request({
        url:"/artist/mv?id="+id,
        method:"get"
    })
}

//获得MV播放地址
export function getMvUrl(id:number){
    return request({
        url:"/mv?mvid="+id,
        method:"get"
    })
}

//详情
export function getSingerDescription(id:number){
    return request({
        url:"/artist/desc?id="+id,
        method:"get"
    })
}

//相似歌手
export function getSimilarSingers(id:number){
    return request({
        url:"/simi/artist?id="+id,
        method:"get"
    })
}