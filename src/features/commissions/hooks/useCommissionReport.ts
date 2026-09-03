import { useState } from 'react'

import {
  getApiErrorMessage,
  getCommissionReport,
} from '../../../services/api'
import type { CommissionReport } from '../../../types/api'

export function useCommissionReport() {
  const [report, setReport] = useState<CommissionReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const search = async (
    startDate: string,
    endDate: string,
    sellerSearch: string,
    ordering: string,
  ) => {
    setLoading(true)
    setError('')

    try {
      const data = await getCommissionReport(
        startDate,
        endDate,
        sellerSearch,
        ordering,
      )
      setReport(data)
    } catch (requestError) {
      setReport(null)
      setError(getApiErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }

  return { report, loading, error, search }
}
