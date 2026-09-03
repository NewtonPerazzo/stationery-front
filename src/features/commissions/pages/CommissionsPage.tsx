import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState, type FormEvent } from 'react'

import { CommissionTable } from '../components/CommissionTable'
import { useCommissionReport } from '../hooks/useCommissionReport'

function formatDateInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const today = new Date()
const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)

type CommissionOrdering =
  | 'seller_name'
  | '-commission_total'
  | 'commission_total'

export function CommissionsPage() {
  const [startDate, setStartDate] = useState(formatDateInput(currentMonthStart))
  const [endDate, setEndDate] = useState(formatDateInput(today))
  const [sellerSearch, setSellerSearch] = useState('')
  const [ordering, setOrdering] =
    useState<CommissionOrdering>('seller_name')
  const { report, loading, error, search } = useCommissionReport()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await search(startDate, endDate, sellerSearch, ordering)
  }

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4">Comissões</Typography>
        <Typography color="text.secondary">
          Consulte os valores de comissão por vendedor.
        </Typography>
      </div>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="Data inicial"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { max: endDate },
            }}
            required
          />
          <TextField
            label="Data final"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { min: startDate },
            }}
            required
          />
          <TextField
            label="Buscar vendedor"
            value={sellerSearch}
            onChange={(event) => setSellerSearch(event.target.value)}
          />
          <TextField
            select
            label="Ordenar por"
            value={ordering}
            onChange={(event) =>
              setOrdering(event.target.value as CommissionOrdering)
            }
            sx={{ minWidth: 230 }}
          >
            <MenuItem value="seller_name">Nome do vendedor</MenuItem>
            <MenuItem value="-commission_total">Maior comissão</MenuItem>
            <MenuItem value="commission_total">Menor comissão</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={22} /> : 'Consultar'}
          </Button>
        </Stack>
      </Paper>

      {error ? <Alert severity="error">{error}</Alert> : null}
      {report ? <CommissionTable report={report} /> : null}
    </Stack>
  )
}
