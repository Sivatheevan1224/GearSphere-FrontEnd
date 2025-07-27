import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import { Line, Bar, Pie } from "react-chartjs-2";
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
  Legend,
} from "chart.js";

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
  const [timeRange, setTimeRange] = useState("month");
  const [metricType, setMetricType] = useState("revenue");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Get user_id from localStorage or context
    const url = `http://localhost/gearsphere_api/GearSphere-BackEnd/getSellerAnalytics.php`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message || "Unknown error");
        setAnalyticsData(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <h4>Loading analytics...</h4>
      </div>
    );
  if (error)
    return (
      <div className="text-center py-5 text-danger">
        <h4>{error}</h4>
      </div>
    );
  if (!analyticsData) return null;

  // Show a sliding window of up to 5 months, always including current month, and up to 1 future month if present in data
  function getLastNMonths(latestMonth, n = 5) {
    const months = [];
    const [year, month] = latestMonth.split('-').map(Number);
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(year, month - 1 - i, 1);
      months.push(d.toISOString().slice(0, 7));
    }
    return months;
  }
  // Find the latest month in analytics data or use current month
  const salesTrendPeriods = (analyticsData.salesTrend || []).map(item => item.period);
  const currentMonth = new Date().toISOString().slice(0, 7);
  let latestMonth = currentMonth;
  if (salesTrendPeriods.length > 0) {
    latestMonth = salesTrendPeriods.reduce((a, b) => (a > b ? a : b), currentMonth);
  }
  const lastNMonths = getLastNMonths(latestMonth, 5);
  const salesTrendMap = {};
  (analyticsData.salesTrend || []).forEach(item => {
    salesTrendMap[item.period] = item;
  });
  const normalizedSalesTrend = lastNMonths.map(period => ({
    period,
    revenue: salesTrendMap[period]?.revenue || 0,
    orders: salesTrendMap[period]?.orders || 0,
  }));
  const salesTrendData = {
    labels: normalizedSalesTrend.map(item => item.period),
    datasets: [
      {
        label: metricType === "revenue" ? "Revenue" : "Orders",
        data: normalizedSalesTrend.map(item =>
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
    labels: (analyticsData.categoryPerformance || []).map(
      (item) => item.category
    ),
    datasets: [
      {
        data: (analyticsData.categoryPerformance || []).map(
          (item) => item.percentage
        ),
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
    return "LKR " + Number(amount).toLocaleString("en-LK");
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Analytics Dashboard</h1>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Revenue</h6>
              <h3>{formatCurrency(analyticsData.summary.totalRevenue)}</h3>
              
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Orders</h6>
              <h3>{analyticsData.summary.totalOrders}</h3>
             
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Average Order Value</h6>
              <h3>{formatCurrency(analyticsData.summary.averageOrderValue)}</h3>
            
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
                    
                  </tr>
                </thead>
                <tbody>
                  {(analyticsData.topProducts || []).map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.name}</td>
                      <td>{product.sales}</td>
                      <td>{formatCurrency(product.revenue)}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Export Reports</h5>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary">Export Sales Report</Button>
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
      </Row> */}
    </Container>
  );
};

export default Analytics;
