import React from 'react';
import PropTypes from 'prop-types';

// from https://codepen.io/gaearon/pen/wqvxGa?editors=0010
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, _errorInfo) {
    // Catch errors in any components below and re-render with error message
    // Can include more error info if ever needed
    this.setState({ error });
    // Alt solution to this hack: re-try failed action
    setTimeout(() => {
      this.setState(() => ({
        error: null
      }));
    }, 2000);
    // You can also log error messages to an error reporting service here
  }

  render() {
    // Error path
    const { error } = this.state;
    const { children } = this.props;
    return (
      <div>
        {error && (
          <div className="w-full text-center bg-red-600 text-white">
            <h2 className="font-bold">Something went wrong</h2>
            <p>{error.toString()}</p>
          </div>
        )}
        {children}
      </div>
    );
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
