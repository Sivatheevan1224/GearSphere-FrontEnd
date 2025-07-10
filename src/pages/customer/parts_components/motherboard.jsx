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

export const motherboardOptions = [
  {
    name: "ASUS ROG Strix Z790-E Gaming",
    price: 120000,
    tier: "high",
    specs: {
      chipset: "Intel Z790",
      socket: "LGA1700",
      formFactor: "ATX",
      memorySlots: "4",
      maxMemory: "128GB DDR5",
      memorySpeed: "7800+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Excellent",
        connectivity: "Outstanding",
        features: "Superb",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for high-end gaming builds",
        workstation: "Ideal for professional workstations",
        productivity: "Excellent for heavy multitasking",
        overclocking: "Great overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 5.0 Support",
        "WiFi 6E",
        "2.5GbE LAN",
        "Thunderbolt 4",
        "USB 3.2 Gen 2x2",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "MSI MAG B650 Tomahawk WiFi",
    price: 75000,
    tier: "mid",
    specs: {
      chipset: "AMD B650",
      socket: "AM5",
      formFactor: "ATX",
      memorySlots: "4",
      maxMemory: "128GB DDR5",
      memorySpeed: "6600+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Very Good",
        connectivity: "Excellent",
        features: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for gaming builds",
        workstation: "Good for content creation",
        productivity: "Excellent for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "WiFi 6",
        "2.5GbE LAN",
        "USB 3.2 Gen 2",
        "M.2 Shield Frozr",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "Gigabyte B760M DS3H AX",
    price: 42000,
    tier: "mid",
    specs: {
      chipset: "Intel B760",
      socket: "LGA1700",
      formFactor: "mATX",
      memorySlots: "4",
      maxMemory: "128GB DDR4",
      memorySpeed: "5333+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Good",
        connectivity: "Very Good",
        features: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "WiFi 6",
        "2.5GbE LAN",
        "USB 3.2 Gen 1",
        "Q-Flash Plus",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Mainstream Users",
      },
    },
  },
  {
    name: "ASRock X670E Taichi",
    price: 135000,
    tier: "high",
    specs: {
      chipset: "AMD X670E",
      socket: "AM5",
      formFactor: "ATX",
      memorySlots: "4",
      maxMemory: "128GB DDR5",
      memorySpeed: "6600+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Outstanding",
        connectivity: "Superb",
        features: "Outstanding",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for extreme gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Superb for heavy workloads",
        overclocking: "Excellent overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 5.0 Support",
        "WiFi 6E",
        "10GbE LAN",
        "Thunderbolt 4",
        "USB 3.2 Gen 2x2",
        "20+2+2 Phase VRM",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "ASUS PRIME H610M-E D4",
    price: 25000,
    tier: "low",
    specs: {
      chipset: "Intel H610",
      socket: "LGA1700",
      formFactor: "mATX",
      memorySlots: "2",
      maxMemory: "64GB DDR4",
      memorySpeed: "3200 MHz",
    },
    features: {
      functionality: {
        overclocking: "Basic",
        connectivity: "Good",
        features: "Basic",
        powerEfficiency: "Excellent",
      },
      usage: {
        gaming: "Basic gaming",
        workstation: "Basic productivity",
        productivity: "Good for office work",
        overclocking: "Not supported",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "1GbE LAN",
        "USB 3.2 Gen 1",
        "ASUS EZ DIY",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Good",
        targetMarket: "Budget Users",
      },
    },
  },
  {
    name: "MSI PRO B550M-VC",
    price: 32000,
    tier: "low",
    specs: {
      chipset: "AMD B550",
      socket: "AM4",
      formFactor: "mATX",
      memorySlots: "4",
      maxMemory: "128GB DDR4",
      memorySpeed: "5100+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Good",
        connectivity: "Good",
        features: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for basic content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "1GbE LAN",
        "USB 3.2 Gen 1",
        "M.2 Shield",
        "Core Boost",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Budget Gamers",
      },
    },
  },
  {
    name: "Gigabyte Z690 AORUS Master",
    price: 110000,
    tier: "high",
    specs: {
      chipset: "Intel Z690",
      socket: "LGA1700",
      formFactor: "ATX",
      memorySlots: "4",
      maxMemory: "128GB DDR5",
      memorySpeed: "6666+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Excellent",
        connectivity: "Outstanding",
        features: "Superb",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for high-end gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Excellent for heavy workloads",
        overclocking: "Great overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 5.0 Support",
        "WiFi 6E",
        "2.5GbE LAN",
        "Thunderbolt 4",
        "USB 3.2 Gen 2x2",
        "20+1+2 Phase VRM",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "ASRock B650M Pro RS",
    price: 38000,
    tier: "low",
    specs: {
      chipset: "AMD B650",
      socket: "AM5",
      formFactor: "mATX",
      memorySlots: "4",
      maxMemory: "128GB DDR5",
      memorySpeed: "6600+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Good",
        connectivity: "Good",
        features: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for basic content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "1GbE LAN",
        "USB 3.2 Gen 1",
        "Dr. MOS",
        "Steel Slot",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Budget Gamers",
      },
    },
  },
  {
    name: "ASUS TUF Gaming B760M-Plus WiFi",
    price: 55000,
    tier: "mid",
    specs: {
      chipset: "Intel B760",
      socket: "LGA1700",
      formFactor: "mATX",
      memorySlots: "4",
      maxMemory: "128GB DDR4",
      memorySpeed: "5333+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Very Good",
        connectivity: "Very Good",
        features: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for gaming",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "WiFi 6",
        "2.5GbE LAN",
        "USB 3.2 Gen 2",
        "TUF Protection",
        "Military Grade Capacitors",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "MSI MPG B550 Gaming Edge WiFi",
    price: 45000,
    tier: "mid",
    specs: {
      chipset: "AMD B550",
      socket: "AM4",
      formFactor: "ATX",
      memorySlots: "4",
      maxMemory: "128GB DDR4",
      memorySpeed: "5100+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Very Good",
        connectivity: "Very Good",
        features: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for gaming",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "WiFi 6",
        "2.5GbE LAN",
        "USB 3.2 Gen 2",
        "M.2 Shield Frozr",
        "Audio Boost 4",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "Gigabyte H610M S2H",
    price: 18000,
    tier: "low",
    specs: {
      chipset: "Intel H610",
      socket: "LGA1700",
      formFactor: "mATX",
      memorySlots: "2",
      maxMemory: "64GB DDR4",
      memorySpeed: "3200 MHz",
    },
    features: {
      functionality: {
        overclocking: "Basic",
        connectivity: "Basic",
        features: "Basic",
        powerEfficiency: "Excellent",
      },
      usage: {
        gaming: "Entry-level gaming",
        workstation: "Entry-level tasks",
        productivity: "Basic office work",
        overclocking: "Not supported",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "1GbE LAN",
        "USB 3.2 Gen 1",
        "Q-Flash Plus",
        "Ultra Durable",
      ],
      priceAnalysis: {
        value: "Budget",
        performancePerRupee: "Good",
        targetMarket: "Entry Users",
      },
    },
  },
  {
    name: "ASRock A520M-HDV",
    price: 15000,
    tier: "low",
    specs: {
      chipset: "AMD A520",
      socket: "AM4",
      formFactor: "mATX",
      memorySlots: "2",
      maxMemory: "64GB DDR4",
      memorySpeed: "4600+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Basic",
        connectivity: "Basic",
        features: "Basic",
        powerEfficiency: "Excellent",
      },
      usage: {
        gaming: "Entry-level gaming",
        workstation: "Entry-level tasks",
        productivity: "Basic office work",
        overclocking: "Not supported",
      },
      uniqueFeatures: [
        "PCIe 3.0 Support",
        "1GbE LAN",
        "USB 3.2 Gen 1",
        "Steel Slot",
        "Ultra M.2",
      ],
      priceAnalysis: {
        value: "Budget",
        performancePerRupee: "Good",
        targetMarket: "Entry Users",
      },
    },
  },
  {
    name: "ASUS ROG Strix B760-F Gaming WiFi",
    price: 85000,
    tier: "mid",
    specs: {
      chipset: "Intel B760",
      socket: "LGA1700",
      formFactor: "ATX",
      memorySlots: "4",
      maxMemory: "128GB DDR5",
      memorySpeed: "7800+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Very Good",
        connectivity: "Excellent",
        features: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for gaming",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "WiFi 6E",
        "2.5GbE LAN",
        "USB 3.2 Gen 2x2",
        "ROG SupremeFX Audio",
        "Aura Sync RGB",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "MSI MEG X670E ACE",
    price: 150000,
    tier: "high",
    specs: {
      chipset: "AMD X670E",
      socket: "AM5",
      formFactor: "ATX",
      memorySlots: "4",
      maxMemory: "128GB DDR5",
      memorySpeed: "6666+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Outstanding",
        connectivity: "Superb",
        features: "Outstanding",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for extreme gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Superb for heavy workloads",
        overclocking: "Excellent overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 5.0 Support",
        "WiFi 6E",
        "10GbE LAN",
        "Thunderbolt 4",
        "USB 3.2 Gen 2x2",
        "22+2+1 Phase VRM",
        "M.2 Shield Frozr",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "Gigabyte B660M DS3H",
    price: 28000,
    tier: "low",
    specs: {
      chipset: "Intel B660",
      socket: "LGA1700",
      formFactor: "mATX",
      memorySlots: "4",
      maxMemory: "128GB DDR4",
      memorySpeed: "5333+ MHz",
    },
    features: {
      functionality: {
        overclocking: "Good",
        connectivity: "Good",
        features: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for basic content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "1GbE LAN",
        "USB 3.2 Gen 1",
        "Q-Flash Plus",
        "Ultra Durable",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Budget Gamers",
      },
    },
  },
  {
    name: "ASUS PRIME H410M-E",
    price: 13000,
    tier: "low",
    specs: {
      chipset: "Intel H410",
      socket: "LGA1200",
      formFactor: "mATX",
      memorySlots: "2",
      maxMemory: "64GB DDR4",
      memorySpeed: "2933 MHz",
    },
    features: {
      functionality: {
        overclocking: "None",
        connectivity: "Basic",
        features: "Basic",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Entry-level gaming",
        workstation: "Not recommended",
        productivity: "Basic office tasks",
        overclocking: "No overclocking",
      },
      uniqueFeatures: ["Affordable", "Compact Size", "Essential Connectivity"],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Budget Users",
      },
    },
  },
  {
    name: "MSI B560M PRO-VDH",
    price: 20000,
    tier: "low",
    specs: {
      chipset: "Intel B560",
      socket: "LGA1200",
      formFactor: "mATX",
      memorySlots: "4",
      maxMemory: "128GB DDR4",
      memorySpeed: "5000 MHz",
    },
    features: {
      functionality: {
        overclocking: "None",
        connectivity: "Good",
        features: "Good",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Good for budget gaming",
        workstation: "Good for light content creation",
        productivity: "Good for multitasking",
        overclocking: "No overclocking",
      },
      uniqueFeatures: ["Affordable", "4 RAM Slots", "M.2 Support"],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Budget Users",
      },
    },
  },
];

// Add internal CSS for responsive table styling
const motherboardTableResponsiveStyle = `
  .motherboard-table-sm .mb-img {
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    max-width: 24px;
    max-height: 24px;
    margin-right: 8px;
    border-radius: 4px;
    object-fit: cover;
  }
  @media (max-width: 991.98px) {
    .motherboard-table-sm .mb-img {
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
    .motherboard-table-sm td, .motherboard-table-sm th {
      padding: 0.25rem 0.3rem !important;
      font-size: 0.85rem !important;
    }
    .motherboard-table-sm .mb-name {
      font-size: 0.95rem !important;
    }
    .motherboard-table-sm .btn {
      font-size: 0.8rem !important;
      padding: 0.2rem 0.5rem !important;
    }
  }
`;

const selectMotherboardHeadingStyle = `
  .select-mb-heading {
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

export default function MotherboardPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();

  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;

  const [priceSort, setPriceSort] = useState("default"); // 'default', 'asc', or 'desc'
  const [originalMbOrder] = useState(motherboardOptions);

  let sortedMotherboards;
  if (priceSort === "asc") {
    sortedMotherboards = [...motherboardOptions].sort(
      (a, b) => a.price - b.price
    );
  } else if (priceSort === "desc") {
    sortedMotherboards = [...motherboardOptions].sort(
      (a, b) => b.price - a.price
    );
  } else {
    sortedMotherboards = originalMbOrder;
  }

  const handleToggleCompare = (option) => {
    setCompareSelection((prev) => {
      if (prev.some((item) => item.name === option.name)) {
        return prev.filter((item) => item.name !== option.name);
      } else {
        if (prev.length >= maxCompare) {
          toast.warning(
            `You can only compare up to ${maxCompare} Motherboards at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };

  const handleSelectMotherboard = (mb) => {
    const { icon, ...mbWithoutIcon } = mb;
    sessionStorage.setItem(
      "selected_motherboard",
      JSON.stringify(mbWithoutIcon)
    );
    toast.success(`Selected ${mb.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?motherboardSelected=1");
    }, 1000);
  };

  const handleCompareClick = () => {
    sessionStorage.setItem(
      "compare_motherboards",
      JSON.stringify(compareSelection)
    );
    navigate("/compare-motherboard");
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
        <style>{selectMotherboardHeadingStyle}</style>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 select-mb-heading">Select Motherboard</h1>
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
        <style>{motherboardTableResponsiveStyle}</style>
        <Table
          striped
          bordered
          hover
          responsive
          className="motherboard-table-sm"
        >
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Chipset</th>
              <th>Socket</th>
              <th>Form Factor</th>
              <th>Memory Slots</th>
              <th>Max Memory</th>
              <th>Memory Speed</th>
              <th>Rating</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedMotherboards.map((mb) => (
              <tr key={mb.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === mb.name
                    )}
                    onChange={() => handleToggleCompare(mb)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={mb.icon || "/profile_images/user_image.jpg"}
                    alt={mb.name}
                    className="mb-img"
                  />
                  <strong className="mb-name">{mb.name}</strong>
                </td>
                <td>{mb.specs.chipset}</td>
                <td>{mb.specs.socket}</td>
                <td>{mb.specs.formFactor}</td>
                <td>{mb.specs.memorySlots}</td>
                <td>{mb.specs.maxMemory}</td>
                <td>{mb.specs.memorySpeed}</td>
                <td>
                  <span style={{ color: "#f5a623" }}>★★★★★</span>{" "}
                  <span style={{ color: "#888" }}>(123)</span>
                </td>
                <td>LKR {mb.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelectMotherboard(mb)}>
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
