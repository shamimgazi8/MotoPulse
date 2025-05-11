"use client";
import React from "react";
import { Card, Typography, Spin, Empty } from "antd";
import { FireOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useGetTrendingBikesQuery } from "@/service/reviewsApi";

const { Title, Text } = Typography;

const TrendingBikes: React.FC = () => {
  const { data: bikes = [], isLoading, isError } = useGetTrendingBikesQuery();

  return (
    <div style={{ marginTop: 32 }}>
      <Title level={4}>
        <FireOutlined style={{ color: "orange", marginRight: 8 }} />
        Trending Bikes
      </Title>

      {isLoading ? (
        <Spin />
      ) : isError || bikes.length === 0 ? (
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
