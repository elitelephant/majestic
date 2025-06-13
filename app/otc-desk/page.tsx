import OtcHeader from "@/components/otc-desk/otc-header"
import OrderBook from "@/components/otc-desk/order-book"
import OrderPlacementForm from "@/components/otc-desk/order-placement-form"
import TradeHistory from "@/components/otc-desk/trade-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OtcDeskPage() {
  return (
    <div
      className="h-screen flex flex-col font-sans"
      style={{
        background: `linear-gradient(180deg, var(--brand-backgroundGradientFrom) 0%, var(--brand-backgroundGradientTo) 100%)`,
      }}
    >
      {/* No separate overlay needed if component backgrounds provide enough contrast */}
      <div className="relative z-10 flex flex-col h-screen text-brand-text">
        <OtcHeader />

        <div className="flex-1 flex items-center justify-center p-[5vh]">
          <main className="w-full h-full bg-brand-secondary/60 backdrop-blur-xl rounded-xl shadow-2xl flex flex-col overflow-hidden border border-brand-muted/30">
            <div className="flex flex-col lg:flex-row flex-1 gap-4 md:gap-6 p-3 md:p-4 lg:p-5 overflow-hidden">
              {/* Left Panel (Order Book / Trade History) */}
              <div className="lg:w-[70%] flex flex-col overflow-hidden">
                <Tabs defaultValue="order-book" className="w-full flex flex-col flex-1 overflow-hidden">
                  <TabsList className="grid w-full grid-cols-2 bg-brand-secondary/80 backdrop-blur-sm border border-brand-muted/50 rounded-md">
                    <TabsTrigger
                      value="order-book"
                      className="data-[state=active]:bg-brand-primary data-[state=active]:text-brand-text data-[state=inactive]:text-brand-textNeutral hover:text-brand-text"
                    >
                      Order Book
                    </TabsTrigger>
                    <TabsTrigger
                      value="trade-history"
                      className="data-[state=active]:bg-brand-primary data-[state=active]:text-brand-text data-[state=inactive]:text-brand-textNeutral hover:text-brand-text"
                    >
                      Trade History
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="order-book" className="mt-3 flex-1 overflow-hidden">
                    <OrderBook />
                  </TabsContent>
                  <TabsContent value="trade-history" className="mt-3 flex-1 overflow-hidden">
                    <TradeHistory />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Panel (Order Placement) */}
              <div className="lg:w-[30%] flex flex-col overflow-hidden">
                <OrderPlacementForm />
              </div>
            </div>
          </main>
        </div>

        <footer className="text-center p-3 text-xs text-brand-textNeutral border-t border-brand-secondary/50 shrink-0">
          Majestic Desk © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
