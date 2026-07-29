ML INTEGERATION WORKFLOW

User clicks Donate Goods
        │
        ▼
Enters

• Pickup Address
• Preferred Category
• Item
        │
        ▼
Node.js converts address → latitude & longitude
        │
        ▼
Node.js fetches all NGOs from MongoDB
        │
        ▼
For every NGO

• Calculate distance
• Create feature vector
        │
        ▼
Call FastAPI
        │
        ▼
Receive compatibility score
        │
        ▼
Sort NGOs
        │
        ▼
Return Top 5 NGOs
        │
        ▼
React displays recommendations
