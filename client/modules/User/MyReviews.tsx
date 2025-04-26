import { Card } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import Link from "next/link";
const MyReviews = ({ reviewData }: any) => {
  const { Meta } = Card;
  console.log(reviewData?.result, "review data");

  const handleEdit = (id: string) => {
    console.log("Edit review", id);
    // Add your edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete review", id);
    // Add your delete logic here
  };

  return (
    <div className="h-[80vh] overflow-y-auto custom-scrollbar  ">
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
    </div>
  );
};

export default MyReviews;
