import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label, Input, Table } from 'reactstrap'

import Loading from '../loading/loading'

import './content.sass'

class Content extends Component {
  constructor(props) {
    super(props)

    this.search = {}
    this.state = {
      show: false,
      searchResult: [],
    }

    this.onChangeSearch = this.onChangeSearch.bind(this)
  }

  componentDidMount() {
    this.loadRecipes()
  }

  onChangeSearch() {
    this.loadRecipes()
  }

  // This method only it is posible if CORS are activated
  async loadRecipes() {
    this.setState({
      show: true,
    })
    const url = `http://www.recipepuppy.com/api/?q=${this.search.value || ''}`

    try {
      const request = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Access-Control-Allow-Origin': '*',
        }),
      })
      const json = await request.json() || {}

      this.setState({
        searchResult: json.results || [],
        show: false,
      })
    } catch (err) {
      console.log(err)

      this.setState({
        searchResult: [],
        show: false,
      })
    }
  }

  render() {
    let count = 0

    return (
      <section id="content" className="content">
        <Container className="py-15">
          <Row>
            <Col xs="12">
              <Form>
                <FormGroup>
                  <Label for="search-bar">Email</Label>
                  <Input
                    id="search-bar"
                    name="search"
                    type="text"
                    placeholder="Search for..."
                    getRef={(input) => { this.search = input; }}
                    defaultValue=""
                    onChange={this.onChangeSearch}
                  />
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              {this.state.searchResult.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>ingredients</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.searchResult.map((recipe) => {
                      count += 1

                      return (
                        <tr key={count}>
                          <th scope="row"><img src={recipe.thumbnail} alt={recipe.title} /></th>
                          <td>{recipe.title}</td>
                          <td>{recipe.ingredients}</td>
                          <td><a href={recipe.href}>Go To Recipe</a></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              ) : (
                <div>
                  No results
                </div>
              )}
            </Col>
          </Row>
        </Container>
        <Loading show={this.state.show} />
      </section>
    )
  }
}

export default Content
