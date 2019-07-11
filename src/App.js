// react
import React, { Component } from "react";

// higher order
import { connect } from "react-redux";

class App extends Component {
  render() {
    // loading, data, fire, err
    const { fetching, dog, onRequestDog, error } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={dog} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Dog Saga</h1>
        </header>

        {dog ? (
          <p className="App-intro">Keep clicking for new dogs</p>
        ) : (
          <p className="App-intro">Replace the React icon with a dog!</p>
        )}

        {fetching ? (
          <button disabled>Fetching...</button>
        ) : (
          <button onClick={onRequestDog}>Request a Dog</button>
        )}

        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // loading
    fetching: state.fetching,
    // data
    dog: state.dog,
    // err
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  // local method, fire event
  return {
    onRequestDog: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

// connect
export default connect(mapStateToProps, mapDispatchToProps)(App);
