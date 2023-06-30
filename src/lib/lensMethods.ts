import { CommentOrderingTypes } from "@lens-protocol/client";
import lensHandler from "./lens";

export const getSingleUser = async (lensName: string) => {
  const lensProfileArr = await lensHandler.search.profiles({
    query: lensName,
    limit: 1,
  });
  return lensProfileArr.items;
};

export const getPublicationComments = async (postId: string) => {
  const userLensPublication = await lensHandler.publication.fetchAll({
    commentsOf: postId,
    commentsOfOrdering: CommentOrderingTypes.Desc,
    limit: 50,
  });
  return userLensPublication.items;
};
export const getUserAllPublication = async (lensId: string) => {
  const userAllPublication = await lensHandler.publication.fetchAll({
    profileId: lensId,
  });
  return userAllPublication.items;
};
export const getUserSinglePublication = async (pubId: string) => {
  const creatorSinglePublication = await lensHandler.publication.fetch({
    publicationId: pubId,
  });
};

export const getPublicationReaction = async (publicationId: string) => {
  const publicationRecation = await lensHandler.reactions.toPublication({
    publicationId: publicationId,
    limit: 50,
  });
};
export const getAllPublication = async () => {
  const allPublication = await lensHandler.search.publications({
    query: "lens",
  });
};
