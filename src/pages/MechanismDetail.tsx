
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Shield, Clock, Users, TrendingUp, DollarSign, Cpu, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { consensusMechanisms } from "@/data/consensusMechanisms";

const MechanismDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const mechanism = consensusMechanisms.find(m => m.id === id);

  if (!mechanism) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Mechanism Not Found</h2>
          <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-purple-600 to-cyan-600">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const formatTPS = (tps: number) => {
    if (tps >= 1000000) return `${(tps / 1000000).toFixed(1)}M`;
    if (tps >= 1000) return `${(tps / 1000).toFixed(1)}K`;
    return tps.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Space Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-purple-500/50 text-purple-300 hover:bg-purple-900/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className={`text-3xl p-3 rounded-lg bg-gradient-to-r ${mechanism.color} shadow-lg`}>
                {mechanism.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {mechanism.name}
                </h1>
                <Badge variant="outline" className="mt-1 capitalize border-purple-500/50 text-purple-300">
                  {mechanism.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative">
        {/* Overview */}
        <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 text-lg leading-relaxed">{mechanism.description}</p>
          </CardContent>
        </Card>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-slate-400 text-sm">Transaction Speed</p>
                  <p className="text-2xl font-bold text-white">{formatTPS(mechanism.transactionSpeed)} TPS</p>
                </div>
              </div>
              <Progress value={(Math.log10(mechanism.transactionSpeed) / 6) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-8 w-8 text-yellow-400" />
                <div>
                  <p className="text-slate-400 text-sm">Energy Efficiency</p>
                  <p className="text-2xl font-bold text-white">{mechanism.energyEfficiency}/10</p>
                </div>
              </div>
              <Progress value={mechanism.energyEfficiency * 10} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-slate-400 text-sm">Security Level</p>
                  <p className="text-2xl font-bold text-white">{mechanism.security}/10</p>
                </div>
              </div>
              <Progress value={mechanism.security * 10} className="h-2" />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-slate-400 text-sm">Decentralization</p>
                  <p className="text-2xl font-bold text-white">{mechanism.decentralization}/10</p>
                </div>
              </div>
              <Progress value={mechanism.decentralization * 10} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Advantages */}
          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Advantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mechanism.pros.map((pro, index) => (
                  <li key={index} className="text-slate-300 flex items-start">
                    <span className="text-green-400 mr-3 text-lg">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Disadvantages */}
          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disadvantages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mechanism.cons.map((con, index) => (
                  <li key={index} className="text-slate-300 flex items-start">
                    <span className="text-red-400 mr-3 text-lg">⚠</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Requirements */}
          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Technical Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mechanism.technicalRequirements.map((req, index) => (
                  <Badge key={index} variant="outline" className="border-cyan-500/50 text-cyan-300 px-3 py-1">
                    {req}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Economic Model */}
          <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Economic Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">{mechanism.economicModel}</p>
            </CardContent>
          </Card>
        </div>

        {/* Real-world Examples */}
        <Card className="bg-slate-900/60 backdrop-blur-sm border-purple-500/30 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Real-world Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mechanism.examples.map((example, index) => (
                <div key={index} className="bg-slate-950/50 rounded-lg p-4 border border-purple-500/20 text-center">
                  <p className="text-white font-medium">{example}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MechanismDetail;
