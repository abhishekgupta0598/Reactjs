import React, { useEffect, useState } from "react";
import { AuthService } from "./service/AuthService";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  input: {
    width: "100%",
    marginTop: "5%",
  },
  box: {
    marginRight: "2%",
    width: "40%",
  },
}));

export default function Product(props) {
  const classes = useStyles();
  // const history = useHistory();
  const [list, setList] = useState([]);
  const [shopid] = useState(
    props.location.state.shop[props.location.state.shopId].shopId
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (AuthService.get().isAuthenticated()) {
      console.log("Authenticated");
    }
    console.log(shopid);
    axios
      .get(`http://localhost:8080/getShopById/${shopid}/shopkeeper/getProduct`)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
        console.log(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteHandler(index) {
    let productid = list[index].id;
    console.log(productid);
    console.log("delete Handler");
    axios
      .delete(
        `http://localhost:8080/getShop/${shopid}/shopkeeper/deleteProduct/${productid}`
      )
      .catch((err) => {
        console.log(err);
      })
      .then(window.location.reload())
      .catch((err) => {
        console.log("error");
      });
  }

  function submitHandler() {
    axios
      .post(`http://localhost:8080/getShopById/${shopid}/shopkeeper/product`, [
        {
          name: name,
          quantity: quantity,
          price: price,
          payment: {
            amount: amount,
            status: status,
          },
        },
      ])
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.float} elevation={3}>
        <div>
          <table>
            <thead>
              <th>id</th>
              <th>productName</th>
              <th>Quantity</th>
              <th>price</th>
              <th>amount</th>
              <th>status</th>
              <th>Delete</th>
            </thead>
            <tbody>
              {list.map((res, index) => {
                return (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.name}</td>
                    <td>{res.quantity}</td>
                    <td>{res.price}</td>
                    <td>{res.payment.amount}</td>
                    <td>{res.payment.status}</td>
                    <td>
                      {
                        <Button
                          variant="contained"
                          className={classes.box}
                          onClick={() => deleteHandler(index)}
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
      <Paper className={classes.left}>
        <div>
          <h5>Add Product</h5>
          <form>
            <div>
              <label>name : </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <label>quantity : </label>
              <input
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </div>
            <div>
              <label>price : </label>
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <label>amount : </label>
              <input
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            </div>
            <div>
              <label>status : </label>
              <input
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              />
            </div>
            <Button variant="contained" onClick={submitHandler}>
              submit
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
