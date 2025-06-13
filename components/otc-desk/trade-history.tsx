"use client"

import { useState } from "react"
import { type Trade, MOCK_ASSETS } from "@/lib/otc-types"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CheckCircle, XCircle, RefreshCcw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const MOCK_TRADES: Trade[] = [
  {
    id: "t1",
    offeredAsset: MOCK_ASSETS[0],
    offeredAmount: 5000,
    userOfferedAssetBalance: 0,
    desiredAsset: MOCK_ASSETS[1],
    desiredAmount: 47.5,
    effectivePrice: 0.95,
    marketDeviationStatus: "favorable",
    progressPercent: 100,
    isPartiallyFillable: true,
    isHighDemand: false,
    timestamp: Date.now() - 300000,
    filledTimestamp: Date.now() - 290000,
    status: "filled",
  },
  {
    id: "t2",
    offeredAsset: MOCK_ASSETS[2],
    offeredAmount: 2,
    userOfferedAssetBalance: 0,
    desiredAsset: MOCK_ASSETS[0],
    desiredAmount: 4000,
    effectivePrice: 1.0,
    marketDeviationStatus: "neutral",
    progressPercent: 100,
    isPartiallyFillable: false,
    isHighDemand: false,
    timestamp: Date.now() - 400000,
    filledTimestamp: Date.now() - 395000,
    status: "filled",
  },
  {
    id: "t3",
    offeredAsset: MOCK_ASSETS[1],
    offeredAmount: 100,
    userOfferedAssetBalance: 0,
    desiredAsset: MOCK_ASSETS[3],
    desiredAmount: 0.2,
    effectivePrice: 1.02,
    marketDeviationStatus: "unfavorable",
    progressPercent: 0,
    isPartiallyFillable: true,
    isHighDemand: false,
    timestamp: Date.now() - 500000,
    filledTimestamp: Date.now() - 450000,
    status: "canceled",
  },
]

export default function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>(MOCK_TRADES) // MOCK_TRADES defined as before

  const handleExportCSV = () => {
    console.log("Exporting trades to CSV...")
    const headers = [
      "ID",
      "Offered Asset",
      "Offered Amount",
      "Desired Asset",
      "Desired Amount",
      "Effective Price",
      "Status",
      "Filled Date",
    ]
    const rows = trades.map((trade) =>
      [
        trade.id,
        trade.offeredAsset.symbol,
        trade.offeredAmount,
        trade.desiredAsset.symbol,
        trade.desiredAmount,
        (trade.offeredAmount / trade.desiredAmount).toFixed(4) +
          ` ${trade.offeredAsset.symbol}/${trade.desiredAsset.symbol}`,
        trade.status,
        new Date(trade.filledTimestamp).toLocaleString(),
      ].join(","),
    )
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "trade_history.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const StatusIcon = ({ status }: { status: Trade["status"] }) => {
    if (status === "filled") return <CheckCircle className="w-3.5 h-3.5 text-brand-accent" />
    if (status === "canceled") return <XCircle className="w-3.5 h-3.5 text-brand-danger" />
    if (status === "partially-filled") return <RefreshCcw className="w-3.5 h-3.5 text-yellow-400" />
    return null
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-end mb-3">
        <Button
          variant="outline"
          onClick={handleExportCSV}
          className="border-brand-accent text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent h-9 text-sm bg-brand-accent/5"
        >
          <Download className="mr-1.5 h-4 w-4" />
          Export CSV
        </Button>
      </div>
      <div className="flex-1 bg-brand-secondary/80 backdrop-blur-md rounded-md overflow-y-auto border border-brand-muted/30">
        <Table>
          <TableHeader className="sticky top-0 bg-brand-secondary/90 backdrop-blur-lg z-10">
            <TableRow className="border-b border-brand-muted/50">
              <TableHead className="text-brand-textNeutral font-semibold py-2.5 text-xs">Trade Details</TableHead>
              <TableHead className="text-brand-textNeutral font-semibold text-xs">Effective Price</TableHead>
              <TableHead className="text-brand-textNeutral font-semibold text-xs">Status</TableHead>
              <TableHead className="text-right text-brand-textNeutral font-semibold text-xs">
                Date Filled/Canceled
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.length > 0 ? (
              trades.map((trade) => (
                <TableRow key={trade.id} className="border-b border-brand-muted/30 hover:bg-brand-primary/20 text-xs">
                  <TableCell className="font-mono py-2.5">
                    <div className="text-brand-text">
                      Offered: {trade.offeredAmount.toLocaleString()} {trade.offeredAsset.symbol}
                    </div>
                    <div className="text-brand-text">
                      Desired: {trade.desiredAmount.toLocaleString()} {trade.desiredAsset.symbol}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono py-2.5 text-brand-text">
                    {(trade.offeredAmount / trade.desiredAmount).toFixed(4)} {trade.offeredAsset.symbol}/
                    {trade.desiredAsset.symbol}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize text-xs font-normal py-0.5 px-1.5",
                        trade.status === "filled" && "bg-brand-accent/10 text-brand-accent border-brand-accent/50",
                        trade.status === "canceled" && "bg-brand-danger/10 text-brand-danger border-brand-danger/50",
                        trade.status === "partially-filled" && "bg-yellow-400/10 text-yellow-400 border-yellow-400/50",
                      )}
                    >
                      <StatusIcon status={trade.status} /> <span className="ml-1">{trade.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-brand-textNeutral py-2.5">
                    {new Date(trade.filledTimestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-brand-textNeutral">
                  No trade history available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
