import mongoose from "mongoose";
import Destination from "@/models/Destination";
import Homestay from "@/models/Homestay";
import Restaurant from "@/models/Restaurant";
import Vendor from "@/models/Vendor";
import { connectDB } from "@/lib/mongodb";

async function seed() {
  await connectDB();

  await Promise.all([
    Destination.deleteMany({}),
    Homestay.deleteMany({}),
    Restaurant.deleteMany({}),
    Vendor.deleteMany({}),
  ]);

  // 🌍 Create destinations
  const destinations = await Destination.insertMany([
    {
      name: "Jaipur",
      description: "The Pink City, famous for forts and palaces.",
      image: "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyfGVufDB8fDB8fHww",
      location: { lat: 26.9124, lng: 75.7873 },
    },
    {
      name: "Goa",
      description: "Beaches, nightlife, and seafood paradise.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      location: { lat: 15.2993, lng: 74.124 },
    },
    {
      name: "Manali",
      description: "Hill station surrounded by snowy mountains and adventure sports.",
      image: "https://images.unsplash.com/photo-1712388430474-ace0c16051e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuYWxpfGVufDB8fDB8fHww",
      location: { lat: 32.2396, lng: 77.1887 },
    },
    {
      name: "Varanasi",
      description: "The spiritual capital of India, known for ghats and temples.",
      image: "https://media.istockphoto.com/id/827065008/photo/holy-town-varanasi-and-the-river-ganges.webp?a=1&b=1&s=612x612&w=0&k=20&c=QtEgeqRAUw0e45r54qW9I79H0hxqk0_3klw_B3xD_rY=",
      location: { lat: 25.3176, lng: 82.9739 },
    },
    {
      name: "Kerala",
      description: "God’s Own Country, famous for backwaters and greenery.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada",
      location: { lat: 10.8505, lng: 76.2711 },
    },
    {
      name: "Agra",
      description: "Home of the Taj Mahal, rich in Mughal history and heritage.",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      location: { lat: 27.1751, lng: 78.0421 },
    },
    {
      name: "Ladakh",
      description: "High-altitude cold desert, famous for pristine lakes, monasteries, and adventure.",
      image: "https://images.unsplash.com/photo-1581791538302-03537b9c97bf",
      location: { lat: 34.1526, lng: 77.5771 },
    },
  ]);

  // 🏡 Homestays
  await Homestay.insertMany([
    // Jaipur
    { name: "Royal Stay Jaipur", description: "Luxury homestay with traditional interiors.", price: 2500, image: "https://images.unsplash.com/photo-1505692794403-34d4982fd1b7", destinationId: destinations[0]._id },
    { name: "Pink Heritage", description: "Stay near Hawa Mahal.", price: 1800, image: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1", destinationId: destinations[0]._id },
    { name: "Amber Residency", description: "Close to Amber Fort with city views.", price: 3000, image: "https://images.unsplash.com/photo-1559599101-f09722fb4948", destinationId: destinations[0]._id },

    // Goa
    { name: "Goa Beach House", description: "Beach-facing homestay.", price: 4000, image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", destinationId: destinations[1]._id },
    { name: "Palm Grove Stay", description: "Relax in coconut tree surroundings.", price: 2200, image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e", destinationId: destinations[1]._id },
    { name: "Fisherman’s Retreat", description: "Homely stay with seafood cuisine.", price: 2800, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267", destinationId: destinations[1]._id },

    // Manali
    { name: "Snow Valley Stay", description: "Snowy mountain view homestay.", price: 3500, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", destinationId: destinations[2]._id },
    { name: "Apple Orchard Homestay", description: "Stay amidst apple orchards.", price: 2700, image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba", destinationId: destinations[2]._id },
    { name: "Adventure Lodge", description: "Perfect for trekking and paragliding lovers.", price: 3200, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511", destinationId: destinations[2]._id },

    // Varanasi
    { name: "Ganga View Stay", description: "Homestay with view of Ganga Ghats.", price: 2000, image: "https://images.unsplash.com/photo-1501117716987-c8f7d3d4f3d7", destinationId: destinations[3]._id },
    { name: "Temple Residency", description: "Stay near Kashi Vishwanath Temple.", price: 1500, image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6", destinationId: destinations[3]._id },
    { name: "Spiritual Homestay", description: "Authentic experience near ghats.", price: 1800, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c", destinationId: destinations[3]._id },

    // Kerala
    { name: "Backwater Bliss", description: "Stay in a traditional Kerala houseboat.", price: 5000, image: "https://images.unsplash.com/photo-1543353071-873f17a7a088", destinationId: destinations[4]._id },
    { name: "Green Palm Retreat", description: "Stay among lush green landscapes.", price: 2500, image: "https://images.unsplash.com/photo-1519821172141-b5d8bdf9b3f8", destinationId: destinations[4]._id },
    { name: "Coconut Lagoon Stay", description: "Eco-friendly lakeside homestay.", price: 2800, image: "https://images.unsplash.com/photo-1499696010181-8d1d6c2211f1", destinationId: destinations[4]._id },

    // Agra
    { name: "Taj View Homestay", description: "Cosy homestay with a view of the Taj Mahal.", price: 2200, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945", destinationId: destinations[5]._id },
    { name: "Mughal Heritage Villa", description: "Luxury rooms close to the heritage monuments.", price: 3500, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", destinationId: destinations[5]._id },

    // Ladakh
    { name: "Himalayan Homestay Leh", description: "Cozy local homestay in Leh town.", price: 1800, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab", destinationId: destinations[6]._id },
    { name: "Stok Palace View Stay", description: "Scenic mountain view stay near the palace.", price: 2800, image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9", destinationId: destinations[6]._id },
  ]);

  // 🍴 Restaurants
  await Restaurant.insertMany([
    { name: "Jaipur Spice", description: "Authentic Rajasthani cuisine.", cuisine: "Rajasthani", image: "https://images.unsplash.com/photo-1553621042-f6e147245754", destinationId: destinations[0]._id },
    { name: "Hawa Mahal Café", description: "Coffee and snacks near Hawa Mahal.", cuisine: "Cafe", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9", destinationId: destinations[0]._id },
    { name: "Thali Junction", description: "Unlimited Rajasthani thali.", cuisine: "Thali", image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f", destinationId: destinations[0]._id },

    { name: "Sea Breeze Shack", description: "Beachfront seafood restaurant.", cuisine: "Seafood", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", destinationId: destinations[1]._id },
    { name: "Goa Nights", description: "Fine dining with Goan feni cocktails.", cuisine: "Goan", image: "https://images.unsplash.com/photo-1543353071-873f17a7a088", destinationId: destinations[1]._id },
    { name: "Beachside Bites", description: "Fast food on the beach.", cuisine: "Fast Food", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", destinationId: destinations[1]._id },

    { name: "Snow Café", description: "Warm snacks in snowy hills.", cuisine: "Cafe", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601", destinationId: destinations[2]._id },
    { name: "Himalayan Dhaba", description: "Authentic Himachali food.", cuisine: "Himachali", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", destinationId: destinations[2]._id },
    { name: "Adventure Bites", description: "Quick food for trekkers.", cuisine: "Fast Food", image: "https://images.unsplash.com/photo-1512058564366-c9e3e0464bde", destinationId: destinations[2]._id },

    { name: "Kashi Chaat Bhandar", description: "Famous for Banarasi chaat.", cuisine: "Street Food", image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3", destinationId: destinations[3]._id },
    { name: "Ganga Aarti Café", description: "Riverside café with view of Ganga.", cuisine: "Cafe", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", destinationId: destinations[3]._id },
    { name: "Banaras Bhojanalay", description: "Traditional North Indian thali.", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1583337130417-d2dc9c4b6dbe", destinationId: destinations[3]._id },

    { name: "Kerala Spice House", description: "Traditional Kerala sadhya meal.", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", destinationId: destinations[4]._id },
    { name: "Backwater Café", description: "Lakeview coffee spot.", cuisine: "Cafe", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", destinationId: destinations[4]._id },
    { name: "Coconut Curry", description: "Seafood curries with coconut base.", cuisine: "Seafood", image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a", destinationId: destinations[4]._id },

    // Agra
    { name: "Peshawri Agra", description: "Famous North-West Frontier cuisine.", cuisine: "Mughlai", image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae", destinationId: destinations[5]._id },
    { name: "Panchi Petha Café", description: "Authentic local sweet shops and quick bites.", cuisine: "Sweets & Cafe", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9", destinationId: destinations[5]._id },

    // Ladakh
    { name: "Tibetan Kitchen", description: "Authentic local Tibetan and Ladakhi cuisine.", cuisine: "Tibetan", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d", destinationId: destinations[6]._id },
    { name: "Leh Zatar Cafe", description: "Warm cafe with spectacular valley views.", cuisine: "Cafe", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24", destinationId: destinations[6]._id },
  ]);

  // 🛍 Vendors
  await Vendor.insertMany([
    { name: "Guide Ramesh", service: "Tour guide for forts and markets", contact: "+91-9876543210", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[0]._id },
    { name: "Craft Seller Aarti", service: "Handmade Rajasthani crafts", contact: "+91-9988776655", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[0]._id },
    { name: "Camel Safari Raj", service: "Camel rides near desert", contact: "+91-8877665544", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", destinationId: destinations[0]._id },

    { name: "Guide Sameer", service: "Beach and nightlife tours", contact: "+91-9988771122", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", destinationId: destinations[1]._id },
    { name: "Water Sports Goa", service: "Jet ski, parasailing, banana rides", contact: "+91-7766554433", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[1]._id },
    { name: "Tattoo Artist Vinay", service: "Beachside tattoo artist", contact: "+91-6655443322", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", destinationId: destinations[1]._id },

    { name: "Guide Anil", service: "Snow trekking guide", contact: "+91-9988773344", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[2]._id },
    { name: "Ski Rental", service: "Ski and snowboard rentals", contact: "+91-7766552211", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", destinationId: destinations[2]._id },
    { name: "Adventure Tours", service: "River rafting and paragliding tours", contact: "+91-5544332211", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", destinationId: destinations[2]._id },

    { name: "Guide Suresh", service: "Temple tours and rituals assistance", contact: "+91-9876501234", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[3]._id },
    { name: "Silk Seller Priya", service: "Banarasi saree shop owner", contact: "+91-7766001122", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", destinationId: destinations[3]._id },
    { name: "Purohit Pandey", service: "Pooja and Ganga Aarti services", contact: "+91-6655441100", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", destinationId: destinations[3]._id },

    { name: "Guide Mohan", service: "Backwater tours", contact: "+91-9988775566", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[4]._id },
    { name: "Ayurveda Doctor Anju", service: "Traditional Ayurvedic treatment", contact: "+91-7766558899", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", destinationId: destinations[4]._id },
    { name: "Houseboat Operator", service: "Rent traditional Kerala houseboats", contact: "+91-6655447788", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", destinationId: destinations[4]._id },

    // Agra
    { name: "Guide Sanjay", service: "Professional Taj Mahal historian guide", contact: "+91-9897001122", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[5]._id },
    { name: "Marble Crafts Ravi", service: "Exquisite inlay marble designs and replicas", contact: "+91-9897003344", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9", destinationId: destinations[5]._id },

    // Ladakh
    { name: "Guide Tundup", service: "Trekking and local monastery specialist", contact: "+91-9877005566", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", destinationId: destinations[6]._id },
    { name: "Ladakh Bike Rentals", service: "Rent Royal Enfield bikes for mountain passes", contact: "+91-9877007788", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", destinationId: destinations[6]._id },
  ]);

  console.log("✅ Database seeded with 7 destinations and related data!");
  mongoose.connection.close();
}

seed();
