"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, Bell, Package2 } from "lucide-react"

export default function OtcHeader() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnectWallet = () => {
    setWalletConnected(true)
    setWalletAddress("0x1234...abcd")
  }

  return (
    <header className="bg-brand-secondary/70 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-brand-muted/30">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package2 className="h-8 w-8 text-brand-accent" />
          <h1 className="text-2xl font-bold font-serif text-brand-text">Majestic Desk</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-textNeutral hover:bg-brand-muted/50 hover:text-brand-text"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          {walletConnected ? (
            <div className="flex items-center gap-2 bg-brand-muted/50 border border-brand-primary/50 px-3 py-2 rounded-md">
              <Wallet className="h-5 w-5 text-brand-accent" />
              <span className="text-sm font-mono text-brand-text">{walletAddress}</span>
            </div>
          ) : (
            <Button
              onClick={handleConnectWallet}
              className="bg-brand-accent hover:bg-opacity-80 text-brand-accentText font-semibold border border-brand-accent/50 shadow-md hover:shadow-lg transition-all duration-150"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
