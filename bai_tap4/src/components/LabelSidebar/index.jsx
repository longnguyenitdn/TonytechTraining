import React from "react";
import '../HomeHeader/Home.css'
import { BsFillTagsFill } from 'react-icons/bs';


class LabelSidebar extends React.Component {
   state = {
      labelList: [
         {
            name: 'long',
         },
         {
            name: 'long2',
         }
      ],

   }

   render() {
      return (
         <>
            {
               this.state.labelList.map(item => {
                  return (
                     <div  class="sidebar-labels flex-row sidebar-row align-center cursor active-menu">
                        <button class=" button-icon sidebar-btn cursor avoid-clicks"><BsFillTagsFill/></button>
                        <p class="sidebar-text hiden avoid-clicks">{item.name}</p>
                     </div>
                  )
               })
            }
         </>
      )
   }
}
export default LabelSidebar