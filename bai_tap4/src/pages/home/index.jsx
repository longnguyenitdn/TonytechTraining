import '../../styles/Home.css'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Body from '../../components/Body'
import { myFetch } from '../../utils'



class Home extends React.Component {
   state = {
      statusLoading: false,
      labelList: []
   }
   setLoading = (status) => {
      this.setState({
         statusLoading: status
      })
   }
   componentDidMount() {
      this.setLoading(true);
      myFetch('/labels', 'GET')
         .then(data => {
            this.setState({
               labelList: data
            })
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   addNewLabel = (label) => {
      let link = '/labels';
      let method = 'POST';
      this.setLoading(true);
      myFetch(link, method, label)
         .then(data => {
            this.setState({
               labelList: [data, ...this.state.labelList],
            })
         })
         .catch(error => {
            console.log(error);
         })
         .finally(() => {
            this.setLoading(false);
         })
   }

   deleteLabel = (id) => {
      let linkLabel = `/labels/${id}`;
      let methodLabel = 'DELETE';
      this.setLoading(true);

      myFetch(linkLabel, methodLabel)
      
      .then(() => {
         let currentList = this.state.labelList
            currentList = currentList.filter(item => item.id !== id)
         this.setState({
            labelList : currentList
         })
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         this.setLoading(false);
      })
   }

   render() {
      return (
         <>
            <Header />
            <Sidebar labelList={this.state.labelList} setLoading={this.setLoading} statusLoading={this.state.statusLoading} addNewLabelFunc={this.addNewLabel} deleteLabelFunc={this.deleteLabel}/>
            <Body setLoading={this.setLoading} statusLoading={this.state.statusLoading} />
         </>
      )
   }
}
export default Home