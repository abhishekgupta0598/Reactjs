import React, { Component } from "react";
import { AuthService } from "./service/AuthService";
import axios from "axios";
import { Button, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    width: "30%",
    marginLeft: "30%",
    marginRight: "40%",
    marginTop: "8%",
    paddingTop: "7%",
    paddingBottom: "7%",
    paddingRight: "4%",
    paddingLeft: "4%",
  },
  input: {
    width: "100%",
    margin: "1%",
  },
  button: {
    marginTop: "2%",
    marginLeft: "1%",
  },
});

class Login extends Component {
  state = {
    username: "jg1",
    password: "jg1pass",
  };

  componentDidMount() {
    if (AuthService.get().isAuthenticated()) {
      console.log("Authenticated");
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log("submit", this.state.username, this.state.password);
    axios
      .post("https://curation-sql.appspot.com/authn/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .catch((error) => {
        console.log("Invalid username or password", error);
      })
      .then((res) => {
        console.log(res);
        AuthService.get().login(res.data.token, res.data.username);
        this.props.history.push("/retailer");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={3} className={classes.root}>
        <div>
          <form
            onSubmit={(e) => {
              this.submitHandler(e);
            }}
          >
            <div>
              <TextField
                id="outlined-basic"
                className={classes.input}
                label="Username"
                variant="outlined"
                onChange={(e) => this.setState({ username: e.target.value })}
                value={this.state.username}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                className={classes.input}
                label="password"
                variant="outlined"
                onChange={(e) => this.setState({ password: e.target.value })}
                value={this.state.password}
              />
            </div>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => this.props.history.push("/retailer")}
            >
              Login
            </Button>
          </form>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
