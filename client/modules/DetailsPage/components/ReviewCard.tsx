interface ReviewCardProps {
  name: string;
  review: string;
  avatarUrl: string;
  create: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  review,
  avatarUrl,
  create,
}) => {
  return (
    <div className="border-[1px] border-[#267bdb80] shadow-[0_0_10px_rgba(59,130,246,0.7)] rounded-2xl p-5 w-full transform hover:scale-[1.02] transition-transform duration-300 mb-5">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatarUrl}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <p className="text-[10px]">Review By:</p>
          <h1 className="text-[25px] font-semibold">{name}</h1>
        </div>
      </div>
      <p className="text-sm">{review}</p>
      <p className="text-sm mt-2 text-end">
        {new Date(create).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
