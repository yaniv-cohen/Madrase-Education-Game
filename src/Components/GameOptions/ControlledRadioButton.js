
const ControlledRadioButton=(props)=>{
return (


    <label style={{cursor: 'pointer'}}>{props.text}<input type="checkbox" name="options" 
    value={props.keyName} 
    checked={props.value}
    onChange={()=>{props.updateGameOptions(props.keyName, !props.value)}} /></label>

)
}
export default ControlledRadioButton