App = {
    contracts: {},
    init: () => {
        console.log("App loaded")
        App.loadEthereum()
        App.loadContracts()
    },
    loadEthereum: async () => {
        //Metamask library.
        if(window.ethereum){
            App.webProvider = window.ethereum
            await window.ethereum.request({method: 'eth_requestAccounts'}) 
            //Accounts loaded.
        
        //Web3.js library.    
        }else if(window.web3){
            web3 = new Web3(window.web3.currentProvider)
        }else{
            alert("No ethereum browser is installed. Try installing Metamask")
        }
    }, 
    
    loadContracts: async () => {
        const response = await fetch("MyTasksContract.json")
        const taskContractJson = await response.json()
         App.contracts.taskContract = TruffleContract(taskContractJson); //Solidity contract
         App.contracts.taskContract.setProvider(App.web3Provider);
         //Our account is connected from metamask.
           App.taskContract = await App.contracts.taskContract.deplyed()
           //Contract deployed in eth network.
    } 
}

App.init()