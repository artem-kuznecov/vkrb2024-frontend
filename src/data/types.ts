import { Dispatch, SetStateAction } from 'react'
import type { LucideIcon } from 'lucide-react'

export type RouteType = {
  alias_RU: string
  alias_EN?: string
  url: string
  icon: LucideIcon
}

export interface ContextInterface {
  username?: string
  setUsername?: Dispatch<SetStateAction<string>> | any
  knowledgebases?: any
  setKnowledgebases?: Dispatch<SetStateAction<any>> | any
}