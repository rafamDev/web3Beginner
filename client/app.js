App = {
    init: () => {
        console.log("App loaded")
        App.loadEthereum()
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
    } 
}

App.init()