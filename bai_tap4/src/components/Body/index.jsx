
import React from 'react'
import Note from '../Note';
import TakeNote from '../TakeNote';
import AddNote from '../AddNote';
import EditNote from '../EditNote';
import NoteOption from '../NoteOption';
import { myFetch } from '../../utils'
import LoadingModal from '../LoadingModal';


class Body extends React.Component {
   state = {
      editNote: null,
      isEdit: false,
      isAdd: false,
      noteList: [],
      isOpenNoteOption: false,
      position: {
         top: 0,
         left: 0
      },
      optionId: null,
      statusLoading: false,
      delayClass: '',
      delayNote: {}
   }

   componentDidMount() {
      this.setLoading(true);
      myFetch('/notes', 'GET')
         .then(data => {
            this.setState({
               noteList: data
            })
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   setLoading = (status) => {
      this.setState({
         statusLoading: status
      })
   }

   handleShowHideOpenDetailModal = (e, item = null) => {
      e?.stopPropagation()
      this.setState({
         isAdd: !this.state.isAdd
      })
      if (item) {
         this.setState({
            isEdit: true,
            editNote: item,
            isAdd:!this.state.isAdd
         })
      } else {
         this.setState({
            isEdit: false
         })
      }
   }
   handleNoteOption = () => {

      this.setState({
         isOpenNoteOption: !this.state.isOpenNoteOption
      })
   }
   handleAddNewNote = (note) => {
      const link = '/notes';
      const option = 'POST';
      this.setLoading(true);
      myFetch(link, option, note)
         .then(data => {
            this.setState({
               // noteList: [note].concat(this.state.noteList)
               noteList: [data, ...this.state.noteList],
               delayNote: data
            })

            setTimeout(() => {
               this.setState({
                  delayClass: 'delay'
               })
               setTimeout(() => {
                  this.setState({
                     delayClass: ''
                  })
               }, 300);
            }, 200);

         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   handleDeleleNote = (id, e) => {
      e?.stopPropagation()

      const link = `/notes/${id}`;
      const option = 'DELETE';
      this.setLoading(true);
      myFetch(link, option)
         .then(() => {
            let currentList = this.state.noteList
            currentList = currentList.filter(item => item.id !== id)
            this.setState({
               noteList: currentList,
               optionId: null
            })

            this.handleNoteOption()
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   handleEditNote = (note) => {
      let link = `/notes/${note.id}`;
      let method = 'PUT';
      this.setLoading(true);
      myFetch(link, method, note)
         .then(() => {
            let currentList = this.state.noteList
            currentList = currentList.map(item => {
               if (item.id === note.id) {
                  item.title = note.title;
                  item.content = note.content;
               }
               return item;
            })
            this.setState({
               noteList: currentList,
               isEdit: false
            })

         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   handleClickOpenNoteOption = (id = null, e) => {
      this.handleNoteOption()
      this.setState({
         position: {
            top: window.event.clientY + 10 + 'px',
            left: window.event.clientX - 20 + 'px'
         },
         optionId: id
      })
      e?.stopPropagation()
   }


   render() {
      let { isAdd } = this.state
      return (
         <>
            {this.state.isEdit===true && <EditNote handleShowHideOpenDetailModalFunc={this.handleShowHideOpenDetailModal}  handleEditNoteFunc={this.handleEditNote} editNote={this.state.editNote} isEdit={this.state.isEdit} />}
            <div hidden={this.state.statusLoading === false}><LoadingModal /></div>
            {this.state.isOpenNoteOption === true && <NoteOption optionId={this.state.optionId} handleDeleleNoteFunc={this.handleDeleleNote} style={this.state.position} handleClickOpenNoteOptionFunc={this.handleClickOpenNoteOption} />}
            <div className="cover-body cover body-content-cover">
               <div className="flex-row">
                  <div id="body_content" className="body-content flex-row flex-center">
                     <div className="body-take-note flex-col skip">
                        {isAdd === false && <TakeNote  handleShowHideOpenDetailModalFunc={this.handleShowHideOpenDetailModal} />}
                        {isAdd === true && <AddNote  handleShowHideOpenDetailModalFunc={this.handleShowHideOpenDetailModal} handleAddNewNoteFunc={this.handleAddNewNote} isAdd={this.state.isAdd} />}
                        <div id="detail_note" className="detail-note"></div>
                        <div className="labelAll hiden" id="labelAllCheckbox"></div>
                        <div className="display flex-row" id="display">
                           <Note noteList={this.state.noteList} delayClass={this.state.delayClass} delayNote={this.state.delayNote} handleClickOpenNoteOptionFunc={this.handleClickOpenNoteOption} handleShowHideOpenDetailModalFunc={this.handleShowHideOpenDetailModal} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
}
export default Body