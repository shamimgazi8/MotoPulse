"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography, Spin, Empty } from "antd";
import { FireOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

interface Bike {
  id: number;
  name: string;
  imgUrl: string; // Adjusted to imgUrl from the backend response
  brand: string;
  likeCount: number;
  slug: string | null;
}

const TrendingBikes: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrendingBikes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "http://localhost:4000/reviews?page=1&limit=5&sortby=popular"
        );
        if (!res.ok) throw new Error("API failed");

        const data = await res.json();

        // Assuming response contains bikes in 'result' with like_count aggregation
        if (data && Array.isArray(data.result)) {
          const bikesData: Bike[] = data.result.map((bike: any) => ({
            id: bike.id,
            name: bike.bike.name, // Adjust this to match the structure
            imgUrl: bike.coverPhoto,
            brand: bike.bike.brand.brandName, // Assuming brand has a name property
            likeCount: bike.like_count, // Aggregated like count
            slug: bike.slug, // Aggregated like count
          }));
          setBikes(bikesData);
        } else {
          setBikes([]); // In case of empty or invalid data
        }
      } catch (err) {
        console.warn("Using fake trending bikes due to API error:", err);
        setBikes([]); // You can replace this with a fake dataset if desired
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBikes();
  }, []);

  return (
    <div style={{ marginTop: 32 }}>
      <Title level={4}>
        <FireOutlined style={{ color: "orange", marginRight: 8 }} />
        Trending Bikes
      </Title>

      {loading ? (
        <Spin />
      ) : bikes.length === 0 ? (
        <Empty description="No trending bikes available" />
      ) : (
        bikes.map((bike) => (
          <Link key={bike.id} href={`/${bike?.slug}`}>
            <Card
              hoverable
              style={{ marginBottom: 16 }}
              cover={
                <img
                  alt={bike.name}
                  src={bike.imgUrl}
                  style={{ height: 180, objectFit: "cover" }}
                />
              }
            >
              <Card.Meta
                title={bike.name}
                description={
                  <>
                    <Text type="secondary">{bike.brand}</Text>
                    <br />
                    <Text>🔥 {bike.likeCount} Likes</Text>
                  </>
                }
              />
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default TrendingBikes;
