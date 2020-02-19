import React, { Component } from 'react';
import { Form, Button, ListGroup, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import * as validUrl from 'valid-url';

interface Link {
  urlShortener: string
}

interface Props {

}

interface State {
  url: string;
  buttonDisabled: boolean;
  failAlertShow: boolean;
  failMessageInput: string;
  successAlertShow: boolean;
  urls: Link[];
}

export default class App extends Component<Props, State> {

  
  public urls : Link[] = [];


  constructor(props : any) {
    super(props);
    this.state = {
      url: '',
      buttonDisabled: false,
      failAlertShow: false,
      failMessageInput: '',
      successAlertShow: false,
      urls: []
    };
  }

  componentDidMount() {

    try
    {
      if (localStorage.getItem('urlList') === "" || localStorage.getItem('urlList') === null)
      {
        this.urls = []
      }
      else
      {
        this.urls = JSON.parse(localStorage.getItem('urlList') || "");
      }
    }
    catch (e)
    {
      this.urls = [];
    }

    this.setState({
      urls: this.urls
    });
  }

  onChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ url: event.target.value, failAlertShow: false, failMessageInput: '', successAlertShow: false, });
  }

  

  onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { url } = this.state;
    if (validUrl.isHttpUri(url) || validUrl.isHttpsUri(url))
    {
      this.urls.push({
        urlShortener: url
      });
  
      try
      {
        localStorage.setItem('urlList', JSON.stringify(this.urls));
  
        this.setState({
          urls: this.urls,
          url: '',
          failAlertShow: false,
          successAlertShow: true,
          failMessageInput: ''
        });


      }
      catch (e)
      {
        this.setState({
          failAlertShow: true,
          successAlertShow: false,
          failMessageInput: 'Something Unexpected Happened!'
        });
      }
    }
    else
    {
      this.setState({
        failAlertShow: true,
        successAlertShow: false,
        failMessageInput: 'Invalid Url Enter!'
      });
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={6} md={4}>
          <Card>
              <Card.Body>
                <Card.Title>Input your link that desired to be shortened!</Card.Title>
                <Form className="App" onSubmit={this.onSubmit}>
                  <Form.Group as={Row} controlId="formBasicUrl">
                    <Form.Label column sm={2}>Url</Form.Label>
                    <Col sm={10}>
                      <Form.Control required placeholder="Type Url" value={this.state.url} onChange={this.onChange}/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button variant="primary" disabled={this.state.buttonDisabled || this.state.url == ''} type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
                <Alert hidden={!this.state.failAlertShow} variant="danger">
                  {this.state.failMessageInput}
                </Alert>
                <Alert hidden={!this.state.successAlertShow} variant="success">
                  Url Successfully Shortened!
                </Alert>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Shortened Url</Card.Title>
              {
                this.state.urls && this.state.urls.length > 0 ?
                <ListGroup>
                {
                  this.state.urls.map((item, index) => <ListGroup.Item target="_blank" action href={item.urlShortener}>{item.urlShortener}</ListGroup.Item>)
                }
                </ListGroup> : <Card.Text>Empty List</Card.Text>
              }
            </Card.Body>
          </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
}
