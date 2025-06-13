import OtcHeader from "@/components/otc-desk/otc-header"
import OrderBook from "@/components/otc-desk/order-book"
import OrderPlacementForm from "@/components/otc-desk/order-placement-form"
import TradeHistory from "@/components/otc-desk/trade-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OtcDeskPage() {
  return (
    <div
      className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-brand-backgroundGradientFrom to-brand-backgroundGradientTo"
    >
      {/* No separate overlay needed if component backgrounds provide enough contrast */}
      <div className="relative z-10 flex flex-col min-h-screen text-brand-text">
        <OtcHeader />

        <div className="flex items-start justify-center p-8 bg-background min-h-[calc(100vh-80px-40px)]">
          <main role="main" className="w-full max-w-7xl flex flex-col gap-8">
            <div className="flex flex-col lg:flex-row gap-8 w-full h-full min-h-[500px]">
              {/* Left Panel (Order Book / Trade History) */}
              <div className="lg:w-2/3 w-full flex flex-col h-full">
                <div className="bg-card rounded-xl shadow border p-6 w-full h-full flex flex-col">
                  <Tabs defaultValue="order-book" className="w-full flex flex-col">
                    <TabsList className="grid w-full grid-cols-2 bg-muted border border-border rounded-md mb-4">
                      <TabsTrigger
                        value="order-book"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground font-semibold text-base"
                      >
                        Order Book
                      </TabsTrigger>
                      <TabsTrigger
                        value="trade-history"
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground font-semibold text-base"
                      >
                        Trade History
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="order-book">
                      <OrderBook />
                    </TabsContent>
                    <TabsContent value="trade-history">
                      <TradeHistory />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Right Panel (Order Placement) */}
              <div className="lg:w-1/3 w-full flex flex-col mt-8 lg:mt-0 h-full">
                <div className="bg-card rounded-xl shadow border p-6 w-full h-full flex flex-col">
                  <OrderPlacementForm />
                </div>
              </div>
            </div>
          </main>
        </div>

        <footer role="contentinfo" className="text-center p-3 text-xs text-muted-foreground border-t border-border shrink-0">
          Majestic Desk © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
