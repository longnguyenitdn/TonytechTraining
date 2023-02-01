import React from "react";
import { CiBullhorn } from "react-icons/ci";
import {
  HiOutlineUserPlus,
  HiOutlineFolderArrowDown,
  HiOutlineEllipsisHorizontalCircle,
} from "react-icons/hi2";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { BsImages } from "react-icons/bs";
import { FaThumbtack } from "react-icons/fa";
import { IoColorPaletteOutline } from "react-icons/io5";
import TakeNoteDetailIcon from "../TakeNoteDetailIcon";
import { addNewNote, editNote } from "../../api/note";
class TakeNoteDetail extends React.Component {
  state = {
    id: null,
    title: "",
    content: "",
    labelNoteId: null,
  };
  wrapperRef = React.createRef();
  componentDidMount() {
    if (this.props.isEdit) {
      this.setState({
        id: this.props.editNote.id,
        title: this.props.editNote.title,
        content: this.props.editNote.content,
        labelNoteId: this.props.editNote.labelNoteId,
      });
    }
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    // important
    document.removeEventListener("click", this.handleClickOutside);
  }
  handleChangeInputNoteTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleChangeInputNoteContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleAddNewNote = (note) => {
    this.props.setLoading(true);
    addNewNote(note)
      .then((data) => {
        this.props.setNoteList([data, ...this.props.noteList]);
        // noteList: [note].concat(this.state.noteList)
        this.props.handleDelayNote(data);
        this.props.handleIsAdd();

        setTimeout(() => {
          this.props.handleDelayClass("delay");
          setTimeout(() => {
            this.props.handleDelayClass("");
          }, 300);
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.props.setLoading(false);
      });
  };

  handleEditNote = (note) => {
    this.props.setLoading(true);
    editNote(note)
      .then((note) => {
        let currentList = this.props.noteList;
        currentList = currentList.map((item) => {
          if (item.id === note.id) {
            item.title = note.title;
            item.content = note.content;
            item.labelNoteId = note.labelNoteId;
          }
          return item;
        });
        this.props.setNoteList(currentList);

        this.props.handleIsEdit();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.props.setLoading(false);
      });
  };

  handleClickOutside = (e) => {
    if (!this.wrapperRef.current.contains(e.target)) {
      if (!this.state.title || !this.state.content) {
        alert("Missing Input Infomation!");
        return;
      } else {
        let { id, title, content, labelNoteId } = this.state;
        if (this.props.isEdit) {
          this.handleEditNote({
            id,
            title,
            content,
          });
        } else {
          this.handleAddNewNote({
            title,
            content,
            labelNoteId,
          });
        }

        this.setState({
          title: "",
          content: "",
        });
      }
    }
  };

  render() {
    return (
      <>
        <div
          ref={this.wrapperRef}
          id="input_note_detail"
          className={`take-note-detail ${
            this.props.isEdit ? this.props.editModalClass : ""
          }`}
        >
          <div className="flex-row flex-bet align-center">
            <input
              onChange={(e) => this.handleChangeInputNoteTitle(e)}
              id="input_note_title"
              className="input-note-title input skip"
              type="text"
              placeholder="Title"
              value={this.state.title}
            />
            <button className="pin-icon button-icon cursor font-sz17">
              <FaThumbtack />
            </button>
          </div>
          <div>
            <input
              onChange={(e) => this.handleChangeInputNoteContent(e)}
              className="input-note-content input skip"
              type="text"
              placeholder="Take a note..."
              value={this.state.content}
            />
            <input
              type="hidden"
              id="input_note_label"
              className="input-note-content input skip"
              value=""
            />
          </div>
          <div className="flex-row flex-bet align-center">
            <div className="button-icon-wrap flex-row flex-bet align-center">
              <TakeNoteDetailIcon>
                <CiBullhorn />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <HiOutlineUserPlus />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <IoColorPaletteOutline />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <BsImages />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <HiOutlineFolderArrowDown />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <HiOutlineEllipsisHorizontalCircle />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <FiChevronsLeft />
              </TakeNoteDetailIcon>
              <TakeNoteDetailIcon>
                <FiChevronsRight />
              </TakeNoteDetailIcon>
            </div>
            <div>
              <button
                onClick={(e) =>
                  this.props.handleShowHideOpenDetailModalFunc(
                    e,
                    this.props.editNote
                  )
                }
                id="close_detail_modal"
                className="btn-close button-icon cursor font-sz15"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default TakeNoteDetail;
