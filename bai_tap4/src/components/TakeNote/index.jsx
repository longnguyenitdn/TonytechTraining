import '../HomeHeader/Home.css'
import React from 'react'
import { BiPaint } from 'react-icons/bi';
import { BsCheck2Square, BsImages } from 'react-icons/bs';

class TakeNote extends React.Component {
   
   render() {
      return (
         <div id="input_note_cover" className="take-note flex-row flex-bet">
            <input onClick={()=>this.props.isOpenFunc()} className="input-take-note skip" type="text" placeholder="Take a note..." />
            <div className="take-note-icon flex-row align-center">
               <button className="button-icon cursor"><BsCheck2Square /></button>
               <button className="button-icon cursor"><BiPaint /></button>
               <button className="button-icon cursor"><BsImages /></button>
            </div>
         </div>
      )
   }
}
export default TakeNote