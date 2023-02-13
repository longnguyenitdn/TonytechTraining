import React from "react";
import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { getNote } from "../api/note";
import Home from "../pages/home";
import { LoadingContext } from "./LoadingProvider";
export const NoteContext = createContext();
const NoteProvider = (props) => {
  const loadingProvider = useContext(LoadingContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [noteList, setNoteList] = useState([]);
  const [optionId, setOptionId] = useState(null);
  const [delayClass, setDelayClass] = useState("");
  const [delayNote, setDelayNote] = useState({});
  const [isCheckboxAll, setIsCheckboxAll] = useState(false);
  const [checkboxListId, setCheckboxListId] = useState([]);

  useEffect(() => {
    loadingProvider.setStatusLoading(true);
    getNote()
      .then((data) => {
        setNoteList(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loadingProvider.setStatusLoading(false);
      });
  }, []);
  const setOpenDetailModal = (e, item = null) => {
    e?.stopPropagation();

    setIsAdd(!isAdd);
    if (item) {
      setIsEdit(!isEdit);
      setEditNote(item);
      setIsAdd(false);
    }
  };
  const clearCheckboxListId = () => {
    setCheckboxListId([]);
  };

  return (
    <NoteContext.Provider
      value={{
        editNote: editNote,
        isEdit: isEdit,
        isAdd: isAdd,
        checkboxListId: checkboxListId,
        delayClass: delayClass,
        delayNote: delayNote,
        noteList: noteList,
        isEdit: isEdit,
        setNoteList: setNoteList,
        setIsCheckboxAll: setIsCheckboxAll,
        setIsAdd: setIsAdd,
        setIsEdit: setIsEdit,
        setDelayClass: setDelayClass,
        setDelayNote: setDelayNote,
        setOpenDetailModal: setOpenDetailModal,
        clearCheckboxListId: clearCheckboxListId,
        setOptionId: setOptionId,
        setCheckboxListId: setCheckboxListId,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
// import React from "react";
// import { getNote } from "../api/note";
// import { LoadingContext } from "./LoadingProvider";

// export const NoteContext = React.createContext();

// class NoteProvider extends React.Component {
//   static contextType = LoadingContext;
//   state = {
//     isEdit: false,
//     editNote: null,
//     isAdd: false,
//     noteList: [],
//     optionId: null,
//     delayClass: "",
//     delayNote: {},
//     isCheckboxAll: false,
//     checkboxListId: [],
//   };
//   componentDidMount() {
//     let provider = this.context;
//     provider.setLoading(true);
//     getNote()
//       .then((data) => {
//         this.setState({
//           noteList: data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         provider.setLoading(false);
//       });
//   }

//   setNoteList = (newList) => {
//     this.setState({
//       noteList: newList,
//     });
//   };
//   setCheckboxAll = (status) => {
//     this.setState({
//       isCheckboxAll: status,
//     });
//   };

//   toggleIsAdd = () => {
//     this.setState({
//       isAdd: !this.state.isAdd,
//     });
//   };
//   toggleIsEdit = () => {
//     this.setState({
//       isEdit: !this.state.isEdit,
//     });
//   };

//   setDelayClass = (newClass) => {
//     this.setState({
//       delayClass: newClass,
//     });
//   };

//   setDelayNote = (note) => {
//     this.setState({
//       delayNote: note,
//     });
//   };

//   setOpenDetailModal = (e, item = null) => {
//     e?.stopPropagation();

//     this.toggleIsAdd();
//     if (item) {
//       this.toggleIsEdit();
//       this.setState({
//         editNote: item,
//         isAdd: false,
//       });
//     }
//   };
//   clearCheckboxListId = () => {
//     this.setState({
//       checkboxListId: [],
//     });
//     this.hideCheckboxAll();
//   };
//   setNoteOption = (id) => {
//     this.setState({
//       optionId: id,
//     });
//   };
//   setCheckboxListId = (list) => {
//     this.setState({
//       checkboxListId: list,
//     });
//   };

//   render() {
//     return (
//       <NoteContext.Provider
//         value={{
//           state: this.state,
//           setNoteList: this.setNoteList,
//           setCheckboxAll: this.setCheckboxAll,
//           toggleIsAdd: this.toggleIsAdd,
//           toggleIsEdit: this.toggleIsEdit,
//           setDelayClass: this.setDelayClass,
//           setDelayNote: this.setDelayNote,
//           setOpenDetailModal: this.setOpenDetailModal,
//           clearCheckboxListId: this.clearCheckboxListId,
//           setNoteOption: this.setNoteOption,
//           setCheckboxListId: this.setCheckboxListId,
//         }}
//       >
//         {this.props.children}
//       </NoteContext.Provider>
//     );
//   }
// }
// export default NoteProvider;
