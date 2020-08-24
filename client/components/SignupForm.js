import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.data.user && this.props.data.user) {
      this.props.history.push("/dashboard");
    }
  }

  submitHandler({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });;
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          submitHandler={this.submitHandler.bind(this)}
          errors={this.state.errors} />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
