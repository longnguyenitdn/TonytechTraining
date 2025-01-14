import React from "react";
import { BsPalette, BsImages, BsBoxArrowDown } from "react-icons/bs";
import { CiBullhorn } from "react-icons/ci";
import { TbUserPlus } from "react-icons/tb";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { AiOutlineCheck } from "react-icons/ai";
import { FaThumbtack } from "react-icons/fa";
import NoteBtnIcon from "../NoteBtnIcon";
import NoteOption from "../NoteOption";
import LabelAssignInNote from "../LabelAssignInNote";
import LabelNote from "../LabelNote";
import { editNote } from "../../api/note";
import { NoteContext } from "../../contexts/NoteProvider";
import { LoadingContext } from "../../contexts/LoadingProvider";

class Note extends React.Component {
  static contextType = LoadingContext;
  state = {
    isOpenNoteOption: false,
    isOpenLabelNote: false,
  };

  handleRemoveLabelFromNote = (e, note) => {
    let loadingProvider = this.context;
    e.stopPropagation();
    let obj = {
      ...note,
      labelNoteId: null,
    };

    loadingProvider.setStatusLoading(true);

    editNote(obj)
      .then((data) => {
        let currentList = this.props.noteProvider.noteList;
        currentList = currentList.map((item) => {
          if (item.id === data.id) {
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
        loadingProvider.setStatusLoading(false);
      });
  };

  toggleShowHideLabelNote = (e) => {
    e.stopPropagation();
    this.setState({
      isOpenNoteOption: false,
      isOpenLabelNote: !this.state.isOpenLabelNote,
    });
  };

  onClickOpenNoteOption = (e, id) => {
    e?.stopPropagation();
    this.setState({
      isOpenNoteOption: !this.state.isOpenNoteOption,
    });
    this.props.noteProvider.setOptionId(id);
  };

  setBtnCheckAll = (e, noteId) => {
    e.stopPropagation();
    let currentList = this.props.checkboxListId;

    let isExist = currentList.some((item) => item === noteId);

    if (isExist) {
      currentList = currentList.filter((item) => item !== noteId);
    } else {
      currentList.push(noteId);
    }

    this.props.setCheckboxListId(currentList);
  };
  render() {
    const item = this.props.item;
    return (
      <NoteContext.Consumer>
        {(provider) => {
          return (
            <div
              className={`notes-cover flex-row  ${
                item.id === provider.delayNote.id ? provider.delayClass : ""
              }`}
              onClick={(e) => provider.setOpenDetailModal(e, item)}
            >
              <div
                className={`note ${
                  this.props.checkboxListId.includes(item.id) ? "checked" : ""
                }`}
              >
                <div className="note-wrap">
                  <button
                    className="btn-checkAll btn-bg cursor"
                    onClick={(e) => this.setBtnCheckAll(e, item.id)}
                  >
                    <AiOutlineCheck
                      fill="white"
                      className="color-white avoid-clicks"
                    />
                  </button>
                  <div className="note-title-wrap">
                    <div className="flex-row flex-bet">
                      <span className="note_title pad10">{item.title}</span>
                      <button className="button-icon cursor font-sz15 hiden display-note-icon note-pin-icon">
                        <FaThumbtack />
                      </button>
                    </div>
                    <div className="note-content-cover">
                      <p className="note_content pad10">{item.content}</p>
                    </div>
                    {item.labelNoteId !== null && (
                      <LabelAssignInNote
                        item={item}
                        handleRemoveLabelFromNote={
                          this.handleRemoveLabelFromNote
                        }
                      />
                    )}
                  </div>
                  <div className="note-icon flex-row flex-bet">
                    <NoteBtnIcon>
                      <CiBullhorn />
                    </NoteBtnIcon>
                    <NoteBtnIcon>
                      <TbUserPlus />
                    </NoteBtnIcon>
                    <NoteBtnIcon>
                      <BsPalette />
                    </NoteBtnIcon>
                    <NoteBtnIcon>
                      <BsImages />
                    </NoteBtnIcon>
                    <NoteBtnIcon>
                      <BsBoxArrowDown />
                    </NoteBtnIcon>
                    <button
                      onClick={(e) => this.onClickOpenNoteOption(e, item.id)}
                      className="hiden btn-note-option button-icon cursor font-sz15 void-clicks display-note-icon"
                    >
                      <HiOutlineEllipsisVertical />
                    </button>
                  </div>
                </div>
                {this.state.isOpenNoteOption === true && (
                  <NoteOption
                    provider={provider}
                    noteId={item.id}
                    checkboxListId={this.props.checkboxListId}
                    setCheckboxListId={this.props.setCheckboxListId}
                    onClickOpenNoteOption={this.onClickOpenNoteOption}
                    toggleShowHideLabelNote={this.toggleShowHideLabelNote}
                  />
                )}
                {this.state.isOpenLabelNote === true && (
                  <LabelNote
                    noteProvider={provider}
                    toggleShowHideLabelNote={this.toggleShowHideLabelNote}
                    note={item}
                    handleRemoveLabelFromNote={this.handleRemoveLabelFromNote}
                    isChecked={this.state.isChecked}
                  />
                )}
              </div>
            </div>
          );
        }}
      </NoteContext.Consumer>
    );
  }
}
export default Note;
