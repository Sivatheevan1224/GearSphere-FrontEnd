import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [metricType, setMetricType] = useState('revenue');

  // Mock data - replace with actual API calls
  const analyticsData = {
    summary: {
      totalRevenue: 125000,
      totalOrders: 450,
      averageOrderValue: 277.78,
      conversionRate: 3.2,
    },
    salesTrend: [
      { date: "2024-01", revenue: 25000, orders: 90 },
      { date: "2024-02", revenue: 30000, orders: 110 },
      { date: "2024-03", revenue: 35000, orders: 130 },
      { date: "2024-04", revenue: 40000, orders: 150 },
    ],
    topProducts: [
      {
        id: "P001",
        name: "RTX 4070",
        sales: 120,
        revenue: 72000,
        growth: 15,
      },
      {
        id: "P002",
        name: "32GB DDR5 RAM",
        sales: 200,
        revenue: 70000,
        growth: 8,
      },
      {
        id: "P003",
        name: "1TB NVMe SSD",
        sales: 150,
        revenue: 60000,
        growth: 12,
      },
    ],
    categoryPerformance: [
      {
        category: "Graphics Cards",
        sales: 150,
        revenue: 90000,
        percentage: 40,
      },
      {
        category: "Memory",
        sales: 250,
        revenue: 87500,
        percentage: 35,
      },
      {
        category: "Storage",
        sales: 200,
        revenue: 80000,
        percentage: 25,
      },
    ],
  };

  // Chart data and options
  const salesTrendData = {
    labels: analyticsData.salesTrend.map((item) => item.date),
    datasets: [
      {
        label: metricType === "revenue" ? "Revenue" : "Orders",
        data: analyticsData.salesTrend.map((item) =>
          metricType === "revenue" ? item.revenue : item.orders
        ),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const salesTrendOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Trend",
      },
    },
  };

  const categoryData = {
    labels: analyticsData.categoryPerformance.map((item) => item.category),
    datasets: [
      {
        data: analyticsData.categoryPerformance.map((item) => item.percentage),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const categoryOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Category Distribution",
      },
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Analytics Dashboard</h1>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Revenue</h6>
              <h3>{formatCurrency(analyticsData.summary.totalRevenue)}</h3>
              <small className="text-success">↑ 12% from last period</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Orders</h6>
              <h3>{analyticsData.summary.totalOrders}</h3>
              <small className="text-success">↑ 8% from last period</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Average Order Value</h6>
              <h3>{formatCurrency(analyticsData.summary.averageOrderValue)}</h3>
              <small className="text-success">↑ 5% from last period</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Conversion Rate</h6>
              <h3>{formatPercentage(analyticsData.summary.conversionRate)}</h3>
              <small className="text-success">↑ 2% from last period</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Sales Trend</h5>
                <div className="d-flex gap-2">
                  <Form.Select
                    style={{ width: "150px" }}
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                  </Form.Select>
                  <Form.Select
                    style={{ width: "150px" }}
                    value={metricType}
                    onChange={(e) => setMetricType(e.target.value)}
                  >
                    <option value="revenue">Revenue</option>
                    <option value="orders">Orders</option>
                  </Form.Select>
                </div>
              </div>
              <div style={{ height: "300px" }}>
                <Line data={salesTrendData} options={salesTrendOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Category Distribution</h5>
              <div style={{ height: "300px" }}>
                <Pie data={categoryData} options={categoryOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-4">Top Performing Products</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Sales</th>
                    <th>Revenue</th>
                    <th>Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>{formatCurrency(product.revenue)}</td>
                      <td className="text-success">↑ {product.growth}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Export Reports</h5>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary">
                    Export Sales Report
                  </Button>
                  <Button variant="outline-primary">
                    Export Product Report
                  </Button>
                </div>
              </div>
              <p className="text-muted">
                Generate detailed reports for sales, products, and customer
                analytics. Reports can be exported in CSV or PDF format.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics; 