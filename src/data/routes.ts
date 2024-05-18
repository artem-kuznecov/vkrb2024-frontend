import type { RouteType } from './types'
import { LayoutDashboard } from 'lucide-react'
import { Calculator } from 'lucide-react'

export const routes: RouteType[] = [
  {
    alias_RU: 'дашборд',
    alias_EN: 'dashboard',
    url: '/',
    icon: LayoutDashboard
  },
  {
    alias_RU: 'калькулятор',
    alias_EN: 'calculator',
    url: '/',
    icon: Calculator
  }
]