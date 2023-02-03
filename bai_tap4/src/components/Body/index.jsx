import React from "react";
import Notes from "../Notes";
import TakeNote from "../TakeNote";
import AddNote from "../AddNote";
import EditNote from "../EditNote";
import { getNote } from "../../api/note";
import LoadingModal from "../LoadingModal";
import CheckboxAllLabel from "../CheckboxAllLabel";

class Body extends React.Component {
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
    this.props.setLoading(true);
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
        this.props.setLoading(false);
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
    let { isAdd } = this.state;
    return (
      <>
        <div hidden={this.props.statusLoading === false}>
          <LoadingModal />
        </div>

        <div className="cover-body cover body-content-cover">
          <div className="flex-row">
            <div
              id="body_content"
              className="body-content flex-row flex-center"
            >
              <div className="body-take-note flex-col skip">
                <div className="detail-note">
                  {isAdd === false && (
                    <TakeNote
                      handleShowHideOpenDetailModalFunc={
                        this.handleShowHideOpenDetailModal
                      }
                    />
                  )}
                  {isAdd === true && (
                    <AddNote
                      handleShowHideOpenDetailModalFunc={
                        this.handleShowHideOpenDetailModal
                      }
                      noteList={this.state.noteList}
                      setNoteList={this.setNoteList}
                      handleIsAdd={this.handleIsAdd}
                      setLoading={this.props.setLoading}
                      handleDelayClass={this.handleDelayClass}
                      handleDelayNote={this.handleDelayNote}
                    />
                  )}
                  {this.state.isEdit === true && (
                    <EditNote
                      noteList={this.state.noteList}
                      setNoteList={this.setNoteList}
                      handleShowHideOpenDetailModalFunc={
                        this.handleShowHideOpenDetailModal
                      }
                      handleEditNoteFunc={this.handleEditNote}
                      handleEditNote={this.handleEditNote}
                      editNote={this.state.editNote}
                      isEdit={this.state.isEdit}
                      setLoading={this.props.setLoading}
                      handleIsEdit={this.handleIsEdit}
                    />
                  )}
                  <div className="labelAll">
                    {this.state.isCheckboxAll === true && (
                      <CheckboxAllLabel
                        labelList={this.props.labelList}
                        isCheckboxAll={this.state.isCheckboxAll}
                        noteList={this.state.noteList}
                        setNoteList={this.setNoteList}
                        setLoading={this.props.setLoading}
                        checkboxListId={this.state.checkboxListId}
                        clearCheckboxListId={this.clearCheckboxListId}
                      />
                    )}
                  </div>
                </div>

                <div className="display flex-row" id="display">
                  <Notes
                    labelList={this.props.labelList}
                    optionId={this.state.optionId}
                    noteList={this.state.noteList}
                    delayClass={this.state.delayClass}
                    delayNote={this.state.delayNote}
                    editNote={this.state.editNote}
                    setNoteList={this.setNoteList}
                    handleNoteOption={this.handleNoteOption}
                    handleShowHideOpenDetailModalFunc={
                      this.handleShowHideOpenDetailModal
                    }
                    setLoading={this.props.setLoading}
                    activeId={this.props.activeId}
                    showCheckboxAll={this.showCheckboxAll}
                    hideCheckboxAll={this.hideCheckboxAll}
                    checkboxListId={this.state.checkboxListId}
                    handleCheckboxListId={this.handleCheckboxListId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Body;
