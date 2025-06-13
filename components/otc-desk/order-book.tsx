"use client"

import { TableCell } from "@/components/ui/table"
import { useState, useMemo } from "react"
import { type Order, MOCK_ASSETS } from "@/lib/otc-types"
import OrderRow from "./order-row"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ListFilter } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    offeredAsset: MOCK_ASSETS[0],
    offeredAmount: 10000,
    userOfferedAssetBalance: 12500,
    desiredAsset: MOCK_ASSETS[1],
    desiredAmount: 95,
    effectivePrice: 0.95,
    marketDeviationStatus: "favorable",
    progressPercent: 0,
    isPartiallyFillable: true,
    isHighDemand: true,
    timestamp: Date.now() - 100000,
  },
  {
    id: "2",
    offeredAsset: MOCK_ASSETS[1],
    offeredAmount: 50,
    userOfferedAssetBalance: 200,
    desiredAsset: MOCK_ASSETS[0],
    desiredAmount: 5200,
    effectivePrice: 1.04,
    marketDeviationStatus: "unfavorable",
    progressPercent: 25,
    isPartiallyFillable: true,
    isHighDemand: false,
    timestamp: Date.now() - 200000,
  },
  {
    id: "3",
    offeredAsset: MOCK_ASSETS[2],
    offeredAmount: 10,
    userOfferedAssetBalance: 15,
    desiredAsset: MOCK_ASSETS[3],
    desiredAmount: 0.5,
    effectivePrice: 1.0,
    marketDeviationStatus: "neutral",
    progressPercent: 75,
    isPartiallyFillable: false,
    isHighDemand: false,
    timestamp: Date.now() - 50000,
  },
  {
    id: "4",
    offeredAsset: MOCK_ASSETS[0],
    offeredAmount: 25000,
    userOfferedAssetBalance: 50000,
    desiredAsset: MOCK_ASSETS[2], // ETH
    desiredAmount: 10,
    effectivePrice: 1.0, // Assuming 2500 USDC per ETH
    marketDeviationStatus: "neutral",
    progressPercent: 10,
    isPartiallyFillable: true,
    isHighDemand: false,
    timestamp: Date.now() - 300000,
  },
  {
    id: "5",
    offeredAsset: MOCK_ASSETS[3], // WBTC
    offeredAmount: 0.5,
    userOfferedAssetBalance: 1,
    desiredAsset: MOCK_ASSETS[0], // USDC
    desiredAmount: 30000,
    effectivePrice: 0.98, // Assuming market is 61224 USDC per WBTC
    marketDeviationStatus: "favorable",
    progressPercent: 50,
    isPartiallyFillable: true,
    isHighDemand: true,
    timestamp: Date.now() - 400000,
  },
]

export default function OrderBook() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS) // MOCK_ORDERS defined as before
  const [searchTerm, setSearchTerm] = useState("")
  const [showPartiallyFillableOnly, setShowPartiallyFillableOnly] = useState(true)
  const [sortBy, setSortBy] = useState("recency")

  const handleFillOrder = (orderId: string, amountPercent?: number) => {
    console.log(`Attempting to fill order ${orderId}` + (amountPercent ? ` for ${amountPercent}%` : ""))
    setOrders((prevOrders) =>
      prevOrders
        .map((order) =>
          order.id === orderId
            ? { ...order, progressPercent: Math.min(100, order.progressPercent + (amountPercent || 100)) }
            : order,
        )
        .filter((order) => order.progressPercent < 100),
    )
  }

  const filteredAndSortedOrders = useMemo(() => {
    let result = orders
    if (showPartiallyFillableOnly) {
      result = result.filter((order) => order.isPartiallyFillable)
    }
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase()
      result = result.filter(
        (order) =>
          order.offeredAsset.symbol.toLowerCase().includes(lowerSearchTerm) ||
          order.desiredAsset.symbol.toLowerCase().includes(lowerSearchTerm) ||
          `${order.offeredAsset.symbol}/${order.desiredAsset.symbol}`.toLowerCase().includes(lowerSearchTerm) ||
          `${order.desiredAsset.symbol}/${order.offeredAsset.symbol}`.toLowerCase().includes(lowerSearchTerm),
      )
    }
    return result.sort((a, b) => {
      switch (sortBy) {
        case "price_deviation":
          const deviationOrder = { favorable: 0, neutral: 1, unfavorable: 2 }
          return deviationOrder[a.marketDeviationStatus] - deviationOrder[b.marketDeviationStatus]
        case "size":
          return (
            b.offeredAmount * (MOCK_ASSETS.find((as) => as.id === b.offeredAsset.id)?.id === "usdc" ? 1 : 2500) -
            a.offeredAmount * (MOCK_ASSETS.find((as) => as.id === a.offeredAsset.id)?.id === "usdc" ? 1 : 2500)
          )
        case "recency":
        default:
          return b.timestamp - a.timestamp
      }
    })
  }, [orders, searchTerm, showPartiallyFillableOnly, sortBy])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Accordion
        type="single"
        collapsible
        className="lg:hidden bg-brand-secondary/80 backdrop-blur-md rounded-md mb-3 border border-brand-muted/30"
      >
        <AccordionItem value="filters" className="border-b-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline text-sm text-brand-text">
            <div className="flex items-center gap-2">
              <ListFilter className="w-4 h-4" /> Filters & Sort
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 border-t border-brand-muted/30">{renderFilters()}</AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="hidden lg:block bg-brand-secondary/80 backdrop-blur-md p-3 rounded-md mb-3 border border-brand-muted/30">
        {renderFilters()}
      </div>

      <div className="flex-1 bg-brand-secondary/80 backdrop-blur-md rounded-md overflow-y-auto border border-brand-muted/30">
        <Table>
          <TableHeader className="sticky top-0 bg-brand-secondary/90 backdrop-blur-lg z-10">
            <TableRow className="border-b border-brand-muted/50">
              <TableHead className="text-brand-textNeutral font-semibold py-2.5 text-xs">Offered</TableHead>
              <TableHead className="text-brand-textNeutral font-semibold text-xs">Desired</TableHead>
              <TableHead className="text-brand-textNeutral font-semibold text-xs">Effective Price</TableHead>
              <TableHead className="text-brand-textNeutral font-semibold text-xs">Progress</TableHead>
              <TableHead className="text-right text-brand-textNeutral font-semibold text-xs">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedOrders.length > 0 ? (
              filteredAndSortedOrders.map((order) => (
                <OrderRow key={order.id} order={order} onFillOrder={handleFillOrder} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-brand-textNeutral">
                  No orders match your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  function renderFilters() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-textNeutral" />
          <Input
            type="text"
            placeholder="Search MNT/USDC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 text-sm bg-brand-inputBackground border-brand-muted/70 focus:border-brand-primary text-brand-text placeholder:text-brand-textNeutral h-9"
          />
        </div>
        <div>
          <Label htmlFor="sort-by" className="text-xs text-brand-textNeutral mb-1 block sr-only">
            Sort By
          </Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger
              id="sort-by"
              className="text-sm bg-brand-inputBackground border-brand-muted/70 text-brand-text data-[placeholder]:text-brand-textNeutral focus:ring-brand-primary h-9"
            >
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="bg-brand-secondary border-brand-muted/70 text-brand-text">
              <SelectItem value="recency" className="hover:bg-brand-primary/70 focus:bg-brand-primary">
                Recency
              </SelectItem>
              <SelectItem value="price_deviation" className="hover:bg-brand-primary/70 focus:bg-brand-primary">
                Price Deviation
              </SelectItem>
              <SelectItem value="size" className="hover:bg-brand-primary/70 focus:bg-brand-primary">
                Order Size (Value)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2 pt-2 sm:pt-0 sm:justify-self-end lg:justify-self-start">
          <Switch
            id="partially-fillable"
            checked={showPartiallyFillableOnly}
            onCheckedChange={setShowPartiallyFillableOnly}
            className="data-[state=checked]:bg-brand-accent data-[state=unchecked]:bg-brand-muted"
          />
          <Label htmlFor="partially-fillable" className="text-sm text-brand-text">
            Partially Fillable Only
          </Label>
        </div>
      </div>
    )
  }
}
