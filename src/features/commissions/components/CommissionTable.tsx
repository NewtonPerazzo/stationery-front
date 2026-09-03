import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import type { CommissionReport } from '../../../types/api'

interface CommissionTableProps {
  report: CommissionReport
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function CommissionTable({ report }: CommissionTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vendedor</TableCell>
            <TableCell align="right">Comissão</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {report.sellers.map((seller) => (
            <TableRow key={seller.seller_id}>
              <TableCell>{seller.seller_name}</TableCell>
              <TableCell align="right">
                {currencyFormatter.format(Number(seller.commission_total))}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Typography sx={{ fontWeight: 700 }}>Total geral</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography sx={{ fontWeight: 700 }}>
                {currencyFormatter.format(Number(report.grand_total))}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
