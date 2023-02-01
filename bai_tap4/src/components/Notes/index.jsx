import React from "react";
import Note from "../Note";
class Notes extends React.Component {
  render() {
    return (
      <>
        {this.props.noteList.map((item) => {
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
            />
          );
        })}
      </>
    );
  }
}
export default Notes;
