import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import type { Sale } from '../../../types/api'

interface SalesTableProps {
  sales: Sale[]
  onEdit: (sale: Sale) => void
  onDelete: (sale: Sale) => void
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

export function SalesTable({ sales, onEdit, onDelete }: SalesTableProps) {
  if (sales.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Nenhuma venda cadastrada.
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data/hora</TableCell>
            <TableCell>Nota fiscal</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Vendedor</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id} hover>
              <TableCell>
                {dateFormatter.format(new Date(sale.sold_at))}
              </TableCell>
              <TableCell>{sale.invoice_number}</TableCell>
              <TableCell>{sale.customer.name}</TableCell>
              <TableCell>{sale.seller.name}</TableCell>
              <TableCell align="right">
                {currencyFormatter.format(Number(sale.total_amount))}
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Editar">
                  <IconButton onClick={() => onEdit(sale)}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton color="error" onClick={() => onDelete(sale)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
