import type { JSX } from "react"
export interface Asset {
  id: string
  symbol: string
  name: string
  logo?: JSX.Element // For icons like Lucide Coin icon
}

export type MarketDeviationStatus = "favorable" | "unfavorable" | "neutral"

export interface Order {
  id: string
  offeredAsset: Asset
  offeredAmount: number
  userOfferedAssetBalance: number
  desiredAsset: Asset
  desiredAmount: number
  effectivePrice: number // Calculated: desiredAmount / offeredAmount for buy, offeredAmount / desiredAmount for sell (or vice-versa depending on base currency)
  marketDeviationStatus: MarketDeviationStatus
  progressPercent: number // 0-100
  isPartiallyFillable: boolean
  timestamp: number
}

export interface Trade extends Order {
  filledTimestamp: number
  status: "filled" | "partially-filled" | "canceled"
}

// Mock Assets - using Lucide icons as placeholders
import { Bitcoin, CircleDollarSign, Package } from "lucide-react"

export const MOCK_ASSETS: Asset[] = [
  { id: "usdc", symbol: "USDC", name: "USD Coin", logo: undefined },
  { id: "mnt", symbol: "MNT", name: "Mantle", logo: undefined },
  { id: "eth", symbol: "ETH", name: "Ethereum", logo: undefined },
  { id: "wbtc", symbol: "WBTC", name: "Wrapped Bitcoin", logo: undefined },
]
