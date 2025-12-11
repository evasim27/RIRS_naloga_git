# Microservices Frontend

A React-based frontend for managing microservices across the platform.

## Features

- **User Management**: Create and manage user accounts
- **Merchant Management**: Create and manage merchant profiles
- **Orders**: View and track orders
- **Offers**: Create and manage special offers
- **Payments**: Process and track payments
- **Notifications**: Send and manage notifications

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── config/
│   │   └── api.js          # API client configuration
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Users.js
│   │   ├── Merchants.js
│   │   ├── Orders.js
│   │   ├── Offers.js
│   │   ├── Payments.js
│   │   └── Notifications.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   └── pages.css
│   ├── App.js
│   └── index.js
├── Dockerfile
├── package.json
├── .env.example
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure the environment variables with your microservice URLs:
   ```
   REACT_APP_USER_SERVICE_URL=http://localhost:8001
   REACT_APP_MERCHANT_SERVICE_URL=http://localhost:8002
   REACT_APP_ORDER_SERVICE_URL=http://localhost:8003
   REACT_APP_OFFER_SERVICE_URL=http://localhost:8004
   REACT_APP_PAYMENT_SERVICE_URL=http://localhost:8005
   REACT_APP_NOTIFICATION_SERVICE_URL=http://localhost:8006
   ```

### Running the Application

#### Development Mode

```bash
npm start
```

The application will open at `http://localhost:3000`

#### Production Build

```bash
npm run build
```

### Docker

Build the Docker image:
```bash
docker build -t microservices-frontend .
```

Run the container:
```bash
docker run -p 3000:3000 microservices-frontend
```

## API Integration

The frontend uses Axios to communicate with the microservices. Each service has its own API instance configured in `src/config/api.js`:

- **User Service**: Port 8001
- **Merchant Service**: Port 8002
- **Order Service**: Port 8003
- **Offer Service**: Port 8004
- **Payment Service**: Port 8005
- **Notification Service**: Port 8006

## Technologies Used

- React 18.2
- React Router v6
- Axios for HTTP requests
- CSS3 with responsive design

## Available Scripts

- `npm start` - Run the development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## Notes

- Ensure all microservices are running before starting the frontend
- CORS should be properly configured in your microservices to accept requests from the frontend
- The frontend uses environment variables for service URLs, making it easy to configure for different environments

## License

MIT
