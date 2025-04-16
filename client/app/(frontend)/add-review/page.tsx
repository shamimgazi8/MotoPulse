import BikeReviewForm from "@/modules/AddReview";

export const metadata = {
  title: "Add a Review | MotoPulse",
  description: "Share your motorcycle review with the MotoPulse community.",
};
const AddReview = () => {
  return (
    <>
      <div>
        <BikeReviewForm />
      </div>
    </>
  );
};
export default AddReview;
