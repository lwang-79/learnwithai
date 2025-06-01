// Plan
export interface Plan {
  id: string;
  product_id: string;
  name: string;
  description: string;
  status: string;
  billing_cycles: BillingCycle[];
  taxes: Taxes;
  create_time: Date;
  update_time: Date;
  links: Link[];
}

export interface BillingCycle {
  frequency: Frequency;
  tenure_type: string;
  sequence: number;
  total_cycles: number;
  pricing_scheme: PricingScheme;
}

export interface Frequency {
  interval_unit: string;
  interval_count: number;
}

export interface PricingScheme {
  fixed_price: FixedPrice;
  version: number;
  create_time: Date;
  update_time: Date;
  status?: string;
}

export interface FixedPrice {
  currency_code: string;
  value: string;
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface Taxes {
  percentage: string;
  inclusive: boolean;
}

// Subscription
export interface Subscription {
  id: string;
  plan_id: string;
  start_time: Date;
  quantity: string;
  shipping_amount: ShippingAmount;
  subscriber: Subscriber;
  billing_info: BillingInfo;
  create_time: Date;
  update_time: Date;
  links: Link[];
  status: string;
  status_update_time: Date;
}

export interface BillingInfo {
  outstanding_balance: ShippingAmount;
  cycle_executions: CycleExecution[];
  last_payment: LastPayment;
  next_billing_time: Date;
  failed_payments_count: number;
}

export interface CycleExecution {
  tenure_type: string;
  sequence: number;
  cycles_completed: number;
  cycles_remaining: number;
  total_cycles: number;
}

export interface LastPayment {
  amount: ShippingAmount;
  time: Date;
}

export interface ShippingAmount {
  currency_code: string;
  value: string;
}

export interface Subscriber {
  shipping_address: ShippingAddress;
  name: SubscriberName;
  email_address: string;
  payer_id: string;
}

export interface SubscriberName {
  given_name: string;
  surname: string;
}

export interface ShippingAddress {
  name: ShippingAddressName;
  address: Address;
}

export interface Address {
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export interface ShippingAddressName {
  full_name: string;
}

export interface SubscriptionBrief {
  id: string;
  plan_name: string;
  create_time: Date;
  status: string;
}
