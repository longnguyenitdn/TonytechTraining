import React from "react";
class MyComponent extends React.Component {
   state = {
      name: 'Kun',
      age: 31
   }
   handleClickBtn = () => {
      alert('Clicked');
   }
   render() {

      return (
         <>
            <p>I'm {this.state.name}</p>
            <p>I'm {this.state.age} years old</p>
            <button onClick={ () => this.handleClickBtn() }>Click me</button>
         </>
      )
   }
}
export default MyComponent;