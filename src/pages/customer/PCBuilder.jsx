import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Modal, Table } from 'react-bootstrap';
import { 
  Cpu, 
  Motherboard, 
  Display, 
  Memory, 
  Hdd, 
  Power, 
  PcDisplay, 
  Fan, 
  CurrencyDollar, 
  ArrowsAngleExpand
} from 'react-bootstrap-icons';
import { useOrders } from './OrdersContext';
import Checkout from './Checkout';

function PCBuilder() {
  const [selectedRange, setSelectedRange] = useState('');
  const [usage, setUsage] = useState('');
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooling: null
  });
  const [recommendations, setRecommendations] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonType, setComparisonType] = useState('');
  const [comparisonItems, setComparisonItems] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTechnicianChoice, setShowTechnicianChoice] = useState(false);

  const { addOrder } = useOrders();

  // Budget ranges in LKR
  const budgetRanges = [
    { id: 'range1', name: 'Entry Level', min: 100000, max: 200000, tier: 'low' },
    { id: 'range2', name: 'Budget', min: 200000, max: 300000, tier: 'low' },
    { id: 'range3', name: 'Mid-Range', min: 300000, max: 400000, tier: 'mid' },
    { id: 'range4', name: 'High-End', min: 400000, max: 500000, tier: 'mid' },
    { id: 'range5', name: 'Premium', min: 500000, max: 750000, tier: 'high' },
    { id: 'range6', name: 'Ultimate', min: 750000, max: 1000000, tier: 'high' }
  ];

  // Usage types and their component priorities
  const usageTypes = {
    gaming: {
      name: 'Gaming',
      icon: '🎮',
      priorities: {
        gpu: 0.40,
        cpu: 0.25,
        ram: 0.10,
        storage: 0.10,
        motherboard: 0.10,
        psu: 0.03,
        case: 0.01,
        cooling: 0.01
      }
    },
    workstation: {
      name: 'Workstation',
      icon: '💼',
      priorities: {
        cpu: 0.35,
        ram: 0.25,
        storage: 0.20,
        gpu: 0.10,
        motherboard: 0.05,
        psu: 0.03,
        case: 0.01,
        cooling: 0.01
      }
    },
    multimedia: {
      name: 'Multimedia',
      icon: '🎬',
      priorities: {
        cpu: 0.30,
        gpu: 0.25,
        storage: 0.20,
        ram: 0.15,
        motherboard: 0.05,
        psu: 0.03,
        case: 0.01,
        cooling: 0.01
      }
    },
    office: {
      name: 'Office',
      icon: '💻',
      priorities: {
        cpu: 0.25,
        ram: 0.20,
        storage: 0.20,
        motherboard: 0.15,
        gpu: 0.10,
        psu: 0.05,
        case: 0.03,
        cooling: 0.02
      }
    }
  };

  // Component icons mapping with correct icons
  const componentIcons = {
    cpu: <Cpu size={40} className="text-primary" />,
    gpu: <Display size={40} className="text-success" />,
    motherboard: <Motherboard size={40} className="text-info" />,
    ram: <Memory size={40} className="text-warning" />,
    storage: <Hdd size={40} className="text-danger" />,
    psu: <Power size={40} className="text-secondary" />,
    case: <PcDisplay size={40} className="text-dark" />,
    cooling: <Fan size={40} className="text-primary" />
  };

  // Enhanced component options with comprehensive information
  const componentOptions = {
    cpu: [
      { 
        name: 'Intel Core i9-13900K', 
        price: 125000, 
        tier: 'high',
        icon: <Cpu size={24} className="text-primary" />,
        specs: {
          cores: '24 (8P + 16E)',
          threads: '32',
          baseSpeed: '3.0 GHz',
          boostSpeed: '5.8 GHz',
          cache: '36MB',
          tdp: '125W'
        },
        features: {
          functionality: {
            gaming: 'Excellent',
            productivity: 'Outstanding',
            multitasking: 'Superb',
            powerEfficiency: 'High'
          },
          usage: {
            gaming: 'Perfect for high-end gaming and streaming',
            workstation: 'Ideal for professional content creation',
            productivity: 'Excellent for heavy multitasking',
            overclocking: 'Great overclocking potential'
          },
          uniqueFeatures: [
            'Hybrid Architecture (P-cores + E-cores)',
            'Intel Thermal Velocity Boost',
            'PCIe 5.0 Support',
            'DDR5 Memory Support'
          ],
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'High',
            targetMarket: 'Enthusiasts and Professionals'
          }
        }
      },
      { 
        name: 'AMD Ryzen 9 7950X', 
        price: 120000, 
        tier: 'high',
        icon: <Cpu size={24} className="text-danger" />,
        specs: {
          cores: '16',
          threads: '32',
          baseSpeed: '4.5 GHz',
          boostSpeed: '5.7 GHz',
          cache: '80MB',
          tdp: '170W'
        },
        features: {
          functionality: {
            gaming: 'Excellent',
            productivity: 'Outstanding',
            multitasking: 'Superb',
            powerEfficiency: 'Very High'
          },
          usage: {
            gaming: 'Excellent for high-end gaming',
            workstation: 'Perfect for professional workloads',
            productivity: 'Superb for multitasking',
            overclocking: 'Excellent overclocking headroom'
          },
          uniqueFeatures: [
            'Zen 4 Architecture',
            'AMD 3D V-Cache Technology',
            'PCIe 5.0 Support',
            'Advanced AI Features'
          ],
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'Very High',
            targetMarket: 'Professionals and Enthusiasts'
          }
        }
      },
      { 
        name: 'Intel Core i7-13700K', 
        price: 85000, 
        tier: 'mid',
        icon: <Cpu size={24} className="text-primary" />,
        specs: {
          cores: '16 (8P + 8E)',
          threads: '24',
          baseSpeed: '3.4 GHz',
          boostSpeed: '5.4 GHz',
          cache: '30MB',
          tdp: '125W'
        },
        features: {
          functionality: {
            gaming: 'Very Good',
            productivity: 'Excellent',
            multitasking: 'Very Good',
            powerEfficiency: 'Good'
          },
          usage: {
            gaming: 'Great for high-end gaming',
            workstation: 'Good for content creation',
            productivity: 'Excellent for multitasking',
            overclocking: 'Good overclocking potential'
          },
          uniqueFeatures: [
            'Hybrid Architecture',
            'Intel Turbo Boost Max 3.0',
            'PCIe 5.0 Support',
            'DDR5 Memory Support'
          ],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'Very High',
            targetMarket: 'Gamers and Content Creators'
          }
        }
      },
      { 
        name: 'AMD Ryzen 7 7700X', 
        price: 80000, 
        tier: 'mid',
        icon: <Cpu size={24} className="text-danger" />,
        specs: {
          cores: '8',
          threads: '16',
          baseSpeed: '4.5 GHz',
          boostSpeed: '5.4 GHz',
          cache: '40MB',
          tdp: '105W'
        },
        features: {
          functionality: {
            gaming: 'Very Good',
            productivity: 'Excellent',
            multitasking: 'Very Good',
            powerEfficiency: 'Very High'
          },
          usage: {
            gaming: 'Excellent for gaming',
            workstation: 'Good for content creation',
            productivity: 'Very Good for multitasking',
            overclocking: 'Good overclocking potential'
          },
          uniqueFeatures: [
            'Zen 4 Architecture',
            'AMD Precision Boost 2',
            'PCIe 5.0 Support',
            'Advanced Security Features'
          ],
          priceAnalysis: {
            value: 'Excellent',
            performancePerRupee: 'Very High',
            targetMarket: 'Gamers and Professionals'
          }
        }
      },
      { 
        name: 'Intel Core i5-13600K', 
        price: 65000, 
        tier: 'mid',
        icon: <Cpu size={24} className="text-primary" />,
        specs: {
          cores: '14 (6P + 8E)',
          threads: '20',
          baseSpeed: '3.5 GHz',
          boostSpeed: '5.1 GHz',
          cache: '24MB',
          tdp: '125W'
        },
        features: {
          functionality: {
            gaming: 'Good',
            productivity: 'Very Good',
            multitasking: 'Good',
            powerEfficiency: 'Good'
          },
          usage: {
            gaming: 'Good for gaming',
            workstation: 'Adequate for content creation',
            productivity: 'Good for multitasking',
            overclocking: 'Moderate overclocking potential'
          },
          uniqueFeatures: [
            'Hybrid Architecture',
            'Intel Turbo Boost 2.0',
            'PCIe 5.0 Support',
            'DDR5 Memory Support'
          ],
          priceAnalysis: {
            value: 'Excellent',
            performancePerRupee: 'High',
            targetMarket: 'Mainstream Gamers'
          }
        }
      },
      { 
        name: 'AMD Ryzen 5 7600X', 
        price: 60000, 
        tier: 'mid',
        icon: <Cpu size={24} className="text-danger" />,
        specs: {
          cores: '6',
          threads: '12',
          baseSpeed: '4.7 GHz',
          boostSpeed: '5.3 GHz',
          cache: '38MB',
          tdp: '105W'
        },
        features: {
          functionality: {
            gaming: 'Good',
            productivity: 'Good',
            multitasking: 'Good',
            powerEfficiency: 'Very High'
          },
          usage: {
            gaming: 'Good for gaming',
            workstation: 'Adequate for basic content creation',
            productivity: 'Good for multitasking',
            overclocking: 'Moderate overclocking potential'
          },
          uniqueFeatures: [
            'Zen 4 Architecture',
            'AMD Precision Boost 2',
            'PCIe 5.0 Support',
            'Advanced Security Features'
          ],
          priceAnalysis: {
            value: 'Excellent',
            performancePerRupee: 'High',
            targetMarket: 'Mainstream Users'
          }
        }
      },
      { 
        name: 'Intel Core i3-13100', 
        price: 35000, 
        tier: 'low',
        icon: <Cpu size={24} className="text-primary" />,
        specs: {
          cores: '4',
          threads: '8',
          baseSpeed: '3.4 GHz',
          boostSpeed: '4.5 GHz',
          cache: '12MB',
          tdp: '60W'
        },
        features: {
          functionality: {
            gaming: 'Basic',
            productivity: 'Good',
            multitasking: 'Basic',
            powerEfficiency: 'Excellent'
          },
          usage: {
            gaming: 'Basic gaming',
            workstation: 'Basic productivity',
            productivity: 'Good for office work',
            overclocking: 'Limited overclocking'
          },
          uniqueFeatures: [
            'Intel UHD Graphics 730',
            'Intel Turbo Boost 2.0',
            'PCIe 4.0 Support',
            'DDR4/DDR5 Memory Support'
          ],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'Good',
            targetMarket: 'Budget Users'
          }
        }
      },
      { 
        name: 'AMD Ryzen 5 5600X', 
        price: 40000, 
        tier: 'low',
        icon: <Cpu size={24} className="text-danger" />,
        specs: {
          cores: '6',
          threads: '12',
          baseSpeed: '3.7 GHz',
          boostSpeed: '4.6 GHz',
          cache: '35MB',
          tdp: '65W'
        },
        features: {
          functionality: {
            gaming: 'Good',
            productivity: 'Good',
            multitasking: 'Good',
            powerEfficiency: 'Excellent'
          },
          usage: {
            gaming: 'Good for gaming',
            workstation: 'Adequate for basic content creation',
            productivity: 'Good for multitasking',
            overclocking: 'Moderate overclocking potential'
          },
          uniqueFeatures: [
            'Zen 3 Architecture',
            'AMD Precision Boost 2',
            'PCIe 4.0 Support',
            'Advanced Security Features'
          ],
          priceAnalysis: {
            value: 'Excellent',
            performancePerRupee: 'Very High',
            targetMarket: 'Budget Gamers'
          }
        }
      }
    ],
    gpu: [
      {
        name: 'NVIDIA RTX 4090',
        price: 350000,
        tier: 'high',
        icon: <Display size={24} className="text-success" />,
        specs: {
          memory: '24GB GDDR6X',
          cores: '16384 CUDA',
          boostClock: '2.52 GHz',
          memorySpeed: '21 Gbps',
          power: '450W'
        },
        features: {
          functionality: {
            gaming: 'Ultimate',
            rayTracing: 'Best in Class',
            aiFeatures: 'Advanced',
            contentCreation: 'Excellent'
          },
          usage: {
            gaming: 'Perfect for 4K and 8K gaming',
            workstation: 'Ideal for professional rendering',
            ai: 'Excellent for AI/ML workloads',
            streaming: 'Built-in streaming features'
          },
          uniqueFeatures: [
            'DLSS 3.0',
            '4th Gen Tensor Cores',
            '3rd Gen RT Cores',
            'NVIDIA Broadcast'
          ],
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'High',
            targetMarket: 'High-end Gamers and Professionals'
          }
        }
      },
      {
        name: 'NVIDIA RTX 4080',
        price: 250000,
        tier: 'high',
        icon: <Display size={24} className="text-success" />,
        specs: {
          memory: '16GB GDDR6X',
          cores: '9728 CUDA',
          boostClock: '2.51 GHz',
          memorySpeed: '22.4 Gbps',
          power: '320W'
        },
        features: {
          functionality: {
            gaming: 'Excellent',
            rayTracing: 'Excellent',
            aiFeatures: 'Advanced',
            contentCreation: 'Excellent'
          },
          usage: {
            gaming: 'Perfect for 4K gaming',
            workstation: 'Excellent for professional rendering',
            ai: 'Very good for AI/ML workloads',
            streaming: 'Built-in streaming features'
          },
          uniqueFeatures: [
            'DLSS 3.0',
            '4th Gen Tensor Cores',
            '3rd Gen RT Cores',
            'NVIDIA Broadcast'
          ],
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'High',
            targetMarket: 'High-end Gamers'
          }
        }
      },
      {
        name: 'AMD Radeon RX 7900 XTX',
        price: 220000,
        tier: 'high',
        icon: <Display size={24} className="text-danger" />,
        specs: {
          memory: '24GB GDDR6',
          cores: '12288 Stream',
          boostClock: '2.5 GHz',
          memorySpeed: '20 Gbps',
          power: '355W'
        },
        features: {
          functionality: {
            gaming: 'Excellent',
            rayTracing: 'Very Good',
            aiFeatures: 'Good',
            contentCreation: 'Excellent'
          },
          usage: {
            gaming: 'Perfect for 4K gaming',
            workstation: 'Excellent for professional rendering',
            ai: 'Good for AI workloads',
            streaming: 'Built-in streaming features'
          },
          uniqueFeatures: [
            'FSR 3.0',
            'AMD FidelityFX',
            'AMD Radeon Anti-Lag',
            'AMD Radeon Boost'
          ],
          priceAnalysis: {
            value: 'Excellent',
            performancePerRupee: 'Very High',
            targetMarket: 'High-end Gamers'
          }
        }
      },
      {
        name: 'NVIDIA RTX 4070 Ti',
        price: 180000,
        tier: 'mid',
        icon: <Display size={24} className="text-success" />,
        specs: {
          memory: '12GB GDDR6X',
          cores: '7680 CUDA',
          boostClock: '2.61 GHz',
          memorySpeed: '21 Gbps',
          power: '285W'
        },
        features: {
          functionality: {
            gaming: 'Very Good',
            rayTracing: 'Very Good',
            aiFeatures: 'Good',
            contentCreation: 'Very Good'
          },
          usage: {
            gaming: 'Excellent for 1440p gaming',
            workstation: 'Good for content creation',
            ai: 'Good for AI workloads',
            streaming: 'Built-in streaming features'
          },
          uniqueFeatures: [
            'DLSS 3.0',
            '4th Gen Tensor Cores',
            '3rd Gen RT Cores',
            'NVIDIA Broadcast'
          ],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'High',
            targetMarket: 'Mid-range Gamers'
          }
        }
      }
    ],
    motherboard: [
      {
        name: 'ASUS ROG Maximus Z790',
        price: 85000,
        tier: 'high',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'Z790',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          bestFor: ['High-end Gaming', 'Overclocking', 'Workstation'],
          uniqueFeatures: [
            'ROG SupremeFX Audio',
            'Thunderbolt 4',
            'Wi-Fi 6E',
            'PCIe 5.0'
          ],
          functionality: {
            overclocking: 'Excellent',
            connectivity: 'Comprehensive',
            audio: 'Premium',
            networking: 'Advanced'
          },
          usage: {
            gaming: 'Perfect for high-end gaming setups',
            workstation: 'Ideal for professional workstations',
            overclocking: 'Excellent for CPU overclocking',
            connectivity: 'Rich I/O options'
          },
          priceAnalysis: {
            value: 'Premium',
            featuresPerRupee: 'High',
            targetMarket: 'Enthusiasts and Professionals'
          }
        }
      },
      {
        name: 'MSI MEG X670E ACE',
        price: 80000,
        tier: 'high',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'X670E',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          functionality: {
            overclocking: 'Excellent',
            connectivity: 'Comprehensive',
            audio: 'Premium',
            networking: 'Advanced'
          },
          usage: {
            gaming: 'Perfect for high-end gaming',
            workstation: 'Ideal for professional work',
            overclocking: 'Excellent',
            connectivity: 'Rich I/O'
          },
          uniqueFeatures: ['Wi-Fi 6E', 'Thunderbolt 4', 'PCIe 5.0', 'Premium Audio'],
          priceAnalysis: {
            value: 'Premium',
            featuresPerRupee: 'High',
            targetMarket: 'Enthusiasts'
          }
        }
      },
      {
        name: 'Gigabyte AORUS Z790',
        price: 75000,
        tier: 'high',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'X670E',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          functionality: {
            overclocking: 'Excellent',
            connectivity: 'Comprehensive',
            audio: 'Premium',
            networking: 'Advanced'
          },
          usage: {
            gaming: 'Perfect for high-end gaming',
            workstation: 'Ideal for professional work',
            overclocking: 'Excellent',
            connectivity: 'Rich I/O'
          },
          uniqueFeatures: ['Wi-Fi 6E', 'Thunderbolt 4', 'PCIe 5.0', 'Premium Audio'],
          priceAnalysis: {
            value: 'Premium',
            featuresPerRupee: 'High',
            targetMarket: 'Enthusiasts'
          }
        }
      },
      {
        name: 'ASRock X670E Taichi',
        price: 70000,
        tier: 'mid',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'X670E',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          functionality: {
            overclocking: 'Very Good',
            connectivity: 'Good',
            audio: 'Good',
            networking: 'Good'
          },
          usage: {
            gaming: 'Very good for gaming',
            workstation: 'Good for professional work',
            overclocking: 'Very Good',
            connectivity: 'Good I/O'
          },
          uniqueFeatures: ['Wi-Fi 6E', 'PCIe 5.0', 'Good Audio', 'RGB Lighting'],
          priceAnalysis: {
            value: 'Good',
            featuresPerRupee: 'Good',
            targetMarket: 'Mid-range Users'
          }
        }
      },
      {
        name: 'MSI MPG B650',
        price: 55000,
        tier: 'mid',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'B650',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          functionality: {
            overclocking: 'Good',
            connectivity: 'Good',
            audio: 'Good',
            networking: 'Good'
          },
          usage: {
            gaming: 'Good for gaming',
            workstation: 'Good for work',
            overclocking: 'Good',
            connectivity: 'Good I/O'
          },
          uniqueFeatures: ['Wi-Fi 6', 'PCIe 4.0', 'Good Audio', 'RGB Lighting'],
          priceAnalysis: {
            value: 'Good',
            featuresPerRupee: 'Good',
            targetMarket: 'Mid-range Users'
          }
        }
      },
      {
        name: 'ASUS TUF B650',
        price: 50000,
        tier: 'mid',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'B650',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          functionality: {
            overclocking: 'Good',
            connectivity: 'Good',
            audio: 'Good',
            networking: 'Good'
          },
          usage: {
            gaming: 'Good for gaming',
            workstation: 'Good for work',
            overclocking: 'Good',
            connectivity: 'Good I/O'
          },
          uniqueFeatures: ['Wi-Fi 6', 'PCIe 4.0', 'Good Audio', 'Military Grade'],
          priceAnalysis: {
            value: 'Good',
            featuresPerRupee: 'Good',
            targetMarket: 'Mid-range Users'
          }
        }
      },
      {
        name: 'Gigabyte B650M',
        price: 35000,
        tier: 'low',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'B650',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          functionality: {
            overclocking: 'Basic',
            connectivity: 'Basic',
            audio: 'Basic',
            networking: 'Basic'
          },
          usage: {
            gaming: 'Basic gaming',
            workstation: 'Basic work',
            overclocking: 'Basic',
            connectivity: 'Basic I/O'
          },
          uniqueFeatures: ['PCIe 4.0', 'Basic Audio', 'Compact Design'],
          priceAnalysis: {
            value: 'Good',
            featuresPerRupee: 'Good',
            targetMarket: 'Budget Users'
          }
        }
      },
      {
        name: 'ASRock B650M',
        price: 30000,
        tier: 'low',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'B650',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          functionality: {
            overclocking: 'Basic',
            connectivity: 'Basic',
            audio: 'Basic',
            networking: 'Basic'
          },
          usage: {
            gaming: 'Basic gaming',
            workstation: 'Basic work',
            overclocking: 'Basic',
            connectivity: 'Basic I/O'
          },
          uniqueFeatures: ['PCIe 4.0', 'Basic Audio', 'Compact Design'],
          priceAnalysis: {
            value: 'Good',
            featuresPerRupee: 'Good',
            targetMarket: 'Budget Users'
          }
        }
      }
    ],
    ram: [
      {
        name: '64GB DDR5 6000MHz',
        price: 65000,
        tier: 'high',
        icon: <Memory size={24} className="text-warning" />,
        specs: {
          capacity: '64GB',
          speed: '6000MHz',
          type: 'DDR5',
          latency: 'CL36',
          modules: '2x32GB'
        },
        features: {
          bestFor: ['Workstation', 'Content Creation', 'High-end Gaming'],
          uniqueFeatures: [
            'RGB Lighting',
            'XMP 3.0',
            'Aluminum Heat Spreader',
            'ECC Support'
          ],
          functionality: {
            performance: 'Excellent',
            stability: 'High',
            overclocking: 'Good',
            compatibility: 'Wide'
          },
          usage: {
            workstation: 'Perfect for professional workloads',
            gaming: 'Excellent for high-end gaming',
            multitasking: 'Superb for heavy multitasking',
            contentCreation: 'Ideal for content creation'
          },
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'Good',
            targetMarket: 'Professionals and Enthusiasts'
          }
        }
      },
      {
        name: '32GB DDR5 6000MHz',
        price: 35000,
        tier: 'high',
        icon: <Memory size={24} className="text-warning" />,
        specs: {
          capacity: '32GB',
          speed: '6000MHz',
          type: 'DDR5',
          latency: 'CL36',
          modules: '2x16GB'
        },
        features: {
          functionality: {
            performance: 'Excellent',
            stability: 'High',
            overclocking: 'Good',
            compatibility: 'Wide'
          },
          usage: {
            workstation: 'Excellent for professional workloads',
            gaming: 'Very good for gaming',
            multitasking: 'Excellent for multitasking',
            contentCreation: 'Very good for content creation'
          },
          uniqueFeatures: ['RGB Lighting', 'XMP 3.0', 'Aluminum Heat Spreader'],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'Good',
            targetMarket: 'Professionals'
          }
        }
      },
      {
        name: '32GB DDR5 5600MHz',
        price: 30000,
        tier: 'mid',
        icon: <Memory size={24} className="text-warning" />,
        specs: {
          capacity: '32GB',
          speed: '5600MHz',
          type: 'DDR5',
          latency: 'CL40',
          modules: '2x16GB'
        },
        features: {
          functionality: {
            performance: 'Very Good',
            stability: 'High',
            overclocking: 'Good',
            compatibility: 'Wide'
          },
          usage: {
            workstation: 'Very good for professional workloads',
            gaming: 'Good for gaming',
            multitasking: 'Very good for multitasking',
            contentCreation: 'Good for content creation'
          },
          uniqueFeatures: ['XMP 3.0', 'Aluminum Heat Spreader'],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'Good',
            targetMarket: 'Mid-range Users'
          }
        }
      },
      {
        name: '16GB DDR5 6000MHz',
        price: 20000,
        tier: 'mid',
        icon: <Memory size={24} className="text-warning" />,
        specs: {
          capacity: '16GB',
          speed: '6000MHz',
          type: 'DDR5',
          latency: 'CL36',
          modules: '2x8GB'
        },
        features: {
          functionality: {
            performance: 'Good',
            stability: 'High',
            overclocking: 'Good',
            compatibility: 'Wide'
          },
          usage: {
            workstation: 'Good for professional workloads',
            gaming: 'Good for gaming',
            multitasking: 'Good for multitasking',
            contentCreation: 'Good for content creation'
          },
          uniqueFeatures: ['XMP 3.0', 'Aluminum Heat Spreader'],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'Good',
            targetMarket: 'Mid-range Users'
          }
        }
      },
      {
        name: '16GB DDR5 5600MHz',
        price: 18000,
        tier: 'low',
        icon: <Memory size={24} className="text-warning" />,
        specs: {
          capacity: '16GB',
          speed: '5600MHz',
          type: 'DDR5',
          latency: 'CL40',
          modules: '2x8GB'
        },
        features: {
          functionality: {
            performance: 'Good',
            stability: 'High',
            overclocking: 'Basic',
            compatibility: 'Wide'
          },
          usage: {
            workstation: 'Good for basic workloads',
            gaming: 'Good for gaming',
            multitasking: 'Good for multitasking',
            contentCreation: 'Good for basic content creation'
          },
          uniqueFeatures: ['XMP 3.0', 'Basic Heat Spreader'],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'Good',
            targetMarket: 'Budget Users'
          }
        }
      },
      {
        name: '16GB DDR4 3600MHz',
        price: 15000,
        tier: 'low',
        icon: <Memory size={24} className="text-warning" />,
        specs: {
          capacity: '16GB',
          speed: '3600MHz',
          type: 'DDR4',
          latency: 'CL18',
          modules: '2x8GB'
        },
        features: {
          functionality: {
            performance: 'Good',
            stability: 'High',
            overclocking: 'Basic',
            compatibility: 'Wide'
          },
          usage: {
            workstation: 'Good for basic workloads',
            gaming: 'Good for gaming',
            multitasking: 'Good for multitasking',
            contentCreation: 'Good for basic content creation'
          },
          uniqueFeatures: ['XMP 2.0', 'Basic Heat Spreader'],
          priceAnalysis: {
            value: 'Good',
            performancePerRupee: 'Good',
            targetMarket: 'Budget Users'
          }
        }
      }
    ],
    storage: [
      { name: '4TB NVMe SSD', price: 85000, tier: 'high',
        icon: <Hdd size={24} className="text-danger" />,
        specs: { capacity: '4TB', type: 'NVMe SSD', speed: '7000 MB/s', interface: 'PCIe 4.0' },
        features: {
          functionality: { performance: 'Excellent', reliability: 'High', durability: 'High', compatibility: 'Wide' },
          usage: { workstation: 'Perfect for professional workloads', gaming: 'Excellent for gaming', contentCreation: 'Perfect for content creation', storage: 'High capacity storage' },
          uniqueFeatures: ['NVMe Technology', 'High Speed', 'Large Capacity', 'Reliable'],
          priceAnalysis: { value: 'Premium', performancePerRupee: 'Good', targetMarket: 'Professionals' }
        }
      },
      { name: '2TB NVMe SSD', price: 45000, tier: 'high',
        icon: <Hdd size={24} className="text-danger" />,
        specs: { capacity: '2TB', type: 'NVMe SSD', speed: '7000 MB/s', interface: 'PCIe 4.0' },
        features: {
          functionality: { performance: 'Excellent', reliability: 'High', durability: 'High', compatibility: 'Wide' },
          usage: { workstation: 'Excellent for professional workloads', gaming: 'Excellent for gaming', contentCreation: 'Excellent for content creation', storage: 'Good capacity storage' },
          uniqueFeatures: ['NVMe Technology', 'High Speed', 'Good Capacity', 'Reliable'],
          priceAnalysis: { value: 'Good', performancePerRupee: 'Good', targetMarket: 'Professionals and Gamers' }
        }
      },
      { name: '1TB NVMe SSD + 2TB HDD', price: 35000, tier: 'mid',
        icon: <Hdd size={24} className="text-danger" />,
        specs: { capacity: '3TB Total', type: 'Hybrid', speed: '3500 MB/s + 180 MB/s', interface: 'PCIe 3.0 + SATA' },
        features: {
          functionality: { performance: 'Good', reliability: 'High', durability: 'High', compatibility: 'Wide' },
          usage: { workstation: 'Good for professional workloads', gaming: 'Good for gaming', contentCreation: 'Good for content creation', storage: 'Balanced storage solution' },
          uniqueFeatures: ['Hybrid Setup', 'Fast Boot Drive', 'Large Storage', 'Cost Effective'],
          priceAnalysis: { value: 'Excellent', performancePerRupee: 'Very High', targetMarket: 'Mid-range Users' }
        }
      },
      { name: '1TB NVMe SSD', price: 25000, tier: 'mid',
        icon: <Hdd size={24} className="text-danger" />,
        specs: { capacity: '1TB', type: 'NVMe SSD', speed: '3500 MB/s', interface: 'PCIe 3.0' },
        features: {
          functionality: { performance: 'Good', reliability: 'High', durability: 'High', compatibility: 'Wide' },
          usage: { workstation: 'Good for professional workloads', gaming: 'Good for gaming', contentCreation: 'Good for content creation', storage: 'Good capacity storage' },
          uniqueFeatures: ['NVMe Technology', 'Good Speed', 'Good Capacity', 'Reliable'],
          priceAnalysis: { value: 'Good', performancePerRupee: 'Good', targetMarket: 'Mid-range Users' }
        }
      },
      { name: '512GB NVMe SSD + 1TB HDD', price: 20000, tier: 'low',
        icon: <Hdd size={24} className="text-danger" />,
        specs: { capacity: '1.5TB Total', type: 'Hybrid', speed: '3500 MB/s + 180 MB/s', interface: 'PCIe 3.0 + SATA' },
        features: {
          functionality: { performance: 'Good', reliability: 'High', durability: 'High', compatibility: 'Wide' },
          usage: { workstation: 'Good for basic workloads', gaming: 'Good for gaming', contentCreation: 'Good for basic content creation', storage: 'Balanced storage solution' },
          uniqueFeatures: ['Hybrid Setup', 'Fast Boot Drive', 'Good Storage', 'Cost Effective'],
          priceAnalysis: { value: 'Excellent', performancePerRupee: 'Very High', targetMarket: 'Budget Users' }
        }
      },
      { name: '512GB NVMe SSD', price: 15000, tier: 'low',
        icon: <Hdd size={24} className="text-danger" />,
        specs: { capacity: '512GB', type: 'NVMe SSD', speed: '3500 MB/s', interface: 'PCIe 3.0' },
        features: {
          functionality: { performance: 'Good', reliability: 'High', durability: 'High', compatibility: 'Wide' },
          usage: { workstation: 'Good for basic workloads', gaming: 'Good for gaming', contentCreation: 'Good for basic content creation', storage: 'Basic capacity storage' },
          uniqueFeatures: ['NVMe Technology', 'Good Speed', 'Basic Capacity', 'Reliable'],
          priceAnalysis: { value: 'Good', performancePerRupee: 'Good', targetMarket: 'Budget Users' }
        }
      }
    ],
    psu: [
      { name: '1200W Platinum', price: 45000, tier: 'high',
        icon: <Power size={24} className="text-secondary" />,
        specs: { wattage: '1200W', efficiency: 'Platinum', modular: 'Full', certification: '80+ Platinum' },
        features: {
          functionality: { efficiency: 'Excellent', reliability: 'High', modularity: 'Full', noise: 'Low' },
          usage: { highEnd: 'Perfect for high-end systems', overclocking: 'Excellent for overclocking', workstation: 'Ideal for workstations', gaming: 'Perfect for high-end gaming' },
          uniqueFeatures: ['80+ Platinum Efficiency', 'Fully Modular', 'Low Noise', 'High Reliability'],
          priceAnalysis: { value: 'Premium', efficiencyPerRupee: 'High', targetMarket: 'Enthusiasts and Professionals' }
        }
      },
      { name: '1000W Gold', price: 35000, tier: 'high',
        icon: <Power size={24} className="text-secondary" />,
        specs: { wattage: '1000W', efficiency: 'Gold', modular: 'Full', certification: '80+ Gold' },
        features: {
          functionality: { efficiency: 'Very Good', reliability: 'High', modularity: 'Full', noise: 'Low' },
          usage: { highEnd: 'Very good for high-end systems', overclocking: 'Very good for overclocking', workstation: 'Very good for workstations', gaming: 'Very good for high-end gaming' },
          uniqueFeatures: ['80+ Gold Efficiency', 'Fully Modular', 'Low Noise', 'High Reliability'],
          priceAnalysis: { value: 'Good', efficiencyPerRupee: 'Good', targetMarket: 'Enthusiasts' }
        }
      },
      { name: '850W Gold', price: 28000, tier: 'mid',
        icon: <Power size={24} className="text-secondary" />,
        specs: { wattage: '850W', efficiency: 'Gold', modular: 'Semi', certification: '80+ Gold' },
        features: {
          functionality: { efficiency: 'Good', reliability: 'High', modularity: 'Semi', noise: 'Low' },
          usage: { midRange: 'Good for mid-range systems', overclocking: 'Good for overclocking', workstation: 'Good for workstations', gaming: 'Good for gaming' },
          uniqueFeatures: ['80+ Gold Efficiency', 'Semi Modular', 'Low Noise', 'Reliable'],
          priceAnalysis: { value: 'Good', efficiencyPerRupee: 'Good', targetMarket: 'Mid-range Users' }
        }
      },
      { name: '750W Gold', price: 25000, tier: 'mid',
        icon: <Power size={24} className="text-secondary" />,
        specs: { wattage: '750W', efficiency: 'Gold', modular: 'Semi', certification: '80+ Gold' },
        features: {
          functionality: { efficiency: 'Good', reliability: 'High', modularity: 'Semi', noise: 'Low' },
          usage: { midRange: 'Good for mid-range systems', overclocking: 'Good for overclocking', workstation: 'Good for workstations', gaming: 'Good for gaming' },
          uniqueFeatures: ['80+ Gold Efficiency', 'Semi Modular', 'Low Noise', 'Reliable'],
          priceAnalysis: { value: 'Good', efficiencyPerRupee: 'Good', targetMarket: 'Mid-range Users' }
        }
      },
      { name: '650W Bronze', price: 18000, tier: 'low',
        icon: <Power size={24} className="text-secondary" />,
        specs: { wattage: '650W', efficiency: 'Bronze', modular: 'Non', certification: '80+ Bronze' },
        features: {
          functionality: { efficiency: 'Basic', reliability: 'Good', modularity: 'Non', noise: 'Medium' },
          usage: { budget: 'Good for budget systems', basic: 'Good for basic systems', office: 'Good for office work', gaming: 'Good for basic gaming' },
          uniqueFeatures: ['80+ Bronze Efficiency', 'Non Modular', 'Reliable', 'Cost Effective'],
          priceAnalysis: { value: 'Good', efficiencyPerRupee: 'Good', targetMarket: 'Budget Users' }
        }
      },
      { name: '550W Bronze', price: 15000, tier: 'low',
        icon: <Power size={24} className="text-secondary" />,
        specs: { wattage: '550W', efficiency: 'Bronze', modular: 'Non', certification: '80+ Bronze' },
        features: {
          functionality: { efficiency: 'Basic', reliability: 'Good', modularity: 'Non', noise: 'Medium' },
          usage: { budget: 'Good for budget systems', basic: 'Good for basic systems', office: 'Good for office work', gaming: 'Good for basic gaming' },
          uniqueFeatures: ['80+ Bronze Efficiency', 'Non Modular', 'Reliable', 'Cost Effective'],
          priceAnalysis: { value: 'Good', efficiencyPerRupee: 'Good', targetMarket: 'Budget Users' }
        }
      }
    ],
    case: [
      { name: 'Lian Li O11 Dynamic', price: 35000, tier: 'high',
        icon: <PcDisplay size={24} className="text-dark" />,
        specs: { formFactor: 'ATX/Micro-ATX/Mini-ITX', material: 'Aluminum/Steel', fans: 'Up to 9', rgb: 'Yes' },
        features: {
          functionality: { airflow: 'Excellent', buildQuality: 'Premium', cableManagement: 'Excellent', aesthetics: 'Premium' },
          usage: { highEnd: 'Perfect for high-end builds', watercooling: 'Excellent for watercooling', showcase: 'Perfect for showcase builds', airflow: 'Excellent airflow design' },
          uniqueFeatures: ['Premium Build Quality', 'Excellent Airflow', 'RGB Support', 'Modular Design'],
          priceAnalysis: { value: 'Premium', qualityPerRupee: 'High', targetMarket: 'Enthusiasts' }
        }
      },
      { name: 'Fractal Design Meshify 2', price: 30000, tier: 'high',
        icon: <PcDisplay size={24} className="text-dark" />,
        specs: { formFactor: 'ATX/Micro-ATX/Mini-ITX', material: 'Steel', fans: 'Up to 7', rgb: 'Yes' },
        features: {
          functionality: { airflow: 'Excellent', buildQuality: 'High', cableManagement: 'Excellent', aesthetics: 'High' },
          usage: { highEnd: 'Very good for high-end builds', watercooling: 'Very good for watercooling', showcase: 'Very good for showcase builds', airflow: 'Excellent airflow design' },
          uniqueFeatures: ['Mesh Front Panel', 'Excellent Airflow', 'RGB Support', 'High Quality'],
          priceAnalysis: { value: 'Good', qualityPerRupee: 'Good', targetMarket: 'Enthusiasts' }
        }
      },
      { name: 'Corsair 5000D', price: 28000, tier: 'mid',
        icon: <PcDisplay size={24} className="text-dark" />,
        specs: { formFactor: 'ATX/Micro-ATX/Mini-ITX', material: 'Steel', fans: 'Up to 6', rgb: 'Yes' },
        features: {
          functionality: { airflow: 'Very Good', buildQuality: 'High', cableManagement: 'Very Good', aesthetics: 'High' },
          usage: { midRange: 'Very good for mid-range builds', watercooling: 'Very good for watercooling', showcase: 'Very good for showcase builds', airflow: 'Very good airflow design' },
          uniqueFeatures: ['Good Airflow', 'RGB Support', 'High Quality', 'Good Cable Management'],
          priceAnalysis: { value: 'Good', qualityPerRupee: 'Good', targetMarket: 'Mid-range Users' }
        }
      },
      { name: 'Phanteks P400A', price: 20000, tier: 'mid',
        icon: <PcDisplay size={24} className="text-dark" />,
        specs: { formFactor: 'ATX/Micro-ATX/Mini-ITX', material: 'Steel', fans: 'Up to 6', rgb: 'Yes' },
        features: {
          functionality: { airflow: 'Good', buildQuality: 'Good', cableManagement: 'Good', aesthetics: 'Good' },
          usage: { midRange: 'Good for mid-range builds', watercooling: 'Good for watercooling', showcase: 'Good for showcase builds', airflow: 'Good airflow design' },
          uniqueFeatures: ['Good Airflow', 'RGB Support', 'Good Quality', 'Good Cable Management'],
          priceAnalysis: { value: 'Good', qualityPerRupee: 'Good', targetMarket: 'Mid-range Users' }
        }
      },
      { name: 'NZXT H510', price: 15000, tier: 'low',
        icon: <PcDisplay size={24} className="text-dark" />,
        specs: { formFactor: 'ATX/Micro-ATX/Mini-ITX', material: 'Steel', fans: 'Up to 4', rgb: 'No' },
        features: {
          functionality: { airflow: 'Basic', buildQuality: 'Good', cableManagement: 'Good', aesthetics: 'Good' },
          usage: { budget: 'Good for budget builds', basic: 'Good for basic builds', office: 'Good for office builds', airflow: 'Basic airflow design' },
          uniqueFeatures: ['Clean Design', 'Good Quality', 'Good Cable Management', 'Minimalist'],
          priceAnalysis: { value: 'Good', qualityPerRupee: 'Good', targetMarket: 'Budget Users' }
        }
      },
      { name: 'Cooler Master NR600', price: 12000, tier: 'low',
        icon: <PcDisplay size={24} className="text-dark" />,
        specs: { formFactor: 'ATX/Micro-ATX/Mini-ITX', material: 'Steel', fans: 'Up to 6', rgb: 'No' },
        features: {
          functionality: { airflow: 'Good', buildQuality: 'Good', cableManagement: 'Good', aesthetics: 'Basic' },
          usage: { budget: 'Good for budget builds', basic: 'Good for basic builds', office: 'Good for office builds', airflow: 'Good airflow design' },
          uniqueFeatures: ['Good Airflow', 'Good Quality', 'Good Cable Management', 'Cost Effective'],
          priceAnalysis: { value: 'Good', qualityPerRupee: 'Good', targetMarket: 'Budget Users' }
        }
      }
    ],
    cooling: [
      { name: '360mm AIO Liquid Cooler', price: 35000, tier: 'high',
        icon: <Fan size={24} className="text-primary" />,
        specs: { type: 'AIO Liquid', radiator: '360mm', fans: '3x120mm', rgb: 'Yes' },
        features: {
          functionality: { cooling: 'Excellent', noise: 'Low', aesthetics: 'Premium', performance: 'Excellent' },
          usage: { highEnd: 'Perfect for high-end CPUs', overclocking: 'Excellent for overclocking', workstation: 'Ideal for workstations', gaming: 'Perfect for high-end gaming' },
          uniqueFeatures: ['Liquid Cooling', 'RGB Fans', 'Excellent Performance', 'Low Noise'],
          priceAnalysis: { value: 'Premium', performancePerRupee: 'High', targetMarket: 'Enthusiasts' }
        }
      },
      { name: '240mm AIO Liquid Cooler', price: 25000, tier: 'high',
        icon: <Fan size={24} className="text-primary" />,
        specs: { type: 'AIO Liquid', radiator: '240mm', fans: '2x120mm', rgb: 'Yes' },
        features: {
          functionality: { cooling: 'Very Good', noise: 'Low', aesthetics: 'High', performance: 'Very Good' },
          usage: { highEnd: 'Very good for high-end CPUs', overclocking: 'Very good for overclocking', workstation: 'Very good for workstations', gaming: 'Very good for high-end gaming' },
          uniqueFeatures: ['Liquid Cooling', 'RGB Fans', 'Very Good Performance', 'Low Noise'],
          priceAnalysis: { value: 'Good', performancePerRupee: 'Good', targetMarket: 'Enthusiasts' }
        }
      },
      { name: 'Premium Air Cooler', price: 20000, tier: 'mid',
        icon: <Fan size={24} className="text-primary" />,
        specs: { type: 'Air', heatsink: 'Large', fans: '1x120mm', rgb: 'Yes' },
        features: {
          functionality: { cooling: 'Good', noise: 'Low', aesthetics: 'Good', performance: 'Good' },
          usage: { midRange: 'Good for mid-range CPUs', overclocking: 'Good for overclocking', workstation: 'Good for workstations', gaming: 'Good for gaming' },
          uniqueFeatures: ['Large Heatsink', 'RGB Fan', 'Good Performance', 'Low Noise'],
          priceAnalysis: { value: 'Good', performancePerRupee: 'Good', targetMarket: 'Mid-range Users' }
        }
      },
      { name: 'Mid-range Air Cooler', price: 15000, tier: 'mid',
        icon: <Fan size={24} className="text-primary" />,
        specs: { type: 'Air', heatsink: 'Medium', fans: '1x120mm', rgb: 'No' },
        features: {
          functionality: { cooling: 'Good', noise: 'Medium', aesthetics: 'Basic', performance: 'Good' },
          usage: { midRange: 'Good for mid-range CPUs', overclocking: 'Good for basic overclocking', workstation: 'Good for workstations', gaming: 'Good for gaming' },
          uniqueFeatures: ['Medium Heatsink', 'Good Performance', 'Reliable', 'Cost Effective'],
          priceAnalysis: { value: 'Good', performancePerRupee: 'Good', targetMarket: 'Mid-range Users' }
        }
      },
      { name: 'Basic Air Cooler', price: 8000, tier: 'low',
        icon: <Fan size={24} className="text-primary" />,
        specs: { type: 'Air', heatsink: 'Small', fans: '1x92mm', rgb: 'No' },
        features: {
          functionality: { cooling: 'Basic', noise: 'Medium', aesthetics: 'Basic', performance: 'Basic' },
          usage: { budget: 'Good for budget CPUs', basic: 'Good for basic systems', office: 'Good for office work', gaming: 'Good for basic gaming' },
          uniqueFeatures: ['Small Heatsink', 'Basic Performance', 'Reliable', 'Cost Effective'],
          priceAnalysis: { value: 'Good', performancePerRupee: 'Good', targetMarket: 'Budget Users' }
        }
      },
      { name: 'Stock Cooler', price: 0, tier: 'low',
        icon: <Fan size={24} className="text-primary" />,
        specs: { type: 'Air', heatsink: 'Small', fans: '1x80mm', rgb: 'No' },
        features: {
          functionality: { cooling: 'Basic', noise: 'High', aesthetics: 'Basic', performance: 'Basic' },
          usage: { budget: 'Basic for budget CPUs', basic: 'Basic for basic systems', office: 'Basic for office work', gaming: 'Basic for basic gaming' },
          uniqueFeatures: ['Included with CPU', 'Basic Performance', 'Free', 'Basic Cooling'],
          priceAnalysis: { value: 'Free', performancePerRupee: 'N/A', targetMarket: 'Budget Users' }
        }
      }
    ]
  };

  // Generate recommendations based on budget range and usage
  const generateRecommendations = (range, usageType) => {
    if (!range || !usageType || !usageTypes[usageType]) return null;
    
    const recommendedComponents = {};
    const priorities = usageTypes[usageType].priorities;
    const avgBudget = (range.min + range.max) / 2;

    // Find components within budget allocation
    for (const [component, allocation] of Object.entries(priorities)) {
      const componentBudget = avgBudget * allocation;
      const options = componentOptions[component].filter(comp => comp.tier === range.tier);
      
      if (options.length > 0) {
        // Find the best component within budget
        const bestOption = options.reduce((best, current) => {
          if (current.price <= componentBudget && 
              (!best || current.price > best.price)) {
            return current;
          }
          return best;
        }, null);

        recommendedComponents[component] = bestOption || options[0];
      }
    }

    return recommendedComponents;
  };

  // Handle range change
  const handleRangeChange = (e) => {
    const rangeId = e.target.value;
    const range = budgetRanges.find(r => r.id === rangeId);
    setSelectedRange(rangeId);
    
    if (range) {
      // If usage is selected, use it; otherwise use 'gaming' as default
      const usageType = usage || 'gaming';
      const recommendations = generateRecommendations(range, usageType);
      setRecommendations(recommendations);
      setSelectedComponents(recommendations || {});
    }
  };

  // Handle usage change
  const handleUsageChange = (e) => {
    const newUsage = e.target.value;
    setUsage(newUsage);
    
    if (newUsage && selectedRange) {
      const range = budgetRanges.find(r => r.id === selectedRange);
      const recommendations = generateRecommendations(range, newUsage);
      setRecommendations(recommendations);
      setSelectedComponents(recommendations || {});
    }
  };

  // Handle component comparison with enhanced information
  const handleCompare = (componentType) => {
    setComparisonType(componentType);
    const options = componentOptions[componentType]?.filter(comp => comp.tier === budgetRanges.find(r => r.id === selectedRange)?.tier) || [];
    setComparisonItems(options.slice(0, 3)); // Compare top 3 options
    setShowComparison(true);
  };

  // Safe access to nested properties
  const safeGet = (obj, path, defaultValue = 'N/A') => {
    const result = path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
    
    // Special handling for uniqueFeatures to ensure it's always an array
    if (path === 'features.uniqueFeatures') {
      return Array.isArray(result) ? result : ['N/A'];
    }
    
    return result;
  };

  // Handle component selection from comparison
  const handleSelectFromComparison = (component) => {
    setSelectedComponents(prev => ({ ...prev, [comparisonType]: component }));
    setShowComparison(false);
  };

  // Calculate total price
  useEffect(() => {
    const total = Object.values(selectedComponents).reduce((sum, component) => {
      return sum + (component?.price || 0);
    }, 0);
    setTotalPrice(total);
  }, [selectedComponents]);

  const handleProceedToCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCheckoutConfirm = () => {
    setShowCheckoutModal(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (orderData) => {
    // Create PC build specific order data
    const pcBuildOrderData = {
      ...orderData,
      orderType: 'PC Build',
      buildDetails: {
        usage: usage,
        budgetRange: selectedRange,
        components: selectedComponents
      }
    };

    // Add order to context
    addOrder(pcBuildOrderData);
    
    // Close payment modal and show technician choice
    setShowPaymentModal(false);
    setShowTechnicianChoice(true);
  };

  const handleGoToOrders = () => {
    setShowTechnicianChoice(false);
    // Reset the build
    setSelectedComponents({
      cpu: null,
      gpu: null,
      motherboard: null,
      ram: null,
      storage: null,
      psu: null,
      case: null,
      cooling: null
    });
    setUsage('');
    setSelectedRange('');
    setTotalPrice(0);
    // Navigate to orders page
    window.location.href = '/orders';
  };

  const handleAssignTechnician = () => {
    setShowTechnicianChoice(false);
    // Reset the build
    setSelectedComponents({
      cpu: null,
      gpu: null,
      motherboard: null,
      ram: null,
      storage: null,
      psu: null,
      case: null,
      cooling: null
    });
    setUsage('');
    setSelectedRange('');
    setTotalPrice(0);
    // Navigate to FindTechnician page
    window.location.href = '/find-technician';
  };

  // Create PC build items for checkout
  const pcBuildItems = Object.entries(selectedComponents)
    .filter(([_, component]) => component)
    .map(([key, component]) => ({
      id: `${key}_${Date.now()}`,
      name: component.name,
      price: component.price,
      category: key.toUpperCase(),
      quantity: 1
    }));

  return (
    <Container className="py-5">
      <h1 className="mb-4">PC Builder</h1>
      
      {/* Usage and Budget Range Selection */}
      <Card className="mb-4">
        <Card.Body>
          <h3>Configure Your Build</h3>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Usage Type</Form.Label>
                <Form.Select
                  value={usage}
                  onChange={handleUsageChange}
                >
                  <option value="">Select Usage Type</option>
                  {Object.entries(usageTypes).map(([key, type]) => (
                    <option key={key} value={key}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <CurrencyDollar className="me-2" /> Select Budget Range
                </Form.Label>
                <Form.Select
                  value={selectedRange}
                  onChange={handleRangeChange}
                >
                  <option value="">Select Budget Range</option>
                  {budgetRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name} (LKR {range.min.toLocaleString()} - {range.max.toLocaleString()})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {recommendations && usage && usageTypes[usage] && selectedRange && (
        <Alert variant="info" className="mb-4">
          <h4>Recommended {usageTypes[usage].name} Build</h4>
          <p className="mb-0">
            Based on your {usageTypes[usage].name.toLowerCase()} needs and selected budget range, 
            we've selected components that provide the best value for your money.
            You can modify any component below to better suit your needs.
          </p>
        </Alert>
      )}
      
      <Row>
        {/* Component Selection */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Build Your Custom PC</h3>
              <Form>
                {Object.entries(selectedComponents).map(([key, component]) => (
                  <div key={key} className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">
                        {componentIcons[key]} {key.toUpperCase()}
                      </h5>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleCompare(key)}
                      >
                        <ArrowsAngleExpand className="me-1" /> Compare Options
                      </Button>
                    </div>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col md={3} className="d-flex align-items-center justify-content-center">
                            {component?.icon || componentIcons[key]}
                          </Col>
                          <Col md={9}>
                            <Form.Select
                              value={component?.name || ''}
                              onChange={(e) => {
                                const selected = componentOptions[key].find(comp => comp.name === e.target.value);
                                setSelectedComponents(prev => ({ ...prev, [key]: selected }));
                              }}
                            >
                              <option value="">Select {key.toUpperCase()}</option>
                              {componentOptions[key].map(comp => (
                                <option key={comp.name} value={comp.name}>
                                  {comp.name} - LKR {comp.price.toLocaleString()}
                                </option>
                              ))}
                            </Form.Select>
                            {component && component.specs && (
                              <div className="mt-2">
                                <small className="text-muted">
                                  {Object.entries(component.specs).map(([spec, value]) => (
                                    <span key={spec} className="me-3">
                                      <strong>{spec}:</strong> {value}
                                    </span>
                                  ))}
                                </small>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Summary */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Build Summary</h3>
              <div className="mb-3">
                <h5>Selected Components</h5>
                <ul className="list-unstyled">
                  {Object.entries(selectedComponents).map(([key, component]) => (
                    <li key={key} className="mb-2">
                      <strong>{key.toUpperCase()}:</strong>{' '}
                      {component ? (
                        <>
                          {component.name}
                          <br />
                          <small className="text-muted">
                            LKR {component.price.toLocaleString()}
                          </small>
                        </>
                      ) : (
                        'Not selected'
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
                <h5>Total Price</h5>
                <h3 className="text-primary">LKR {totalPrice.toLocaleString()}</h3>
                {selectedRange && (
                  <div className={`mt-2 ${totalPrice > budgetRanges.find(r => r.id === selectedRange)?.max ? 'text-danger' : 'text-success'}`}>
                    {totalPrice > budgetRanges.find(r => r.id === selectedRange)?.max ? (
                      <small>Exceeds budget range</small>
                    ) : (
                      <small>Within budget range</small>
                    )}
                  </div>
                )}
              </div>
              <Button 
                variant="success" 
                className="w-100"
                disabled={!Object.values(selectedComponents).every(comp => comp)}
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Enhanced Comparison Modal */}
      <Modal show={showComparison} onHide={() => setShowComparison(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {componentIcons[comparisonType]} Compare {comparisonType.toUpperCase()} Options
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Feature</th>
                  {comparisonItems.map(item => (
                    <th key={item.name} className="text-center">
                      <div className="mb-2">{item.icon || componentIcons[comparisonType]}</div>
                      <div>{item.name}</div>
                      <div className="text-primary">LKR {item.price.toLocaleString()}</div>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => handleSelectFromComparison(item)}
                      >
                        Select This
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Technical Specifications */}
                <tr className="table-primary">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Technical Specifications</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.specs && Object.keys(comparisonItems[0].specs).map(spec => (
                  <tr key={spec}>
                    <td><strong>{spec}</strong></td>
                    {comparisonItems.map(item => (
                      <td key={item.name} className="text-center">
                        {safeGet(item, `specs.${spec}`)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Functionality */}
                <tr className="table-success">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Functionality</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.features?.functionality && 
                  Object.entries(comparisonItems[0].features.functionality).map(([key, _]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      {comparisonItems.map(item => (
                        <td key={item.name} className="text-center">
                          {safeGet(item, `features.functionality.${key}`)}
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* Usage Scenarios */}
                <tr className="table-info">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Usage Scenarios</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.features?.usage && 
                  Object.entries(comparisonItems[0].features.usage).map(([key, _]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      {comparisonItems.map(item => (
                        <td key={item.name}>
                          {safeGet(item, `features.usage.${key}`)}
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* Unique Features */}
                <tr className="table-warning">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Unique Features</strong>
                  </td>
                </tr>
                <tr>
                  <td><strong>Special Features</strong></td>
                  {comparisonItems.map(item => (
                    <td key={item.name}>
                      <ul className="list-unstyled mb-0">
                        {(() => {
                          const features = safeGet(item, 'features.uniqueFeatures');
                          const featureArray = Array.isArray(features) ? features : ['N/A'];
                          return featureArray.map(feature => (
                          <li key={feature}>{feature}</li>
                          ));
                        })()}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Price Analysis */}
                <tr className="table-secondary">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Price Analysis</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.features?.priceAnalysis && 
                  Object.entries(comparisonItems[0].features.priceAnalysis).map(([key, _]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      {comparisonItems.map(item => (
                        <td key={item.name} className="text-center">
                          {safeGet(item, `features.priceAnalysis.${key}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowComparison(false)}>
            Close
          </Button>
          <Button 
            variant="info" 
            onClick={() => {
              // Show all available options for this component type
              const allOptions = componentOptions[comparisonType] || [];
              setComparisonItems(allOptions.slice(0, 5)); // Show top 5 options
            }}
          >
            Show More Options
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Checkout Confirmation Modal */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your PC Build</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12}>
              <h5>Build Summary</h5>
              <div className="mb-3">
                <strong>Usage Type:</strong> {usageTypes[usage]?.name || 'Not selected'}
              </div>
              <div className="mb-3">
                <strong>Budget Range:</strong> {budgetRanges.find(r => r.id === selectedRange)?.name || 'Not selected'}
              </div>
              <div className="mb-3">
                <strong>Selected Components:</strong>
                <div className="border rounded p-3 mt-2">
                  {Object.entries(selectedComponents).map(([key, component]) => (
                    <div key={key} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <strong>{key.toUpperCase()}:</strong> {component?.name || 'Not selected'}
                      </div>
                      {component && <span className="text-primary fw-bold">LKR {component.price.toLocaleString()}</span>}
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total:</h5>
                    <h4 className="mb-0 text-primary">LKR {totalPrice.toLocaleString()}</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCheckoutConfirm}>
            Proceed to Payment
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Popup */}
      <Checkout
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        customOrderItems={pcBuildItems}
        customOrderTotal={totalPrice}
        customOrderType="PC Build"
        onCustomOrderSuccess={handlePaymentSuccess}
      />

      {/* Technician Choice Modal */}
      <Modal show={showTechnicianChoice} onHide={() => setShowTechnicianChoice(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            Payment Successful!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <div className="text-success" style={{ fontSize: '3rem' }}>✅</div>
            <h4 className="text-success mb-2">Your PC Build Order is Confirmed!</h4>
            <p className="text-muted">What would you like to do next?</p>
          </div>
          
          <Row className="mb-4">
            <Col md={12}>
              <h5>Build Summary</h5>
              <div className="border rounded p-3">
                <div className="mb-2">
                  <strong>Usage Type:</strong> {usageTypes[usage]?.name || 'Not selected'}
                </div>
                <div className="mb-2">
                  <strong>Budget Range:</strong> {budgetRanges.find(r => r.id === selectedRange)?.name || 'Not selected'}
                </div>
                <div className="mb-2">
                  <strong>Total Amount:</strong> <span className="text-primary fw-bold">LKR {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row className="g-3">
            <Col md={6}>
              <Card className="h-100 text-center border-primary">
                <Card.Body>
                  <div className="mb-3">
                    <i className="bi bi-list-ul" style={{ fontSize: '2rem', color: '#0d6efd' }}></i>
                  </div>
                  <h6>View Your Orders</h6>
                  <p className="text-muted small">Check the status of your PC build order and track its progress.</p>
                  <Button 
                    variant="outline-primary" 
                    className="w-100"
                    onClick={handleGoToOrders}
                  >
                    Go to Orders
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 text-center border-success">
                <Card.Body>
                  <div className="mb-3">
                    <i className="bi bi-tools" style={{ fontSize: '2rem', color: '#198754' }}></i>
                  </div>
                  <h6>Assign Technician</h6>
                  <p className="text-muted small">Get a professional technician to build and set up your custom PC.</p>
                  <Button 
                    variant="outline-success" 
                    className="w-100"
                    onClick={handleAssignTechnician}
                  >
                    Assign Technician
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTechnicianChoice(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PCBuilder; 
