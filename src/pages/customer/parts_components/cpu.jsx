import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Table,
} from "react-bootstrap";
import { Cpu } from "react-bootstrap-icons";
import CustomerNavbar from "../../pageNavbars/CustomerNavbar";
import { toast } from "react-toastify";

// Add useBreakpoint hook
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("lg");
  useEffect(() => {
    function updateBreakpoint() {
      const width = window.innerWidth;
      if (width < 768) setBreakpoint("sm");
      else if (width < 992) setBreakpoint("md");
      else setBreakpoint("lg");
    }
    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);
  return breakpoint;
}

// Inline styles for card
const baseCardStyle = {
  boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1.5px 4px rgba(0,0,0,0.08)",
  borderRadius: 16,
  background: "#fff",
  transition:
    "box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1)",
  animation: "fadeInCard 0.6s ease",
  minHeight: 0,
};
const hoverCardStyle = {
  boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 3px 12px rgba(0,0,0,0.12)",
  transform: "translateY(-4px) scale(1.03)",
};

// Add fadeInCard keyframes to a style tag if not present
if (
  typeof document !== "undefined" &&
  !document.getElementById("fadeInCardKeyframes")
) {
  const style = document.createElement("style");
  style.id = "fadeInCardKeyframes";
  style.innerHTML = `@keyframes fadeInCard { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }`;
  document.head.appendChild(style);
}

export const cpuOptions = [
  {
    name: "Intel Core i9-13900K",
    price: 125000,
    tier: "high",
    specs: {
      cores: "24 (8P + 16E)",
      threads: "32",
      baseSpeed: "3.0 GHz",
      boostSpeed: "5.8 GHz",
      cache: "36MB",
      tdp: "125W",
    },
    features: {
      functionality: {
        gaming: "Excellent",
        productivity: "Outstanding",
        multitasking: "Superb",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for high-end gaming and streaming",
        workstation: "Ideal for professional content creation",
        productivity: "Excellent for heavy multitasking",
        overclocking: "Great overclocking potential",
      },
      uniqueFeatures: [
        "Hybrid Architecture (P-cores + E-cores)",
        "Intel Thermal Velocity Boost",
        "PCIe 5.0 Support",
        "DDR5 Memory Support",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "AMD Ryzen 9 7950X",
    price: 120000,
    tier: "high",
    specs: {
      cores: "16",
      threads: "32",
      baseSpeed: "4.5 GHz",
      boostSpeed: "5.7 GHz",
      cache: "80MB",
      tdp: "170W",
    },
    features: {
      functionality: {
        gaming: "Excellent",
        productivity: "Outstanding",
        multitasking: "Superb",
        powerEfficiency: "Medium",
      },
      usage: {
        gaming: "Great for gaming and streaming",
        workstation: "Excellent for content creation",
        productivity: "Superb for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "3D V-Cache Technology",
        "PCIe 5.0 Support",
        "DDR5 Memory Support",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "Intel Core i7-13700K",
    price: 85000,
    tier: "mid",
    specs: {
      cores: "16 (8P + 8E)",
      threads: "24",
      baseSpeed: "3.4 GHz",
      boostSpeed: "5.4 GHz",
      cache: "30MB",
      tdp: "125W",
    },
    features: {
      functionality: {
        gaming: "Very Good",
        productivity: "Excellent",
        multitasking: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for high-end gaming",
        workstation: "Good for content creation",
        productivity: "Excellent for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "Hybrid Architecture",
        "Intel Turbo Boost Max 3.0",
        "PCIe 5.0 Support",
        "DDR5 Memory Support",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "AMD Ryzen 7 7700X",
    price: 80000,
    tier: "mid",
    specs: {
      cores: "8",
      threads: "16",
      baseSpeed: "4.5 GHz",
      boostSpeed: "5.4 GHz",
      cache: "40MB",
      tdp: "105W",
    },
    features: {
      functionality: {
        gaming: "Very Good",
        productivity: "Excellent",
        multitasking: "Very Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Excellent for gaming",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "Zen 4 Architecture",
        "AMD Precision Boost 2",
        "PCIe 5.0 Support",
        "Advanced Security Features",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Professionals",
      },
    },
  },
  {
    name: "Intel Core i5-13600K",
    price: 65000,
    tier: "mid",
    specs: {
      cores: "14 (6P + 8E)",
      threads: "20",
      baseSpeed: "3.5 GHz",
      boostSpeed: "5.1 GHz",
      cache: "24MB",
      tdp: "125W",
    },
    features: {
      functionality: {
        gaming: "Good",
        productivity: "Very Good",
        multitasking: "Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "Hybrid Architecture",
        "Intel Turbo Boost 2.0",
        "PCIe 5.0 Support",
        "DDR5 Memory Support",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Mainstream Gamers",
      },
    },
  },
  {
    name: "AMD Ryzen 5 7600X",
    price: 60000,
    tier: "mid",
    specs: {
      cores: "6",
      threads: "12",
      baseSpeed: "4.7 GHz",
      boostSpeed: "5.3 GHz",
      cache: "38MB",
      tdp: "105W",
    },
    features: {
      functionality: {
        gaming: "Good",
        productivity: "Good",
        multitasking: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for basic content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "Zen 4 Architecture",
        "AMD Precision Boost 2",
        "PCIe 5.0 Support",
        "Advanced Security Features",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Mainstream Users",
      },
    },
  },
  {
    name: "Intel Core i3-13100",
    price: 35000,
    tier: "low",
    specs: {
      cores: "4",
      threads: "8",
      baseSpeed: "3.4 GHz",
      boostSpeed: "4.5 GHz",
      cache: "12MB",
      tdp: "60W",
    },
    features: {
      functionality: {
        gaming: "Basic",
        productivity: "Good",
        multitasking: "Basic",
        powerEfficiency: "Excellent",
      },
      usage: {
        gaming: "Basic gaming",
        workstation: "Basic productivity",
        productivity: "Good for office work",
        overclocking: "Limited overclocking",
      },
      uniqueFeatures: [
        "Intel UHD Graphics 730",
        "Intel Turbo Boost 2.0",
        "PCIe 4.0 Support",
        "DDR4/DDR5 Memory Support",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Good",
        targetMarket: "Budget Users",
      },
    },
  },
  {
    name: "AMD Ryzen 5 5600X",
    price: 40000,
    tier: "low",
    specs: {
      cores: "6",
      threads: "12",
      baseSpeed: "3.7 GHz",
      boostSpeed: "4.6 GHz",
      cache: "35MB",
      tdp: "65W",
    },
    features: {
      functionality: {
        gaming: "Good",
        productivity: "Good",
        multitasking: "Good",
        powerEfficiency: "Excellent",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for basic content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "Zen 3 Architecture",
        "AMD Precision Boost 2",
        "PCIe 4.0 Support",
        "Advanced Security Features",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Budget Gamers",
      },
    },
  },
  // 8th CPU
  {
    name: "Intel Pentium Gold G6400",
    price: 18000,
    tier: "low",
    specs: {
      cores: "2",
      threads: "4",
      baseSpeed: "4.0 GHz",
      boostSpeed: "-",
      cache: "4MB",
      tdp: "58W",
    },
    features: {
      functionality: {
        gaming: "Entry",
        productivity: "Entry",
        multitasking: "Entry",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Entry-level gaming",
        workstation: "Entry-level tasks",
        productivity: "Basic office work",
        overclocking: "Not supported",
      },
      uniqueFeatures: ["Affordable", "Intel UHD Graphics 610", "DDR4 Support"],
      priceAnalysis: {
        value: "Budget",
        performancePerRupee: "Good",
        targetMarket: "Entry Users",
      },
    },
  },
  // 9th CPU
  {
    name: "AMD Athlon 3000G",
    price: 15000,
    tier: "low",
    specs: {
      cores: "2",
      threads: "4",
      baseSpeed: "3.5 GHz",
      boostSpeed: "-",
      cache: "5MB",
      tdp: "35W",
    },
    features: {
      functionality: {
        gaming: "Entry",
        productivity: "Entry",
        multitasking: "Entry",
        powerEfficiency: "Excellent",
      },
      usage: {
        gaming: "Entry-level gaming",
        workstation: "Entry-level tasks",
        productivity: "Basic office work",
        overclocking: "Not supported",
      },
      uniqueFeatures: [
        "Affordable",
        "AMD Radeon Vega 3 Graphics",
        "DDR4 Support",
      ],
      priceAnalysis: {
        value: "Budget",
        performancePerRupee: "Good",
        targetMarket: "Entry Users",
      },
    },
  },
  // 10th CPU
  {
    name: "Intel Core i9-12900K",
    price: 110000,
    tier: "high",
    specs: {
      cores: "16 (8P + 8E)",
      threads: "24",
      baseSpeed: "3.2 GHz",
      boostSpeed: "5.2 GHz",
      cache: "30MB",
      tdp: "125W",
    },
    features: {
      functionality: {
        gaming: "Excellent",
        productivity: "Outstanding",
        multitasking: "Superb",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for high-end gaming and streaming",
        workstation: "Ideal for professional content creation",
        productivity: "Excellent for heavy multitasking",
        overclocking: "Great overclocking potential",
      },
      uniqueFeatures: [
        "Hybrid Architecture (P-cores + E-cores)",
        "Intel Turbo Boost Max 3.0",
        "PCIe 5.0 Support",
        "DDR5 Memory Support",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  // 11th CPU
  {
    name: "AMD Ryzen 9 5900X",
    price: 95000,
    tier: "high",
    specs: {
      cores: "12",
      threads: "24",
      baseSpeed: "3.7 GHz",
      boostSpeed: "4.8 GHz",
      cache: "70MB",
      tdp: "105W",
    },
    features: {
      functionality: {
        gaming: "Excellent",
        productivity: "Outstanding",
        multitasking: "Superb",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Great for gaming and streaming",
        workstation: "Excellent for content creation",
        productivity: "Superb for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: ["PCIe 4.0 Support", "DDR4 Memory Support"],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  // 12th CPU
  {
    name: "Intel Core i5-12400F",
    price: 35000,
    tier: "low",
    specs: {
      cores: "6",
      threads: "12",
      baseSpeed: "2.5 GHz",
      boostSpeed: "4.4 GHz",
      cache: "18MB",
      tdp: "65W",
    },
    features: {
      functionality: {
        gaming: "Very Good",
        productivity: "Good",
        multitasking: "Good",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Great for budget gaming",
        workstation: "Good for light content creation",
        productivity: "Good for multitasking",
        overclocking: "No overclocking",
      },
      uniqueFeatures: ["Affordable Hexa-Core", "Efficient Performance"],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Budget Users",
      },
    },
  },
  // 13th CPU
  {
    name: "AMD Ryzen 7 5800X",
    price: 60000,
    tier: "mid",
    specs: {
      cores: "8",
      threads: "16",
      baseSpeed: "3.8 GHz",
      boostSpeed: "4.7 GHz",
      cache: "36MB",
      tdp: "105W",
    },
    features: {
      functionality: {
        gaming: "Very Good",
        productivity: "Excellent",
        multitasking: "Very Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Excellent for gaming",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "Zen 3 Architecture",
        "PCIe 4.0 Support",
        "Advanced Security Features",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Professionals",
      },
    },
  },
  // 14th CPU
  {
    name: "Intel Core i7-12700F",
    price: 70000,
    tier: "mid",
    specs: {
      cores: "12 (8P + 4E)",
      threads: "20",
      baseSpeed: "2.1 GHz",
      boostSpeed: "4.9 GHz",
      cache: "25MB",
      tdp: "65W",
    },
    features: {
      functionality: {
        gaming: "Very Good",
        productivity: "Excellent",
        multitasking: "Very Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Excellent for gaming",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        overclocking: "Not supported",
      },
      uniqueFeatures: [
        "Hybrid Architecture",
        "PCIe 5.0 Support",
        "DDR5 Memory Support",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Professionals",
      },
    },
  },
  // 15th CPU
  {
    name: "AMD Ryzen 3 3200G",
    price: 20000,
    tier: "low",
    specs: {
      cores: "4",
      threads: "4",
      baseSpeed: "3.6 GHz",
      boostSpeed: "4.0 GHz",
      cache: "6MB",
      tdp: "65W",
    },
    features: {
      functionality: {
        gaming: "Entry",
        productivity: "Entry",
        multitasking: "Entry",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Entry-level gaming",
        workstation: "Entry-level tasks",
        productivity: "Basic office work",
        overclocking: "Not supported",
      },
      uniqueFeatures: [
        "Affordable",
        "AMD Radeon Vega 8 Graphics",
        "DDR4 Support",
      ],
      priceAnalysis: {
        value: "Budget",
        performancePerRupee: "Good",
        targetMarket: "Entry Users",
      },
    },
  },
  {
    name: "Intel Core i3-10100F",
    price: 18000,
    tier: "low",
    specs: {
      cores: "4",
      threads: "8",
      baseSpeed: "3.6 GHz",
      boostSpeed: "4.3 GHz",
      cache: "6MB",
      tdp: "65W",
    },
    features: {
      functionality: {
        gaming: "Good",
        productivity: "Adequate",
        multitasking: "Basic",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Entry-level gaming and office tasks",
        workstation: "Not recommended",
        productivity: "Good for basic tasks",
        overclocking: "No overclocking",
      },
      uniqueFeatures: [
        "Affordable Quad-Core",
        "Hyper-Threading",
        "Low Power Consumption",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Budget Users",
      },
    },
  },
];

// Add internal CSS for responsive table styling
const cpuTableResponsiveStyle = `
  @media (max-width: 991.98px) {
    .cpu-table-sm .cpu-img {
      width: 18px !important;
      height: 18px !important;
      min-width: 18px !important;
      min-height: 18px !important;
      max-width: 18px !important;
      max-height: 18px !important;
      margin-right: 4px !important;
      border-radius: 4px !important;
      object-fit: cover;
    }
  }
  @media (max-width: 576px) {
    .cpu-table-sm td, .cpu-table-sm th {
      padding: 0.25rem 0.3rem !important;
      font-size: 0.85rem !important;
    }
    .cpu-table-sm .cpu-name {
      font-size: 0.95rem !important;
    }
    .cpu-table-sm .btn {
      font-size: 0.8rem !important;
      padding: 0.2rem 0.5rem !important;
    }
  }
`;

const selectCpuHeadingStyle = `
  .select-cpu-heading {
    font-size: 2.1rem;
    font-weight: 700;
    color: #1a237e;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 8px rgba(26,35,126,0.08);
    margin-bottom: 0;
    margin-top: 0.2em;
    line-height: 1.1;
  }
`;

export default function CPUPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();

  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;

  const [priceSort, setPriceSort] = useState("default"); // 'default', 'asc', or 'desc'
  const [originalCpuOrder] = useState(cpuOptions);

  let sortedCpus;
  if (priceSort === "asc") {
    sortedCpus = [...cpuOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedCpus = [...cpuOptions].sort((a, b) => b.price - a.price);
  } else {
    sortedCpus = originalCpuOrder;
  }

  const handleToggleCompare = (option) => {
    setCompareSelection((prev) => {
      if (prev.some((item) => item.name === option.name)) {
        return prev.filter((item) => item.name !== option.name);
      } else {
        if (prev.length >= maxCompare) {
          toast.warning(
            `You can only compare up to ${maxCompare} CPUs at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };

  const handleSelectCPU = (cpu) => {
    const { icon, ...cpuWithoutIcon } = cpu;
    sessionStorage.setItem("selected_cpu", JSON.stringify(cpuWithoutIcon));
    toast.success(`Selected ${cpu.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?cpuSelected=1");
    }, 1000);
  };

  const handleCompareClick = () => {
    // You can use sessionStorage or navigate state to pass data
    sessionStorage.setItem("compare_cpus", JSON.stringify(compareSelection));
    navigate("/compare-cpu");
  };

  const handleTogglePriceSort = () => {
    setPriceSort((prev) =>
      prev === "default" ? "asc" : prev === "asc" ? "desc" : "default"
    );
  };

  return (
    <>
      <CustomerNavbar />
      <Container className="py-5">
        <style>{selectCpuHeadingStyle}</style>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 select-cpu-heading">Select CPU</h1>
          <div>
            <Button
              variant="outline-primary"
              size="sm"
              className="me-2"
              onClick={handleTogglePriceSort}
            >
              Price:{" "}
              {priceSort === "default"
                ? "Default"
                : priceSort === "asc"
                ? "Low to High"
                : "High to Low"}
            </Button>
            {compareSelection.length >= 2 && (
              <Button className="btn-darkblue" onClick={handleCompareClick}>
                Compare Selected ({compareSelection.length})
              </Button>
            )}
          </div>
        </div>
        <style>{cpuTableResponsiveStyle}</style>
        <Table striped bordered hover responsive className="cpu-table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Core Count</th>
              <th>Performance Core Clock</th>
              <th>Performance Core Boost Clock</th>
              <th>Microarchitecture</th>
              <th>TDP</th>
              <th>Integrated Graphics</th>
              <th>Rating</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedCpus.map((cpu) => (
              <tr key={cpu.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === cpu.name
                    )}
                    onChange={() => handleToggleCompare(cpu)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={cpu.icon || "/profile_images/user_image.jpg"}
                    alt={cpu.name}
                    className="cpu-img"
                  />
                  <strong className="cpu-name">{cpu.name}</strong>
                </td>
                <td>{cpu.specs.cores}</td>
                <td>{cpu.specs.baseSpeed}</td>
                <td>{cpu.specs.boostSpeed}</td>
                <td>{cpu.features.microarchitecture || "—"}</td>
                <td>{cpu.specs.tdp}</td>
                <td>{cpu.features.integratedGraphics || "—"}</td>
                <td>
                  {/* Render stars and count if available */}
                  <span style={{ color: "#f5a623" }}>★★★★★</span>{" "}
                  <span style={{ color: "#888" }}>(123)</span>
                </td>
                <td>LKR {cpu.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelectCPU(cpu)}>
                    Add
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
