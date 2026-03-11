# Hazmat Equipment Location Management Application

## Overview

This is an internal Fire Rescue Victoria application for managing the location and tracking of hazardous materials (Hazmat) detection equipment. The application provides a streamlined interface for updating equipment locations across FRV stations and facilities.

## Purpose

The Hazmat Equipment Location Management system is used by Fire Rescue Victoria personnel to:

- Track and update detector locations across stations
- Manage calibration cylinder inventory and locations
- Record equipment swaps and transfers
- Log fault reports for returned equipment
- Maintain accurate records of safety-critical detection equipment

## Equipment Tracked

This application manages the following types of hazmat detection equipment:

### Gas Detectors
- **MicroRAE** - Personal multi-gas monitors
- **MultiRAE** - Portable multi-gas detectors
- **ToxiRAE** - Single-gas personal monitors
- **Area Monitors** - Fixed location gas detection systems

### Calibration Equipment
- Calibration gas cylinders (various gas mixes)
- Regulators and flow meters
- Bump test stations

### Sensors and Accessories
- PID (Photoionization Detector) sensors
- Catalytic bead (LEL) sensors
- Electrochemical sensors (CO, H2S, O2, etc.)
- Infrared sensors

## Setup

### Prerequisites

- Node.js (version 20.19.0 or higher, or 22.12.0+)
- npm (Node Package Manager)
- Access to the FRV internal API server

### Installation

1. Navigate to the application directory:
```bash
cd LocationApp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:3001`

### Build for Production

```bash
npm run build
```

## Features

### Authentication
- Secure login using existing FRV inventory system credentials
- Session-based authentication with CSRF protection
- Automatic session validation and timeout handling

### Location Management

#### Detector Location Changes
- **MicroRAE Swap** - Dedicated workflow for swapping MicroRAE detectors between stations and Burnley headquarters
- **General Detector Transfer** - Update location for any hazmat detector in the inventory
- Automatic fault report creation when detectors are returned for service

#### Cylinder Location Changes
- Update calibration cylinder locations
- Search and autocomplete for cylinder selection
- Track cylinder status and expiry dates

### Equipment Tracking
- Real-time inventory status
- Location history tracking
- Equipment status updates (Operational, In Stock, On Order, Decommissioned)

### Fault Reporting
- Record equipment faults and failures
- Track fault resolution status
- Link faults to specific locations and dates

## API Integration

This application connects to the Fire Rescue Victoria Hazmat Inventory API at `/api/inventory/` endpoints. The API provides:

- Equipment CRUD operations
- Location management
- Fault reporting
- Maintenance scheduling
- PDF report generation

## Technology Stack

- **Frontend Framework**: Vue.js 3.5+ (Composition API)
- **Build Tool**: Vite 7.3+
- **State Management**: Pinia 3.0+
- **Routing**: Vue Router 4.6+
- **Styling**: Custom CSS with modern flexbox/grid layouts

## Security

- Session-based authentication
- CSRF token protection
- CORS configured for authorized origins only
- No sensitive data stored in browser storage
- Automatic session timeout

## Browser Requirements

- Modern web browser with JavaScript enabled
- Cookies enabled for session management
- Recommended browsers:
  - Google Chrome (latest)
  - Mozilla Firefox (latest)
  - Microsoft Edge (latest)
  - Safari (latest)

## Support

For technical support or questions about this application, contact the Fire Rescue Victoria Hazmat Department.

---

**Internal Use Only** - This application is for authorized FRV personnel only.