import { memo } from "react";
function Session(props) {
    return (
        <div className="flex-column p-1 btn playListcard card-column b-r-1">
            <img className="b-r-1" src={props.image?props.image:"https://cdn.dribbble.com/users/702789/screenshots/16900790/media/628a8bb9f58f4feaea51367fc58b32a3.png?compress=1&resize=768x576&vertical=top"} title={props.name} alt="" height={'200px'} width="200px"  srcSet=""/>
            <h4 className="pt-01 text-lefet">{ props.name}</h4>
            <small className="opacity-6 text-lefet pt-01">{
                props.info.substring(0,50)
            }</small>
        </div>
    )
}

export default memo(Session);