import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Pagination } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const TechnicianReviews = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Mock data - replace with actual API calls
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customerName: 'John Smith',
      date: '2024-03-15',
      rating: 5,
      service: 'PC Build',
      comment: 'Excellent work! The PC was built exactly to my specifications and runs perfectly. Very professional and knowledgeable.',
      response: 'Thank you for your kind words! I\'m glad you\'re happy with your new PC.'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      date: '2024-03-14',
      rating: 4,
      service: 'Hardware Repair',
      comment: 'Quick and efficient service. Fixed my laptop issues in no time. Would recommend!',
      response: null
    },
    {
      id: 3,
      customerName: 'Mike Brown',
      date: '2024-03-13',
      rating: 5,
      service: 'Software Installation',
      comment: 'Very helpful and patient with my questions. Great service!',
      response: 'Thank you for choosing our service!'
    },
    {
      id: 4,
      customerName: 'Emily Davis',
      date: '2024-03-12',
      rating: 5,
      service: 'PC Build',
      comment: 'Amazing attention to detail. The cable management is perfect!',
      response: null
    },
    {
      id: 5,
      customerName: 'David Wilson',
      date: '2024-03-11',
      rating: 3,
      service: 'Hardware Repair',
      comment: 'Service was good, but took longer than expected.',
      response: 'I apologize for the delay. Thank you for your patience.'
    }
  ]);

  const [responseText, setResponseText] = useState({});

  const handleResponseChange = (reviewId, text) => {
    setResponseText(prev => ({
      ...prev,
      [reviewId]: text
    }));
  };

  const handleSubmitResponse = (reviewId) => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId ? { ...review, response: responseText[reviewId] } : review
    ));
    setResponseText(prev => ({ ...prev, [reviewId]: '' }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-warning' : 'text-muted'}
        style={{ marginRight: '2px' }}
      />
    ));
  };

  const getRatingPercentage = (rating) => {
    return (reviews.length / reviews.length) * 100;
  };

  const filteredReviews = reviews.filter(review => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'responded') return review.response !== null;
    if (activeFilter === 'unresponded') return review.response === null;
    return review.rating === parseInt(activeFilter);
  });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Customer Reviews</h1>

      <Row>
        {/* Rating Summary */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <div className="text-center mb-4">
                <h2 className="mb-0">{reviews.length > 0 ? reviews[0].rating : 0}</h2>
                <div className="mb-2">
                  {renderStars(Math.round(reviews.length > 0 ? reviews[0].rating : 0))}
                </div>
                <p className="text-muted mb-0">
                  Based on {reviews.length} reviews
                </p>
              </div>

              <div className="rating-breakdown">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="d-flex align-items-center mb-2">
                    <div className="me-2" style={{ width: '60px' }}>
                      {rating} {rating === 1 ? 'star' : 'stars'}
                    </div>
                    <div className="flex-grow-1">
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: `${getRatingPercentage(rating)}%` }}
                        />
                      </div>
                    </div>
                    <div className="ms-2" style={{ width: '40px' }}>
                      {reviews.filter(r => r.rating === rating).length}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Reviews List */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-2">
                  <Button
                    variant={activeFilter === 'all' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeFilter === 'responded' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveFilter('responded')}
                  >
                    Responded
                  </Button>
                  <Button
                    variant={activeFilter === 'unresponded' ? 'primary' : 'outline-primary'}
                    onClick={() => setActiveFilter('unresponded')}
                  >
                    Unresponded
                  </Button>
                </div>
                <Form.Select
                  style={{ width: 'auto' }}
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </Form.Select>
              </div>

              {currentReviews.map(review => (
                <div key={review.id} className="border-bottom pb-4 mb-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="mb-1">{review.customerName}</h5>
                      <div className="mb-2">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <div className="text-muted">
                      <small>{review.date}</small>
                    </div>
                  </div>

                  <Badge bg="info" className="mb-2">
                    {review.service}
                  </Badge>

                  <p className="mb-3">{review.comment}</p>

                  {review.response ? (
                    <div className="bg-light p-3 rounded mb-3">
                      <strong>Your Response:</strong>
                      <p className="mb-0">{review.response}</p>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Write a response..."
                          value={responseText[review.id] || ''}
                          onChange={(e) => handleResponseChange(review.id, e.target.value)}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleSubmitResponse(review.id)}
                      >
                        Submit Response
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {totalPages > 1 && (
                <div className="d-flex justify-content-center">
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TechnicianReviews; 