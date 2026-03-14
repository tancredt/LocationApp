<template>
  <div class="help-page">
    <AppHeader />
    
    <div class="help-container">
      <h1>Help & Frequently Asked Questions</h1>
      
      <section class="help-section">
        <h2>Getting Started</h2>
        <div class="faq-item">
          <h3>How do I log in to the system?</h3>
          <p>
            Use the provided credentials to log in. If you don't have an account or are 
            experiencing login issues, please contact the FRV Hazmat Department for assistance.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>What is this system used for?</h3>
          <p>
            This system is used to track and manage the movement of hazmat equipment between 
            FRV stations and facilities. You can swap detectors, change equipment locations, 
            and track calibration cylinder movements.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>What's the difference between this and the Inventory System?</h3>
          <p>
            The Location Management System focuses on tracking equipment movements and swaps 
            between locations. The main Inventory System manages equipment details, maintenance 
            schedules, sensor records, and service history.
          </p>
        </div>
      </section>

      <section class="help-section">
        <h2>Detector Swaps</h2>
        <div class="faq-item">
          <h3>How do I swap a MicroRAE detector?</h3>
          <p>
            From the main selection page, click "MicroRAE". Select the origin location 
            (District Office), choose the detector being returned, select the replacement 
            detector from Burnley, choose the reason for return, and add any notes. Click 
            "Swap Detector" to complete the process.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>How do I swap other hazmat detectors?</h3>
          <p>
            From the main selection page, click "Hazmat Detector". Select the detector model, 
            choose the origin location (Priority 2 or 3 stations), select the incoming and 
            outgoing detectors, and choose the reason for return.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>What happens when I complete a detector swap?</h3>
          <p>
            The system performs three actions:
          </p>
          <ol>
            <li>Moves the returned detector to Burnley</li>
            <li>Moves the replacement detector to the origin location</li>
            <li>Creates a fault report for the returned detector</li>
          </ol>
        </div>
        
        <div class="faq-item">
          <h3>Why are some detector selects disabled?</h3>
          <p>
            The detector selection dropdowns are disabled until you select an origin location. 
            This ensures the system can filter and show only the detectors available at that 
            specific location.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>What fault types can I select?</h3>
          <p>
            <strong>Failed Bump (BF)</strong> - Detector failed bump test<br>
            <strong>Sensor Fail (SF)</strong> - Sensor not responding correctly<br>
            <strong>Calibration Expired (CE)</strong> - Calibration overdue<br>
            <strong>Displays Error (DE)</strong> - Display showing errors<br>
            <strong>Will not turn on (WS)</strong> - Power failure<br>
            <strong>Damaged Display (DD)</strong> - Physical display damage<br>
            <strong>Damaged Casing (DC)</strong> - Physical case damage<br>
            <strong>Missing Attachment (MA)</strong> - Missing clip, boot, or filter
          </p>
        </div>
      </section>

      <section class="help-section">
        <h2>Cylinder Location Changes</h2>
        <div class="faq-item">
          <h3>How do I change a cylinder's location?</h3>
          <p>
            From the main selection page, click "Cylinder". Start typing the cylinder number 
            or serial in the search box to find the cylinder. Select the cylinder from the 
            dropdown, choose the new location, and click "Change Location".
          </p>
        </div>
        
        <div class="faq-item">
          <h3>How do I search for a cylinder?</h3>
          <p>
            The cylinder search is autocomplete. Start typing the cylinder number (e.g., 
            "CYL00123") or serial number, and matching cylinders will appear in the dropdown. 
            Results are limited to the first 10 matches.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>What cylinder information is tracked?</h3>
          <p>
            The system tracks cylinder number, serial number, gas type, concentration, location, 
            status (operational, empty, on order), order date, receive date, expiry date, and 
            operational date.
          </p>
        </div>
      </section>

      <section class="help-section">
        <h2>Locations</h2>
        <div class="faq-item">
          <h3>What locations are available?</h3>
          <p>
            Locations include all FRV stations, district offices, warehouses, workshops, and 
            the Burnley facility. Each location has a priority level that determines its role 
            in equipment distribution.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>What are location priorities?</h3>
          <p>
            <strong>Priority 1</strong> - Primary locations (typically Burnley)<br>
            <strong>Priority 2</strong> - Secondary distribution points<br>
            <strong>Priority 3</strong> - End-user stations and district offices
          </p>
        </div>
        
        <div class="faq-item">
          <h3>Why is Burnley special?</h3>
          <p>
            Burnley serves as the central equipment hub for FRV. Equipment swaps typically 
            involve moving equipment between stations and Burnley, where spare equipment is 
            stored and maintained.
          </p>
        </div>
      </section>

      <section class="help-section">
        <h2>Troubleshooting</h2>
        <div class="faq-item">
          <h3>No detectors appear in the dropdown</h3>
          <p>
            Make sure you have selected an origin location first. The detector dropdowns only 
            populate after a location is selected. If still empty, there may be no detectors 
            of the selected model at that location.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>Burnley location not found error</h3>
          <p>
            This error occurs if the system cannot find a location with "Burnley" in its name. 
            Contact support to ensure Burnley is correctly configured in the system.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>Swap completed but equipment not showing correctly</h3>
          <p>
            Allow a few moments for the system to update. Refresh the page to see the latest 
            equipment locations. If issues persist, contact support.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>Login fails with "Invalid credentials"</h3>
          <p>
            Double-check your username and password. Ensure Caps Lock is off. If you continue 
            to have issues, contact the FRV Hazmat Department to verify your account status.
          </p>
        </div>
      </section>

      <section class="help-section">
        <h2>Best Practices</h2>
        <div class="faq-item">
          <h3>When should I use this system?</h3>
          <p>
            Use this system whenever equipment is physically moved between locations. This 
            includes returning faulty equipment, exchanging equipment during station visits, 
            or relocating cylinders for calibration work.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>How detailed should fault notes be?</h3>
          <p>
            Include as much detail as possible: symptoms observed, when the fault was noticed, 
            any error codes displayed, and conditions that trigger the fault. This information 
            helps technicians diagnose and repair equipment efficiently.
          </p>
        </div>
        
        <div class="faq-item">
          <h3>Should I report minor issues?</h3>
          <p>
            Yes, report all issues. Even minor problems can indicate developing faults that 
            should be addressed before they become critical during emergency response.
          </p>
        </div>
      </section>

      <section class="help-section">
        <h2>Support</h2>
        <div class="faq-item">
          <h3>Who do I contact for help?</h3>
          <p>
            For system support, equipment questions, or training requests:
          </p>
          <ul>
            <li><strong>Email:</strong> hazmat@frv.vic.gov.au</li>
            <li><strong>Phone:</strong> (03) XXXX XXXX</li>
            <li><strong>Hours:</strong> Monday to Friday, 8:00 AM - 5:00 PM</li>
          </ul>
        </div>
        
        <div class="faq-item">
          <h3>What browsers are supported?</h3>
          <p>
            The system works best with modern browsers:
          </p>
          <ul>
            <li>Google Chrome (recommended)</li>
            <li>Mozilla Firefox</li>
            <li>Microsoft Edge</li>
            <li>Safari</li>
          </ul>
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
.help-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.help-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 2rem;
  flex: 1;
}

.help-container h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.help-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.help-section h2 {
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.faq-item {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.faq-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.faq-item h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.faq-item ul, .faq-item ol {
  color: #666;
  line-height: 1.8;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
}

.faq-item li {
  margin-bottom: 0.25rem;
}

@media (max-width: 768px) {
  .help-container {
    padding: 0 1rem;
    margin-top: 1rem;
  }

  .help-container h1 {
    font-size: 1.5rem;
  }

  .help-section {
    padding: 1.5rem;
  }
}
</style>
