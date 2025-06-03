
export interface ConsensusMechanism {
  id: string;
  name: string;
  description: string;
  category: string;
  energyConsumption: number; // 1-10 scale (10 = highest consumption)
  energyEfficiency: number; // 1-10 scale (10 = most efficient)
  transactionSpeed: number; // TPS
  decentralization: number; // 1-10 scale (10 = most decentralized)
  security: number; // 1-10 scale (10 = most secure)
  economicModel: string;
  technicalRequirements: string[];
  pros: string[];
  cons: string[];
  examples: string[];
  color: string;
  icon: string;
}

export const consensusMechanisms: ConsensusMechanism[] = [
  {
    id: "pow",
    name: "Proof of Work (PoW)",
    description: "Miners compete to solve complex mathematical puzzles to validate transactions and create new blocks.",
    category: "computational",
    energyConsumption: 10,
    energyEfficiency: 2,
    transactionSpeed: 7,
    decentralization: 9,
    security: 10,
    economicModel: "Block rewards + transaction fees",
    technicalRequirements: ["High computational power", "Specialized hardware (ASICs)", "Electricity"],
    pros: [
      "Proven security model",
      "True decentralization",
      "Immutable once confirmed",
      "No stake concentration risk"
    ],
    cons: [
      "High energy consumption",
      "Slow transaction processing",
      "Expensive to maintain",
      "Environmental concerns"
    ],
    examples: ["Bitcoin", "Ethereum (legacy)", "Litecoin", "Dogecoin"],
    color: "from-orange-500 to-red-600",
    icon: "⚡"
  },
  {
    id: "pos",
    name: "Proof of Stake (PoS)",
    description: "Validators are chosen to create new blocks based on their stake in the network.",
    category: "stake-based",
    energyConsumption: 2,
    energyEfficiency: 9,
    transactionSpeed: 10000,
    decentralization: 7,
    security: 8,
    economicModel: "Transaction fees + staking rewards",
    technicalRequirements: ["Minimum stake requirement", "Node software", "Internet connection"],
    pros: [
      "Energy efficient",
      "Fast finality",
      "Lower barriers to entry",
      "Scalable"
    ],
    cons: [
      "Rich get richer problem",
      "Potential centralization",
      "Slashing risks",
      "Nothing at stake problem"
    ],
    examples: ["Ethereum 2.0", "Cardano", "Polkadot", "Cosmos"],
    color: "from-blue-500 to-purple-600",
    icon: "🎯"
  },
  {
    id: "dpos",
    name: "Delegated Proof of Stake (DPoS)",
    description: "Token holders vote for delegates who are responsible for validating transactions and maintaining the network.",
    category: "delegated",
    energyConsumption: 1,
    energyEfficiency: 10,
    transactionSpeed: 100000,
    decentralization: 5,
    security: 7,
    economicModel: "Delegates share rewards with voters",
    technicalRequirements: ["Voting mechanism", "Delegate infrastructure", "Governance system"],
    pros: [
      "Very fast transactions",
      "Energy efficient",
      "Democratic governance",
      "High throughput"
    ],
    cons: [
      "Potential centralization",
      "Voter apathy",
      "Delegate cartel formation",
      "Less immutable"
    ],
    examples: ["EOS", "Tron", "Steem", "BitShares"],
    color: "from-green-500 to-teal-600",
    icon: "🗳️"
  },
  {
    id: "poh",
    name: "Proof of History (PoH)",
    description: "Creates a historical record proving that an event occurred at a specific moment in time.",
    category: "temporal",
    energyConsumption: 3,
    energyEfficiency: 8,
    transactionSpeed: 65000,
    decentralization: 6,
    security: 8,
    economicModel: "Transaction fees + inflation rewards",
    technicalRequirements: ["Verifiable delay function", "Clock synchronization", "Cryptographic proofs"],
    pros: [
      "High throughput",
      "Low latency",
      "Efficient consensus",
      "Innovative approach"
    ],
    cons: [
      "Complex implementation",
      "Single point of failure",
      "Limited adoption",
      "Centralized sequencer"
    ],
    examples: ["Solana"],
    color: "from-purple-500 to-pink-600",
    icon: "⏰"
  },
  {
    id: "poa",
    name: "Proof of Authority (PoA)",
    description: "Pre-approved validators with known identities validate transactions and create blocks.",
    category: "authority-based",
    energyConsumption: 1,
    energyEfficiency: 10,
    transactionSpeed: 5000,
    decentralization: 3,
    security: 6,
    economicModel: "Fixed validator rewards",
    technicalRequirements: ["Known validator identities", "Governance framework", "Reputation system"],
    pros: [
      "Fast transactions",
      "Energy efficient",
      "Predictable performance",
      "Suitable for private networks"
    ],
    cons: [
      "Centralized authority",
      "Identity requirements",
      "Limited decentralization",
      "Censorship risks"
    ],
    examples: ["VeChain", "POA Network", "Private Ethereum chains"],
    color: "from-indigo-500 to-blue-600",
    icon: "🏛️"
  }
];
