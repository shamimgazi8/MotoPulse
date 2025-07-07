"use client";
import React from "react";
import { Card, Typography, Spin, Empty } from "antd";
import { FireOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useGetTrendingBikesQuery } from "@/service/api";

const { Title, Text } = Typography;

interface Bike {
  id: number;
  name: string;
  imgUrl: string;
  brand: string;
  likeCount: number;
  slug: string | null;
}

const TrendingBikes: React.FC = () => {
  const { data, isLoading, isError } = useGetTrendingBikesQuery({});

  const bikes: Bike[] =
    data?.result?.map((bike: any) => ({
      id: bike.id,
      name: bike.bike.name,
      imgUrl: bike.coverPhoto,
      brand: bike.bike.brand.brandName,
      likeCount: bike.like_count,
      slug: bike.slug,
    })) || [];

  if (isLoading) return <Spin />;
  if (isError || bikes.length === 0)
    return <Empty description="No trending bikes available" />;

  return (
    <div style={{ marginTop: 32 }}>
      <Title level={4}>
        <FireOutlined style={{ color: "orange", marginRight: 8 }} />
        Trending Bikes
      </Title>

      {bikes.map((bike) => (
        <Link key={bike.id} href={`/${bike.slug}`}>
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
      ))}
    </div>
  );
};

export default TrendingBikes;
