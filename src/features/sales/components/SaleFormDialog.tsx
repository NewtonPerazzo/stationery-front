import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material'
import { useState, type FormEvent } from 'react'

import { getApiErrorMessage } from '../../../services/api'
import type {
  Customer,
  Product,
  Sale,
  SalePayload,
  Seller,
} from '../../../types/api'

interface SaleFormDialogProps {
  sale: Sale | null
  customers: Customer[]
  sellers: Seller[]
  products: Product[]
  onClose: () => void
  onSave: (saleId: number | null, payload: SalePayload) => Promise<void>
}

interface FormItem {
  productId: string
  quantity: number
}

const emptyItem = (): FormItem => ({ productId: '', quantity: 1 })

function toLocalDateTime(value: string): string {
  const date = new Date(value)
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return localDate.toISOString().slice(0, 16)
}

export function SaleFormDialog(props: SaleFormDialogProps) {
  const { sale, customers, sellers, products, onClose, onSave } = props
  const [invoiceNumber, setInvoiceNumber] = useState(
    sale?.invoice_number ?? '',
  )
  const [soldAt, setSoldAt] = useState(
    sale ? toLocalDateTime(sale.sold_at) : '',
  )
  const [customerId, setCustomerId] = useState(
    sale ? String(sale.customer.id) : '',
  )
  const [sellerId, setSellerId] = useState(
    sale ? String(sale.seller.id) : '',
  )
  const [items, setItems] = useState<FormItem[]>(() =>
    sale
      ? sale.items.map((item) => ({
          productId: String(item.product.id),
          quantity: item.quantity,
        }))
      : [emptyItem()],
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError('')

    try {
      await onSave(sale?.id ?? null, {
        invoice_number: invoiceNumber,
        sold_at: soldAt,
        customer_id: Number(customerId),
        seller_id: Number(sellerId),
        items: items.map((item) => ({
          product_id: Number(item.productId),
          quantity: item.quantity,
        })),
      })
      onClose()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{sale ? 'Editar venda' : 'Nova venda'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Nota fiscal"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
              required
            />
            <TextField
              label="Data e hora"
              type="datetime-local"
              value={soldAt}
              onChange={(event) => setSoldAt(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              required
            />
            <TextField
              select
              label="Cliente"
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              required
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Vendedor"
              value={sellerId}
              onChange={(event) => setSellerId(event.target.value)}
              required
            >
              {sellers.map((seller) => (
                <MenuItem key={seller.id} value={seller.id}>
                  {seller.name}
                </MenuItem>
              ))}
            </TextField>

            {items.map((item, index) => (
              <Stack key={index} direction="row" spacing={1}>
                <TextField
                  select
                  fullWidth
                  label={`Produto ${index + 1}`}
                  value={item.productId}
                  onChange={(event) =>
                    setItems((current) =>
                      current.map((currentItem, itemIndex) =>
                        itemIndex === index
                          ? { ...currentItem, productId: event.target.value }
                          : currentItem,
                      ),
                    )
                  }
                  required
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.code} — {product.description}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Quantidade"
                  type="number"
                  value={item.quantity}
                  onChange={(event) =>
                    setItems((current) =>
                      current.map((currentItem, itemIndex) =>
                        itemIndex === index
                          ? {
                              ...currentItem,
                              quantity: Number(event.target.value),
                            }
                          : currentItem,
                      ),
                    )
                  }
                  slotProps={{ htmlInput: { min: 1 } }}
                  required
                />
                <IconButton
                  aria-label={`Remover produto ${index + 1}`}
                  disabled={items.length === 1}
                  onClick={() =>
                    setItems((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}

            <Button
              startIcon={<AddIcon />}
              onClick={() => setItems((current) => [...current, emptyItem()])}
            >
              Adicionar produto
            </Button>

            {error ? <Alert severity="error">{error}</Alert> : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
