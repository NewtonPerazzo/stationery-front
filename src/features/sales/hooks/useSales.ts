import { useCallback, useEffect, useState } from 'react'

import {
  createSale,
  deleteSale,
  getApiErrorMessage,
  listCustomers,
  listProducts,
  listSales,
  listSellers,
  updateSale,
} from '../../../services/api'
import type {
  Customer,
  Product,
  Sale,
  SalePayload,
  Seller,
} from '../../../types/api'

async function fetchSalesData() {
  const [sales, customers, sellers, products] = await Promise.all([
    listSales(),
    listCustomers(),
    listSellers(),
    listProducts(),
  ])

  return { sales, customers, sellers, products }
}

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [sellers, setSellers] = useState<Seller[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await fetchSalesData()
      setSales(data.sales)
      setCustomers(data.customers)
      setSellers(data.sellers)
      setProducts(data.products)
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    fetchSalesData()
      .then((data) => {
        if (cancelled) return
        setSales(data.sales)
        setCustomers(data.customers)
        setSellers(data.sellers)
        setProducts(data.products)
      })
      .catch((requestError) => {
        if (!cancelled) setError(getApiErrorMessage(requestError))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const saveSale = async (saleId: number | null, payload: SalePayload) => {
    if (saleId === null) {
      await createSale(payload)
    } else {
      await updateSale(saleId, payload)
    }

    await loadData()
  }

  const removeSale = async (saleId: number) => {
    await deleteSale(saleId)
    await loadData()
  }

  return {
    sales,
    customers,
    sellers,
    products,
    loading,
    error,
    loadData,
    saveSale,
    removeSale,
  }
}
