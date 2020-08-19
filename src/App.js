import React, { Component } from 'react'

class App extends Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.state = { name: '' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ name: e.target.value })
  }

  render () {
    return (
      <div>
        {this.props.data.first_name}
        <br />
        {this.props.data.last_name}
        <br />
        {this.props.data.address} {this.props.data.city} {this.props.data.state} {this.props.data.zip}
        <br />
        <label>Name</label>
        <input type='text' value={this.state.name} onChange={this.handleChange} />
        <strong>{this.state.name}</strong>
      </div>
    )
  }
}

export default App