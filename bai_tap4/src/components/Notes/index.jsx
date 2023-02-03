import React from "react";
import Note from "../Note";
class Notes extends React.Component {
  render() {
    let filterNoteList = [];
    filterNoteList = this.props.noteList.filter(
      (item) => String(item.labelNoteId) === this.props.activeId
    );
    if (filterNoteList.length === 0) {
      filterNoteList = this.props.noteList;
    }
    return (
      <>
        {filterNoteList.map((item) => {
          return (
            <Note
              key={item.id}
              item={item}
              editNote={this.props.editNote}
              optionId={this.props.optionId}
              noteList={this.props.noteList}
              labelList={this.props.labelList}
              delayClass={this.props.delayClass}
              delayNote={this.props.delayNote}
              setNoteList={this.props.setNoteList}
              handleNoteOption={this.props.handleNoteOption}
              handleShowHideOpenDetailModalFunc={
                this.props.handleShowHideOpenDetailModalFunc
              }
              setLoading={this.props.setLoading}
              showCheckboxAll={this.props.showCheckboxAll}
              hideCheckboxAll={this.props.hideCheckboxAll}
              checkboxListId={this.props.checkboxListId}
              handleCheckboxListId={this.props.handleCheckboxListId}
            />
          );
        })}
      </>
    );
  }
}
export default Notes;
