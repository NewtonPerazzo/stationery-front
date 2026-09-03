export interface Customer {
  id: number
  name: string
  email: string
  phone: string
}

export interface Seller extends Customer {}

export interface Product {
  id: number
  code: string
  description: string
  unit_price: string
  commission_percentage: string
}

export interface SaleItem {
  id: number
  product: Product
  quantity: number
  unit_price: string
  commission_percentage: string
  total_amount: string
}

export interface Sale {
  id: number
  invoice_number: string
  sold_at: string
  customer: Customer
  seller: Seller
  items: SaleItem[]
  total_amount: string
}

export interface SalePayload {
  invoice_number: string
  sold_at: string
  customer_id: number
  seller_id: number
  items: Array<{
    product_id: number
    quantity: number
  }>
}

export interface SellerCommission {
  seller_id: number
  seller_name: string
  commission_total: string
}

export interface CommissionReport {
  start_date: string
  end_date: string
  sellers: SellerCommission[]
  grand_total: string
}
