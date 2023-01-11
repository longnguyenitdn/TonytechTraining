import React from "react";

import { BsFillTagsFill } from 'react-icons/bs';


class LabelSidebar extends React.Component {
   render() {
      return (
         <>
            {
               this.props.labelList.map(item => {
                  return (
                     <div key={item.id}  className="sidebar-labels flex-row sidebar-row align-center cursor active-menu">
                        <button className=" button-icon sidebar-btn cursor avoid-clicks"><BsFillTagsFill/></button>
                        <p className="sidebar-text hiden avoid-clicks">{item.name}</p>
                     </div>
                  )
               })
            }
         </>
      )
   }
}
export default LabelSidebar