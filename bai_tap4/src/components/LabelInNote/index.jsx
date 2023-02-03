import React from "react";
import { editNote } from "../../api/note";

class LabelInNote extends React.Component {
  handleAddLabelToNote = (e, note) => {
    let obj = {
      ...note,
      labelNoteId: parseInt(e.target.id),
    };
    this.props.setLoading(true);

    editNote(obj)
      .then((data) => {
        let currentList = this.props.noteList;
        currentList = currentList.map((item) => {
          if (item.id === data.id) {
            item.title = data.title;
            item.content = data.content;
            item.labelNoteId = data.labelNoteId;
          }
          return item;
        });
        this.props.setNoteList(currentList);
      })

      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.props.setLoading(false);
      });
  };
  handleCheckboxLabelList = (e, note) => {
    e.stopPropagation();

    if (e.target.checked) {
      // this.props.handleLabelId(e.target.id);
      this.handleAddLabelToNote(e, note);
    } else {
      // this.props.handleLabelId(null);

      this.props.handleRemoveLabelFromNote(e, note);
    }
  };

  render() {
    const label = this.props.label;

    return (
      <div className="handle-label-row flex-row align-center cursor ">
        <label className="text-black cursor">
          <input
            className="checkbox-label cursor"
            type="radio"
            id={label.id}
            defaultChecked={this.props.note.labelNoteId === label.id}
            name={`labelRatio_${this.props.note.id}`}
            onChange={(e) => this.handleCheckboxLabelList(e, this.props.note)}
          />
          {label.name}
        </label>
      </div>
    );
  }
}
export default LabelInNote;
