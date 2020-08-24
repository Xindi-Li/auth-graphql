import React, { Component } from 'react';
import AuthForm from '../components/AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentDidUpdate(prevProps){
    if(!prevProps.data.user && this.props.data.user){
      this.props.history.push("/dashboard");
    }
  }

  submitHandler({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({errors});
    });
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm 
          submitHandler={this.submitHandler.bind(this)} 
          errors={this.state.errors}/>
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(LoginForm)
);