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

export const operatingSystemOptions = [
  {
    name: "Windows 10 Home",
    price: 10000,
    tier: "low",
    image: "/profile_images/pp25.jpg",
    specs: {
      type: "Windows",
      version: "10 Home",
      license: "OEM",
      bit: "64-bit",
      support: "2025",
    },
    features: ["Familiar UI", "Wide Compatibility", "Cortana"],
  },
  {
    name: "Windows 10 Pro",
    price: 12000,
    tier: "mid",
    image: "/profile_images/pp12.jpg",
    specs: {
      type: "Windows",
      version: "10 Pro",
      license: "OEM",
      bit: "64-bit",
      support: "2025",
    },
    features: ["BitLocker", "Remote Desktop", "Group Policy"],
  },
  {
    name: "Windows 11 Home",
    price: 11000,
    tier: "mid",
    image: "/profile_images/pp13.jpg",
    specs: {
      type: "Windows",
      version: "11 Home",
      license: "OEM",
      bit: "64-bit",
      support: "2027",
    },
    features: ["Modern UI", "Snap Layouts", "Widgets"],
  },
  {
    name: "Windows 11 Pro",
    price: 14000,
    tier: "high",
    image: "/profile_images/pp14.jpg",
    specs: {
      type: "Windows",
      version: "11 Pro",
      license: "OEM",
      bit: "64-bit",
      support: "2027",
    },
    features: ["BitLocker", "Remote Desktop", "Virtualization"],
  },
  // 6 more dummy entries
  {
    name: "Ubuntu 22.04 LTS",
    price: 0,
    tier: "low",
    image: "/profile_images/pp15.jpg",
    specs: {
      type: "Linux",
      version: "22.04 LTS",
      license: "Open Source",
      bit: "64-bit",
      support: "2027",
    },
    features: ["Free", "Stable", "Snap Packages"],
  },
  {
    name: "Fedora Workstation 38",
    price: 0,
    tier: "low",
    image: "/profile_images/pp16.jpg",
    specs: {
      type: "Linux",
      version: "38",
      license: "Open Source",
      bit: "64-bit",
      support: "2025",
    },
    features: ["Cutting Edge", "Wayland", "Flatpak"],
  },
  {
    name: "Linux Mint 21.1",
    price: 0,
    tier: "low",
    image: "/profile_images/pp17.jpg",
    specs: {
      type: "Linux",
      version: "21.1",
      license: "Open Source",
      bit: "64-bit",
      support: "2027",
    },
    features: ["User Friendly", "Cinnamon Desktop", "Stable"],
  },
  {
    name: "macOS Ventura",
    price: 0,
    tier: "low",
    image: "/profile_images/pp18.png",
    specs: {
      type: "macOS",
      version: "Ventura",
      license: "Apple EULA",
      bit: "64-bit",
      support: "2026",
    },
    features: ["Apple Ecosystem", "Universal Control", "Continuity"],
  },
  {
    name: "Windows 8.1 Pro",
    price: 8000,
    tier: "mid",
    image: "/profile_images/pp19.png",
    specs: {
      type: "Windows",
      version: "8.1 Pro",
      license: "OEM",
      bit: "64-bit",
      support: "2023",
    },
    features: ["Legacy Support", "BitLocker", "Remote Desktop"],
  },
  {
    name: "Debian 12",
    price: 0,
    tier: "low",
    image: "/profile_images/pp10.jpg",
    specs: {
      type: "Linux",
      version: "12",
      license: "Open Source",
      bit: "64-bit",
      support: "2028",
    },
    features: ["Stable", "Secure", "Wide Package Support"],
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

export default function OperatingSystemPage() {
  const [compareSelection, setCompareSelection] = useState([]);
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  let maxCompare = 4;
  if (breakpoint === "md") maxCompare = 3;
  if (breakpoint === "sm") maxCompare = 2;
  const [priceSort, setPriceSort] = useState("default");
  const [originalOrder] = useState(operatingSystemOptions);
  let sortedOptions;
  if (priceSort === "asc") {
    sortedOptions = [...operatingSystemOptions].sort(
      (a, b) => a.price - b.price
    );
  } else if (priceSort === "desc") {
    sortedOptions = [...operatingSystemOptions].sort(
      (a, b) => b.price - a.price
    );
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
            `You can only compare up to ${maxCompare} Operating Systems at a time on this device.`
          );
          return prev;
        }
        return [...prev, option];
      }
    });
  };
  const handleSelect = (os) => {
    sessionStorage.setItem("selected_operatingsystem", JSON.stringify(os));
    toast.success(`Selected ${os.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?operatingsystemSelected=1");
    }, 1000);
  };
  const handleCompareClick = () => {
    sessionStorage.setItem(
      "compare_operatingsystems",
      JSON.stringify(compareSelection)
    );
    navigate("/compare-operatingsystem");
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
          <h1 className="mb-0">Select Operating System</h1>
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
              <th>Bit</th>
              <th>License</th>
              <th>Support</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedOptions.map((os) => (
              <tr key={os.name}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={compareSelection.some(
                      (item) => item.name === os.name
                    )}
                    onChange={() => handleToggleCompare(os)}
                  />
                </td>
                <td className="d-flex align-items-center">
                  <img
                    src={os.image}
                    alt={os.name}
                    style={{
                      width: 32,
                      height: 32,
                      marginRight: 8,
                      borderRadius: 6,
                      objectFit: "cover",
                    }}
                  />
                  <strong>{os.name}</strong>
                </td>
                <td>{os.specs.type}</td>
                <td>{os.specs.bit}</td>
                <td>{os.specs.license}</td>
                <td>{os.specs.support}</td>
                <td>
                  {os.price === 0 ? "Free" : `LKR ${os.price.toLocaleString()}`}
                </td>
                <td>
                  <Button size="sm" onClick={() => handleSelect(os)}>
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
