# Aahar Setu - Food Wastage Minimization Platform

## Overview

**Aahar Setu** is an innovative web and mobile application designed to tackle food wastage by connecting food donors with recipients, and offering solutions for food surplus management. With the growing issue of food insecurity and environmental sustainability, Aahar Setu serves as a bridge between donors (individuals, businesses, and organizations) and receivers (NGOs, community kitchens, and underprivileged individuals) to redistribute surplus food efficiently. The platform offers real-time food wastage analysis, fraud detection, and an engaging leaderboard system to encourage participation in food donation and sustainable practices.
![WhatsApp Image 2025-04-20 at 12 34 33](https://github.com/user-attachments/assets/92168234-1475-443a-a9ca-d39185e21e52)

## Key Features

### 1. **Real-time Food Wastage Analysis**
   - **Description:** The platform provides real-time analytics to monitor food wastage patterns across various regions. This helps identify areas where food wastage is most prevalent and provides insights to mitigate the issue.
   - **Benefits:** Improves decision-making for donors and policy-makers and highlights regions requiring more attention.

### 2. **State-wise Food Wastage Impact Analysis**
   - **Description:** A state-level breakdown of food wastage is available, providing users with an understanding of the local impact. It highlights food wastage in different regions and helps pinpoint where food donation is most needed.
   - **Benefits:** Empowers stakeholders with critical data to target interventions effectively and reduce waste in high-impact areas.

### 3. **Fridge Analyzer**
   - **Description:** The Fridge Analyzer tool suggests whether users need to buy groceries based on what’s currently available in their fridge. It uses inventory management algorithms to minimize unnecessary grocery purchases, ensuring that food isn’t wasted.
   - **Benefits:** Encourages users to utilize leftovers and minimize food spoilage by providing personalized suggestions based on real-time fridge inventory.

### 4. **Fraud Detection**
   - **Description:** The platform includes a fraud detection system to ensure that food donations are being used as intended. If food is donated but not utilized effectively, or if there’s any suspicious behavior in the donation or receipt process, the system flags it.
   - **Benefits:** Protects donors and recipients from misuse and ensures transparency in food donation processes.

### 5. **Food Delivery Map**
   - **Description:** The map feature visualizes the locations of donors and recipients, along with food deliveries. It displays real-time updates, allowing donors and recipients to track food donation progress.
   - **Benefits:** Increases transparency in the food donation process, and helps donors and receivers find the nearest available resources.
![WhatsApp Image 2025-04-20 at 12 29 49](https://github.com/user-attachments/assets/6a26c89b-6ca9-4b99-860e-007a8f2c2f31)

### 6. **Recipe Generator for Leftovers**
   - **Description:** This tool suggests creative recipes based on leftover food items available in the fridge, promoting food utilization and minimizing waste.
   - **Benefits:** Encourages cooking with available ingredients, helps reduce food wastage, and introduces users to new, sustainable ways of cooking.

### 7. **Leaderboard**
   - **Description:** A competitive leaderboard displays top contributors to food waste reduction efforts, such as active donors, receivers, and NGOs. The leaderboard is based on the number of successful donations, food usage, and overall participation.
   - **Benefits:** Gamifies the process and encourages greater participation in the fight against food wastage. It serves as an incentive for users to donate more and use the platform actively.

## Installation Instructions

### Prerequisites

Ensure that you have the following installed on your machine:

- **Node.js** (for running the backend and frontend services)
- **MongoDB** (for the backend database)
- **npm** or **yarn** (for managing dependencies)
- **Git** (for version control)

### Backend Setup

1. **Clone the Repository**:
   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/your-username/aahar-setu.git
   ```

2. **Navigate to the Backend Directory**:
   ```bash
   cd AaharSetu/Backend
   ```

3. **Install Dependencies**:
   Install the necessary backend dependencies using npm or yarn:
   ```bash
   npm install
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the `Backend` directory and add the following environment variables:
   - `MONGO_URI` – The connection string for your MongoDB database.
   - `PORT` – The port on which the backend server will run (default: 5000).
   - `API_KEYS` – Any required external API keys (for mapping, etc.).

5. **Run the Backend**:
   Start the backend server:
   ```bash
   npm start
   ```
   The backend should now be running at `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:
   ```bash
   cd AaharSetu/Frontend
   ```

2. **Install Dependencies**:
   Install the required frontend dependencies:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will be accessible at `http://localhost:3000`.

## Usage Instructions

- **Donating Food**: Donors can register on the platform, list the available food items, and specify delivery details. The food is then available for nearby receivers to claim.
- **Receiving Food**: NGOs and individuals in need can register as food receivers and claim food donations through the platform. The system ensures fair allocation.
- **Fraud Detection**: The platform uses algorithms to identify suspicious patterns, flagging any irregularities in the donation or receiving process.
- **Leaderboard**: Users can view the leaderboard to see top contributors. The leaderboard ranks based on successful donations, food usage, and engagement with the platform.

## Contributing

We welcome contributions to improve **Aahar Setu**. If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request with a description of the changes you've made.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

### Additional Notes

- **Sustainability Focus**: The entire platform is designed with sustainability in mind, helping reduce food waste and promoting better food distribution.
- **Future Improvements**: Future iterations will integrate machine learning models for predictive food wastage analytics and better recommendation systems.

---

This README now provides a more comprehensive explanation of the features, technical setup, and use cases for **Aahar Setu**. You can further customize it based on specific project requirements or add more detailed instructions if needed!
