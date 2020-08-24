import React, { Component } from 'react';
import query from '../queries/CurrentUser';
import {graphql} from 'react-apollo';


export default (WrappedComponent) => {
  class RequireAuthHOC extends Component {
    componentDidUpdate(){
      if(!this.props.data.loading && !this.props.data.user){
        this.props.history.push("/login");
      }
    }
    render(){
      return <WrappedComponent {...this.props}/>
    }
  }
  return graphql(query)(RequireAuthHOC);
}
