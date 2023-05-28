Setup local ethereum blockchain with docker:

sudo docker run -d -p 7545:7545 trufflesuite/ganache-cli:latest -h 0.0.0.0 --accounts 10 --gasLimit 6721975000
