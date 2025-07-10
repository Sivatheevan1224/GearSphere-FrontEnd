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

export const powerSupplyOptions = [
  {
    name: "Corsair RM850x (850W, Gold)",
    price: 25000,
    tier: "high",
    image: "/profile_images/pp1.png",
    specs: {
      wattage: "850W",
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fan: "135mm Rifle Bearing",
      warranty: "10 Years",
    },
    features: ["Zero RPM Fan Mode", "Japanese Capacitors", "Compact Size"],
  },
  {
    name: "Seasonic Focus GX-750 (750W, Gold)",
    price: 21000,
    tier: "high",
    image: "/profile_images/pp2.png",
    specs: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fan: "120mm Fluid Dynamic",
      warranty: "7 Years",
    },
    features: ["Silent Operation", "Premium Build", "Hybrid Fan Control"],
  },
  {
    name: "Cooler Master MWE 650 Bronze V2",
    price: 12000,
    tier: "low",
    image: "/profile_images/pp3.jpg",
    specs: {
      wattage: "650W",
      efficiency: "80+ Bronze",
      modular: "Non-Modular",
      fan: "120mm HDB",
      warranty: "5 Years",
    },
    features: ["Affordable", "Reliable", "Compact"],
  },
  {
    name: "EVGA SuperNOVA 550 G3",
    price: 11000,
    tier: "low",
    image: "/profile_images/pp4.jpg",
    specs: {
      wattage: "550W",
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fan: "130mm Hydraulic",
      warranty: "7 Years",
    },
    features: ["Eco Mode", "Small Form Factor", "High Quality"],
  },
  // 6 more dummy entries
  {
    name: "Thermaltake Smart 700W",
    price: 9000,
    tier: "low",
    image: "/profile_images/pp5.jpg",
    specs: {
      wattage: "700W",
      efficiency: "80+",
      modular: "Non-Modular",
      fan: "120mm",
      warranty: "3 Years",
    },
    features: ["Affordable", "Reliable", "Quiet Operation"],
  },
  {
    name: "Antec Earthwatts 650W Gold",
    price: 13000,
    tier: "mid",
    image: "/profile_images/pp6.jpg",
    specs: {
      wattage: "650W",
      efficiency: "80+ Gold",
      modular: "Semi-Modular",
      fan: "120mm",
      warranty: "5 Years",
    },
    features: ["Semi-Modular", "Gold Efficiency", "Silent Fan"],
  },
  {
    name: "Be Quiet! Pure Power 11 600W",
    price: 14000,
    tier: "mid",
    image: "/profile_images/pp7.jpg",
    specs: {
      wattage: "600W",
      efficiency: "80+ Gold",
      modular: "Non-Modular",
      fan: "120mm",
      warranty: "5 Years",
    },
    features: ["Silent Operation", "German Engineering", "Reliable"],
  },
  {
    name: "SilverStone Strider 850W Platinum",
    price: 27000,
    tier: "high",
    image: "/profile_images/pp8.jpg",
    specs: {
      wattage: "850W",
      efficiency: "80+ Platinum",
      modular: "Fully Modular",
      fan: "120mm",
      warranty: "7 Years",
    },
    features: ["Platinum Efficiency", "Fully Modular", "Compact Size"],
  },
  {
    name: "Gigabyte P650B 650W Bronze",
    price: 10000,
    tier: "low",
    image: "/profile_images/pp9.jpg",
    specs: {
      wattage: "650W",
      efficiency: "80+ Bronze",
      modular: "Non-Modular",
      fan: "120mm",
      warranty: "3 Years",
    },
    features: ["Affordable", "Bronze Efficiency", "Reliable"],
  },
  {
    name: "FSP Hydro G Pro 750W",
    price: 18000,
    tier: "mid",
    image: "/profile_images/pp10.jpg",
    specs: {
      wattage: "750W",
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fan: "135mm",
      warranty: "10 Years",
    },
    features: ["Fully Modular", "Gold Efficiency", "Long Warranty"],
  },
  {
    name: "Antec VP650 Plus 650W",
    price: 12000,
    tier: "low",
    image: "/profile_images/pp21.jpg",
    specs: {
      wattage: "650W",
      efficiency: "80+",
      modular: "Non-Modular",
      fan: "120mm",
      warranty: "2 Years",
    },
    features: ["Affordable", "Reliable", "Quiet Operation"],
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

export default function PowerSupplyPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;
  const [priceSort, setPriceSort] = useState("default");
  const [originalOrder] = useState(powerSupplyOptions);
  let sortedOptions;
  if (priceSort === "asc") {
    sortedOptions = [...powerSupplyOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedOptions = [...powerSupplyOptions].sort((a, b) => b.price - a.price);
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
            `You can only compare up to ${maxCompare} Power Supplies at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };
  const handleSelect = (psu) => {
    sessionStorage.setItem("selected_powersupply", JSON.stringify(psu));
    toast.success(`Selected ${psu.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?powersupplySelected=1");
    }, 1000);
  };
  const handleCompareClick = () => {
    sessionStorage.setItem(
      "compare_powersupplies",
      JSON.stringify(compareSelection)
    );
    navigate("/compare-powersupply");
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
          <h1 className="mb-0">Select Power Supply</h1>
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
              <th>Wattage</th>
              <th>Efficiency</th>
              <th>Modular</th>
              <th>Fan</th>
              <th>Warranty</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedOptions.map((psu) => (
              <tr key={psu.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === psu.name
                    )}
                    onChange={() => handleToggleCompare(psu)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={psu.image}
                    alt={psu.name}
                    style={{
                      width: 32,
                      height: 32,
                      marginRight: 8,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />
                  <strong>{psu.name}</strong>
                </td>
                <td>{psu.specs.wattage}</td>
                <td>{psu.specs.efficiency}</td>
                <td>{psu.specs.modular}</td>
                <td>{psu.specs.fan}</td>
                <td>{psu.specs.warranty}</td>
                <td>LKR {psu.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelect(psu)}>
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
