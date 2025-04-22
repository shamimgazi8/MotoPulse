import { Op } from "sequelize";

export const buildReviewFilters = (query: any) => {
  const {
    user_id,
    type,
    min_likes,
    max_likes,
    search,
    brandName,
    modelName,
    ccMin,
    ccMax,
    sortby,
  } = query;

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
  const engineCCFilter: any = {};

  if (brandName) {
    brandWhere.brandName = { [Op.iLike]: `%${brandName}%` };
  }

  if (modelName) {
    modelWhere.modelName = { [Op.iLike]: `%${modelName}%` };
  }

  if (type) {
    typeWhere.name = { [Op.iLike]: `%${type}%` };
  }

  if (!isNaN(parseInt(ccMin))) {
    engineCCFilter[Op.gte] = Number(ccMin); // Engine CC filter for ccMin
  }

  if (!isNaN(parseInt(ccMax))) {
    engineCCFilter[Op.lte] = Number(ccMax); // Engine CC filter for ccMax
  }

  if (search) {
    reviewWhere[Op.or] = [
      { review: { [Op.iLike]: `%${search}%` } },
      { "$bike.brand.brandName$": { [Op.iLike]: `%${search}%` } },
      { "$bike.model.modelName$": { [Op.iLike]: `%${search}%` } },
    ];
  }

  let order: any[] = [];
  if (sortby === "recent") {
    order = [["createdAt", "DESC"]];
  } else if (sortby === "popular") {
    order = [["like_count", "DESC"]];
  }

  return {
    reviewWhere,
    brandWhere,
    modelWhere,
    typeWhere,
    engineCCFilter, // Return engineCC filter to be used in the query
    order,
    brandName,
    modelName,
    search,
    type,
  };
};
