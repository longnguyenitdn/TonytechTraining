import React from "react";
import CheckboxLabel from "../CheckboxLabel";
import { editNote } from "../../api/note";
import { LoadingContext } from "../../contexts/LoadingProvider";

class CheckboxAllLabel extends React.Component {
  static contextType = LoadingContext;
  state = {
    labelId: null,
  };
  setLabelId = (e) => {
    this.setState({
      labelId: parseInt(e.target.value),
    });
  };
  handleAddLabelToCheckedNote = () => {
    let loadingProvider = this.context;
    Promise.all(
      this.props.noteProvider.checkboxListId.map((note) => {
        let obj = this.props.noteProvider.noteList.find(
          (item) => item.id === note
        );
        obj.labelNoteId = this.state.labelId;
        loadingProvider.setLoading(true);

        editNote(obj)
          .then((data) => {
            let currentList = this.props.noteProvider.noteList;
            currentList = currentList.map((item) => {
              if (item.id === data.id) {
                item.title = data.title;
                item.content = data.content;
                item.labelNoteId = data.labelNoteId;
              }
              return item;
            });
            this.props.noteProvider.setNoteList(currentList);
          })

          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            loadingProvider.setLoading(false);
          });
        return note;
      })
    ).then(this.props.noteProvider.clearCheckboxListId());
  };
  render() {
    return (
      <>
        <label htmlFor="labelsAll">Choose a label:</label>

        <select
          name="labelsAll"
          id="labelsAll"
          onChange={(e) => this.setLabelId(e)}
        >
          <option defaultValue="">None Label</option>
          {this.props.labelProvider.labelList.map((item) => {
            return (
              <CheckboxLabel
                item={item}
                key={item.id}
                setLabelId={this.setLabelId}
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
