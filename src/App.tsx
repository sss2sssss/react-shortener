import React, { Component } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner, Accordion } from 'react-bootstrap';
import * as validUrl from 'valid-url';
import './App.css';

interface Link {
  urlTitle: string,
  urlShortener: string,
  isToggled: boolean
}

interface Props {

}

interface State {
  title: string;
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
      title: '',
      url: '',
      buttonDisabled: false,
      failAlertShow: false,
      failMessageInput: '',
      successAlertShow: false,
      urls: []
    };
  }

  componentDidMount() {

    document.title = "React Link Shortener";

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

      this.urls.forEach((item) => {
        item.isToggled = false;
      });
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
    this.setState({ url: event.target.value, failAlertShow: false, failMessageInput: '', successAlertShow: false, buttonDisabled: false,});
  }

  onTitleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value, failAlertShow: false, failMessageInput: '', successAlertShow: false, buttonDisabled: false,});
  }

  onAccordionToggle = (event?: React.SyntheticEvent<Element, Event> | undefined) => {
    var counter = 0;
    this.urls.forEach(element => {
      if (counter.toString() === event?.currentTarget.id)
      {
        element.isToggled = !element.isToggled;
      }
      else
      {
        element.isToggled = false;
      }
      counter++;
    });
    this.setState({urls: this.urls});
  }

  onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { url, title } = this.state;
    if (validUrl.isHttpUri(url.trim()) || validUrl.isHttpsUri(url.trim()))
    {
      if(validUrl.isHttpUri(title.trim()) || validUrl.isHttpsUri(title.trim()))
      {
        this.setState({
          buttonDisabled: false,
          failAlertShow: true,
          successAlertShow: false,
          failMessageInput: 'Title Cannot be Same as Url or In Http(s) Url Format!'
        });
      }
      else
      {
        this.setState({
          buttonDisabled: true
        });

        fetch("https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key="+ process.env.REACT_APP_FIREBASE_WEB_API_KEY, 
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            longDynamicLink: process.env.REACT_APP_FIREBASE_DYNAMIC_LINK_DOMAIN + "?link=" + url.trim() + ((title.trim() && title.trim() !== "") ? "&st=" + title.trim() : "")
          })
        })
        .then((res) => res.json())
        .then(json => {
          if (json.shortLink && json.shortLink.trim() !== "")
          {
            this.urls.push({
              urlTitle: title,
              urlShortener: json.shortLink.trim(),
              isToggled: false
            });
    
            try
            {
              localStorage.setItem('urlList', JSON.stringify(this.urls));
        
              this.setState({
                buttonDisabled: false,
                urls: this.urls,
                title: '',
                url: '',
                failAlertShow: false,
                successAlertShow: true,
                failMessageInput: ''
              });
      
      
            }
            catch (e)
            {
              this.setState({
                buttonDisabled: false,
                failAlertShow: true,
                successAlertShow: false,
                failMessageInput: 'Something Unexpected Happened!'
              });
            }
          }
          else
          {
            this.setState({
              buttonDisabled: false,
              failAlertShow: true,
              successAlertShow: false,
              failMessageInput: 'Something Unexpected Happened!'
            });
          }
        })
        .catch((e) => {
          this.setState({
            buttonDisabled: false,
            failAlertShow: true,
            successAlertShow: false,
            failMessageInput: 'Something Unexpected Happened!'
          });
        });

      }
    }
    else
    {
      this.setState({
        buttonDisabled: false,
        failAlertShow: true,
        successAlertShow: false,
        failMessageInput: 'Invalid Url Enter!'
      });
    }
  }

  render() {
    return (
      <Container>
        <Row className="row-gap">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Input your link that desired to be shortened!</Card.Title>
                {
                  (process.env.REACT_APP_DEMO_MODE && process.env.REACT_APP_DEMO_MODE?.split(",").length > 0) 
                    ?
                  <Card.Text>On this demo site we are allowing to shorten this {process.env.REACT_APP_DEMO_MODE?.split(",").length} domains: {process.env.REACT_APP_DEMO_MODE}</Card.Text>
                    :
                  <Card.Text>On this demo site we are allowing all domain to be shorten</Card.Text>
                }
                <Form onSubmit={this.onSubmit}>
                  <Form.Group as={Row} controlId="formBasicTitle" className="form-gap">
                    <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={9}>
                      <Form.Control placeholder="Type Title, Optional" disabled={this.state.buttonDisabled} value={this.state.title} onChange={this.onTitleChange}/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formBasicUrl" className="form-gap">
                    <Form.Label column sm={2}>Url</Form.Label>
                    <Col sm={9}>
                      <Form.Control required placeholder="Type Url, Required" disabled={this.state.buttonDisabled} value={this.state.url} onChange={this.onChange}/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="form-gap">
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Row>
                        <Col>
                          <Button variant="primary" disabled={this.state.buttonDisabled || this.state.url === ''} type="submit">
                            Submit
                          </Button>
                        </Col>
                        <Col>
                          <Spinner hidden={!this.state.buttonDisabled} animation="border" />
                        </Col>
                      </Row>
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
        </Row>
        <Row className="row-gap">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Shortened Url</Card.Title>
                {
                  this.state.urls && this.state.urls.length > 0 ?
                  <Accordion>
                    {
                      this.state.urls.map((item, index) => 
                      <Card key={index}>
                        <Card.Header>
                          <Row>
                            <Col sm={9}>
                              <Accordion.Toggle id={index} className="break-all" as={Button} variant="link" eventKey={index.toString()} onClick={this.onAccordionToggle}>
                                {
                                  (item.urlTitle && item.urlTitle.trim() !== "") ? <i>{item.urlTitle.trim()}</i> : <i>No Title</i>
                                }
                              </Accordion.Toggle>
                            </Col>
                            <Col sm={3} className="dropdown-align">
                              {
                                (item.isToggled) ? String.fromCharCode(9650) : String.fromCharCode(9660)
                              }
                            </Col>
                          </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index.toString()}>
                          <Card.Body>
                            <Card.Link target="_blank" href={item.urlShortener}>{item.urlShortener}</Card.Link>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      )
                    }
                  </Accordion>
                  : 
                  <Card.Text>Empty List</Card.Text>
                }
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
}
