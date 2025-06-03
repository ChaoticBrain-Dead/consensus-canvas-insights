
import { useState } from "react";
import { Search, Filter, BarChart3, Zap, Shield, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConsensusMechanismCard } from "@/components/ConsensusMechanismCard";
import { ComparisonChart } from "@/components/ComparisonChart";
import { ComparisonTable } from "@/components/ComparisonTable";
import { consensusMechanisms } from "@/data/consensusMechanisms";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeView, setActiveView] = useState("cards");

  const filteredMechanisms = consensusMechanisms.filter((mechanism) => {
    const matchesSearch = mechanism.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mechanism.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || mechanism.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(consensusMechanisms.map(m => m.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Consensus Mechanisms
              </h1>
              <p className="text-slate-400 mt-2">
                Explore and compare blockchain consensus algorithms
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 lg:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search mechanisms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 w-full sm:w-64"
                />
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`capitalize ${
                      selectedCategory === category
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2 mt-6">
            <Button
              variant={activeView === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("cards")}
              className={activeView === "cards" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
            >
              <Globe className="h-4 w-4 mr-2" />
              Cards
            </Button>
            <Button
              variant={activeView === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("table")}
              className={activeView === "table" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Compare
            </Button>
            <Button
              variant={activeView === "charts" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("charts")}
              className={activeView === "charts" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
            >
              <Zap className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-slate-400 text-sm">Total Mechanisms</p>
                <p className="text-2xl font-bold text-white">{consensusMechanisms.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
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
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
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
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
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
            <Search className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No mechanisms found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
