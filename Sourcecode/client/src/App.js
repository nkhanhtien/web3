import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import SupplyChainContract from "./contracts/SupplyChain.json";
import Web3 from "web3";


const provider = new Web3.providers.HttpProvider(process.env.LOCAL_GANACHE_RPC);
const web3 = new Web3(provider);






function App() {

    // Test start
    const test = async (t) => {
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SupplyChainContract.networks[networkId];
        const contract = new web3.eth.Contract(
            SupplyChainContract.abi,
            deployedNetwork && deployedNetwork.address,
        );

        console.log("Accounts: " + accounts);
        console.log("contractAddress: " + deployedNetwork.address);            
        const test = await contract.methods.isValidUser(accounts[0]).call();
        console.log("isValidUser: " + test);

    }
    test();
    
    // Test end 
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
