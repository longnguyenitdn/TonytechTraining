import React from "react";
class TakeNoteBtnIcon extends React.Component{
   render(){
      return(
         <button className="button-icon cursor">{this.props.children}</button>
         
      )
   }
}
export default TakeNoteBtnIcon