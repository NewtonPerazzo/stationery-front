import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'

const navigation = [
  { label: 'Vendas', path: '/sales' },
  { label: 'Comissões', path: '/commissions' },
]

export function AppLayout() {
  const location = useLocation()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <ReceiptLongOutlinedIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stationery
          </Typography>

          <Stack direction="row" spacing={1}>
            {navigation.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                variant={
                  location.pathname.startsWith(item.path)
                    ? 'outlined'
                    : 'text'
                }
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
