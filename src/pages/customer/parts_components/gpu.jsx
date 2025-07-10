import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Form, Alert, Table } from "react-bootstrap";
import { Display } from "react-bootstrap-icons";
import CustomerNavbar from "../../pageNavbars/CustomerNavbar";
import { toast } from "react-toastify";

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

export const gpuOptions = [
  {
    name: "NVIDIA RTX 4090",
    price: 350000,
    tier: "high",
    specs: {
      memory: "24GB GDDR6X",
      boostClock: "2.52 GHz",
      tdp: "450W",
      cores: "16384 CUDA",
    },
    features: {
      microarchitecture: "Ada Lovelace",
      integratedGraphics: "No",
    },
  },
  {
    name: "AMD Radeon RX 7900 XTX",
    price: 220000,
    tier: "high",
    specs: {
      memory: "24GB GDDR6",
      boostClock: "2.5 GHz",
      tdp: "355W",
      cores: "12288 Stream",
    },
    features: {
      microarchitecture: "RDNA 3",
      integratedGraphics: "No",
    },
  },
  {
    name: "NVIDIA RTX 4080",
    price: 280000,
    tier: "high",
    specs: {
      memory: "16GB GDDR6X",
      boostClock: "2.51 GHz",
      tdp: "320W",
      cores: "9728 CUDA",
    },
    features: {
      microarchitecture: "Ada Lovelace",
      integratedGraphics: "No",
    },
  },
  {
    name: "AMD Radeon RX 7900 XT",
    price: 180000,
    tier: "mid",
    specs: {
      memory: "20GB GDDR6",
      boostClock: "2.4 GHz",
      tdp: "315W",
      cores: "10752 Stream",
    },
    features: {
      microarchitecture: "RDNA 3",
      integratedGraphics: "No",
    },
  },
  {
    name: "NVIDIA RTX 4070 Ti",
    price: 150000,
    tier: "mid",
    specs: {
      memory: "12GB GDDR6X",
      boostClock: "2.61 GHz",
      tdp: "285W",
      cores: "7680 CUDA",
    },
    features: {
      microarchitecture: "Ada Lovelace",
      integratedGraphics: "No",
    },
  },
  {
    name: "AMD Radeon RX 7800 XT",
    price: 120000,
    tier: "mid",
    specs: {
      memory: "16GB GDDR6",
      boostClock: "2.43 GHz",
      tdp: "263W",
      cores: "3840 Stream",
    },
    features: {
      microarchitecture: "RDNA 3",
      integratedGraphics: "No",
    },
  },
  {
    name: "NVIDIA RTX 4070",
    price: 100000,
    tier: "low",
    specs: {
      memory: "12GB GDDR6X",
      boostClock: "2.48 GHz",
      tdp: "200W",
      cores: "5888 CUDA",
    },
    features: {
      microarchitecture: "Ada Lovelace",
      integratedGraphics: "No",
    },
  },
  {
    name: "NVIDIA GTX 1650",
    price: 35000,
    tier: "low",
    specs: {
      memory: "4GB GDDR5",
      boostClock: "1.665 GHz",
      tdp: "75W",
      cores: "896 CUDA",
    },
    features: {
      microarchitecture: "Turing",
      integratedGraphics: "No",
    },
  },
  {
    name: "NVIDIA RTX 3060",
    price: 70000,
    tier: "low",
    specs: {
      memory: "12GB GDDR6",
      boostClock: "1.78 GHz",
      tdp: "170W",
      cores: "3584 CUDA",
    },
    features: {
      microarchitecture: "Ampere",
      integratedGraphics: "No",
    },
  },
];

const gpuTableResponsiveStyle = `
  @media (max-width: 991.98px) {
    .gpu-table-sm .gpu-img {
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
    .gpu-table-sm td, .gpu-table-sm th {
      padding: 0.25rem 0.3rem !important;
      font-size: 0.85rem !important;
    }
    .gpu-table-sm .gpu-name {
      font-size: 0.95rem !important;
    }
    .gpu-table-sm .btn {
      font-size: 0.8rem !important;
      padding: 0.2rem 0.5rem !important;
    }
  }
`;

const selectGpuHeadingStyle = `
  .select-gpu-heading {
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

export default function GPUPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();

  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;

  const [priceSort, setPriceSort] = useState("default"); // 'default', 'asc', or 'desc'
  const [originalGpuOrder] = useState(gpuOptions);

  let sortedGpus;
  if (priceSort === "asc") {
    sortedGpus = [...gpuOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedGpus = [...gpuOptions].sort((a, b) => b.price - a.price);
  } else {
    sortedGpus = originalGpuOrder;
  }

  const handleToggleCompare = (option) => {
    setCompareSelection((prev) => {
      if (prev.some((item) => item.name === option.name)) {
        return prev.filter((item) => item.name !== option.name);
      } else {
        if (prev.length >= maxCompare) {
          toast.warning(
            `You can only compare up to ${maxCompare} Video Cards at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };

  const handleSelectGPU = (gpu) => {
    const { icon, ...gpuWithoutIcon } = gpu;
    sessionStorage.setItem("selected_gpu", JSON.stringify(gpuWithoutIcon));
    toast.success(`Selected ${gpu.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?gpuSelected=1");
    }, 1000);
  };

  const handleCompareClick = () => {
    sessionStorage.setItem("compare_gpus", JSON.stringify(compareSelection));
    navigate("/compare-gpu");
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
        <style>{selectGpuHeadingStyle}</style>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 select-gpu-heading">Select Video Card</h1>
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
        <style>{gpuTableResponsiveStyle}</style>
        <Table striped bordered hover responsive className="gpu-table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Memory</th>
              <th>Boost Clock</th>
              <th>Cores</th>
              <th>Microarchitecture</th>
              <th>TDP</th>
              <th>Integrated Graphics</th>
              <th>Rating</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedGpus.map((gpu) => (
              <tr key={gpu.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === gpu.name
                    )}
                    onChange={() => handleToggleCompare(gpu)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={gpu.icon || "/profile_images/user_image.jpg"}
                    alt={gpu.name}
                    className="gpu-img"
                  />
                  <strong className="gpu-name">{gpu.name}</strong>
                </td>
                <td>{gpu.specs.memory}</td>
                <td>{gpu.specs.boostClock}</td>
                <td>{gpu.specs.cores}</td>
                <td>{gpu.features.microarchitecture || "—"}</td>
                <td>{gpu.specs.tdp}</td>
                <td>{gpu.features.integratedGraphics || "—"}</td>
                <td>
                  <span style={{ color: "#f5a623" }}>★★★★★</span>{" "}
                  <span style={{ color: "#888" }}>(123)</span>
                </td>
                <td>LKR {gpu.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelectGPU(gpu)}>
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
