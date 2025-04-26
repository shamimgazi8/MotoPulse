import { Card } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { getUserIdFromToken } from "@/utils/utils";

const MyReviews = ({ reviewData, setReviewData }: any) => {
  const { Meta } = Card;
  console.log(reviewData?.result, "review data");

  const [customToast, setCustomToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showToastAnimation, setShowToastAnimation] = useState(false);

  const showToast = (message: string, type: "success" | "error") => {
    setCustomToast({ message, type });

    // Wait for next render before triggering animation
    setTimeout(() => {
      setShowToastAnimation(true);
    }, 20); // tiny delay to ensure transition works

    setTimeout(() => {
      setShowToastAnimation(false); // Start hide animation
      setTimeout(() => {
        setCustomToast(null); // Remove toast from DOM after animation
      }, 1000);
    }, 6000);
  };

  const handleEdit = (id: string) => {
    console.log("Edit review", id);
    // Add your edit logic here
  };

  const id = getUserIdFromToken();

  const handleDelete = async (item_id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/reviews/${item_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id,
        }),
      });

      if (response.ok) {
        showToast("Review deleted successfully", "success");
        // Remove the deleted review from the UI instantly
        setReviewData((prevData: any) => ({
          ...prevData,
          result: prevData.result.filter(
            (review: any) => review.id !== item_id
          ),
        }));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete review:", errorData.message);
        showToast(errorData.message, "error");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="flex flex-wrap gap-5 my-5">
        {reviewData?.result?.map((item: any, key: any) => (
          <div key={key}>
            <Card
              hoverable
              style={{
                width: 300,
                minHeight: 450,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              actions={[
                <FaEdit
                  className="text-xl"
                  key="edit"
                  onClick={() => handleEdit(item.id)}
                />,
                <Link href={`/${item?.slug}`}>
                  <AiOutlineFundView className="text-xl" key="view" />
                </Link>,
                <MdOutlineDeleteOutline
                  className="text-xl"
                  key="delete"
                  onClick={() => handleDelete(item.id)}
                />,
              ]}
              cover={
                <img
                  alt="review cover"
                  src={item.coverPhoto || "https://via.placeholder.com/300"}
                  className="h-48 object-cover"
                />
              }
            >
              <Meta
                title={`${item.bike?.brand?.brandName} ${item.bike?.model?.modelName}`}
                description={item.review.slice(0, 100) + "..."}
              />
              <div className=" text-[13px] text-gray-600 mt-5">
                Type: {item.bike?.type?.name} <br />
                Engine: {item.bike?.engineCC}cc | HP: {item.bike?.horsePower} |
                Torque: {item.bike?.torque}Nm
              </div>
            </Card>
          </div>
        ))}
      </div>
      {customToast && (
        <div
          className={`fixed top-[100px] right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 transition-all duration-500 ease-in-out transform
    ${customToast.type === "error" ? "bg-red-500 border-red-600 " : "bg-green-500 border-green-600"}
    ${showToastAnimation ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
    border-b-[6px] `}
        >
          {customToast.message}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
