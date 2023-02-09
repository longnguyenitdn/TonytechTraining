import React from "react";
import { getNote } from "../api/note";
import { LoadingContext } from "./LoadingProvider";

export const NoteContext = React.createContext();

class NoteProvider extends React.Component {
  static contextType = LoadingContext;
  state = {
    isEdit: false,
    editNote: null,
    isAdd: false,
    noteList: [],
    optionId: null,
    delayClass: "",
    delayNote: {},
    isCheckboxAll: false,
    checkboxListId: [],
  };
  componentDidMount() {
    let provider = this.context;
    provider.setLoading(true);
    getNote()
      .then((data) => {
        this.setState({
          noteList: data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        provider.setLoading(false);
      });
  }

  setNoteList = (newList) => {
    this.setState({
      noteList: newList,
    });
  };
  showCheckboxAll = () => {
    this.setState({
      isCheckboxAll: true,
    });
  };
  hideCheckboxAll = () => {
    this.setState({
      isCheckboxAll: false,
    });
  };

  handleBeforeEditNote = (note) => {
    this.setState({
      editNote: note,
    });
  };
  handleIsAdd = () => {
    this.setState({
      isAdd: !this.state.isAdd,
    });
  };
  handleIsEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit,
    });
  };

  handleDelayClass = (newClass) => {
    this.setState({
      delayClass: newClass,
    });
  };

  handleDelayNote = (note) => {
    this.setState({
      delayNote: note,
    });
  };

  handleShowHideOpenDetailModal = (e, item = null) => {
    e?.stopPropagation();

    this.handleIsAdd();
    if (item) {
      this.handleIsEdit();
      this.setState({
        editNote: item,
        isAdd: false,
      });
    }
  };
  clearCheckboxListId = () => {
    this.setState({
      checkboxListId: [],
    });
    this.hideCheckboxAll();
  };
  handleNoteOption = (id) => {
    this.setState({
      optionId: id,
    });
  };
  handleCheckboxListId = (list) => {
    this.setState({
      checkboxListId: list,
    });
  };

  render() {
    return (
      <NoteContext.Provider
        value={{
          state: this.state,
          setNoteList: this.setNoteList,
          showCheckboxAll: this.showCheckboxAll,
          hideCheckboxAll: this.hideCheckboxAll,
          handleBeforeEditNote: this.handleBeforeEditNote,
          handleIsAdd: this.handleIsAdd,
          handleIsEdit: this.handleIsEdit,
          handleDelayClass: this.handleDelayClass,
          handleDelayNote: this.handleDelayNote,
          handleShowHideOpenDetailModal: this.handleShowHideOpenDetailModal,
          clearCheckboxListId: this.clearCheckboxListId,
          handleNoteOption: this.handleNoteOption,
          handleCheckboxListId: this.handleCheckboxListId,
        }}
      >
        {this.props.children}
      </NoteContext.Provider>
    );
  }
}
export default NoteProvider;
