
# `GO RIDE - A Cab Booking Application`

A modern ride-sharing platform where drivers can manage ride requests in real-time and users can book rides seamlessly. Built with React TypeScript frontend and Spring Boot backend with real-time WebSocket communication.

---

## 🧱 Architecture Overview

- **Frontend**: React.js (Passenger and Driver Portal)
- **Backend**:
  - **API Gateway**: Central entrypoint
  - **Auth Service**: Login/Registration
  - **Booking Service**: Booking creation, ride tracking
  - **Location Service**: Handles nearby drivers using Redis
  - **Socket Service**: WebSocket-based real-time communication
  - **Redis**: Stores online driver data (location + vehicle type)
  - **Service Discovery**: Eureka/Consul for service registration

---

## 🚦 Workflow

### Passenger Flow:
1. Logs in via API Gateway → Auth Service
2. Redirects to Booking Page
3. Enters pickup/drop + vehicle type → API Gateway → Booking Service
4. Booking Service:
   - Saves data to DB
   - Calls Location Service to fetch nearby drivers from Redis
   - Calls Socket Service to send ride request to those drivers
5. If a driver accepts, continuous updates are sent via WebSocket.

### Driver Flow:
1. Logs in → redirected to Driver Portal
2. Goes Online → Sends location via WebSocket to Socket Service
3. Socket Service calls Location Service → Saves driver in Redis
4. When a nearby booking is made, ride requests are pushed to drivers.
5. On acceptance, Socket Service notifies Booking Service + Passenger.

---

## ⚙️ Tech Stack

- React.js (frontend)
- Spring Boot (backend microservices)
- Redis
- WebSocket (STOMP over SockJS)
- Eureka for service discovery
- API Gateway (Spring Cloud Gateway)

---

## 🧪 Local Setup

1. Start `service-discovery`
2. Start all services (auth, booking, location, socket)
3. Start `api-gateway`
4. Start frontend (`npm start`)
5. Ensure Redis is running

---

## 🔐 Authentication

- Role-based: Passenger, Driver
- JWT included with user role, used for securing backend endpoints

---

## 📬 Real-time Communication

- WebSocket endpoints handled by `socket-service`
- Passenger receives real-time driver responses
- Drivers receive ride requests based on Redis-filtered proximity

---

## 📌 Future Enhancements

- Payment Integration
- Rating & Review system
- Driver analytics dashboard



- ## Snapshots
![Screenshot 2025-06-17 080924](https://github.com/user-attachments/assets/b777e5f6-401c-4cf0-b787-0df66b2efc24)
![Screenshot 2025-06-17 080924](https://github.com/user-attachments/assets/5258e937-fbd1-4624-a3e4-cdb14be759db)
![image](https://github.com/user-attachments/assets/455a73b1-c01f-49e3-9f32-12a1913c695f)
![image](https://github.com/user-attachments/assets/3f75e8b0-dfbb-426a-b532-5b237dcbeaf8)

![image](https://github.com/user-attachments/assets/6529880a-02f1-4b64-afa5-573e7dbf0321)
![image](https://github.com/user-attachments/assets/aed02365-4d57-4e77-8931-469eae079a90)




