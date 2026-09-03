import AddIcon from '@mui/icons-material/Add'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import { getApiErrorMessage } from '../../../services/api'
import type { Sale } from '../../../types/api'
import { SaleFormDialog } from '../components/SaleFormDialog'
import { SalesTable } from '../components/SalesTable'
import { useSales } from '../hooks/useSales'

export function SalesPage() {
  const {
    sales,
    customers,
    sellers,
    products,
    loading,
    error,
    loadData,
    saveSale,
    removeSale,
  } = useSales()
  const [formOpen, setFormOpen] = useState(false)
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null)
  const [feedback, setFeedback] = useState('')

  const openNewSale = () => {
    setSelectedSale(null)
    setFormOpen(true)
  }

  const openEditSale = (sale: Sale) => {
    setSelectedSale(sale)
    setFormOpen(true)
  }

  const handleDelete = async (sale: Sale) => {
    if (!window.confirm(`Excluir a venda ${sale.invoice_number}?`)) return

    try {
      await removeSale(sale.id)
      setFeedback('Venda excluída.')
    } catch (requestError) {
      setFeedback(getApiErrorMessage(requestError))
    }
  }

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box>
          <Typography variant="h4">Vendas</Typography>
          <Typography color="text.secondary">
            Consulte e registre as vendas da papelaria.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openNewSale}
        >
          Nova venda
        </Button>
      </Stack>

      {error ? (
        <Alert
          severity="error"
          action={<Button onClick={() => loadData()}>Tentar novamente</Button>}
        >
          {error}
        </Alert>
      ) : null}

      {loading ? (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <SalesTable
          sales={sales}
          onEdit={openEditSale}
          onDelete={handleDelete}
        />
      )}

      {formOpen ? (
        <SaleFormDialog
          sale={selectedSale}
          customers={customers}
          sellers={sellers}
          products={products}
          onClose={() => setFormOpen(false)}
          onSave={async (saleId, payload) => {
            await saveSale(saleId, payload)
            setFeedback(saleId === null ? 'Venda criada.' : 'Venda atualizada.')
          }}
        />
      ) : null}

      <Snackbar
        open={Boolean(feedback)}
        autoHideDuration={3000}
        message={feedback}
        onClose={() => setFeedback('')}
      />
    </Stack>
  )
}
