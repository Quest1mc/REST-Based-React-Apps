import React, { Component } from "react";
import { connect } from 'react-redux';
import { signIn,signOut} from '../actions';


class GoogleAuth extends Component {
    

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          "771218005094-gf15f45dvqhe8cgeu8uksv2jm3viqm0f.apps.googleusercontent.com",
        scope: "email"
      }).then(()=>{
          this.auth = window.gapi.auth2.getAuthInstance();
          // this.setState({ isSignedIn:this.auth.isSignedIn.get() });
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }
// **********************async/await **************************
// componentDidMount() {
//   window.gapi.load("client:auth2", async () => {
//    await window.gapi.client.init({
//       clientId:
//         "771218005094-gf15f45dvqhe8cgeu8uksv2jm3viqm0f.apps.googleusercontent.com",
//       scope: "email"
//     })
   
//         this.auth = window.gapi.auth2.getAuthInstance();
//         this.setState({ isSignedIn:this.auth.isSignedIn.get() });
//         this.auth.isSignedIn.listen(this.onAuthChange);
   
//   });
// }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut()
    }
  };

  onSignInClick = ()=> {
this.auth.signIn()
  };

  onSignOutClick = ()=> {
    this.auth.signOut()
};

  


renderAuthButton(){
    if (this.props.isSignedIn === null ) {
        return null;
    } else if (this.props.isSignedIn ){
        return (
            <button onClick = {this.onSignOutClick} className="ui red google button">
            <i className="google icon"/>
            Sign Out
            </button>
           
        )
    } else {
        return (
            <button onClick = {this.onSignInClick} className="ui red google button">
            <i className="google icon"/>
            Sign In with Google
            </button>
           
        )
    }
}

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps =(state)=>{
  return { isSignedIn : state.auth.isSignedIn };
}


export default connect (mapStateToProps,{signIn,signOut}) (GoogleAuth);
