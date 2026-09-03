import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import { useState } from 'react'

import type { SellerCommission } from '../../../types/api'

interface CommissionSellerRowProps {
  seller: SellerCommission
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function CommissionSellerRow({ seller }: CommissionSellerRowProps) {
  const [open, setOpen] = useState(false)
  const hasItems = seller.items.length > 0

  return (
    <>
      <TableRow sx={{ bgcolor: 'grey.100' }}>
        <TableCell sx={{ width: 56 }}>
          <IconButton
            aria-label={`${open ? 'Recolher' : 'Expandir'} detalhes de ${seller.seller_name}`}
            size="small"
            onClick={() => setOpen((current) => !current)}
            disabled={!hasItems}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{seller.seller_name}</TableCell>
        <TableCell align="right">
          {currencyFormatter.format(Number(seller.commission_total))}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0, bgcolor: 'common.white' }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table
              size="small"
              aria-label={`Produtos vendidos por ${seller.seller_name}`}
            >
              <TableBody>
                {seller.items.map((item) => (
                  <TableRow key={item.product_id}>
                    <TableCell sx={{ pl: 10 }}>{item.product_name}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">
                      {currencyFormatter.format(Number(item.total_amount))}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormatter.format(Number(item.commission_total))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
