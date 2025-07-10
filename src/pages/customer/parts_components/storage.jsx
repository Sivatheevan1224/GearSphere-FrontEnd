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

export const storageOptions = [
  {
    name: "Samsung 970 EVO Plus 1TB NVMe M.2 SSD",
    price: 18000,
    tier: "high",
    specs: {
      capacity: "1TB",
      type: "NVMe M.2 SSD",
      interface: "PCIe 3.0 x4",
      readSpeed: "3500 MB/s",
      writeSpeed: "3300 MB/s",
      formFactor: "M.2 2280",
    },
    features: {
      functionality: {
        performance: "Outstanding",
        reliability: "Superb",
        durability: "Excellent",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for fast game loading",
        workstation: "Ideal for professional workstations",
        productivity: "Excellent for heavy workloads",
        bootDrive: "Excellent boot drive performance",
      },
      uniqueFeatures: [
        "V-NAND Technology",
        "Dynamic Thermal Guard",
        "AES 256-bit Encryption",
        "5-Year Warranty",
        "Samsung Magician Software",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "Crucial P3 500GB NVMe M.2 SSD",
    price: 8000,
    tier: "mid",
    specs: {
      capacity: "500GB",
      type: "NVMe M.2 SSD",
      interface: "PCIe 3.0 x4",
      readSpeed: "3500 MB/s",
      writeSpeed: "3000 MB/s",
      formFactor: "M.2 2280",
    },
    features: {
      functionality: {
        performance: "Very Good",
        reliability: "Very Good",
        durability: "Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for game storage",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        bootDrive: "Good boot drive performance",
      },
      uniqueFeatures: [
        "QLC NAND Technology",
        "Micron 3D NAND",
        "AES 256-bit Encryption",
        "3-Year Warranty",
        "Crucial Storage Executive",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "Western Digital Blue 1TB SATA SSD",
    price: 12000,
    tier: "mid",
    specs: {
      capacity: "1TB",
      type: "SATA SSD",
      interface: "SATA III",
      readSpeed: "560 MB/s",
      writeSpeed: "530 MB/s",
      formFactor: "2.5-inch",
    },
    features: {
      functionality: {
        performance: "Good",
        reliability: "Very Good",
        durability: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for game storage",
        workstation: "Good for content creation",
        productivity: "Good for multitasking",
        bootDrive: "Good boot drive performance",
      },
      uniqueFeatures: [
        "3D NAND Technology",
        "S.M.A.R.T. Monitoring",
        "AES 256-bit Encryption",
        "5-Year Warranty",
        "WD Dashboard Software",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "High",
        targetMarket: "Mainstream Users",
      },
    },
  },
  {
    name: "Seagate Barracuda 2TB HDD",
    price: 6000,
    tier: "low",
    specs: {
      capacity: "2TB",
      type: "HDD",
      interface: "SATA III",
      readSpeed: "190 MB/s",
      writeSpeed: "190 MB/s",
      formFactor: "3.5-inch",
    },
    features: {
      functionality: {
        performance: "Basic",
        reliability: "Good",
        durability: "Good",
        powerEfficiency: "Excellent",
      },
      usage: {
        gaming: "Good for game storage",
        workstation: "Good for bulk storage",
        productivity: "Good for file storage",
        bootDrive: "Not recommended for boot",
      },
      uniqueFeatures: [
        "7200 RPM",
        "S.M.A.R.T. Monitoring",
        "2-Year Warranty",
        "Seagate SeaTools",
        "High Capacity",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Budget Users",
      },
    },
  },
  {
    name: "Kingston A2000 1TB NVMe M.2 SSD",
    price: 15000,
    tier: "mid",
    specs: {
      capacity: "1TB",
      type: "NVMe M.2 SSD",
      interface: "PCIe 3.0 x4",
      readSpeed: "2200 MB/s",
      writeSpeed: "2000 MB/s",
      formFactor: "M.2 2280",
    },
    features: {
      functionality: {
        performance: "Very Good",
        reliability: "Very Good",
        durability: "Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for game storage",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        bootDrive: "Good boot drive performance",
      },
      uniqueFeatures: [
        "TLC NAND Technology",
        "AES 256-bit Encryption",
        "5-Year Warranty",
        "Kingston SSD Manager",
        "Low Power Consumption",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "Samsung 980 Pro 2TB NVMe M.2 SSD",
    price: 35000,
    tier: "high",
    specs: {
      capacity: "2TB",
      type: "NVMe M.2 SSD",
      interface: "PCIe 4.0 x4",
      readSpeed: "7000 MB/s",
      writeSpeed: "5100 MB/s",
      formFactor: "M.2 2280",
    },
    features: {
      functionality: {
        performance: "Outstanding",
        reliability: "Superb",
        durability: "Excellent",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Perfect for fast game loading",
        workstation: "Ideal for professional workstations",
        productivity: "Superb for heavy workloads",
        bootDrive: "Excellent boot drive performance",
      },
      uniqueFeatures: [
        "V-NAND Technology",
        "PCIe 4.0 Support",
        "AES 256-bit Encryption",
        "5-Year Warranty",
        "Samsung Magician Software",
        "Dynamic Thermal Guard",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "ADATA XPG SX8200 Pro 512GB NVMe M.2 SSD",
    price: 10000,
    tier: "mid",
    specs: {
      capacity: "512GB",
      type: "NVMe M.2 SSD",
      interface: "PCIe 3.0 x4",
      readSpeed: "3500 MB/s",
      writeSpeed: "2300 MB/s",
      formFactor: "M.2 2280",
    },
    features: {
      functionality: {
        performance: "Very Good",
        reliability: "Very Good",
        durability: "Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Great for game storage",
        workstation: "Good for content creation",
        productivity: "Very Good for multitasking",
        bootDrive: "Good boot drive performance",
      },
      uniqueFeatures: [
        "3D NAND Technology",
        "AES 256-bit Encryption",
        "5-Year Warranty",
        "ADATA SSD Toolbox",
        "SLC Caching",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "Very High",
        targetMarket: "Gamers and Content Creators",
      },
    },
  },
  {
    name: "Western Digital Black 4TB HDD",
    price: 15000,
    tier: "mid",
    specs: {
      capacity: "4TB",
      type: "HDD",
      interface: "SATA III",
      readSpeed: "190 MB/s",
      writeSpeed: "190 MB/s",
      formFactor: "3.5-inch",
    },
    features: {
      functionality: {
        performance: "Good",
        reliability: "Very Good",
        durability: "Very Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Good for game storage",
        workstation: "Excellent for bulk storage",
        productivity: "Excellent for file storage",
        bootDrive: "Not recommended for boot",
      },
      uniqueFeatures: [
        "7200 RPM",
        "S.M.A.R.T. Monitoring",
        "5-Year Warranty",
        "WD Dashboard Software",
        "High Capacity",
        "Performance Optimized",
      ],
      priceAnalysis: {
        value: "Good",
        performancePerRupee: "High",
        targetMarket: "Content Creators and Professionals",
      },
    },
  },
  {
    name: "Corsair Force MP600 1TB NVMe M.2 SSD",
    price: 25000,
    tier: "high",
    specs: {
      capacity: "1TB",
      type: "NVMe M.2 SSD",
      interface: "PCIe 4.0 x4",
      readSpeed: "4950 MB/s",
      writeSpeed: "4250 MB/s",
      formFactor: "M.2 2280",
    },
    features: {
      functionality: {
        performance: "Outstanding",
        reliability: "Very Good",
        durability: "Good",
        powerEfficiency: "Good",
      },
      usage: {
        gaming: "Perfect for fast game loading",
        workstation: "Ideal for professional workstations",
        productivity: "Excellent for heavy workloads",
        bootDrive: "Excellent boot drive performance",
      },
      uniqueFeatures: [
        "PCIe 4.0 Support",
        "AES 256-bit Encryption",
        "5-Year Warranty",
        "Corsair SSD Toolbox",
        "High Performance",
        "Gaming Optimized",
      ],
      priceAnalysis: {
        value: "Premium",
        performancePerRupee: "High",
        targetMarket: "Enthusiasts and Professionals",
      },
    },
  },
  {
    name: "TeamGroup MP33 256GB NVMe M.2 SSD",
    price: 5000,
    tier: "low",
    specs: {
      capacity: "256GB",
      type: "NVMe M.2 SSD",
      interface: "PCIe 3.0 x4",
      readSpeed: "1700 MB/s",
      writeSpeed: "1400 MB/s",
      formFactor: "M.2 2280",
    },
    features: {
      functionality: {
        performance: "Good",
        reliability: "Good",
        durability: "Good",
        powerEfficiency: "Very High",
      },
      usage: {
        gaming: "Good for basic game storage",
        workstation: "Adequate for basic tasks",
        productivity: "Good for office work",
        bootDrive: "Good boot drive performance",
      },
      uniqueFeatures: [
        "3D NAND Technology",
        "AES 256-bit Encryption",
        "3-Year Warranty",
        "Low Power Consumption",
        "Budget Friendly",
      ],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "Very High",
        targetMarket: "Budget Users",
      },
    },
  },
  {
    name: "Crucial MX500 1TB SATA SSD",
    price: 15000,
    tier: "low",
    specs: {
      capacity: "1TB",
      type: "SATA SSD",
      interface: "SATA III",
      readSpeed: "560 MB/s",
      writeSpeed: "510 MB/s",
      formFactor: "2.5-inch",
    },
    features: {
      functionality: {
        performance: "Good",
        reliability: "Good",
        durability: "Good",
        powerEfficiency: "High",
      },
      usage: {
        gaming: "Good for game storage",
        workstation: "Good for light content creation",
        productivity: "Good for multitasking",
        bootDrive: "Good boot drive performance",
      },
      uniqueFeatures: ["Affordable", "5-Year Warranty"],
      priceAnalysis: {
        value: "Excellent",
        performancePerRupee: "High",
        targetMarket: "Budget Users",
      },
    },
  },
];

// Add internal CSS for responsive table styling
const storageTableResponsiveStyle = `
  .storage-table-sm .storage-img {
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
    .storage-table-sm .storage-img {
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
    .storage-table-sm td, .storage-table-sm th {
      padding: 0.25rem 0.3rem !important;
      font-size: 0.85rem !important;
    }
    .storage-table-sm .storage-name {
      font-size: 0.95rem !important;
    }
    .storage-table-sm .btn {
      font-size: 0.8rem !important;
      padding: 0.2rem 0.5rem !important;
    }
  }
`;

const selectStorageHeadingStyle = `
  .select-storage-heading {
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

export default function StoragePage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();

  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;

  const [priceSort, setPriceSort] = useState("default"); // 'default', 'asc', or 'desc'
  const [originalStorageOrder] = useState(storageOptions);

  let sortedStorage;
  if (priceSort === "asc") {
    sortedStorage = [...storageOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedStorage = [...storageOptions].sort((a, b) => b.price - a.price);
  } else {
    sortedStorage = originalStorageOrder;
  }

  const handleToggleCompare = (option) => {
    setCompareSelection((prev) => {
      if (prev.some((item) => item.name === option.name)) {
        return prev.filter((item) => item.name !== option.name);
      } else {
        if (prev.length >= maxCompare) {
          toast.warning(
            `You can only compare up to ${maxCompare} Storage devices at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };

  const handleSelectStorage = (storage) => {
    const { icon, ...storageWithoutIcon } = storage;
    sessionStorage.setItem(
      "selected_storage",
      JSON.stringify(storageWithoutIcon)
    );
    toast.success(`Selected ${storage.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?storageSelected=1");
    }, 1000);
  };

  const handleCompareClick = () => {
    sessionStorage.setItem("compare_storage", JSON.stringify(compareSelection));
    navigate("/compare-storage");
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
        <style>{selectStorageHeadingStyle}</style>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 select-storage-heading">Select Storage</h1>
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
        <style>{storageTableResponsiveStyle}</style>
        <Table striped bordered hover responsive className="storage-table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Interface</th>
              <th>Read Speed</th>
              <th>Write Speed</th>
              <th>Form Factor</th>
              <th>Rating</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedStorage.map((storage) => (
              <tr key={storage.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === storage.name
                    )}
                    onChange={() => handleToggleCompare(storage)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={storage.icon || "/profile_images/user_image.jpg"}
                    alt={storage.name}
                    className="storage-img"
                  />
                  <strong className="storage-name">{storage.name}</strong>
                </td>
                <td>{storage.specs.capacity}</td>
                <td>{storage.specs.type}</td>
                <td>{storage.specs.interface}</td>
                <td>{storage.specs.readSpeed}</td>
                <td>{storage.specs.writeSpeed}</td>
                <td>{storage.specs.formFactor}</td>
                <td>
                  <span style={{ color: "#f5a623" }}>★★★★★</span>{" "}
                  <span style={{ color: "#888" }}>(123)</span>
                </td>
                <td>LKR {storage.price.toLocaleString()}</td>
                <td>
                  <Button
                    size="sm"
                    onClick={() => handleSelectStorage(storage)}
                  >
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
