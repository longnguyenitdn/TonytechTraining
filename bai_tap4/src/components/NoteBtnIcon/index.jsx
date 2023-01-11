import React from "react";
class NoteBtnIcon extends React.Component{
   render(){
      return (
         <button className="button-icon cursor font-sz15 hiden display-note-icon">{this.props.children}</button>
      )
   }
}
export default NoteBtnIcon