import '../../styles/Home.css'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Body from '../../components/Body'

class Home extends React.Component {
   state = {
      labelList: [
         {
            id:1,
            name:"long"
         }
      ]
   }
   render() {
      return (
         <>
            <Header />
            <Sidebar labelList={this.state.labelList} />
            <Body  />
         </>
      )
   }
}
export default Home