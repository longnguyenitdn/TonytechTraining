import React from 'react';

import HomeHeader from '../../components/HomeHeader'
import HomeSidebarBody from '../../components/HomeSidebarBody';
class Home extends React.Component {
   render() {
      return (
         <>
            <HomeHeader />
            <HomeSidebarBody />
         </>
      )
   }
}
export default Home;