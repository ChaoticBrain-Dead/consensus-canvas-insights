
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConsensusMechanism } from "@/data/consensusMechanisms";

interface Props {
  mechanisms: ConsensusMechanism[];
}

export const ComparisonChart = ({ mechanisms }: Props) => {
  const [activeChart, setActiveChart] = useState<"performance" | "radar" | "energy">("performance");

  const performanceData = mechanisms.map((mechanism) => ({
    name: mechanism.name.split(" ")[0], // Short name for better display
    TPS: mechanism.transactionSpeed,
    Security: mechanism.security,
    Decentralization: mechanism.decentralization,
    fullName: mechanism.name
  }));

  const radarData = mechanisms.map((mechanism) => ({
    mechanism: mechanism.name.split(" ")[0],
    Security: mechanism.security,
    Decentralization: mechanism.decentralization,
    'Energy Efficiency': mechanism.energyEfficiency,
    'Performance': Math.min(mechanism.transactionSpeed / 10000, 10), // Normalized TPS
    fullName: mechanism.name
  }));

  const energyData = mechanisms.map((mechanism) => ({
    name: mechanism.name.split(" ")[0],
    'Energy Consumption': mechanism.energyConsumption,
    'Energy Efficiency': mechanism.energyEfficiency,
    fullName: mechanism.name
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.fullName || label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
              {entry.dataKey === 'TPS' && typeof entry.value === 'number' ? 
                (entry.value >= 1000 ? ` (${(entry.value / 1000).toFixed(1)}K)` : '') : 
                (entry.dataKey !== 'TPS' ? '/10' : '')
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={activeChart === "performance" ? "default" : "outline"}
          onClick={() => setActiveChart("performance")}
          className={activeChart === "performance" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
        >
          Performance Metrics
        </Button>
        <Button
          variant={activeChart === "radar" ? "default" : "outline"}
          onClick={() => setActiveChart("radar")}
          className={activeChart === "radar" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
        >
          Overall Comparison
        </Button>
        <Button
          variant={activeChart === "energy" ? "default" : "outline"}
          onClick={() => setActiveChart("energy")}
          className={activeChart === "energy" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-600 text-slate-300 hover:bg-slate-700"}
        >
          Energy Analysis
        </Button>
      </div>

      {/* Performance Chart */}
      {activeChart === "performance" && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Security" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Decentralization" fill="#10B981" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Radar Chart */}
      {activeChart === "radar" && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Multi-Dimensional Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData.slice(0, 3)} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="mechanism" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 10]} 
                    tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {radarData.slice(0, 3).map((_, index) => (
                    <Radar
                      key={index}
                      name={radarData[index]?.fullName}
                      dataKey={radarData[index]?.mechanism}
                      stroke={index === 0 ? "#3B82F6" : index === 1 ? "#10B981" : "#8B5CF6"}
                      fill={index === 0 ? "#3B82F6" : index === 1 ? "#10B981" : "#8B5CF6"}
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Energy Chart */}
      {activeChart === "energy" && (
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Energy Consumption vs Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="Energy Consumption" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="Energy Efficiency" fill="#22C55E" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-400">Most Energy Efficient</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const mostEfficient = mechanisms.reduce((prev, current) => 
                current.energyEfficiency > prev.energyEfficiency ? current : prev
              );
              return (
                <div className="flex items-center gap-3">
                  <div className={`text-xl p-2 rounded-lg bg-gradient-to-r ${mostEfficient.color}`}>
                    {mostEfficient.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{mostEfficient.name}</p>
                    <p className="text-sm text-slate-400">{mostEfficient.energyEfficiency}/10 efficiency</p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-400">Highest Throughput</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const fastestTPS = mechanisms.reduce((prev, current) => 
                current.transactionSpeed > prev.transactionSpeed ? current : prev
              );
              return (
                <div className="flex items-center gap-3">
                  <div className={`text-xl p-2 rounded-lg bg-gradient-to-r ${fastestTPS.color}`}>
                    {fastestTPS.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{fastestTPS.name}</p>
                    <p className="text-sm text-slate-400">{fastestTPS.transactionSpeed.toLocaleString()} TPS</p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-purple-400">Most Secure</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const mostSecure = mechanisms.reduce((prev, current) => 
                current.security > prev.security ? current : prev
              );
              return (
                <div className="flex items-center gap-3">
                  <div className={`text-xl p-2 rounded-lg bg-gradient-to-r ${mostSecure.color}`}>
                    {mostSecure.icon}
                  </div>
                  <div>
                    <p className="font-medium text-white">{mostSecure.name}</p>
                    <p className="text-sm text-slate-400">{mostSecure.security}/10 security</p>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
