"use client"

import type React from "react"
import { useState } from "react"
import { MOCK_ASSETS } from "@/lib/otc-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Zap } from "lucide-react"

export default function OrderPlacementForm() {
  const [offerAssetId, setOfferAssetId] = useState<string | undefined>(MOCK_ASSETS[0].id)
  const [offerAmount, setOfferAmount] = useState("")
  const [receiveAssetId, setReceiveAssetId] = useState<string | undefined>(MOCK_ASSETS[1].id)
  const [receiveAmount, setReceiveAmount] = useState("")
  const [isPartiallyFillable, setIsPartiallyFillable] = useState(true)

  const mockOfferAssetBalance = 12500

  const handlePercentageClick = (percentage: number) => {
    const asset = MOCK_ASSETS.find((a) => a.id === offerAssetId)
    if (asset) {
      setOfferAmount((mockOfferAssetBalance * (percentage / 100)).toString())
    }
  }

  const selectedOfferAsset = MOCK_ASSETS.find((a) => a.id === offerAssetId)
  const selectedReceiveAsset = MOCK_ASSETS.find((a) => a.id === receiveAssetId)

  const effectivePrice =
    Number.parseFloat(offerAmount) > 0 &&
    Number.parseFloat(receiveAmount) > 0 &&
    selectedOfferAsset &&
    selectedReceiveAsset
      ? (Number.parseFloat(offerAmount) / Number.parseFloat(receiveAmount)).toFixed(4) +
        ` ${selectedOfferAsset.symbol}/${selectedReceiveAsset.symbol}`
      : "-"

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ offerAssetId, offerAmount, receiveAssetId, receiveAmount, isPartiallyFillable })
  }

  return (
    <Card className="bg-card border border-border text-foreground h-full flex flex-col overflow-hidden shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-2xl text-foreground">Place New Order</CardTitle>
        <CardDescription className="text-muted-foreground text-base font-sans">
          Create a new peer-to-peer trade offer.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmitOrder} className="flex flex-col flex-1 overflow-hidden">
        <CardContent className="space-y-6 flex-1 overflow-y-auto py-6 px-6 text-base">
          <div className="space-y-1.5">
            <Label htmlFor="offer-amount" className="font-semibold text-xs text-foreground">
              You Offer
            </Label>
            <div className="flex gap-2">
              <Input
                id="offer-amount"
                type="number"
                placeholder="Amount"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="bg-inputBackground border-border focus:border-primary text-foreground placeholder:text-muted-foreground h-9 text-sm"
                min="0"
                step="any"
              />
              <Select value={offerAssetId} onValueChange={setOfferAssetId}>
                <SelectTrigger className="w-[120px] bg-inputBackground border-border text-foreground data-[placeholder]:text-muted-foreground focus:ring-primary h-9 text-sm">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent className="bg-secondary border-border text-foreground">
                  {MOCK_ASSETS.map((asset) => (
                    <SelectItem
                      key={asset.id}
                      value={asset.id}
                      className="hover:bg-primary/70 focus:bg-primary text-sm"
                    >
                      <div className="flex items-center gap-2">
                        {asset.logo} {asset.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-1">
              {[25, 50, 75, 100].map((pct) => (
                <Button
                  key={pct}
                  type="button"
                  variant="outline"
                  onClick={() => handlePercentageClick(pct)}
                  className="flex-1 text-xs bg-muted border border-border text-muted-foreground hover:bg-muted/70 hover:text-foreground h-8 rounded-md"
                >
                  {pct}%
                </Button>
              ))}
            </div>
            {selectedOfferAsset && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Balance: {mockOfferAssetBalance.toLocaleString()} {selectedOfferAsset.symbol}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="receive-amount" className="font-semibold text-xs text-foreground">
              You Receive
            </Label>
            <div className="flex gap-2">
              <Input
                id="receive-amount"
                type="number"
                placeholder="Amount"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className="bg-inputBackground border-border focus:border-primary text-foreground placeholder:text-muted-foreground h-9 text-sm"
                min="0"
                step="any"
              />
              <Select value={receiveAssetId} onValueChange={setReceiveAssetId}>
                <SelectTrigger className="w-[120px] bg-inputBackground border-border text-foreground data-[placeholder]:text-muted-foreground focus:ring-primary h-9 text-sm">
                  <SelectValue placeholder="Asset" />
                </SelectTrigger>
                <SelectContent className="bg-secondary border-border text-foreground">
                  {MOCK_ASSETS.map((asset) => (
                    <SelectItem
                      key={asset.id}
                      value={asset.id}
                      className="hover:bg-primary/70 focus:bg-primary text-sm"
                    >
                      <div className="flex items-center gap-2">
                        {asset.logo} {asset.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Label htmlFor="partially-fillable-form" className="flex items-center gap-1.5 text-xs text-foreground">
              Partially Fillable
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger type="button" onClick={(e) => e.preventDefault()}>
                    <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary text-foreground border-border max-w-xs text-xs">
                    Allows others to fill parts of your order incrementally. Recommended for larger orders.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Switch
              id="partially-fillable-form"
              checked={isPartiallyFillable}
              onCheckedChange={setIsPartiallyFillable}
              className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted"
            />
          </div>

          <div className="border-t border-border/50 pt-2.5 space-y-1.5">
            <h4 className="text-xs font-semibold text-muted-foreground">Preview</h4>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Effective Price:</span>
              <span className="font-mono text-foreground">{effectivePrice}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Estimated Gas:</span>
              <span className="font-mono text-foreground">~0.005 ETH</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-6 pb-6 px-6">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 text-base shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Zap className="mr-2 h-5 w-5" />
            Place Order
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
