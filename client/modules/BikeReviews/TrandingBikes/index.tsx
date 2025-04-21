// components/TrendingBikes.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Card, Typography, Spin } from "antd";
import { FireOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Bike {
  id: number;
  name: string;
  imageUrl: string;
  brand: string;
  likeCount: number;
}

const fakeTrendingBikes: Bike[] = [
  {
    id: 1,
    name: "Yamaha R15 V4",
    brand: "Yamaha",
    imageUrl:
      "https://www.indiacarnews.com/wp-content/uploads/2023/05/Yamaha-R15-V4-Dark-Knight-Price.jpg",
    likeCount: 152,
  },
  {
    id: 2,
    name: "Royal Enfield Hunter 350",
    brand: "Royal Enfield",
    imageUrl:
      "https://www.shutterstock.com/image-photo/february-2024-west-bengal-india-260nw-2426546651.jpg",
    likeCount: 134,
  },
  {
    id: 3,
    name: "TVS Apache RR 310",
    brand: "TVS",
    imageUrl:
      "https://www.iamabiker.com/wp-content/uploads/2020/02/2020-BS6-TVS-Apache-RR-310-HD-wallpaper-10.jpg",
    likeCount: 112,
  },
  {
    id: 4,
    name: "KTM RC 390",
    brand: "KTM",
    imageUrl:
      "https://ic.maxabout.us//bikes/ktm/ktm-rc-390//KTM-RC-390-Official-New-5.jpg",
    likeCount: 98,
  },
  {
    id: 5,
    name: "Honda CB350 RS",
    brand: "Honda",
    imageUrl:
      "https://i.pinimg.com/1200x/2f/c6/9e/2fc69eb947e5ec653c1e2eef41fdca8c.jpg",
    likeCount: 87,
  },
];

const TrendingBikes: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrendingBikes = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/bikes/trending");
        if (!res.ok) throw new Error("API failed");

        const data = await res.json();
        if (Array.isArray(data)) {
          setBikes(data);
        } else {
          setBikes(fakeTrendingBikes);
        }
      } catch (err) {
        console.warn("Using fake trending bikes due to API error:", err);
        setBikes(fakeTrendingBikes);
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
      ) : (
        bikes.map((bike) => (
          <Card
            key={bike.id}
            hoverable
            style={{ marginBottom: 16 }}
            cover={
              <img
                alt={bike.name}
                src={bike.imageUrl}
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
        ))
      )}
    </div>
  );
};

export default TrendingBikes;
