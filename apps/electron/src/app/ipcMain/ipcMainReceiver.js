const { ipcMain } = require('electron');
const { saveUserData } = require('./dbCRUD/testUserCRUD.js');

ipcMain.on('form-submission', (event, data) => {
    // Process the data and save it to the database
    saveUserData(data);
});
