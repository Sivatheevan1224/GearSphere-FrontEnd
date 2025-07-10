import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Table, Form } from "react-bootstrap";

import CustomerNavbar from "../../pageNavbars/CustomerNavbar";
import { toast } from "react-toastify";

// Breakpoint hook for responsive comparison limits
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("lg");

  React.useEffect(() => {
    function updateBreakpoint() {
      const width = window.innerWidth;
      if (width < 576) setBreakpoint("sm");
      else if (width < 992) setBreakpoint("md");
      else setBreakpoint("lg");
    }

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}

export const memoryOptions = [
  {
    name: "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600",
    price: 25000,
    tier: "high",
    specs: {
      capacity: "32GB (2x16GB)",
      type: "DDR4",
      speed: "3600 MHz",
      latency: "CL18",
      voltage: "1.35V",
    },
    features: {
      functionality: {
        performance: "Excellent",
        compatibility: "Outstanding",
        reliability: "Superb",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for high-end gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Excellent for heavy multitasking",
        overclocking: "Great overclocking potential",
      },
      uniqueFeatures: [
        "RGB Lighting",
        "XMP 2.0 Support",
        "Aluminum Heat Spreader",
        "Lifetime Warranty",
        "Intel XMP Ready",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "G.Skill Ripjaws V 16GB (2x8GB) DDR4-3200",
    price: 12000,
    tier: "mid",
    specs: {
      capacity: "16GB (2x8GB)",
      type: "DDR4",
      speed: "3200 MHz",
      latency: "CL16",
      voltage: "1.35V",
    },
    features: {
      functionality: {
        performance: "Very Good",
        compatibility: "Excellent",
        reliability: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for gaming builds",
        workstation: "Good for content creation",
        productivity: "Excellent for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "XMP 2.0 Support",
        "Aluminum Heat Spreader",
        "Lifetime Warranty",
        "Intel XMP Ready",
        "AMD Ryzen Optimized",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "Crucial Ballistix 8GB (1x8GB) DDR4-2666",
    price: 6000,
    tier: "low",
    specs: {
      capacity: "8GB (1x8GB)",
      type: "DDR4",
      speed: "2666 MHz",
      latency: "CL19",
      voltage: "1.2V",
    },
    features: {
      functionality: {
        performance: "Good",
        compatibility: "Very Good",
        reliability: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for basic gaming",
        workstation: "Adequate for basic content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "XMP 2.0 Support",
        "Aluminum Heat Spreader",
        "Limited Lifetime Warranty",
        "Intel XMP Ready",
        "Low Power Consumption",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Mainstream Users",
      },
    },
  },
  {
    name: "Kingston Fury Beast 64GB (2x32GB) DDR5-6000",
    price: 45000,
    tier: "high",
    specs: {
      capacity: "64GB (2x32GB)",
      type: "DDR5",
      speed: "6000 MHz",
      latency: "CL40",
      voltage: "1.35V",
    },
    features: {
      functionality: {
        performance: "Outstanding",
        compatibility: "Superb",
        reliability: "Outstanding",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for extreme gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Superb for heavy workloads",
        overclocking: "Excellent overclocking potential",
      },
      uniqueFeatures: [
        "DDR5 Technology",
        "XMP 3.0 Support",
        "Aluminum Heat Spreader",
        "Lifetime Warranty",
        "Intel XMP Ready",
        "On-Die ECC",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "TeamGroup T-Force Vulcan Z 16GB (2x8GB) DDR4-3000",
    price: 9000,
    tier: "low",
    specs: {
      capacity: "16GB (2x8GB)",
      type: "DDR4",
      speed: "3000 MHz",
      latency: "CL16",
      voltage: "1.35V",
    },
    features: {
      functionality: {
        performance: "Good",
        compatibility: "Good",
        reliability: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Adequate for basic content creation",
        productivity: "Good for multitasking",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "XMP 2.0 Support",
        "Aluminum Heat Spreader",
        "Limited Lifetime Warranty",
        "Intel XMP Ready",
        "AMD Ryzen Optimized",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Budget Gamers",
      },
    },
  },
  {
    name: "Patriot Viper Steel 32GB (2x16GB) DDR4-4400",
    price: 35000,
    tier: "high",
    specs: {
      capacity: "32GB (2x16GB)",
      type: "DDR4",
      speed: "4400 MHz",
      latency: "CL19",
      voltage: "1.45V",
    },
    features: {
      functionality: {
        performance: "Outstanding",
        compatibility: "Excellent",
        reliability: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Perfect for high-end gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Excellent for heavy workloads",
        overclocking: "Excellent overclocking potential",
      },
      uniqueFeatures: [
        "XMP 2.0 Support",
        "Aluminum Heat Spreader",
        "Lifetime Warranty",
        "Intel XMP Ready",
        "High Performance",
        "Low Latency",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "ADATA XPG Gammix D10 8GB (1x8GB) DDR4-3200",
    price: 7000,
    tier: "low",
    specs: {
      capacity: "8GB (1x8GB)",
      type: "DDR4",
      speed: "3200 MHz",
      latency: "CL16",
      voltage: "1.35V",
    },
    features: {
      functionality: {
        performance: "Good",
        compatibility: "Good",
        reliability: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for basic gaming",
        workstation: "Adequate for basic tasks",
        productivity: "Good for office work",
        overclocking: "Moderate overclocking potential",
      },
      uniqueFeatures: [
        "XMP 2.0 Support",
        "Aluminum Heat Spreader",
        "Limited Lifetime Warranty",
        "Intel XMP Ready",
        "AMD Ryzen Optimized",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Budget Users",
      },
    },
  },
  {
    name: "Kingston Fury Beast 16GB (2x8GB) DDR4-3200",
    price: 15000,
    tier: "low",
    specs: {
      capacity: "16GB (2x8GB)",
      type: "DDR4",
      speed: "3200 MHz",
      latency: "CL16",
      voltage: "1.35V",
    },
    features: {
      functionality: {
        performance: "Good",
        compatibility: "Good",
        reliability: "Good",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Good for gaming",
        workstation: "Good for light content creation",
        productivity: "Good for multitasking",
        overclocking: "No overclocking",
      },
      uniqueFeatures: ["Affordable", "Lifetime Warranty"],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Budget Users",
      },
    },
  },
  {
    name: "Corsair Dominator Platinum RGB 64GB (2x32GB) DDR5-7200",
    price: 65000,
    tier: "high",
    specs: {
      capacity: "64GB (2x32GB)",
      type: "DDR5",
      speed: "7200 MHz",
      latency: "CL36",
      voltage: "1.4V",
    },
    features: {
      functionality: {
        performance: "Outstanding",
        compatibility: "Superb",
        reliability: "Outstanding",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for extreme gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Superb for heavy workloads",
        overclocking: "Excellent overclocking potential",
      },
      uniqueFeatures: [
        "DDR5 Technology",
        "RGB Lighting",
        "XMP 3.0 Support",
        "Aluminum Heat Spreader",
        "Lifetime Warranty",
        "Intel XMP Ready",
        "On-Die ECC",
        "Premium Design",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400",
    price: 38000,
    tier: "high",
    specs: {
      capacity: "32GB (2x16GB)",
      type: "DDR5",
      speed: "6400 MHz",
      latency: "CL32",
      voltage: "1.4V",
    },
    features: {
      functionality: {
        performance: "Outstanding",
        compatibility: "Excellent",
        reliability: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Perfect for high-end gaming",
        workstation: "Ideal for professional workstations",
        productivity: "Excellent for heavy workloads",
        overclocking: "Excellent overclocking potential",
      },
      uniqueFeatures: [
        "DDR5 Technology",
        "RGB Lighting",
        "XMP 3.0 Support",
        "Aluminum Heat Spreader",
        "Lifetime Warranty",
        "Intel XMP Ready",
        "On-Die ECC",
        "Low Latency",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "Crucial P5 Plus 16GB (2x8GB) DDR4-3600",
    price: 15000,
    tier: "mid",
    specs: {
      capacity: "16GB (2x8GB)",
      type: "DDR4",
      speed: "3600 MHz",
      latency: "CL18",
      voltage: "1.35V",
    },
    features: {
      functionality: {
        performance: "Very Good",
        compatibility: "Excellent",
        reliability: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for gaming",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        overclocking: "Good overclocking potential",
      },
      uniqueFeatures: [
        "XMP 2.0 Support",
        "Aluminum Heat Spreader",
        "Limited Lifetime Warranty",
        "Intel XMP Ready",
        "AMD Ryzen Optimized",
        "Micron ICs",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
];

// Add internal CSS for responsive table styling
const memoryTableResponsiveStyle = `
  .memory-table-sm .memory-img {
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
    .memory-table-sm .memory-img {
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
    .memory-table-sm td, .memory-table-sm th {
      padding: 0.25rem 0.3rem !important;
      font-size: 0.85rem !important;
    }
    .memory-table-sm .memory-name {
      font-size: 0.95rem !important;
    }
    .memory-table-sm .btn {
      font-size: 0.8rem !important;
      padding: 0.2rem 0.5rem !important;
    }
  }
`;

const selectMemoryHeadingStyle = `
  .select-memory-heading {
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

export default function MemoryPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();

  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;

  const [priceSort, setPriceSort] = useState("default"); // 'default', 'asc', or 'desc'
  const [originalMemoryOrder] = useState(memoryOptions);

  let sortedMemory;
  if (priceSort === "asc") {
    sortedMemory = [...memoryOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedMemory = [...memoryOptions].sort((a, b) => b.price - a.price);
  } else {
    sortedMemory = originalMemoryOrder;
  }

  const handleToggleCompare = (option) => {
    setCompareSelection((prev) => {
      if (prev.some((item) => item.name === option.name)) {
        return prev.filter((item) => item.name !== option.name);
      } else {
        if (prev.length >= maxCompare) {
          toast.warning(
            `You can only compare up to ${maxCompare} Memory modules at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };

  const handleSelectMemory = (memory) => {
    const { icon, ...memoryWithoutIcon } = memory;
    sessionStorage.setItem(
      "selected_memory",
      JSON.stringify(memoryWithoutIcon)
    );
    toast.success(`Selected ${memory.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?memorySelected=1");
    }, 1000);
  };

  const handleCompareClick = () => {
    sessionStorage.setItem("compare_memory", JSON.stringify(compareSelection));
    navigate("/compare-memory");
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
        <style>{selectMemoryHeadingStyle}</style>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 select-memory-heading">Select Memory</h1>
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
        <style>{memoryTableResponsiveStyle}</style>
        <Table striped bordered hover responsive className="memory-table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Speed</th>
              <th>Latency</th>
              <th>Voltage</th>
              <th>Rating</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedMemory.map((memory) => (
              <tr key={memory.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === memory.name
                    )}
                    onChange={() => handleToggleCompare(memory)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={memory.icon || "/profile_images/user_image.jpg"}
                    alt={memory.name}
                    className="memory-img"
                  />
                  <strong className="memory-name">{memory.name}</strong>
                </td>
                <td>{memory.specs.capacity}</td>
                <td>{memory.specs.type}</td>
                <td>{memory.specs.speed}</td>
                <td>{memory.specs.latency}</td>
                <td>{memory.specs.voltage}</td>
                <td>
                  <span style={{ color: "#f5a623" }}>★★★★★</span>{" "}
                  <span style={{ color: "#888" }}>(123)</span>
                </td>
                <td>LKR {memory.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelectMemory(memory)}>
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
