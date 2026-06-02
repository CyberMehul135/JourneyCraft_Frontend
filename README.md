# Journey Craft ( AI Powered Travel Planner )

* Journey Craft is a full-stack AI-powered travel planning application that helps users generate personalized travel itineraries in seconds.
* Users can create trips manually by providing trip details or get AI-recommended travel plans generated using Gemini and OpenRouter AI models.
* Built with React, Node.js, Express, MongoDB, Cloudinary, Google OAuth, and modern AI integrations.

---

## Demo Link

[Live Demo](https://ai-travel-planner-frontend-zeta.vercel.app/)

## Quick Start

```bash
git clone https://github.com/CyberMehul135/JourneyCraft_Frontend.git
cd <your-repo>
npm install
npm run dev
```

## Technologies

#### Frontend :

* React JS
* Tailwind CSS
* ShadCN UI
* Redux Toolkit
* TanStack Query
* React Router DOM
* Axios
* Lucide React

#### Backend :

* Node.js
* Express.js
* Google OAuth 2.0
* JWT Authentication
* Zod
* Multer
* Cookie Parser

#### Database :

* MongoDB
* Mongoose

#### AI & External APIs :

* Gemini API
* OpenRouter API
* Unsplash API

#### Cloud Services :

* Cloudinary

---

## Demo Video

Watch a walkthrough (5-6 minutes) of all major features of this app :

[Video Link](YOUR_VIDEO_LINK)

---

## Features

### Authentication & Security

* Google OAuth 2.0 Login
* JWT Authentication using HTTP-only Cookies
* Protected Routes
* Session Persistence
* Secure Cookie-based Authentication

### AI Trip Generation

* Generate travel itineraries using custom trip details
* Supports Gemini AI and OpenRouter AI
* Structured travel plans with day-wise itinerary
* Automatic destination image integration

### AI Recommended Trips

* Generate AI-curated travel recommendations
* Multiple trip suggestions returned in a single request
* Supports multiple AI providers
* Destination images fetched automatically

### Trip Management

* Create Trips
* View All Trips
* View Trip Details
* Delete Trips
* Search Trips by Destination
* Trip Statistics Dashboard

### User Profile Management

* View Profile Information
* Update Personal Details
* Upload Profile Avatar
* Automatic Cloudinary Media Management

### Image Management

* Destination Images fetched from Unsplash
* Trip Images stored in Cloudinary
* Automatic image cleanup on deletion
* Optimized image delivery

### Dashboard Analytics

* Total Trips Count
* Upcoming Trips Count
* Past Trips Count
* AI Request Tracking

### Frontend Features

* Dark / Light / System Theme
* Protected Routes
* Redux Toolkit State Management
* TanStack Query Server State Management
* Responsive Design
* Modern UI using ShadCN

---

## API Reference

### Authentication

### **GET /api/v1/auth/google**

Redirect user to Google OAuth login page

Sample Response:

`Redirects user to Google Sign-In`

### **GET /api/v1/auth/google/callback**

Handle Google OAuth callback, create/login user, generate JWT token, and set secure cookie

Sample Response:

`Redirects authenticated user to frontend application`

### **GET /api/v1/auth/session**

Verify current user session

Sample Response:

`{message, user}`

### **POST /api/v1/auth/logout**

Logout current user and clear authentication cookie

Sample Response:

`{message}`

---

### AI Services

### **GET /api/v1/ai/models**

Get all available AI models supported by the application

Sample Response:

`{AI_MODELS}`

---

### Trip Generation

### **POST /api/v1/itinery/generate**

Generate a travel itinerary using user inputs

Sample Response:

`{data}`

### **POST /api/v1/itinery/recommended**

Generate AI recommended trips

Sample Response:

`{trips}`

---

### Trips

### **POST /api/v1/itinery**

Save a generated trip

Sample Response:

`{trip}`

### **GET /api/v1/itinery**

Get all trips of authenticated user

Query Params:

`search=destination`

Sample Response:

`{data:[...]}`

### **GET /api/v1/itinery/stats**

Get trip dashboard statistics

Sample Response:

`{totalTrips, upcomingTrips, pastTrips, aiRequestsLeft}`

### **GET /api/v1/itinery/:id**

Get trip details by ID

Sample Response:

`{trip}`

### **DELETE /api/v1/itinery/:id**

Delete a trip and associated image

Sample Response:

`{message}`

---

### User Profile

### **GET /api/v1/user/me**

Get authenticated user details

Sample Response:

`{message, user}`

### **PUT /api/v1/user/me**

Update user profile information and avatar

Sample Response:

`{updatedUser}`

---


## Contact

For bugs or feature requests, please reach out to:

**Mehul Rathod**

Email: [mehulrathod9254@gmail.com](mailto:mehulrathod9254@gmail.com)
