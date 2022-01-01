// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract MyTasksContract {
    //Variables declared.
    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }
    //Key -> uint256 , Value -> object Task / public List of tasks called "tasks".
    mapping (uint256 => Task) public tasks;
    
    uint public taskCounter = 0;

    bool public pruebaDone = false;
   
    constructor(){
        createTask("Task 1","example 1");
    }
   
    //Event that is made when a new task is created.
    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );

    //"memory" is a key word which indicates a temporarily use of variable (local variable), only when the function is called. 
    //Access modifier is needed in order to make a visible function on the blockchain network.
    function createTask(string memory _title, string memory _description) public {
       taskCounter++;
       tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        //emit calls the event function.
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    //Event that is made when the task is done.
    event TaskDone(uint id, bool done);
    
    function taskDone(uint256 _id) public {
        Task memory _localTask = tasks[_id];
        _localTask.done = !_localTask.done;
        tasks[_id] = _localTask; 

        pruebaDone = _localTask.done;

        emit TaskDone(_id, _localTask.done);
    }

    function getTaskDone() public view returns(bool _pruebaDone){
      return pruebaDone;
    }

}