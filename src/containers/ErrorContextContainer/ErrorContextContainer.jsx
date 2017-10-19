/*=================================
            ERROR CONTAINER
==================================*/

// Deps
import React, { Component } from 'react'

// Components/Containers
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent'

// Styles
import styles from './ErrorContextContainer.pcss';


class ErrorContextContainer extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const{ toggleIsLoading } = this.props
    setTimeout(() => {
      toggleIsLoading(false)
    }, 500)
  }

  render() {
    return (
      <ErrorComponent />
    )
  }
}

export default ErrorContextContainer
