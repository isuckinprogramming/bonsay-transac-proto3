
import { getDB } from "./databaseInit";


const createUserTemplate = `INSERT INTO user_credentials (user_name, user_password, is_valid_account, is_system_admin, employee_position, account_creation_date) VALUES (?, ?, ?, ?, ?, ?)`;

const appDB = getDB();

// Function to save user data
export function saveUserData(userCredentials) {

  const {
    user_name,
    user_password,
    is_valid_account,
    is_system_admin,
    employee_position,
    account_creation_date
  } = userCredentials;

  const createUserStatement = appDB.prepare(createUserTemplate);

  createUserStatement.run(user_name, user_password, is_valid_account, is_system_admin, employee_position, account_creation_date);

  // createUserStatement.finalize();
}

try {
saveUserData(
  {
    user_name: 'testAdminUserVer2',
    user_password: "testpassword",
    is_valid_account: 1,
    is_system_admin: 1,
    employee_position: "app development administrator",
    account_creation_date: new Date().toISOString()
  }
  );
} catch (err) {
  console.log(err);
}

const verifyUserAndPassword = `
SELECT * FROM user_credentials
WHERE user_name = ? AND
user_password = ? AND
is_valid_account = 1`;

export function verifyUser( user_name, user_password ) {

  try {
    const stmt = appDB.prepare(verifyUserAndPassword);

    const user = stmt.get(1);

    if (user) {
      console.log(user);
      return { success: true, user };
    } else {
      console.log(user);
      return { success: false, message: 'Invalid username or password.' };
    }
  } catch (err) {

    console.log(err);

    return {
      success: false,
      message: 'Invalid username or password.'
    };
  }
}

export function getRegisteredUsers(){

  const stmt = appDB.prepare(`SELECT user_name FROM user_credentials`);
  const rows = stmt.all();
  return rows.map(row => row.user_name);

}
