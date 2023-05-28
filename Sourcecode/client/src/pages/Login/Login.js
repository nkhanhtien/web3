import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Box,
  Container,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import SupplyChainContract from "../../web3/artifacts/SupplyChain.json";
import Web3 from "web3";
import getWeb3 from "../../web3/provider";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
// Initialize a new contract object:
const contract = new web3.eth.Contract(SupplyChainContract.abi);

function Login(props) {
  // Test start
  // const test = async (t) => {
  //   // Get the addresses of Ganache's fake wallet:
  //   const accounts = await web3.eth.getAccounts();
  //   // Get the current price of gas
  //   const gasPrice = await web3.eth.getGasPrice();
  //   // Deploy the HelloWorld contract (its bytecode)
  //   // by spending some gas from our first address
  //   contract
  //     .deploy({
  //       data: SupplyChainContract.bytecode.object,
  //     })
  //     .send({
  //       from: accounts[0],
  //       gas: 1000000,
  //       gasPrice,
  //     })
  //     .on("confirmation", async (confNumber, receipt) => {
  //       const { contractAddress } = receipt;
  //       console.log("Deployed at", contractAddress);

  //       // Get the deployed contract instance:
  //       const contractInstance = new web3.eth.Contract(
  //         SupplyChainContract.abi,
  //         contractAddress,
  //       );

  //       // Call the "isValidUser" function and log the result:
  //       const test = await contractInstance.methods
  //         .isValidUser(accounts[0])
  //         .call();
  //       console.log("isValidUser: " + test);
  //     })
  //     .on("error", (err) => {
  //       console.log("Failed to deploy:", err);
  //     });
  // };

  // const networkId = await web3.eth.net.getId();y
  // const deployedNetwork = SupplyChainContract.networks[networkId];
  // const contract = new web3.eth.Contract(
  //   SupplyChainContract.abi,
  //   deployedNetwork && deployedNetwork.address,
  // );

  // console.log("Accounts: " + accounts);
  // console.log("contractAddress: " + deployedNetwork.address);
  // const test = await contract.methods.isValidUser(accounts[0]).call();
  // console.log("isValidUser: " + test);
  // test();

  // Test end
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("test@gmail.com");
  var [passwordValue, setPasswordValue] = useState("password");
  // var [walletAddress, setWalletAddress] = useState("");
  var state = {
    web3: null,
    accounts: null,
    contract: null,
    mRole: null,
    tpRole: null,
    dhRole: null,
    cRole: null,
  };

  const componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const mRole = localStorage.getItem("mRole");
      const tpRole = localStorage.getItem("tpRole");
      const dhRole = localStorage.getItem("dhRole");
      const cRole = localStorage.getItem("cRole");
      console.log(this.state, "state");

      this.setState(
        {
          web3,
          accounts,
          contract: instance,
          mRole: mRole,
          tpRole: tpRole,
          dhRole: dhRole,
          cRole: cRole,
        },
        this.runExample,
      );
      console.log(this.state, "state");
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  // const logUser = async () => {
  //   console.log("login");
  // };

  // const createUser = async () => {
  //   const tx = await createUser("Test");
  //   console.log(tx);
  // };

  return (
    <Container sx={{ borderRadius: "16px" }} component="main" maxWidth="sm">
      <Box sx={{ borderRadius: "16px" }}>
        <Grid container className={classes.container}>
          <div className={classes.formContainer}>
            <div className={classes.form}>
              <Tabs
                value={activeTabId}
                onChange={(e, id) => setActiveTabId(id)}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Login" classes={{ root: classes.tab }} />
                <Tab label="Register User" classes={{ root: classes.tab }} />
              </Tabs>
              {activeTabId === 0 && (
                <React.Fragment>
                  <Button size="large" className={classes.googleButton}>
                    <img
                      src="https://images.web3auth.io/login-google-active.svg"
                      alt="login-google-active"
                      className={classes.googleIcon}
                    />
                    &nbsp;Sign in with Google
                  </Button>
                  <Button
                    // onClick={componentDidMount}
                    size="large"
                    className={classes.googleButton}
                  >
                    <img
                      src="https://images.web3auth.io/login-metamask.svg"
                      alt="login-metamask"
                      height="auto"
                      width="auto"
                      class="image-icon"
                    />
                    &nbsp;Sign in with Metamask
                  </Button>
                  <div className={classes.formDividerContainer}>
                    <div className={classes.formDivider} />
                    <Typography className={classes.formDividerWord}>
                      or
                    </Typography>
                    <div className={classes.formDivider} />
                  </div>
                  <Fade in={error}>
                    <Typography
                      color="secondary"
                      className={classes.errorMessage}
                    >
                      Something is wrong with your login or password :(
                    </Typography>
                  </Fade>
                  <TextField
                    id="email"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    margin="normal"
                    placeholder="Email Adress"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    id="password"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Password"
                    type="password"
                    fullWidth
                  />
                  <div className={classes.formButtons}>
                    {isLoading ? (
                      <CircularProgress
                        size={26}
                        className={classes.loginLoader}
                      />
                    ) : (
                      <Button
                        disabled={
                          loginValue.length === 0 || passwordValue.length === 0
                        }
                        onClick={() =>
                          loginUser(
                            userDispatch,
                            loginValue,
                            passwordValue,
                            props.history,
                            setIsLoading,
                            setError,
                          )
                        }
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Login
                      </Button>
                    )}
                    <Button
                      color="primary"
                      size="large"
                      className={classes.forgetButton}
                    >
                      Forget Password
                    </Button>
                  </div>
                </React.Fragment>
              )}
              {activeTabId === 1 && (
                <React.Fragment>
                  <Fade in={error}>
                    <Typography
                      color="secondary"
                      className={classes.errorMessage}
                    >
                      Something is wrong with your login or password :(
                    </Typography>
                  </Fade>
                  <TextField
                    id="name"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    margin="normal"
                    placeholder="Full Name"
                    type="text"
                    fullWidth
                  />
                  <TextField
                    id="email"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
                    margin="normal"
                    placeholder="Email Adress"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    id="password"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Password"
                    type="password"
                    fullWidth
                  />
                  <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      <Button
                        onClick={() =>
                          loginUser(
                            userDispatch,
                            loginValue,
                            passwordValue,
                            props.history,
                            setIsLoading,
                            setError,
                          )
                        }
                        disabled={
                          loginValue.length === 0 ||
                          passwordValue.length === 0 ||
                          nameValue.length === 0
                        }
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.createAccountButton}
                      >
                        Create your account
                      </Button>
                    )}
                  </div>
                  <div className={classes.formDividerContainer}>
                    <div className={classes.formDivider} />
                    <Typography className={classes.formDividerWord}>
                      or
                    </Typography>
                    <div className={classes.formDivider} />
                  </div>
                  <Button
                    size="large"
                    className={classnames(
                      classes.googleButton,
                      classes.googleButtonCreating,
                    )}
                  >
                    <img
                      src="https://images.web3auth.io/login-google-active.svg"
                      alt="google"
                      className={classes.googleIcon}
                    />
                    &nbsp;Sign up with Google
                  </Button>
                  <Button
                    // onClick={this.createUser}
                    size="large"
                    className={classes.googleButton}
                  >
                    <img
                      src="https://images.web3auth.io/login-metamask.svg"
                      alt="login-metamask"
                      height="auto"
                      width="auto"
                      class="image-icon"
                    />
                    &nbsp;Sign up with Metamask
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </Grid>
      </Box>
    </Container>
  );
}

export default withRouter(Login);
