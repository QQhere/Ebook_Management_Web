import { fetchData } from "../api/Base";

export const createComment = async (token, data) => {
  try {
    const response = await fetchData("api/v1/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: data.comment,
        reply_id: data.reply_id,
        reply_type: data.reply_type,
        user_id: data.user_id,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get a comment by ID
export const getCommentById = async (token, commentId) => {
  try {
    const response = await fetchData(`api/v1/comment/${commentId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Update a comment
export const updateComment = async (token, commentId, data) => {
  try {
    const response = await fetchData(`api/v1/comment/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: data.comment,
        reply_id: data.reply_id,
        reply_type: data.reply_type,
        user_id: data.user_id,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (token, commentId) => {
  try {
    const response = await fetchData(`api/v1/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
