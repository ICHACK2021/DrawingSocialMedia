import { Component } from "react";
import { Button, Form } from "react-bootstrap";

const validate = (username) => {
    return 0 < username.length && username.length <= 20
   }

class SearchFriends extends Component {
    state = {
        username = ""
    }

    render() {
        <div>
          <Form>
            <Form.Group size="lg" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                autoFocus
                type="username"
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                />
            </Form.Group>
            <Button className="float-right bg-success" size="lg" onClick={() => handlingSubmit(this.state.username, this.state.password)} disabled={!validate(this.state.username)}>
                Search
            </Button>
          </Form>
        </div>
    }

}