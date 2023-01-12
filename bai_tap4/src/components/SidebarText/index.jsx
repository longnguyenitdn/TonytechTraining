import React from "react";
class SidebarText extends React.Component{
   render(){
      return(
         <p className="sidebar-text hiden avoid-clicks">{this.props.children}</p>
      )
   }
}
export default SidebarText