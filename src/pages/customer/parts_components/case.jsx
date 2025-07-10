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

export const caseOptions = [
  {
    name: "NZXT H510",
    price: 15000,
    image: "/profile_images/pp5.jpg",
    tier: "low",
    specs: {
      type: "Mid Tower",
      color: "Matte Black",
      sidePanel: "Tempered Glass",
      fansIncluded: 2,
      maxGPU: "381mm",
    },
    features: ["Cable Management", "USB-C Front Panel", "Minimalist Design"],
  },
  {
    name: "Corsair 4000D Airflow",
    price: 18000,
    image: "/profile_images/pp6.jpg",
    tier: "mid",
    specs: {
      type: "Mid Tower",
      color: "White",
      sidePanel: "Tempered Glass",
      fansIncluded: 2,
      maxGPU: "360mm",
    },
    features: ["High Airflow", "Easy Cable Routing", "Modern Look"],
  },
  {
    name: "Cooler Master NR200",
    price: 16000,
    image: "/profile_images/pp7.jpg",
    tier: "mid",
    specs: {
      type: "Mini-ITX",
      color: "Black",
      sidePanel: "Steel",
      fansIncluded: 2,
      maxGPU: "330mm",
    },
    features: ["Compact Size", "Tool-less Panels", "Versatile Cooling"],
  },
  {
    name: "Lian Li PC-O11 Dynamic",
    price: 22000,
    image: "/profile_images/pp8.jpg",
    tier: "mid",
    specs: {
      type: "Mid Tower",
      color: "White",
      sidePanel: "Tempered Glass",
      fansIncluded: 3,
      maxGPU: "420mm",
    },
    features: ["Dual Chamber", "Showcase Design", "Excellent Cooling"],
  },
  // 6 more dummy entries
  {
    name: "Phanteks Eclipse P400A",
    price: 17000,
    image: "/profile_images/pp9.jpg",
    tier: "mid",
    specs: {
      type: "Mid Tower",
      color: "Black",
      sidePanel: "Tempered Glass",
      fansIncluded: 3,
      maxGPU: "420mm",
    },
    features: ["High Airflow", "Mesh Front", "RGB Lighting"],
  },
  {
    name: "Fractal Design Meshify C",
    price: 19000,
    image: "/profile_images/pp10.jpg",
    tier: "mid",
    specs: {
      type: "Mid Tower",
      color: "Black",
      sidePanel: "Tempered Glass",
      fansIncluded: 2,
      maxGPU: "360mm",
    },
    features: ["Mesh Front", "Compact Design", "Easy Cable Management"],
  },
  {
    name: "Thermaltake Core V1",
    price: 12000,
    image: "/profile_images/pp11.jpg",
    tier: "low",
    specs: {
      type: "Mini-ITX",
      color: "White",
      sidePanel: "Acrylic",
      fansIncluded: 1,
      maxGPU: "285mm",
    },
    features: ["Small Form Factor", "Affordable", "Easy to Build"],
  },
  {
    name: "Cooler Master MasterBox Q300L",
    price: 11000,
    image: "/profile_images/pp12.jpg",
    tier: "low",
    specs: {
      type: "Micro-ATX",
      color: "Black",
      sidePanel: "Acrylic",
      fansIncluded: 1,
      maxGPU: "360mm",
    },
    features: ["Modular Design", "Affordable", "Compact"],
  },
  {
    name: "SilverStone RL06",
    price: 14000,
    image: "/profile_images/pp13.jpg",
    tier: "low",
    specs: {
      type: "ATX Mid Tower",
      color: "Red/White",
      sidePanel: "Tempered Glass",
      fansIncluded: 4,
      maxGPU: "400mm",
    },
    features: ["High Airflow", "Multiple Fans", "Stylish"],
  },
  {
    name: "Be Quiet! Pure Base 500DX",
    price: 20000,
    image: "/profile_images/pp14.jpg",
    tier: "mid",
    specs: {
      type: "Mid Tower",
      color: "Black",
      sidePanel: "Tempered Glass",
      fansIncluded: 3,
      maxGPU: "369mm",
    },
    features: ["Silent Operation", "RGB Lighting", "Premium Build"],
  },
  {
    name: "Zebronics Zeb-Cronus",
    price: 10000,
    tier: "low",
    image: "/profile_images/pp22.jpg",
    specs: {
      type: "Mid Tower",
      color: "Black",
      sidePanel: "Acrylic",
      fansIncluded: 2,
      maxGPU: "320mm",
    },
    features: ["Affordable", "Spacious", "Good Airflow"],
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

export default function CasePage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;
  const [priceSort, setPriceSort] = useState("default");
  const [originalOrder] = useState(caseOptions);
  let sortedOptions;
  if (priceSort === "asc") {
    sortedOptions = [...caseOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedOptions = [...caseOptions].sort((a, b) => b.price - a.price);
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
            `You can only compare up to ${maxCompare} Cases at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };
  const handleSelect = (pcCase) => {
    sessionStorage.setItem("selected_case", JSON.stringify(pcCase));
    toast.success(`Selected ${pcCase.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?caseSelected=1");
    }, 1000);
  };
  const handleCompareClick = () => {
    sessionStorage.setItem("compare_cases", JSON.stringify(compareSelection));
    navigate("/compare-case");
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
          <h1 className="mb-0">Select PC Case</h1>
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
              <th>Type</th>
              <th>Color</th>
              <th>Side Panel</th>
              <th>Fans Included</th>
              <th>Max GPU Length</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedOptions.map((pcCase) => (
              <tr key={pcCase.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === pcCase.name
                    )}
                    onChange={() => handleToggleCompare(pcCase)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={pcCase.image}
                    alt={pcCase.name}
                    style={{
                      width: 32,
                      height: 32,
                      marginRight: 8,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />
                  <strong>{pcCase.name}</strong>
                </td>
                <td>{pcCase.specs.type}</td>
                <td>{pcCase.specs.color}</td>
                <td>{pcCase.specs.sidePanel}</td>
                <td>{pcCase.specs.fansIncluded}</td>
                <td>{pcCase.specs.maxGPU}</td>
                <td>LKR {pcCase.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelect(pcCase)}>
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
