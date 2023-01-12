import React from "react";
class TakeNoteDetailIcon extends React.Component{
   render(){
      return(
         <button className="button-icon cursor font-sz20">{this.props.children}</button>
      )
   }
}
export default TakeNoteDetailIcon