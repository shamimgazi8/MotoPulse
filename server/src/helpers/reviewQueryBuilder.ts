import { Op } from "sequelize";
import Brand from "../models/Brand";
import Model from "../models/Model";
import BikeType from "../models/BikeType";

export const buildBikeIncludes = (query: any) => {
  const { brandName, modelName, type } = query;

  const brandInclude = {
    model: Brand,
    as: "brand",
    attributes: ["id", "brandName"],
    required: !!brandName,
    ...(brandName && {
      where: {
        brandName: { [Op.iLike]: `%${brandName}%` },
      },
    }),
  };

  const modelInclude = {
    model: Model,
    as: "model",
    attributes: ["id", "modelName"],
    required: !!modelName,
    ...(modelName && {
      where: {
        modelName: { [Op.iLike]: `%${modelName}%` },
      },
    }),
  };

  const typeInclude = {
    model: BikeType,
    as: "type",
    attributes: ["id", "name"],
    required: !!type,
    ...(type && {
      where: {
        name: { [Op.iLike]: `%${type}%` },
      },
    }),
  };

  return [brandInclude, modelInclude, typeInclude];
};

export const buildReviewWhere = (query: any) => {
  const { user_id, search, min_likes, max_likes } = query;

  return {
    ...(user_id && { user_id }),
    ...(search && {
      review: { [Op.iLike]: `%${search}%` },
    }),
    ...(min_likes || max_likes
      ? {
          like_count: {
            ...(min_likes && { [Op.gte]: Number(min_likes) }),
            ...(max_likes && { [Op.lte]: Number(max_likes) }),
          },
        }
      : {}),
  };
};
