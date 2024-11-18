# Time Stamp file creating using node 

This is a simple Express.js application that saves the current timestamp to a text file and retrieves all saved timestamps.

## Features

#### Save Current Timestamp:

The application creates a text file with the current timestamp in the Current_TimeStamp folder each time the root endpoint https://nodejstask-1-4a5h.onrender.com/ is accessed.
The timestamp is formatted as dd-MM-yyyy-HH-mm-ss.
The response includes a message confirming that the timestamp was saved.


#### Retrieve All Timestamps:

The https://nodejstask-1-4a5h.onrender.com/getTextFiles endpoint lists all the .txt files in the Current_TimeStamp folder, which represent saved timestamps.
