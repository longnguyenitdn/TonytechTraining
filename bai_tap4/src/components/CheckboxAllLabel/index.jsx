import React from "react";
import CheckboxLabel from "../CheckboxLabel";
import { editNote } from "../../api/note";

class CheckboxAllLabel extends React.Component {
  state = {
    labelId: null,
  };
  handleLabelId = (e) => {
    this.setState({
      labelId: parseInt(e.target.value),
    });
  };
  handleAddLabelToCheckedNote = () => {
    Promise.all(
      this.props.checkboxListId.map((note) => {
        let obj = this.props.noteList.find((item) => item.id === note);
        obj.labelNoteId = this.state.labelId;
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
        return note;
      })
    ).then(this.props.clearCheckboxListId());
  };
  render() {
    return (
      <>
        <label htmlFor="labelsAll">Choose a label:</label>

        <select
          name="labelsAll"
          id="labelsAll"
          onChange={(e) => this.handleLabelId(e)}
        >
          <option value="" selected>
            Choose here
          </option>
          {this.props.labelList.map((item) => {
            return (
              <CheckboxLabel
                item={item}
                key={item.id}
                handleLabelId={this.handleLabelId}
              />
            );
          })}
        </select>
        <input
          onClick={() => this.handleAddLabelToCheckedNote()}
          id="btn_submit"
          className="btn-submit cursor btn-close"
          type="submit"
          value="Set Label"
        />
      </>
    );
  }
}
export default CheckboxAllLabel;
