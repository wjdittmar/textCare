"use client";

import { useEffect, useState } from "react";
import { baseApiUrl } from "@/lib/apiConfig";
import { apiClient } from "@/lib/api";

interface UserData {
  name: string;
  email: string;
  address_line_one: string;
  address_line_two: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  birthday: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: cache data after fetching, prefetch

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient(`${baseApiUrl}/v1/users/me`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch user data.");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <h1>Account Information</h1>

      <div>
        <div>
          <h2>Personal Information</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>
            Birthday:
            {`${monthNames[parseInt(user.birthday.split("-")[1]) - 1]} ${parseInt(user.birthday.split("-")[2])}, ${user.birthday.split("-")[0]}`}
          </p>
        </div>

        <div>
          <h2>Contact Information</h2>
          <p>Phone: {user.phone_number}</p>
        </div>

        <div>
          <h2>Address</h2>
          <p>{user.address_line_one}</p>
          {user.address_line_two && <p>{user.address_line_two}</p>}
          <p>
            {user.city}, {user.state} {user.zip_code}
          </p>
        </div>
      </div>
    </div>
  );
}
