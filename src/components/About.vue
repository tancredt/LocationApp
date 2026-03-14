<template>
  <div class="about-page">
    <AppHeader />
    
    <div class="about-container">
      <h1>About the FRV Hazmat Location Management System</h1>
      
      <section class="about-section">
        <h2>System Purpose</h2>
        <p>
          The Fire Rescue Victoria Hazmat Location Management System is a specialized internal 
          application designed to track and manage the movement of hazardous materials detection 
          equipment between FRV stations and facilities. This system ensures accurate tracking 
          of equipment locations, facilitating efficient equipment swaps and transfers across 
          the FRV network.
        </p>
      </section>

      <section class="about-section">
        <h2>What This System Does</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Detector Location Changes</h3>
            <p>Track and record when detectors are moved between stations, including swaps with equipment from the Burnley facility.</p>
          </div>
          <div class="feature-card">
            <h3>MicroRAE Swaps</h3>
            <p>Specialized workflow for swapping MicroRAE detectors between District Offices and Burnley, including automatic fault reporting.</p>
          </div>
          <div class="feature-card">
            <h3>Cylinder Location Tracking</h3>
            <p>Monitor the movement of calibration gas cylinders between locations to maintain accurate inventory records.</p>
          </div>
          <div class="feature-card">
            <h3>Fault Reporting</h3>
            <p>Automatically create fault reports when equipment is returned, ensuring issues are tracked and resolved.</p>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>Equipment Tracked</h2>
        <div class="equipment-types">
          <div class="equipment-type-card">
            <h3>Gas Detectors</h3>
            <p>
              Portable gas detection instruments that are moved between stations:
            </p>
            <ul>
              <li><strong>MicroRAE</strong> - Compact personal gas monitor (PID)</li>
              <li><strong>MultiRAE</strong> - Multi-gas detector with multiple sensors</li>
              <li><strong>XAM8000</strong> - Draeger multi-gas detector</li>
              <li><strong>MSA Altair</strong> - Portable multigas detector</li>
              <li><strong>AreaRAE</strong> - Wireless area monitoring system</li>
            </ul>
          </div>
          
          <div class="equipment-type-card">
            <h3>Calibration Cylinders</h3>
            <p>
              Gas cylinders used for detector calibration:
            </p>
            <ul>
              <li>Single-gas cylinders (CO, H2S, O2, etc.)</li>
              <li>Multi-gas mix cylinders</li>
              <li>PID calibration gas (Isobutylene)</li>
              <li>Various volumes (34L, 65L, 103L, 552L)</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>How It Works</h2>
        <div class="workflow-section">
          <h3>Detector Swap Process</h3>
          <ol class="workflow-steps">
            <li>
              <strong>Select Equipment Type</strong>
              <p>Choose between MicroRAE Swap, Hazmat Detector location change, or Cylinder location change.</p>
            </li>
            <li>
              <strong>Select Origin Location</strong>
              <p>Choose the station where the equipment is being returned from.</p>
            </li>
            <li>
              <strong>Select Equipment</strong>
              <p>Choose the equipment being returned and the replacement equipment from Burnley.</p>
            </li>
            <li>
              <strong>Record Fault (for detectors)</strong>
              <p>Select the reason for return (fault type) and add any notes about the issue.</p>
            </li>
            <li>
              <strong>Complete Swap</strong>
              <p>The system updates both equipment locations and creates a fault record if applicable.</p>
            </li>
          </ol>
        </div>
      </section>

      <section class="about-section">
        <h2>Location Types</h2>
        <div class="location-types-grid">
          <div class="location-type-card">
            <h4>Station (ST)</h4>
            <p>FRV fire stations where equipment is deployed for operational use.</p>
          </div>
          <div class="location-type-card">
            <h4>District Office (DI)</h4>
            <p>District administrative offices, primary locations for MicroRAE detectors.</p>
          </div>
          <div class="location-type-card">
            <h4>Warehouse (WA)</h4>
            <p>Central storage facilities for equipment inventory.</p>
          </div>
          <div class="location-type-card">
            <h4>Workshop (WK)</h4>
            <p>Maintenance and repair facilities.</p>
          </div>
        </div>
      </section>

      <section class="about-section">
        <h2>System Integration</h2>
        <p>
          This Location Management System works alongside the main FRV Hazmat Equipment Inventory 
          System. While the Inventory System manages equipment details, maintenance schedules, and 
          service records, this Location System focuses specifically on tracking equipment movements 
          and facilitating equipment swaps between stations and the Burnley facility.
        </p>
      </section>

      <section class="about-section">
        <h2>Support</h2>
        <p>
          For system support, equipment questions, or training requests, please contact:
        </p>
        <div class="contact-info">
          <p><strong>Email:</strong> hazmat@frv.vic.gov.au</p>
          <p><strong>Phone:</strong> (03) XXXX XXXX</p>
          <p><strong>Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM</p>
        </div>
      </section>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.about-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  flex: 1;
}

.about-container h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.about-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.about-section h2 {
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.about-section h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.about-section h4 {
  color: #667eea;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.about-section p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-section ul, .about-section ol {
  color: #666;
  line-height: 1.8;
  padding-left: 1.5rem;
}

.about-section li {
  margin-bottom: 0.5rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.feature-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
}

.feature-card h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.equipment-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.equipment-type-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}

.location-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.location-type-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 6px;
  border-left: 4px solid #764ba2;
}

.workflow-steps {
  counter-reset: step-counter;
  list-style: none;
  padding: 0;
}

.workflow-steps li {
  counter-increment: step-counter;
  margin-bottom: 1.5rem;
  padding-left: 2.5rem;
  position: relative;
}

.workflow-steps li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  background: #667eea;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.workflow-steps strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.workflow-steps p {
  margin: 0;
  font-size: 0.95rem;
}

.contact-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.contact-info p {
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .about-container {
    padding: 0 1rem;
    margin-top: 1rem;
  }

  .about-container h1 {
    font-size: 1.5rem;
  }

  .about-section {
    padding: 1.5rem;
  }

  .features-grid,
  .equipment-types,
  .location-types-grid {
    grid-template-columns: 1fr;
  }
}
</style>
