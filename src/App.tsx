import { Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from './components/templates/AppLayout'
import { CommissionsPage } from './features/commissions/pages/CommissionsPage'
import { SalesPage } from './features/sales/pages/SalesPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/sales" replace />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="commissions" element={<CommissionsPage />} />
        <Route path="*" element={<Navigate to="/sales" replace />} />
      </Route>
    </Routes>
  )
}

export default App
