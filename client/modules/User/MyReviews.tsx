import { Card, Input, Button } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { getUserIdFromToken } from "@/utils/utils";
import CustomModal from "../@common/customModal";

const MyReviews = ({ reviewData, setReviewData }: any) => {
  const { Meta } = Card;
  const [customToast, setCustomToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showToastAnimation, setShowToastAnimation] = useState(false);

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [actionType, setActionType] = useState<"cancel" | "delete" | null>(
    null
  ); // Action type for the modal
  const [itemIdToEdit, setItemIdToEdit] = useState<string | null>(null); // Store the item ID to edit

  const showToast = (message: string, type: "success" | "error") => {
    setCustomToast({ message, type });

    setTimeout(() => {
      setShowToastAnimation(true);
    }, 20);

    setTimeout(() => {
      setShowToastAnimation(false);
      setTimeout(() => {
        setCustomToast(null);
      }, 1000);
    }, 6000);
  };

  const id = getUserIdFromToken();

  const handleEdit = (itemId: string, currentReview: string) => {
    setReviewData((prevData: any) => ({
      ...prevData,
      result: prevData.result.map((item: any) =>
        item.id === itemId
          ? {
              ...item,
              isEditing: true,
              newReview:
                item.newReview !== undefined ? item.newReview : currentReview,
            }
          : item
      ),
    }));
  };

  const handleCancelEdit = (itemId: string) => {
    const item = reviewData.result.find((review: any) => review.id === itemId);

    if (item && item.newReview?.trim() !== item.review?.trim()) {
      // Show custom modal if changes exist
      setItemIdToEdit(itemId); // Ensure the itemIdToEdit is correctly set for the modal
      setActionType("cancel"); // Set action type to 'cancel'
      setShowModal(true); // This triggers the modal to show
    } else {
      // If no changes, just cancel immediately
      setReviewData((prevData: any) => ({
        ...prevData,
        result: prevData.result.map((item: any) =>
          item.id === itemId
            ? {
                ...item,
                isEditing: false,
                newReview: undefined,
              }
            : item
        ),
      }));
    }
  };

  const handleSave = async (itemId: string, newReview: string) => {
    try {
      const response = await fetch(`http://localhost:4000/reviews/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id,
          review: newReview,
        }),
      });

      if (response.ok) {
        showToast("Review updated successfully!", "success");

        setReviewData((prevData: any) => ({
          ...prevData,
          result: prevData.result.map((item: any) =>
            item.id === itemId
              ? {
                  ...item,
                  review: newReview,
                  isEditing: false,
                  newReview: undefined,
                }
              : item
          ),
        }));
      } else {
        const errorData = await response.json();
        console.error("Failed to update review:", errorData.message);
        showToast(errorData.message, "error");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      showToast("An error occurred while updating.", "error");
    }
  };

  const handleDelete = async (itemId: string) => {
    setItemIdToEdit(itemId);
    setActionType("delete"); // Set action type to 'delete'
    setShowModal(true); // This triggers the modal to show
  };

  // Handle modal confirmation based on action type
  const handleConfirmModal = async () => {
    if (actionType === "cancel") {
      setReviewData((prevData: any) => ({
        ...prevData,
        result: prevData.result.map((item: any) =>
          item.id === itemIdToEdit
            ? {
                ...item,
                isEditing: false,
                newReview: undefined,
              }
            : item
        ),
      }));
    } else if (actionType === "delete") {
      try {
        const response = await fetch(
          `http://localhost:4000/reviews/${itemIdToEdit}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: id,
            }),
          }
        );

        if (response.ok) {
          showToast("Review deleted successfully", "success");
          setReviewData((prevData: any) => ({
            ...prevData,
            result: prevData.result.filter(
              (review: any) => review.id !== itemIdToEdit
            ),
          }));
        } else {
          const errorData = await response.json();
          console.error("Failed to delete review:", errorData.message);
          showToast(errorData.message, "error");
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        showToast("An error occurred while deleting.", "error");
      }
    }

    setShowModal(false); // Close the modal
  };

  const handleCancelModal = () => {
    setShowModal(false); // Close the modal without making any changes
  };

  return (
    <div className="h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="flex flex-wrap gap-5 my-5">
        {reviewData?.result?.length === 0 ? (
          <div className="text-center text-gray-500">
            You have not posted any reviews yet.
          </div>
        ) : (
          reviewData?.result?.map((item: any, key: any) => (
            <div key={key}>
              <Card
                hoverable
                style={{
                  width: 300,
                  minHeight: 500,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                actions={
                  item.isEditing
                    ? [
                        <button
                          className={`px-4 py-1 rounded flex justify-center items-center gap-2 transition-all focus:outline-none
                        ${
                          item.newReview.trim() === item.review.trim() ||
                          item.newReview.trim() === ""
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-black text-white hover:text-black hover:border-black hover:bg-white"
                        }
                      `}
                          onClick={() => handleSave(item.id, item.newReview)}
                          disabled={
                            item.newReview.trim() === item.review.trim() ||
                            item.newReview.trim() === ""
                          }
                        >
                          Update Review
                        </button>,
                        <button
                          className=" px-4 py-1  text-white rounded  focus:outline-none focus:ring-2 focus:ring-red-500 flex justify-center items-center gap-2 transition-all"
                          onClick={() => handleCancelEdit(item.id)}
                        >
                          <MdCancel className=" text-lg mt-[2px]" /> Cancel
                        </button>,
                      ]
                    : [
                        <FaEdit
                          className="text-xl"
                          key="edit"
                          onClick={() => handleEdit(item.id, item.review)}
                        />,
                        <Link href={`/${item?.slug}`}>
                          <AiOutlineFundView className="text-xl" key="view" />
                        </Link>,
                        <MdOutlineDeleteOutline
                          className="text-xl"
                          key="delete"
                          onClick={() => handleDelete(item.id)}
                        />,
                      ]
                }
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
                  description={
                    item.isEditing ? (
                      <Input.TextArea
                        value={item.newReview}
                        onChange={(e) =>
                          setReviewData((prevData: any) => ({
                            ...prevData,
                            result: prevData.result.map((review: any) =>
                              review.id === item.id
                                ? { ...review, newReview: e.target.value }
                                : review
                            ),
                          }))
                        }
                        autoSize
                      />
                    ) : (
                      <span>
                        {typeof item.review === "string"
                          ? item.review.slice(0, 100) + "..."
                          : ""}
                      </span>
                    )
                  }
                />
                <div className="text-[13px] text-gray-600 mt-5">
                  Type: {item.bike?.type?.name} <br />
                  Engine: {item.bike?.engineCC}cc | HP: {item.bike?.horsePower}{" "}
                  | Torque: {item.bike?.torque}Nm
                </div>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Custom Modal for Discard Changes or Delete */}
      <CustomModal
        visible={showModal}
        title={
          actionType === "cancel" ? "Discard changes?" : "Confirm Deletion"
        }
        content={
          actionType === "cancel"
            ? "You have unsaved changes. Are you sure you want to discard them?"
            : "Are you sure you want to delete this review?"
        }
        onConfirm={handleConfirmModal}
        onCancel={handleCancelModal}
      />

      {customToast && (
        <div
          className={`fixed top-[100px] right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 transition-all duration-500 ease-in-out transform
          ${customToast.type === "error" ? "bg-red-500 border-red-600" : "bg-green-500 border-green-600"}
          ${showToastAnimation ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          {customToast.message}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
