import React, { Component } from "react"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.query ?? "",
      default: props.default ?? "Search",
      onSearch: props.onSearch,
      onChange: props.onChange,
      realtime: props.realtime ?? false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
    if (this.state.realtime === true) {
      this.state.onChange(event.target.value)
    }
  }

  handleSubmit(event) {
    this.state.onSearch(this.state.value)
    event.preventDefault()
  }

  handleClick() {
    this.state.onSearch(this.state.value)
  }

  render() {
    return (
      <Form onSubmit= {this.handleSubmit}>
        <Form.Row>
          <Col xs = "9">
            <FormControl type="text" placeholder={this.state.default} className="mr-sm-2" value = {this.state.value} onChange = {this.handleChange} />
          </Col>
          <Col xs = "3">
            <Button variant="outline-success" onClick = {this.handleClick}>Search</Button>
          </Col>
        </Form.Row>
      </Form>
    )
  }
}

export default Search
