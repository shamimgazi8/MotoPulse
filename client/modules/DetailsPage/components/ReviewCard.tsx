interface ReviewCardProps {
  name: string;
  review: string;
  avatarUrl: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, review, avatarUrl }) => {
  return (
    <div className=" shadow-md rounded-2xl p-5  w-full transform hover:scale-[1.02] transition-transform duration-300 mb-5 border-[1px]">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatarUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <p className=" text-[10px]">Review By:</p>
          <h1 className="text-[25px] font-semibold">{name}</h1>
        </div>
      </div>
      <p className=" text-sm">{review}</p>
    </div>
  );
};

export default ReviewCard;
