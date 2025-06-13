"use client"

import type { Order } from "@/lib/otc-types"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, MinusCircle, Tag } from "lucide-react"

interface OrderRowProps {
  order: Order
  onFillOrder: (orderId: string, amountPercent?: number) => void
}

export default function OrderRow({ order, onFillOrder }: OrderRowProps) {
  const deviationColor =
    order.marketDeviationStatus === "favorable"
      ? "text-brand-accent"
      : order.marketDeviationStatus === "unfavorable"
        ? "text-brand-danger"
        : "text-brand-textNeutral"

  const DeviationIcon =
    order.marketDeviationStatus === "favorable"
      ? TrendingUp
      : order.marketDeviationStatus === "unfavorable"
        ? TrendingDown
        : MinusCircle

  const effectivePrice = order.offeredAmount / order.desiredAmount

  return (
    <TableRow className="border-b border-brand-muted/30 hover:bg-brand-primary/20 text-xs">
      <TableCell className="font-mono py-2.5">
        <div className="flex items-center gap-1.5">
          {order.offeredAsset.logo && (
            <div className="w-4 h-4 flex items-center justify-center text-brand-text">{order.offeredAsset.logo}</div>
          )}
          <div>
            <div className="text-brand-text font-bold">
              {order.offeredAmount.toLocaleString()} {order.offeredAsset.symbol}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="font-mono py-2.5">
        <div className="flex items-center gap-1.5">
          {order.desiredAsset.logo && (
            <div className="w-4 h-4 flex items-center justify-center text-brand-text">{order.desiredAsset.logo}</div>
          )}
          <span className="text-brand-text font-bold">
            {order.desiredAmount.toLocaleString()} {order.desiredAsset.symbol}
          </span>
        </div>
      </TableCell>
      <TableCell className="font-mono py-2.5">
        <div className="flex items-center gap-1">
          <DeviationIcon className={cn("w-3.5 h-3.5", deviationColor)} />
          <span className={deviationColor}>
            {effectivePrice.toFixed(4)} {order.offeredAsset.symbol}/{order.desiredAsset.symbol}
          </span>
        </div>
        <div className="text-[10px] text-brand-textNeutral mt-0.5 ml-4">vs Market</div>
      </TableCell>
      <TableCell className="py-2.5">
        <div className="flex items-center gap-1.5">
          <Progress
            value={order.progressPercent}
            className="w-[60px] h-1.5 [&>div]:bg-brand-accent bg-brand-muted/50"
          />
          <span className="text-xs font-mono text-brand-textNeutral">{order.progressPercent}%</span>
        </div>
      </TableCell>
      <TableCell className="py-2.5 text-right">
        <Button
          size="sm"
          className="bg-brand-accent hover:bg-opacity-80 text-brand-accentText font-semibold h-7 px-2 text-xs"
          onClick={() => onFillOrder(order.id)}
        >
          Fill Order
        </Button>
      </TableCell>
    </TableRow>
  )
}
