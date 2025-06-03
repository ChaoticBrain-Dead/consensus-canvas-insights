
import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConsensusMechanism } from "@/data/consensusMechanisms";

interface Props {
  mechanisms: ConsensusMechanism[];
}

type SortField = keyof ConsensusMechanism;
type SortDirection = "asc" | "desc" | null;

export const ComparisonTable = ({ mechanisms }: Props) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
      if (sortDirection === "desc") setSortField(null);
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedMechanisms = [...mechanisms].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const formatTPS = (tps: number) => {
    if (tps >= 1000000) return `${(tps / 1000000).toFixed(1)}M`;
    if (tps >= 1000) return `${(tps / 1000).toFixed(1)}K`;
    return tps.toString();
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />;
    if (sortDirection === "desc") return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white">Detailed Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50">
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Mechanism
                    <SortIcon field="name" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort("transactionSpeed")}
                >
                  <div className="flex items-center gap-2">
                    TPS
                    <SortIcon field="transactionSpeed" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort("energyEfficiency")}
                >
                  <div className="flex items-center gap-2">
                    Energy Efficiency
                    <SortIcon field="energyEfficiency" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort("security")}
                >
                  <div className="flex items-center gap-2">
                    Security
                    <SortIcon field="security" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-slate-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort("decentralization")}
                >
                  <div className="flex items-center gap-2">
                    Decentralization
                    <SortIcon field="decentralization" />
                  </div>
                </TableHead>
                <TableHead className="text-slate-300">Category</TableHead>
                <TableHead className="text-slate-300">Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMechanisms.map((mechanism) => (
                <TableRow key={mechanism.id} className="border-slate-700/50 hover:bg-slate-700/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`text-lg p-2 rounded-lg bg-gradient-to-r ${mechanism.color}`}>
                        {mechanism.icon}
                      </div>
                      <div>
                        <p className="font-medium text-white">{mechanism.name}</p>
                        <p className="text-sm text-slate-400">{mechanism.description.slice(0, 50)}...</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-white">{formatTPS(mechanism.transactionSpeed)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={mechanism.energyEfficiency * 10} className="w-16 h-2" />
                      <span className="text-sm text-white">{mechanism.energyEfficiency}/10</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={mechanism.security * 10} className="w-16 h-2" />
                      <span className="text-sm text-white">{mechanism.security}/10</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={mechanism.decentralization * 10} className="w-16 h-2" />
                      <span className="text-sm text-white">{mechanism.decentralization}/10</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize border-slate-600 text-slate-300">
                      {mechanism.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-48">
                      {mechanism.examples.slice(0, 2).map((example) => (
                        <Badge key={example} variant="secondary" className="bg-slate-700/50 text-slate-300 text-xs">
                          {example}
                        </Badge>
                      ))}
                      {mechanism.examples.length > 2 && (
                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                          +{mechanism.examples.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
