# Location Change App

This is an independent application for changing the location of detectors and cylinders in the hazmat equipment inventory system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The app will be accessible at http://localhost:3001

## Features

- Login with existing credentials from the main inventory system
- Select between changing detector or cylinder locations
- Forms for changing locations with automatic population of current locations
- Outgoing and returning equipment tracking

## API Integration

This app connects to the same API as the main inventory system at `/api/inventory/` endpoints.