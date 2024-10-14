interface UserCredentials {
  user_id?: number; // Optional since it's auto-generated
  user_name: string;
  user_password: string;
  is_valid_account?: 0 | 1;
  account_creation_date?: string; // Using string to represent TIMESTAMP
  is_system_admin?: 0 | 1;
  employee_position?: string;
}
interface UserPermissions {
  user_id: number; // Foreign key to `user_credentials`
  room_update?: 0 | 1;
  room_read?: 0 | 1;
  room_create?: 0 | 1;
  room_delete?: 0 | 1;
  transaction_create?: 0 | 1;
  transaction_read?: 0 | 1;
  transaction_update?: 0 | 1;
  transaction_delete?: 0 | 1;
  catering_service_create?: 0 | 1;
  catering_service_read?: 0 | 1;
  catering_service_update?: 0 | 1;
  catering_service_delete?: 0 | 1;
}
interface RoomsCredentials {
  room_id?: number; // Auto-generated
  current_room_capacity: number;
  current_rate: Record<string, any>; // JSON format
  valid_as_of?: string; // TIMESTAMP
  set_up_by?: number; // Foreign key to `user_credentials`
}
interface RoomsHistory {
  rooms_history_id?: number; // Auto-generated
  room_id: number; // Foreign key to `rooms_credentials`
  old_rate: Record<string, any>; // JSON format
  old_room_capacity: number;
  record_valid_since: string;
  record_invalid_since?: string;
  validated_by: number; // Foreign key to `user_credentials`
  invalidated_by: number; // Foreign key to `user_credentials`
}
interface Customers {
  customer_id?: number; // Auto-generated
  customer_name: string;
  contact_no: string;
  valid_id: Record<string, any>; // JSON format
  emergency_contact_no: string;
  avail_room_lodging?: 0 | 1;
  avail_catering_service?: 0 | 1;
}
interface Transactions {
  transaction_id?: number; // Auto-generated
  user_id: number; // Foreign key to `user_credentials`
  customer_id: number; // Foreign key to `customers`
  date_start?: string; // TIMESTAMP
  date_end?: string | 'ongoing';
  catering_service_total_cost?: number;
  room_lodging_total_cost?: number;
  total_cost: number;
}
interface RoomsLodgingProcessing {
  rooms_lodging_processing_id?: number; // Auto-generated
  room_id: number; // Foreign key to `rooms_history`
  transaction_id: number; // Foreign key to `transactions`
  customer_id: number; // Foreign key to `customers`
  actual_checked_in_datetime: string;
  actual_checked_out_datetime: string;
  scheduled_checked_in_datetime: string;
  scheduled_checked_out_datetime: string;
  stay_duration: string;
  is_reservation: 0 | 1;
  is_cancelled?: 0 | 1;
  is_partial_paid: 0 | 1;
}
interface CateringService {
  catering_service_id?: number; // Auto-generated
  transaction_id: number; // Foreign key to `transactions`
  order_no: string;
  order_created: string;
  catering_start: string;
  catering_end: string;
  is_venue_reservation: 0 | 1;
  is_cancelled?: 0 | 1;
  is_partial_paid: 0 | 1;
  total_cost: number;
  total_paid: number;
}
interface CateringServiceInvoice {
  catering_invoice_id?: number; // Auto-generated
  catering_service_id: number; // Foreign key to `catering_service`
  invoice_no?: string;
  total_sales_vat_inclusive?: number;
  less_vat?: number;
  amount_new_of_vat?: number;
  less_senior_citizen_and_pwd_discount?: number;
  less_withholding_tax?: number;
  total?: number;
  amount_due?: number;
  vatable_sales?: number;
  vat_exempt_sales?: number;
  zero_rated_sales?: number;
  vat_amount?: number;
  forms_of_payment: 'cash' | 'check';
  received_from: string;
  tin?: string;
  service_address?: string;
  business_style?: string;
  total_sum: number;
  payment: number;
  date_of_service_invoice?: string;
  sr_senior_citizen_tin?: string;
  osca_pwd_id?: string;
}
