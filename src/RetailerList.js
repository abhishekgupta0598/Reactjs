import axios from "axios";
import React, { Component } from "react";
import { AuthService } from "./service/AuthService";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    width: "100%",
    padding: "1%",
  },
  float: {
    float: "left",
    width: "58%",
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "1%",
    paddingBottom: "1%",
    marginRight: "1%",
    marginLeft: "1%",
  },
  left: {
    float: "left",
    width: "39%",
    marginRight: "1%",
    paddingLeft: "3%",
    paddingRight: "3%",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  box: {
    marginRight: "2%",
    width: "30%",
  },
});

class RetailerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      id: 0,
      shopId: "",
      shopName: "",
      address: "",
      name: "",
      mobile_no: "",
    };
  }
  componentDidMount() {
    if (!AuthService.get().isAuthenticated()) {
      this.props.history.push("/");
    }
    const config = {
      headers: {
        Authorization: "Token jg1/" + AuthService.get().getAuthToken(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:8080/getShop", config)
      .then((res) => {
        this.setState({
          list: res.data.map((item, index) => {
            return { index: index, ...item };
          }),
        });
        console.log(this.state.list);
      })
      .catch((err) => console.log(err));
  }

  deleteHandler = (index) => {
    console.log(index);
    let id = this.state.list[index].shopId;
    axios
      .delete(`http://localhost:8080/deleteShop/${id}`)
      .catch((err) => console.log(err))
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };

  submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/createShop", {
        shopId: this.state.shopId,
        shopName: this.state.shopName,
        address: this.state.address,
        shopkeeper: {
          name: this.state.name,
          mobile_no: this.state.mobile_no,
        },
      })
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        console.log(res);
        // this.props.history.push("/retailer");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render = () => {
    console.log("render called for retailer list");
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.float} elevation={3}>
          <div>
            <table>
              <thead>
                <tr>
                  <th>ShopId</th>
                  <th>Address</th>
                  <th>ShopName</th>
                  <th>ShopkeeperName</th>
                  <th>Mobile_no</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.list.map((res, index) => {
                  return (
                    <tr
                      key={res.shopId}
                      onClick={() =>
                        this.props.history.push("/product", {
                          shopId: index,
                          shop: this.state.list,
                        })
                      }
                    >
                      <td>{res.shopId}</td>
                      <td>{res.address}</td>
                      <td>{res.shopName}</td>
                      <td>{res.shopkeeper.name}</td>
                      <td>{res.shopkeeper.mobile_no}</td>
                      <td>
                        {
                          <Button
                            variant="contained"
                            className={classes.box}
                            onClick={() => this.deleteHandler(index)}
                          >
                            DELETE
                          </Button>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Paper>
        <div>
          <Paper elevation={3} className={classes.left}>
            <div>
              <h5>Add Shop</h5>
              <form>
                <div>
                  <label>shopId : </label>
                  <input
                    type="text"
                    onChange={(e) => this.setState({ shopId: e.target.value })}
                    value={this.state.shopId}
                  />
                </div>
                <div>
                  <label>shopName : </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ shopName: e.target.value })
                    }
                    value={this.state.shopName}
                  />
                </div>
                <div>
                  <label>address : </label>
                  <input
                    type="text"
                    onChange={(e) => this.setState({ address: e.target.value })}
                    value={this.state.address}
                  />
                </div>
                <div>
                  <label>name : </label>
                  <input
                    type="text"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    value={this.state.name}
                  />
                </div>
                <div>
                  <label>mobile_no : </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      this.setState({ mobile_no: e.target.value })
                    }
                    value={this.state.mobile_no}
                  />
                </div>
                <Button variant="contained" onClick={this.submitHandler}>
                  submit
                </Button>
              </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  };
}

export default withStyles(styles, { withTheme: true })(RetailerList);
