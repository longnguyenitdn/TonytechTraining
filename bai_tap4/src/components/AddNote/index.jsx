import React from "react";
import TakeNoteDetail from '../TakeNoteDetail';

class AddNote extends React.Component{
render(){
   return(
      <TakeNoteDetail handleShowHideOpenDetailModalFunc={this.props.handleShowHideOpenDetailModalFunc} handleAddNewNoteFunc={this.props.handleAddNewNoteFunc} isAdd={this.props.isAdd} />
   )
}
}
export default AddNote