// utils/reviewFilters.ts
import { Op } from "sequelize";

export const buildReviewFilters = (query: any) => {
  const { user_id, type, min_likes, max_likes, search, brandName, modelName } =
    query;

  const reviewWhere: any = {
    ...(user_id && { user_id }),
    ...(min_likes || max_likes
      ? {
          like_count: {
            ...(min_likes && { [Op.gte]: Number(min_likes) }),
            ...(max_likes && { [Op.lte]: Number(max_likes) }),
          },
        }
      : {}),
  };

  const brandWhere: any = {};
  const modelWhere: any = {};
  const typeWhere: any = {};

  if (brandName) {
    brandWhere.brandName = { [Op.iLike]: `%${brandName}%` };
  }

  if (modelName) {
    modelWhere.modelName = { [Op.iLike]: `%${modelName}%` };
  }

  if (type) {
    typeWhere.name = { [Op.iLike]: `%${type}%` };
  }

  if (search) {
    reviewWhere[Op.or] = [
      { review: { [Op.iLike]: `%${search}%` } },
      { "$bike.brand.brandName$": { [Op.iLike]: `%${search}%` } },
      { "$bike.model.modelName$": { [Op.iLike]: `%${search}%` } },
    ];
  }

  return {
    reviewWhere,
    brandWhere,
    modelWhere,
    typeWhere,
    search,
    brandName,
    modelName,
    type,
  };
};
