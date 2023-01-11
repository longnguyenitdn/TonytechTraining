import React from "react";
import TakeNoteDetail from '../TakeNoteDetail';

class EditNote extends React.Component {
   state = {
      editModalClass: 'take-note-detail-center',
      editModalWrapClass: 'take-note-detail-center-wrap',
   }
   render() {
      return (
         <>
         <div className={this.state.editModalWrapClass}></div>
         <TakeNoteDetail handleShowHideOpenDetailModalFunc={this.props.handleShowHideOpenDetailModalFunc} handleEditNoteFunc={this.props.handleEditNoteFunc} editModalClass={this.state.editModalClass} editNote={this.props.editNote} isEdit={this.props.isEdit} />
         </>
      )
   }
}
export default EditNote