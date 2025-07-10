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

export const cpuCoolerOptions = [
  {
    name: "Noctua NH-D15",
    price: 12000,
    image: "/profile_images/pp15.jpg",
    tier: "high",
    specs: {
      type: "Air Cooler",
      fanSize: "140mm",
      height: "165mm",
      noise: "24.6 dB",
      warranty: "6 Years",
    },
    features: ["Dual Tower", "Quiet Operation", "Premium Quality"],
  },
  {
    name: "Cooler Master Hyper 212 EVO",
    price: 3500,
    image: "/profile_images/pp16.jpg",
    tier: "low",
    specs: {
      type: "Air Cooler",
      fanSize: "120mm",
      height: "159mm",
      noise: "36 dB",
      warranty: "2 Years",
    },
    features: ["Affordable", "Reliable", "Easy Installation"],
  },
  {
    name: "Corsair iCUE H100i RGB Pro XT",
    price: 10500,
    image: "/profile_images/pp17.jpg",
    tier: "high",
    specs: {
      type: "Liquid Cooler",
      fanSize: "2x120mm",
      height: "27mm Radiator",
      noise: "37 dB",
      warranty: "5 Years",
    },
    features: ["RGB Lighting", "Quiet Pump", "High Performance"],
  },
  {
    name: "be quiet! Dark Rock Pro 4",
    price: 9500,
    image: "/profile_images/pp18.png",
    tier: "high",
    specs: {
      type: "Air Cooler",
      fanSize: "135mm + 120mm",
      height: "162.8mm",
      noise: "24.3 dB",
      warranty: "3 Years",
    },
    features: ["Silent Wings Fans", "Dual Tower", "Premium Build"],
  },
  // 6 more dummy entries
  {
    name: "Deepcool GAMMAXX 400",
    price: 2500,
    image: "/profile_images/pp19.png",
    tier: "low",
    specs: {
      type: "Air Cooler",
      fanSize: "120mm",
      height: "155mm",
      noise: "30 dB",
      warranty: "1 Year",
    },
    features: ["Blue LED Fan", "Affordable", "Easy Mounting"],
  },
  {
    name: "NZXT Kraken X63",
    price: 13000,
    image: "/profile_images/pp10.jpg",
    tier: "high",
    specs: {
      type: "Liquid Cooler",
      fanSize: "2x140mm",
      height: "30mm Radiator",
      noise: "38 dB",
      warranty: "6 Years",
    },
    features: ["RGB Pump", "Quiet Operation", "High Performance"],
  },
  {
    name: "Arctic Freezer 34 eSports DUO",
    price: 5000,
    image: "/profile_images/pp11.jpg",
    tier: "mid",
    specs: {
      type: "Air Cooler",
      fanSize: "2x120mm",
      height: "157mm",
      noise: "28 dB",
      warranty: "6 Years",
    },
    features: ["Dual Fan", "Efficient Cooling", "Affordable"],
  },
  {
    name: "Thermaltake Water 3.0 ARGB Sync",
    price: 9000,
    image: "/profile_images/pp12.jpg",
    tier: "mid",
    specs: {
      type: "Liquid Cooler",
      fanSize: "3x120mm",
      height: "27mm Radiator",
      noise: "40 dB",
      warranty: "3 Years",
    },
    features: ["ARGB Lighting", "Triple Fan", "High Performance"],
  },
  {
    name: "Scythe Mugen 5 Rev.B",
    price: 6000,
    image: "/profile_images/pp13.jpg",
    tier: "mid",
    specs: {
      type: "Air Cooler",
      fanSize: "120mm",
      height: "154.5mm",
      noise: "24.9 dB",
      warranty: "2 Years",
    },
    features: ["Quiet", "Easy Installation", "Good Value"],
  },
  {
    name: "ID-COOLING SE-224-XT",
    price: 3200,
    image: "/profile_images/pp14.jpg",
    tier: "low",
    specs: {
      type: "Air Cooler",
      fanSize: "120mm",
      height: "154mm",
      noise: "26 dB",
      warranty: "3 Years",
    },
    features: ["Affordable", "Compact", "Good Performance"],
  },
  {
    name: "Cooler Master Hyper H410R",
    price: 5000,
    tier: "low",
    image: "/profile_images/pp23.jpg",
    specs: {
      type: "Air Cooler",
      fanSize: "92mm",
      height: "136mm",
      noise: "29 dB",
      warranty: "2 Years",
    },
    features: ["Affordable", "Compact", "Good Performance"],
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

export default function CPUCoolerPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;
  const [priceSort, setPriceSort] = useState("default");
  const [originalOrder] = useState(cpuCoolerOptions);
  let sortedOptions;
  if (priceSort === "asc") {
    sortedOptions = [...cpuCoolerOptions].sort((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortedOptions = [...cpuCoolerOptions].sort((a, b) => b.price - a.price);
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
            `You can only compare up to ${maxCompare} CPU Coolers at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };
  const handleSelect = (cooler) => {
    sessionStorage.setItem("selected_cpucooler", JSON.stringify(cooler));
    toast.success(`Selected ${cooler.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?cpucoolerSelected=1");
    }, 1000);
  };
  const handleCompareClick = () => {
    sessionStorage.setItem(
      "compare_cpucoolers",
      JSON.stringify(compareSelection)
    );
    navigate("/compare-cpucooler");
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
          <h1 className="mb-0">Select CPU Cooler</h1>
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
              <th>Height</th>
              <th>Fans</th>
              <th>Noise</th>
              <th>TDP</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedOptions.map((cooler) => (
              <tr key={cooler.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === cooler.name
                    )}
                    onChange={() => handleToggleCompare(cooler)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={cooler.image}
                    alt={cooler.name}
                    style={{
                      width: 32,
                      height: 32,
                      marginRight: 8,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />
                  <strong>{cooler.name}</strong>
                </td>
                <td>{cooler.specs.type}</td>
                <td>{cooler.specs.height}</td>
                <td>{cooler.specs.fans}</td>
                <td>{cooler.specs.noise}</td>
                <td>{cooler.specs.tdp}</td>
                <td>LKR {cooler.price.toLocaleString()}</td>
                <td>
                  <Button size="sm" onClick={() => handleSelect(cooler)}>
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
