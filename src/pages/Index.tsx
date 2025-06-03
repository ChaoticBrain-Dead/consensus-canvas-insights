
import { useState } from "react";
import { Filter, BarChart3, Zap, Shield, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsensusMechanismCard } from "@/components/ConsensusMechanismCard";
import { ComparisonChart } from "@/components/ComparisonChart";
import { ComparisonTable } from "@/components/ComparisonTable";
import { consensusMechanisms } from "@/data/consensusMechanisms";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeView, setActiveView] = useState("cards");

  const filteredMechanisms = consensusMechanisms.filter((mechanism) => {
    const matchesCategory = selectedCategory === "all" || mechanism.category === selectedCategory;
    return matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(consensusMechanisms.map(m => m.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Space Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Rocket className="h-8 w-8 text-cyan-400" />
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Consensus Universe
                </h1>
              </div>
              <p className="text-slate-300 text-lg">
                Explore the galaxy of blockchain consensus mechanisms
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 border-0 text-white"
                        : "border-purple-500/50 text-purple-300 hover:bg-purple-900/50 hover:border-purple-400"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2 mt-6 justify-center lg:justify-start">
            <Button
              variant={activeView === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("cards")}
              className={activeView === "cards" ? "bg-gradient-to-r from-purple-600 to-cyan-600 border-0" : "border-purple-500/50 text-purple-300 hover:bg-purple-900/50"}
            >
              <Globe className="h-4 w-4 mr-2" />
              Mechanisms
            </Button>
            <Button
              variant={activeView === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("table")}
              className={activeView === "table" ? "bg-gradient-to-r from-purple-600 to-cyan-600 border-0" : "border-purple-500/50 text-purple-300 hover:bg-purple-900/50"}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare
            </Button>
            <Button
              variant={activeView === "charts" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("charts")}
              className={activeView === "charts" ? "bg-gradient-to-r from-purple-600 to-cyan-600 border-0" : "border-purple-500/50 text-purple-300 hover:bg-purple-900/50"}
            >
              <Zap className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-cyan-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Mechanisms</p>
                <p className="text-2xl font-bold text-white">{consensusMechanisms.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-slate-400 text-sm">Low Energy</p>
                <p className="text-2xl font-bold text-white">
                  {consensusMechanisms.filter(m => m.energyEfficiency >= 8).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-400" />
              <div>
                <p className="text-slate-400 text-sm">High TPS</p>
                <p className="text-2xl font-bold text-white">
                  {consensusMechanisms.filter(m => m.transactionSpeed >= 50000).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 hover:border-orange-400/50 transition-all duration-300">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-orange-400" />
              <div>
                <p className="text-slate-400 text-sm">Categories</p>
                <p className="text-2xl font-bold text-white">{categories.length - 1}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Views */}
        {activeView === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMechanisms.map((mechanism) => (
              <ConsensusMechanismCard key={mechanism.id} mechanism={mechanism} />
            ))}
          </div>
        )}

        {activeView === "table" && (
          <ComparisonTable mechanisms={filteredMechanisms} />
        )}

        {activeView === "charts" && (
          <ComparisonChart mechanisms={filteredMechanisms} />
        )}

        {filteredMechanisms.length === 0 && (
          <div className="text-center py-12">
            <Rocket className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No mechanisms found</h3>
            <p className="text-slate-500">Try adjusting your filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
