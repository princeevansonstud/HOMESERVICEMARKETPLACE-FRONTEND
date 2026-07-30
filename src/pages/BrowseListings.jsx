import { useMemo, useState } from "react";
import ListingCard from "../components/provider/ListingCard";

const services = [
  {
    id: 1,
    title: "Professional Plumbing",
    category: "Plumbing",
    location: "Nairobi",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
  },
  {
    id: 2,
    title: "House Cleaning",
    category: "Cleaning",
    location: "Mombasa",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600",
  },
  {
    id: 3,
    title: "Electrical Installation",
    category: "Electrical",
    location: "Kisumu",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600",
  },
  {
    id: 4,
    title: "Home Painting",
    category: "Painting",
    location: "Nakuru",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
  },
];

export default function BrowseListings() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(search.toLowerCase()) ||
        service.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "" || service.category === category;

      const matchesLocation =
        location === "" || service.location === location;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [search, category, location]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-2">
        Find Trusted Home Services
      </h1>

      <p className="text-gray-500 mb-8">
        Browse reliable professionals near you.
      </p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search services..."
          className="border rounded-lg px-4 py-3 md:col-span-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Painting">Painting</option>
        </select>

        <select
          className="border rounded-lg px-4 py-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Mombasa">Mombasa</option>
          <option value="Kisumu">Kisumu</option>
          <option value="Nakuru">Nakuru</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ListingCard
              key={service.id}
              listing={service}
            />
          ))
        ) : (
          <p className="text-gray-500">No services found.</p>
        )}
      </div>
    </div>
  );
}
