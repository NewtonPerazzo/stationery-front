import axios from 'axios'

import type {
  CommissionReport,
  Customer,
  Product,
  Sale,
  SalePayload,
  Seller,
} from '../types/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
  timeout: 10_000,
})

export async function listSales(
  search = '',
  ordering = 'invoice_number',
): Promise<Sale[]> {
  const { data } = await api.get<Sale[]>('/sales/', {
    params: { search, ordering },
  })
  return data
}

export async function listCustomers(): Promise<Customer[]> {
  const { data } = await api.get<Customer[]>('/customers/')
  return data
}

export async function listSellers(): Promise<Seller[]> {
  const { data } = await api.get<Seller[]>('/sellers/')
  return data
}

export async function listProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products/')
  return data
}

export async function createSale(payload: SalePayload): Promise<void> {
  await api.post('/sales/', payload)
}

export async function updateSale(
  saleId: number,
  payload: SalePayload,
): Promise<void> {
  await api.put(`/sales/${saleId}/`, payload)
}

export async function deleteSale(saleId: number): Promise<void> {
  await api.delete(`/sales/${saleId}/`)
}

export async function getCommissionReport(
  startDate: string,
  endDate: string,
  search = '',
  ordering = 'seller_name',
): Promise<CommissionReport> {
  const { data } = await api.get<CommissionReport>('/commissions/', {
    params: {
      start_date: startDate,
      end_date: endDate,
      search,
      ordering,
    },
  })
  return data
}

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'Ocorreu um erro inesperado.'
  }

  const responseData = error.response?.data

  if (responseData && typeof responseData === 'object') {
    return Object.entries(responseData)
      .map(([field, messages]) => `${field}: ${String(messages)}`)
      .join(' ')
  }

  return 'Não foi possível comunicar com a API.'
}
