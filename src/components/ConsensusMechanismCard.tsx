
import { useState } from "react";
import { ChevronDown, ChevronUp, Zap, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ConsensusMechanism } from "@/data/consensusMechanisms";

interface Props {
  mechanism: ConsensusMechanism;
}

export const ConsensusMechanismCard = ({ mechanism }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTPS = (tps: number) => {
    if (tps >= 1000000) return `${(tps / 1000000).toFixed(1)}M`;
    if (tps >= 1000) return `${(tps / 1000).toFixed(1)}K`;
    return tps.toString();
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`text-2xl p-3 rounded-lg bg-gradient-to-r ${mechanism.color} shadow-lg`}>
              {mechanism.icon}
            </div>
            <div>
              <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                {mechanism.name}
              </CardTitle>
              <Badge variant="outline" className="mt-1 capitalize border-slate-600 text-slate-300">
                {mechanism.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm leading-relaxed mt-3">
          {mechanism.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-green-400" />
              <span className="text-xs text-slate-400">TPS</span>
            </div>
            <p className="text-lg font-bold text-white">{formatTPS(mechanism.transactionSpeed)}</p>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-slate-400">Efficiency</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={mechanism.energyEfficiency * 10} className="flex-1 h-2" />
              <span className="text-sm text-white">{mechanism.energyEfficiency}/10</span>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-slate-400">Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={mechanism.security * 10} className="flex-1 h-2" />
              <span className="text-sm text-white">{mechanism.security}/10</span>
            </div>
          </div>
          
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400">Decentralization</span>
            </div>
            <div className="flex items-center gap-2">
              <Progress value={mechanism.decentralization * 10} className="flex-1 h-2" />
              <span className="text-sm text-white">{mechanism.decentralization}/10</span>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div>
          <h4 className="text-sm font-medium text-slate-300 mb-2">Examples</h4>
          <div className="flex flex-wrap gap-2">
            {mechanism.examples.slice(0, 3).map((example) => (
              <Badge key={example} variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600">
                {example}
              </Badge>
            ))}
            {mechanism.examples.length > 3 && (
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                +{mechanism.examples.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-slate-400 hover:text-white hover:bg-slate-700/50"
        >
          {isExpanded ? "Show Less" : "Show Details"}
          {isExpanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </Button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 animate-fade-in border-t border-slate-700/50 pt-4">
            <div>
              <h4 className="text-sm font-medium text-green-400 mb-2">Advantages</h4>
              <ul className="space-y-1">
                {mechanism.pros.map((pro, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-red-400 mb-2">Disadvantages</h4>
              <ul className="space-y-1">
                {mechanism.cons.map((con, index) => (
                  <li key={index} className="text-sm text-slate-300 flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-2">Technical Requirements</h4>
              <div className="flex flex-wrap gap-2">
                {mechanism.technicalRequirements.map((req, index) => (
                  <Badge key={index} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    {req}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-purple-400 mb-2">Economic Model</h4>
              <p className="text-sm text-slate-300">{mechanism.economicModel}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
