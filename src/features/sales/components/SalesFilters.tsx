import SearchIcon from '@mui/icons-material/Search'
import { Button, MenuItem, Stack, TextField } from '@mui/material'
import type { FormEvent } from 'react'

export type SalesOrdering =
  | 'invoice_number'
  | '-total_amount'
  | 'total_amount'

interface SalesFiltersProps {
  search: string
  ordering: SalesOrdering
  onSearchChange: (value: string) => void
  onOrderingChange: (value: SalesOrdering) => void
  onSubmit: () => Promise<void>
}

export function SalesFilters(props: SalesFiltersProps) {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await props.onSubmit()
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
    >
      <TextField
        fullWidth
        label="Buscar venda"
        placeholder="Nota fiscal, cliente ou vendedor"
        value={props.search}
        onChange={(event) => props.onSearchChange(event.target.value)}
      />
      <TextField
        select
        label="Ordenar por"
        value={props.ordering}
        onChange={(event) =>
          props.onOrderingChange(event.target.value as SalesOrdering)
        }
        sx={{ minWidth: 230 }}
      >
        <MenuItem value="invoice_number">Ordem alfabética</MenuItem>
        <MenuItem value="-total_amount">Maior venda</MenuItem>
        <MenuItem value="total_amount">Menor venda</MenuItem>
      </TextField>
      <Button type="submit" variant="outlined" sx={{ px: 3, py: 1 }} startIcon={<SearchIcon />}>
        Aplicar
      </Button>
    </Stack>
  )
}
