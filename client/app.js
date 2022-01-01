App = {
    contracts: {},
    init: async () => {
        await App.loadEthereum()
        await App.loadAccount()
        await App.loadContracts()
        await App.render()
        await App.renderTasks()
    },

    loadEthereum: async () => {
        //Metamask library.
        if(window.ethereum){
            App.web3Provider = window.ethereum
            await window.ethereum.request({method: 'eth_requestAccounts'}) 
            //Accounts loaded.
            console.log("account found")
        
        //Web3.js library.    
        }else if(window.web3){
            web3 = new Web3(window.web3.currentProvider)
        }else{
            alert("No ethereum browser is installed. Try installing Metamask")
        }
    }, 
    
    loadAccount: async () => {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'}) 
        App.account = accounts[0] // Current account (used in metamask)
        console.log("account: " + App.account)
    },

    loadContracts: async () => {
        const response = await fetch("MyTasksContract.json")
        const taskContractJson = await response.json()
        console.log("taskContract: " + taskContractJson)
         App.contracts.taskContract = TruffleContract(taskContractJson); //Solidity contract
         App.contracts.taskContract.setProvider(App.web3Provider);
         //Our account is connected from metamask.
           App.taskContract = await App.contracts.taskContract.deployed()
           //Contract deployed in eth network.
    }, 

    render: async () => {
        document.getElementById("account").innerText = App.account
    },

    renderTasks: async () => {
        const taskCounter = await App.taskContract.taskCounter()
        console.log("TaskCounter: " + taskCounter + " => " + taskCounter.toNumber())

        let html = "";

        for (let i = 1; i <= taskCounter; i++) {
          const task = await App.taskContract.tasks(i);
          const taskId = task[0].toNumber();
            console.log("taskId: " + taskId)
          const taskTitle = task[1];
          const taskDescription = task[2];
          const taskDonee = task[3];
          const taskCreatedAt = task[4];
    
          // Creating a task Card
          let taskElement = `<div class="card bg-dark rounded-0 mb-2">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span>${taskTitle}</span>
              <div class="form-check form-switch">
                <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.taskDone(this)" ${
                  taskDonee === true && "checked"
                }>
              </div>
            </div>
            <div class="card-body">
              <span>${taskDescription}</span>
              <span>${taskDonee}</span>
              <p class="text-muted">Task was created ${new Date(
                taskCreatedAt * 1000
              ).toLocaleString()}</p>
              </label>
            </div>
          </div>`;
          html += taskElement;
        }
    
        document.querySelector("#tasksList").innerHTML = html;
    },

    createTask: async (title, description) => {
        //Save task from current account.
        console.log("Properties: " + title, description)
        const result = await App.taskContract.createTask(title, description, {
            from: App.account
        })
       console.log(result.logs[0].args)

       const pruebaDone = await App.taskContract.getTaskDone({
        from: App.account
       })

      console.log("Prueba done ===> " + pruebaDone)

    },

    taskDone: async (element) => {
        console.log("element: " + element)
        const taskId = element.dataset.id;
        console.log("element ID: " + taskId)
        await App.taskContract.taskDone(taskId, {
          from: App.account,
        });
        
        
        window.location.reload();
    }


}
App.init()