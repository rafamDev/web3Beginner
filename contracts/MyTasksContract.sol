// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract MyTasksContract {
    
   //Global variable. 
   uint public taskCounter = 0;

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

    //"memory" is a key word which indicates a temporarily use of variable (local variable), only when de function is called. 
    //Access modifier is needed.
    function createTask(string memory _title, string memory _description) public {
       tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
       taskCounter++;
    }

}