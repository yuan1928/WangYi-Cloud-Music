import request from "./request";

export function getAlbumDetail(id:number){
    return request({
        url:"/album?id="+id,
        method:"get",
    })
}

export function getAlbumComments(id:number,offset:number){
    return request({
        url:"/comment/album?id="+id+"&offset="+offset,
        method:"get"
    })
}