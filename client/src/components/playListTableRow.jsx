function TableRow(props) {
    return (<tr>
    <td> 
        <div className="flex-row flex-center">
            <img className="b-r-01" src={props.image} alt="" width="50" height="50" srcSet=""/>
            <div className="p-01">
                    <h5 className="opacity-8">{ props.name.substring(0,40)}</h5>
                    <small className="opacity-6 font-size-08">{ props.by}</small>
            </div>
        </div>
    </td>
        <td><h5 className="opacity-8">{ props.album.substring(0,30)}</h5></td>
        <td onClick={() => { props.remove(props.number) }} className="btn text-danger">X</td>
</tr>)
}
export default TableRow;