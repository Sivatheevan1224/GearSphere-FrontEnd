import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CustomerNavbar from "../../pageNavbars/CustomerNavbar";

export const monitorOptions = [
  {
    name: "Dell S2721DGF",
    price: 35000,
    tier: "mid",
    image: "/profile_images/pp1.png",
    specs: {
      size: '27"',
      resolution: "2560x1440",
      refreshRate: "165Hz",
      panel: "IPS",
      responseTime: "1ms",
    },
    features: ["G-Sync Compatible", "Adjustable Stand", "VESA Mount"],
  },
  {
    name: "LG 27GL850-B",
    price: 34000,
    tier: "mid",
    image: "/profile_images/pp2.png",
    specs: {
      size: '27"',
      resolution: "2560x1440",
      refreshRate: "144Hz",
      panel: "IPS",
      responseTime: "1ms",
    },
    features: ["Nano IPS", "HDR10", "Height Adjustable"],
  },
  {
    name: "AOC 24G2",
    price: 18000,
    tier: "low",
    image: "/profile_images/pp3.jpg",
    specs: {
      size: '24"',
      resolution: "1920x1080",
      refreshRate: "144Hz",
      panel: "IPS",
      responseTime: "1ms",
    },
    features: ["Affordable", "Wide Color Gamut", "Slim Bezel"],
  },
  {
    name: "Samsung Odyssey G7",
    price: 48000,
    tier: "high",
    image: "/profile_images/pp4.jpg",
    specs: {
      size: '27"',
      resolution: "2560x1440",
      refreshRate: "240Hz",
      panel: "VA",
      responseTime: "1ms",
    },
    features: ["Curved", "HDR600", "High Refresh Rate"],
  },
  // 6 more dummy entries
  {
    name: "ASUS VG259QM",
    price: 25000,
    tier: "mid",
    image: "/profile_images/pp5.jpg",
    specs: {
      size: '24.5"',
      resolution: "1920x1080",
      refreshRate: "280Hz",
      panel: "IPS",
      responseTime: "1ms",
    },
    features: ["Extreme Low Motion Blur", "Fast IPS", "Ergonomic Stand"],
  },
  {
    name: "BenQ EX2780Q",
    price: 32000,
    tier: "mid",
    image: "/profile_images/pp6.jpg",
    specs: {
      size: '27"',
      resolution: "2560x1440",
      refreshRate: "144Hz",
      panel: "IPS",
      responseTime: "5ms",
    },
    features: ["HDRi", "Built-in Speakers", "Remote Control"],
  },
  {
    name: "Gigabyte M27Q",
    price: 30000,
    tier: "mid",
    image: "/profile_images/pp7.jpg",
    specs: {
      size: '27"',
      resolution: "2560x1440",
      refreshRate: "170Hz",
      panel: "IPS",
      responseTime: "0.5ms",
    },
    features: ["KVM Switch", "Wide Color Gamut", "Low Blue Light"],
  },
  {
    name: "MSI Optix MAG272CQR",
    price: 29000,
    tier: "mid",
    image: "/profile_images/pp8.jpg",
    specs: {
      size: '27"',
      resolution: "2560x1440",
      refreshRate: "165Hz",
      panel: "VA",
      responseTime: "1ms",
    },
    features: ["Curved", "RGB Lighting", "Frameless Design"],
  },
  {
    name: "Acer Predator XB273K",
    price: 60000,
    tier: "high",
    image: "/profile_images/pp9.jpg",
    specs: {
      size: '27"',
      resolution: "3840x2160",
      refreshRate: "144Hz",
      panel: "IPS",
      responseTime: "4ms",
    },
    features: ["4K UHD", "G-Sync", "HDR"],
  },
  {
    name: "ViewSonic XG2405",
    price: 17000,
    tier: "low",
    image: "/profile_images/pp10.jpg",
    specs: {
      size: '24"',
      resolution: "1920x1080",
      refreshRate: "144Hz",
      panel: "IPS",
      responseTime: "1ms",
    },
    features: ["Affordable", "Ergonomic Stand", "Frameless"],
  },
  {
    name: "AOC 22B1HS",
    price: 13000,
    tier: "low",
    image: "/profile_images/pp20.jpg",
    specs: {
      size: '21.5"',
      resolution: "1920x1080",
      refreshRate: "60Hz",
      panel: "IPS",
      responseTime: "7ms",
    },
    features: ["Affordable", "Slim Bezel", "HDMI Input"],
  },
  {
    name: "Samsung LF24T350FHWXXL 24-inch",
    price: 25000,
    tier: "low",
    image: "/profile_images/pp24.jpg",
    specs: {
      size: '24"',
      resolution: "1920x1080",
      refreshRate: "75Hz",
      panel: "IPS",
      responseTime: "5ms",
    },
    features: ["Affordable", "IPS Panel", "Slim Bezel"],
  },
];

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

export default function MonitorPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;
  const [priceSort, setPriceSort] = useState("default");
  const [originalOrder] = useState(monitorOptions);
  let sortedOptions;
  if (priceSort === "asc") {
    sortedOptions = [...monitorOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedOptions = [...monitorOptions].sort((a, b) => b.price - a.price);
  } else {
    sortedOptions = originalOrder;
  }
  const handleToggleCompare = (option) => {
    setCompareSelection((prev) => {
      if (prev.some((item) => item.name === option.name)) {
        return prev.filter((item) => item.name !== option.name);
      } else {
        if (prev.length >= maxCompare) {
          toast.warning(
            `You can only compare up to ${maxCompare} Monitors at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };
  const handleSelect = (monitor) => {
    sessionStorage.setItem("selected_monitor", JSON.stringify(monitor));
    toast.success(`Selected ${monitor.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?monitorSelected=1");
    }, 1000);
  };
  const handleCompareClick = () => {
    sessionStorage.setItem(
      "compare_monitors",
      JSON.stringify(compareSelection)
    );
    navigate("/compare-monitor");
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
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0">Select Monitor</h1>
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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Size</th>
              <th>Resolution</th>
              <th>Refresh Rate</th>
              <th>Panel</th>
              <th>Response</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedOptions.map((monitor) => (
              <tr key={monitor.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === monitor.name
                    )}
                    onChange={() => handleToggleCompare(monitor)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={monitor.image}
                    alt={monitor.name}
                    style={{
                      width: 32,
                      height: 32,
                      marginRight: 8,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />
                  <strong>{monitor.name}</strong>
                </td>
                <td>{monitor.specs.size}</td>
                <td>{monitor.specs.resolution}</td>
                <td>{monitor.specs.refreshRate}</td>
                <td>{monitor.specs.panel}</td>
                <td>{monitor.specs.responseTime}</td>
                <td>LKR {monitor.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelect(monitor)}>
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
