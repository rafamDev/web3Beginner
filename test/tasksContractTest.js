//Mock Test

//Calls the contract and store it in a variable.
const myTasksContract = artifacts.require("MyTasksContract");

//Name of test and what it does.
contract("myTasksContractTest", () => {
    //Before Test
    before(async () => {
        this.myTasksContract = await myTasksContract.deployed();
    })

    //Smart contract is created. 
    it("migrate deployed successfully", async () => {
        const address = this.myTasksContract.address;
          //Chain asserts library
          assert.notEqual(address,null);
          assert.notEqual(address,"");
          assert.notEqual(address,undefined);
           //Empty hexadecimal or binary.
           assert.notEqual(address,"0x0");
    })

    //Smart contract has tasks. 
    it("get tasks list", async () => {
        const taskCounter = await this.myTasksContract.taskCounter(); // i = 1
        const task = await this.myTasksContract.tasks(taskCounter); 
          assert.equal(task.id.toNumber(), taskCounter);
          assert.equal(task.title, "Task 1");
          assert.equal(task.description, "example 1");
          assert.equal(task.done, false);
          assert.equal(taskCounter, 1);
    })

    //Smart contract has created tasks. 
    it("task created successfully ", async () => {
        const taskResult = await this.myTasksContract.createTask("Task 2", "example 2");
          //Second task created.
          const taskEvent = taskResult.logs[0].args;
        
        const taskCounter = await this.myTasksContract.taskCounter(); // i = 2  
         assert.equal(taskEvent.id.toNumber(), taskCounter);
         assert.equal(taskEvent.title, "Task 2");
         assert.equal(taskEvent.description, "example 2");
         assert.equal(taskEvent.done, false);
         assert.equal(taskCounter, 2);
    })

    //Smart contract has tasks done. 
    it("task done successfully ", async () => {
      const taskDone = await this.myTasksContract.taskDone(1);
      const taskEvent = taskDone.logs[0].args;
      const task = await this.myTasksContract.tasks(1);
       assert.equal(task.done, true);
       assert.equal(taskEvent.done, true);
       assert.equal(taskEvent.id, 1);
    })

})