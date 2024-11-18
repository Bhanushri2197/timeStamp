const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")

const folderName = path.join(__dirname, 'created-files');

app.get('/', (req, res) => {

  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName, { recursive: true });
    console.log(`Directory created: ${folderName}`);
  }

  // Get the current date and time
  const now = new Date();

  // Format date and time for the file name: YYYY-MM-DD_HH-MM-SS
  const formattedFileName = now
    .toISOString()
    .replace(/:/g, '-')
    .replace(/\..+/, '');
  const fileName = `file_${formattedFileName}.txt`;

  const filePath = path.join(folderName, fileName);

  // Format date and time for the file content
  const formattedDate = now.toLocaleString(); 

  // Content of the file
  const fileContent = `Current Date and Time: ${formattedDate}`;

  // Create the file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error creating file:", err);
      return res.status(500).send("Error creating file");
    }
    console.log(`File created successfully: ${filePath}`);
    res.send(`<h1>New File Created!</h1>
              <p>File Name: ${fileName}</p>
              <p>Location: ${folderName}</p>
              <p>Content: ${fileContent}</p>
              <h1>You can see all file through <mark> /all </mark> endPoint</h1>`);
  });
});

app.get('/all', (req, res) => {
    // Ensure the folder exists
    if (!fs.existsSync(folderName)) {
      return res.status(404).send("The folder does not exist or no files have been created yet.");
    }
  
    // Read all files in the folder
    fs.readdir(folderName, (err, files) => {
      if (err) {
        console.error("Error reading folder:", err);
        return res.status(500).send("Error reading folder");
      }
  
      if (files.length === 0) {
        return res.send("<h1>No Files Found</h1><p>The folder is empty.</p>");
      }
  
      // Send the list of files as a response
      res.send(`<h1>Files in Created-Files Folder</h1>
                <ul>
                  ${files.map(file => `<li>${file}</li>`).join('')}
                </ul>`);
    });
  });


app.listen(5000 , () => {
    console.log("Web Server is Connected on port 5000")
})