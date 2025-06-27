import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
import { Gear, Shield, Bell, CreditCard, Globe, Database } from 'react-bootstrap-icons';

function SystemSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'GearSphere',
      siteDescription: 'Your one-stop shop for PC components and services',
      maintenanceMode: false,
      allowRegistrations: true
    },
    security: {
      passwordMinLength: 8,
      requireStrongPassword: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enable2FA: false
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      orderUpdates: true,
      systemAlerts: true,
      marketingEmails: false
    },
    payment: {
      currency: 'LKR',
      taxRate: 15,
      enablePayments: true,
      supportedMethods: ['credit_card', 'debit_card', 'bank_transfer'],
      minimumOrderAmount: 1000
    },
    regional: {
      defaultLanguage: 'en',
      timezone: 'Asia/Colombo',
      dateFormat: 'DD/MM/YYYY',
      supportedLanguages: ['en', 'si', 'ta']
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionPeriod: 30,
      backupLocation: 'local',
      encryptionEnabled: true
    }
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSave = (category) => {
    // TODO: Implement API call to save settings
    setAlertMessage(`${category} settings saved successfully!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const renderGeneralSettings = () => (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Site Name</Form.Label>
            <Form.Control
              type="text"
              value={settings.general.siteName}
              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Site Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={settings.general.siteDescription}
              onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Maintenance Mode"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Allow New Registrations"
              checked={settings.general.allowRegistrations}
              onChange={(e) => handleSettingChange('general', 'allowRegistrations', e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderSecuritySettings = () => (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Minimum Password Length</Form.Label>
            <Form.Control
              type="number"
              value={settings.security.passwordMinLength}
              onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Require Strong Password"
              checked={settings.security.requireStrongPassword}
              onChange={(e) => handleSettingChange('security', 'requireStrongPassword', e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Session Timeout (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Enable Two-Factor Authentication"
              checked={settings.security.enable2FA}
              onChange={(e) => handleSettingChange('security', 'enable2FA', e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderNotificationSettings = () => (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Email Notifications"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="SMS Notifications"
              checked={settings.notifications.smsNotifications}
              onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Order Updates"
              checked={settings.notifications.orderUpdates}
              onChange={(e) => handleSettingChange('notifications', 'orderUpdates', e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="System Alerts"
              checked={settings.notifications.systemAlerts}
              onChange={(e) => handleSettingChange('notifications', 'systemAlerts', e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderPaymentSettings = () => (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Select
              value={settings.payment.currency}
              onChange={(e) => handleSettingChange('payment', 'currency', e.target.value)}
            >
              <option value="LKR">Sri Lankan Rupee (LKR)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tax Rate (%)</Form.Label>
            <Form.Control
              type="number"
              value={settings.payment.taxRate}
              onChange={(e) => handleSettingChange('payment', 'taxRate', parseFloat(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Enable Payments"
              checked={settings.payment.enablePayments}
              onChange={(e) => handleSettingChange('payment', 'enablePayments', e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Minimum Order Amount</Form.Label>
            <Form.Control
              type="number"
              value={settings.payment.minimumOrderAmount}
              onChange={(e) => handleSettingChange('payment', 'minimumOrderAmount', parseFloat(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderRegionalSettings = () => (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Default Language</Form.Label>
            <Form.Select
              value={settings.regional.defaultLanguage}
              onChange={(e) => handleSettingChange('regional', 'defaultLanguage', e.target.value)}
            >
              <option value="en">English</option>
              <option value="si">Sinhala</option>
              <option value="ta">Tamil</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Timezone</Form.Label>
            <Form.Select
              value={settings.regional.timezone}
              onChange={(e) => handleSettingChange('regional', 'timezone', e.target.value)}
            >
              <option value="Asia/Colombo">Colombo (GMT+5:30)</option>
              <option value="UTC">UTC</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Format</Form.Label>
            <Form.Select
              value={settings.regional.dateFormat}
              onChange={(e) => handleSettingChange('regional', 'dateFormat', e.target.value)}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );

  const renderBackupSettings = () => (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Automatic Backup"
              checked={settings.backup.autoBackup}
              onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Backup Frequency</Form.Label>
            <Form.Select
              value={settings.backup.backupFrequency}
              onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Retention Period (days)</Form.Label>
            <Form.Control
              type="number"
              value={settings.backup.retentionPeriod}
              onChange={(e) => handleSettingChange('backup', 'retentionPeriod', parseInt(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Enable Encryption"
              checked={settings.backup.encryptionEnabled}
              onChange={(e) => handleSettingChange('backup', 'encryptionEnabled', e.target.checked)}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">System Settings</h1>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="general" title={<><Gear className="me-2" />General</>}>
          {renderGeneralSettings()}
        </Tab>
        <Tab eventKey="security" title={<><Shield className="me-2" />Security</>}>
          {renderSecuritySettings()}
        </Tab>
        <Tab eventKey="notifications" title={<><Bell className="me-2" />Notifications</>}>
          {renderNotificationSettings()}
        </Tab>
        <Tab eventKey="payment" title={<><CreditCard className="me-2" />Payment</>}>
          {renderPaymentSettings()}
        </Tab>
        <Tab eventKey="regional" title={<><Globe className="me-2" />Regional</>}>
          {renderRegionalSettings()}
        </Tab>
        <Tab eventKey="backup" title={<><Database className="me-2" />Backup</>}>
          {renderBackupSettings()}
        </Tab>
      </Tabs>

      <div className="d-flex justify-content-end">
        <Button 
          variant="primary"
          onClick={() => handleSave(activeTab)}
        >
          Save Changes
        </Button>
      </div>
    </Container>
  );
}

export default SystemSettings; 