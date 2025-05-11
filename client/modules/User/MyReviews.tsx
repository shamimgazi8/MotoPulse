import { Card, Input } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import Link from "next/link";
import { getUserIdFromToken } from "@/utils/utils";
import CustomModal from "../@common/customModal";
import {
  useDeleteReviewMutation,
  useGetUserReviewsQuery,
  useUpdateReviewMutation,
} from "@/service/reviewsApi";

const MyReviews = () => {
  const id = getUserIdFromToken() as string;
  const token = Cookies.get("token");

  const {
    data: reviewData,
    isLoading,
    error,
    refetch,
  } = useGetUserReviewsQuery(id);
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [customToast, setCustomToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showToastAnimation, setShowToastAnimation] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"cancel" | "delete" | null>(
    null
  );
  const [itemIdToEdit, setItemIdToEdit] = useState<string | null>(null);

  const [editing, setEditing] = useState<Record<string, string>>({});

  const showToast = (message: string, type: "success" | "error") => {
    setCustomToast({ message, type });
    setTimeout(() => setShowToastAnimation(true), 20);
    setTimeout(() => {
      setShowToastAnimation(false);
      setTimeout(() => setCustomToast(null), 1000);
    }, 6000);
  };

  const handleEdit = (id: string, currentReview: string) => {
    setEditing((prev) => ({ ...prev, [id]: currentReview }));
  };

  const handleCancelEdit = (id: string, originalReview: string) => {
    if (editing[id]?.trim() !== originalReview.trim()) {
      setItemIdToEdit(id);
      setActionType("cancel");
      setShowModal(true);
    } else {
      setEditing((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleConfirmModal = async () => {
    if (actionType === "cancel" && itemIdToEdit) {
      setEditing((prev) => {
        const updated = { ...prev };
        delete updated[itemIdToEdit];
        return updated;
      });
    } else if (actionType === "delete" && itemIdToEdit) {
      try {
        await deleteReview({ id: itemIdToEdit, user_id: id }).unwrap();
        showToast("Review deleted successfully", "success");
      } catch (err) {
        showToast("Error deleting review", "error");
      }
    }
    setShowModal(false);
    setItemIdToEdit(null);
    setActionType(null);
  };

  const handleSave = async (itemId: string) => {
    try {
      const newReview = editing[itemId];
      await updateReview({
        id: itemId,
        user_id: id,
        review: newReview,
      }).unwrap();
      showToast("Review updated successfully", "success");
      setEditing((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    } catch {
      showToast("Error updating review", "error");
    }
  };

  const handleDelete = (id: string) => {
    setItemIdToEdit(id);
    setActionType("delete");
    setShowModal(true);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching reviews</p>;

  return (
    <div className="h-[80vh] overflow-y-auto custom-scrollbar">
      <div className="flex flex-wrap gap-5 my-5">
        {reviewData?.result?.length === 0 ? (
          <div className="text-center text-gray-500">
            You have not posted any reviews yet.
          </div>
        ) : (
          reviewData?.result?.map((item: any, key: number) => (
            <Card
              key={item.id}
              hoverable
              style={{
                width: 300,
                minHeight: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              actions={
                editing[item.id]
                  ? [
                      <button
                        className={`px-4 py-1 rounded transition-all ${
                          editing[item.id].trim() === item.review.trim()
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-black text-white hover:text-black hover:border-black hover:bg-white"
                        }`}
                        onClick={() => handleSave(item.id)}
                        disabled={
                          editing[item.id].trim() === item.review.trim()
                        }
                      >
                        Update Review
                      </button>,
                      <button
                        className="px-4 py-1 text-white bg-red-500 rounded"
                        onClick={() => handleCancelEdit(item.id, item.review)}
                      >
                        <MdCancel className="inline-block mr-1" /> Cancel
                      </button>,
                    ]
                  : [
                      <FaEdit
                        key="edit"
                        onClick={() => handleEdit(item.id, item.review)}
                      />,
                      <Link href={`/${item?.slug}`} key="view">
                        <AiOutlineFundView />
                      </Link>,
                      <MdOutlineDeleteOutline
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
              <Card.Meta
                title={`${item.bike?.brand?.brandName} ${item.bike?.model?.modelName}`}
                description={
                  editing[item.id] !== undefined ? (
                    <Input.TextArea
                      value={editing[item.id]}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      autoSize
                    />
                  ) : (
                    <span>{item.review.slice(0, 100)}...</span>
                  )
                }
              />
              <div className="text-[13px] text-gray-600 mt-5">
                Type: {item.bike?.type?.name} <br />
                Engine: {item.bike?.engineCC}cc | HP: {item.bike?.horsePower} |
                Torque: {item.bike?.torque}Nm
              </div>
            </Card>
          ))
        )}
      </div>

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
        onCancel={() => setShowModal(false)}
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
