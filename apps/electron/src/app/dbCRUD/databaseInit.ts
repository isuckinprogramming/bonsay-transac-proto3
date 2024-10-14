import * as fs  from 'fs';
import * as crypto from 'crypto';
import Database from 'better-sqlite3';
import {
  rooms_credentials_table,
  user_crendentials_table,
  user_permissions_table,
  rooms_history_table,
  customers_table,
  transactions_table,
  rooms_lodging_processing_table,
  catering_service_table,
  catering_service_invoice_table
} from './databaseTables.constants';

// import { Url } from 'url';
const algorithm = 'aes-256-cbc';

// Should hide the password and salt in the ENV file
const key = crypto.scryptSync(
  'test-password',
  'salt',
  32
); // 32 bytes key


// test();
function test() {
  const tesDB = new Database( "testThreeDB.db");
  const testStatement = tesDB.prepare("create table IF NOT EXISTS testTable( username TEXT, password TEXT )")
  testStatement.run();

  const insertStatement = tesDB.prepare("INSERT INTO testTable(username, password) VALUES ('test user','test pass')");
  insertStatement.run();

  // tesDB.prepare("create table testTable( username TEXT, password TEXT );");
  // tesDB.finalize();

}

const iv = crypto.randomBytes(16); // Initialization vector

// The root directory starts with the nx project directory
// not at the declaration of the code, this will create the
// database outside the electron project, putting the location inside
// folder will not work, simpler to just put the db file location as
// the db file name which guarantees it would be located
// in the root directory of the nx project workspace

const dbEncryptedPath = "app_main_encrypted.db";
const dbDecryptedPath = "app_main_decrypted.db";

// Function to encrypt the database
function encryptDatabase(inputPath, outputPath) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(cipher).pipe(output);
  console.log('Database encrypted.');
}

// Function to decrypt the database
function decryptDatabase(inputPath, outputPath) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  input.pipe(decipher).pipe(output);
  console.log('Database decrypted.');
}


// Not going to read from an sql file, too much problems trying to
// find where the file is located, simnpler to hard code the table creation query
// const tableCreationSQL = fs.readFileSync('generate_all_tables.sql','utf-8');
export function getDB() {

  if (!fs.existsSync(dbEncryptedPath)) {
    const newDB = new Database(dbDecryptedPath);
    console.log("No existing database")

    try {
      // db.exec(sqlFileContent);
      newDB.exec("PRAGMA foreign_keys = ON");
      console.log("Sucessfully set db foreign keys")

      newDB.exec(user_crendentials_table);
      console.log("user_credentials table created")

      newDB.exec(user_permissions_table);
      console.log("user_permissions table created")

      newDB.exec(rooms_credentials_table);
      console.log("rooms_credentials table created")

      newDB.exec(rooms_history_table);
      console.log("rooms_history table created")

      newDB.exec(customers_table);
      console.log("customers_table table created")

      newDB.exec(transactions_table);
      console.log("transactions_table table created")

      newDB.exec(rooms_lodging_processing_table);
      console.log("rooms_lodging_processing table created")

      newDB.exec(catering_service_table);
      console.log("catering_service table created")

      newDB.exec(catering_service_invoice_table);
      console.log("catering_service_invoice table created")


      console.log('SQL file executed successfully.');
    } catch (err) {
      console.error('Error executing SQL file:', err.message);
    }
    return newDB;
  } else {

    // Decrypt the database before using it
    decryptDatabase(dbEncryptedPath,dbDecryptedPath);
    const db = new Database(dbDecryptedPath);

    return db;
  }
}

export function dbCleanUpApplicationClose() {
  // Encrypt the database after changes
  encryptDatabase(dbDecryptedPath,dbEncryptedPath);

  try {
    // fs.unlinkSync(dbDecryptedPath);
    // And delete the created decrypted database

  } catch (error) {
    console.log(error)
  }

}
