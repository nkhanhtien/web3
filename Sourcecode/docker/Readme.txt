Steps: 
1. Install docker desktop (binary or exe)
2. Edit docker/.env file, change the value of BIND_SRC_PATH, BIND_CONTRACT_PATH to absolute path of the source folder (Web3/Sourcecode) on your PC
2-1. Edit file smartcontracts/truffle-config : change value of networks.development.host to your host IP address.
     
3. Open CMD, execute command :  docker compose up -d
   In case of success, the console log will be output like this : 
   
   =====
   D:\Hong\BlockChain>docker compose up -d
   [+] Running 1/1
   ✔  Container docker-truffle-dapp-1  Creating
   ✔   Container docker-ganache-1  Creating
   ✔   Container docker-ganache-1  Created
   ✔   Container docker-truffle-dapp-1  Created
   ✔   Container docker-ganache-1  Starting
   ✔   Container docker-truffle-dapp-1  Starting
   ✔   Container docker-ganache-1  Started
   ✔   Container docker-truffle-dapp-1  Started

   =====
4. Open Docker Desktop, inspect the container "docker-truffle-dapp-1"
5. On Terminal tab, try "ls /home/supply-chain-dapp"
   In case of bindmount success, the result will be the same as inside the Web3/Sourcecode

6. In Docker Desktop, inspect the container "docker-ganache-1"
    Select one private key from the default 10 private keys
7. Open browser, install MetaMask extension. 
   - Add network : connect to your local blockchain network (RPC URL = http://localhost:8545)
   - Import account by private key (set the private key you selected above)
   - Make sure that you see the total amount of ETH = 1000
8. On a browser tab, execute react app :  URL = http://<your-ip>:3000
   - Make sure the home page is displayed
   - Open console log : make sure you can see the log info for accounts, contractAddress, isValidUser normally
9. You can use Visual Code Editor to edit source code of React app. Upon saving changes,
     the react app will be rebuilt and browser will be refreshed automatically.
10. In case you made changes to solidity source code, you need to stop & start container "docker-truffle-dapp-1" to have the contract re-migrated.

