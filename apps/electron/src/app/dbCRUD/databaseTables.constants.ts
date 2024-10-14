
// TURN FOREIGN KEYS ON


export const user_crendentials_table = `  CREATE TABLE IF NOT EXISTS user_credentials(
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_name TEXT NOT NULL UNIQUE,
      user_password TEXT NOT NULL,
      is_valid_account INTEGER CHECK(is_valid_account IN (1,0) ) DEFAULT 1,
      account_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_system_admin INTEGER CHECK( is_valid_account IN (1,0) ) DEFAULT 0,
      employee_position TEXT DEFAULT 'unspecified'
  )
`;

export const user_permissions_table =  `CREATE TABLE IF NOT EXISTS user_permissions(
    user_id INTEGER UNIQUE,

    room_update INTEGER CHECK( room_update IN (0,1) ) DEFAULT 1,
    room_read INTEGER CHECK( room_read IN (0,1) ) DEFAULT 1,
    room_create INTEGER CHECK( room_create IN (0,1) ) DEFAULT 0,
    room_delete INTEGER CHECK( room_delete IN (0,1) ) DEFAULT 0 ,

    transaction_create INTEGER CHECK( transaction_create IN (0,1) ) DEFAULT 1,
    transaction_read INTEGER CHECK( transaction_read IN (0,1) ) DEFAULT 1,
    transaction_update INTEGER CHECK( transaction_update IN (0,1) ) DEFAULT 0,
    transaction_delete INTEGER CHECK( transaction_delete IN (0,1) ) DEFAULT 0,

    catering_service_create INTEGER CHECK( catering_service_create IN (0,1) ) DEFAULT 1,
    catering_service_read INTEGER CHECK( catering_service_read IN (0,1) ) DEFAULT 1,
    catering_service_update INTEGER CHECK( catering_service_update IN (0,1) ) DEFAULT 0,
    catering_service_delete INTEGER CHECK( catering_service_delete IN (0,1) ) DEFAULT 0,

    FOREIGN KEY(user_id) REFERENCES user_credentials(user_id)
)
`;

export const rooms_credentials_table = `CREATE TABLE IF NOT EXISTS rooms_credentials(

    room_id INTEGER PRIMARY KEY AUTOINCREMENT,

    room_code TEXT DEFAULT "BLANK",

    current_room_capacity INTEGER NOT NULL CHECK( current_room_capacity >= 1),
    current_rate JSON NOT NULL,
    valid_as_of TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    set_up_by INTEGER,

    FOREIGN KEY(set_up_by) REFERENCES user_credentials(user_id)
)`;


export const rooms_history_table = `CREATE TABLE IF NOT EXISTS rooms_history (

    rooms_history_id INTEGER PRIMARY KEY AUTOINCREMENT,

    room_id INTEGER,

    old_rate JSON INTEGER NOT NULL,
    old_room_capacity INTEGER NOT NULL,

    record_valid_since TEXT NOT NULL,
    record_invalid_since TEXT DEFAULT NULL,

    validated_by INTEGER NOT NULL,
    invalidated_by INTEGER NOT NULL,

    FOREIGN KEY(validated_by) REFERENCES user_credentials( user_id ),
    FOREIGN KEY(invalidated_by) REFERENCES user_credentials( user_id ),
    FOREIGN KEY(room_id) REFERENCES rooms_credentials( room_id )
)
`;

export const customers_table = `
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,

    customer_name TEXT NOT NULL,
    contact_no TEXT NOT NULL,
    valid_id JSON NOT NULL DEFAULT '{"available":false,"other-identification":true}',
    emergency_contact_no TEXT NOT NULL,

    avail_room_lodging INTEGER CHECK( avail_room_lodging IN (0,1) ) NOT NULL DEFAULT 0 ,
    avail_catering_service INTEGER CHECK( avail_catering_service IN (0,1) ) NOT NULL DEFAULT 0
)
`;


export const transactions_table = `
CREATE TABLE IF NOT EXISTS transactions(

    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,

    date_start TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_end TIMESTAMP DEFAULT 'ongoing',

    catering_service_total_cost INTEGER NOT NULL CHECK( catering_service_total_cost >= 0) DEFAULT 0,
    room_lodging_total_cost INTEGER NOT NULL CHECK( room_lodging_total_cost >= 0) DEFAULT 0,

    total_cost INTEGER NOT NULL CHECK( total_cost >= 1),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (user_id) REFERENCES user_credentials(user_id)
)
`;

export const rooms_lodging_processing_table = `
CREATE TABLE IF NOT EXISTS rooms_lodging_processing (

  rooms_lodging_processing_id INTEGER PRIMARY KEY AUTOINCREMENT,

  room_id INTEGER,
  transaction_id INTEGER,
  customer_id INTEGER,

  actual_checked_in_datetime TEXT NOT NULL,
  actual_checked_out_datetime TEXT NOT NULL,

  scheduled_checked_in_datetime TEXT NOT NULL,
  scheduled_checked_out_datetime TEXT NOT NULL,
  stay_duration TEXT NOT NULL,

  is_reservation INTEGER CHECK( is_reservation IN (0,1) ) NOT NULL,
  is_cancelled INTEGER CHECK( is_cancelled IN (0,1) ) NOT NULL DEFAULT 0,
  is_partial_paid INTEGER CHECK( is_partial_paid IN (0,1) ) NOT NULL,

  FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
  FOREIGN KEY (room_id) REFERENCES rooms_history( room_id )
)`;

export const catering_service_table =`

CREATE TABLE IF NOT EXISTS catering_service(

    catering_service_id INTEGER PRIMARY KEY,
    transaction_id INTEGER,
    order_no TEXT NOT NULL,

    order_created TEXT NOT NULL,
    catering_start TEXT NOT NULL,
    catering_end TEXT NOT NULL,

    is_venue_reservation INTEGER CHECK( is_venue_reservation IN (0,1) ) NOT NULL,
    is_cancelled INTEGER CHECK( is_cancelled IN (0,1) ) NOT NULL DEFAULT 0,
    is_partial_paid INTEGER CHECK( is_partial_paid IN (0,1) ) NOT NULL,

    total_cost INTEGER NOT NUll CHECK(total_cost >= 1),
    total_paid INTEGER NOT NUll CHECK(total_paid >= 1),

    FOREIGN KEY(transaction_id) REFERENCES transactions( transaction_id )
)`;

export const catering_service_invoice_table = `
CREATE TABLE IF NOT EXISTS catering_service_invoice(

    catering_invoice_id INTEGER PRIMARY KEY AUTOINCREMENT,
    catering_service_id INTEGER,

    invoice_no TEXT NOT NULL DEFAULT "USE GENERATED CATERING INVOICE ID ",
    total_sales_vat_inclusive INTEGER NOT NULL DEFAULT 0,
    less_vat INTEGER NOT NULL DEFAULT 0,
    amount_new_of_vat INTEGER NOT NULL DEFAULT 0,
    less_senior_citizen_and_pwd_discount INTEGER NOT NULL DEFAULT 0,
    less_withholding_tax INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL DEFAULT 0,
    amount_due INTEGER NOT NULL DEFAULT 0,

    vatable_sales INTEGER NOT NULL DEFAULT 0,
    vat_exempt_sales INTEGER NOT NULL DEFAULT 0,
    zero_rated_sales INTEGER NOT NULL DEFAULT 0,
    vat_amount INTEGER NOT NULL DEFAULT 0 ,

    forms_of_payment TEXT CHECK( forms_of_payment IN ('cash','check') ) NOT NULL,

    received_from TEXT NOT NULL,
    tin TEXT NOT NULL DEFAULT "tests" ,
    service_address TEXT NOT NULL DEFAULT "Bonsay Riverview Inn & Catering Services",
    business_style TEXT NOT NULL DEFAULT "catering service",
    total_sum INTEGER NOT NULL CHECK(total_sum >= 1),
    payment INTEGER NOT NULL CHECK(payment >= 1),
    date_of_service_invoice TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    sr_senior_citizen_tin TEXT NOT NULL DEFAULT "unavailable",
    osca_pwd_id TEXT NOT NULL DEFAULT "unavailable",

    FOREIGN KEY( catering_service_id) REFERENCES catering_service(catering_service_id)
)
`;
