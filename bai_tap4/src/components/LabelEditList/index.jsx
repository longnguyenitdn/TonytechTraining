import React from "react";

import { CiEraser,CiShoppingTag } from 'react-icons/ci'
import { GiCheckMark } from 'react-icons/gi'

class LabelEditList extends React.Component {
  state={
name:this.props.label.name
  }
   render() {
      return (
         <>
            {
               this.props.labelList.map(label => {
                  return (
                     <div key={label.id} class="labels-row flex-row align-center flex-bet">
                        <button onClick={()=>this.props.deleteLabelFunc(label.id)} class="button-icon cursor">
                           <CiShoppingTag className="fa-tag" />
                           <CiEraser className="fa-eraser" />
                        </button>
                        <input class="label-name input" value={label.name} />
                        <button class="edit-label-name button-icon cursor hiden"><GiCheckMark /></button>
                     </div>
                  )
               })
            }
         </>
      )
   }
}
export default LabelEditList