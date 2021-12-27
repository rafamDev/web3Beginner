// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract MyTasksContract {
    
   //Global variable. 
   uint public taskCounter = 0;

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

    //"memory" is a key word which indicates a temporarily use of variable (local variable), only when the function is called. 
    //Access modifier is needed in order to make a visible function on the blockchain network.
    function createTask(string memory _title, string memory _description) public {
       taskCounter++;
       tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        //emit calls the event function.
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    function taskDone(uint _id) public {
        Task memory _localTask = tasks[_id];
        /*if(_localTask.done){
            _localTask.done = false;
        }else{
            _localTask.done = true;
        }*/
        _localTask.done = !_localTask.done;
        tasks[_id] = _localTask; 
    }

}