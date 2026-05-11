import React, { useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Admin",
      content: "Barangay clean-up drive this Saturday!",
      date: "May 6, 2026",
      comments: ["Noted!", "I will join."]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");

  const [commentInputs, setCommentInputs] = useState({});
  const [showComments, setShowComments] = useState({});

  // ================= ADD POST =================
  const handleAddPost = () => {
    if (!content) return;

    const newPost = {
      id: Date.now(),
      author: "Admin",
      content,
      date: new Date().toLocaleDateString(),
      comments: []
    };

    setPosts([newPost, ...posts]);
    setContent("");
    setShowModal(false);
  };

  // ================= ADD COMMENT =================
  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, text]
        };
      }
      return post;
    });

    setPosts(updatedPosts);

    // clear input
    setCommentInputs({
      ...commentInputs,
      [postId]: ""
    });
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      
      {/* HEADER */}
      <div style={header}>
        <h2>Community Posts & Feedback</h2>

        <button style={addBtn} onClick={() => setShowModal(true)}>
          + Create Post
        </button>
      </div>

      {/* POSTS */}
      <div style={postList}>
        {posts.map((post) => (
          <div key={post.id} style={postCard}>
            
            {/* TOP */}
            <div style={postHeader}>
              <strong>{post.author}</strong>
              <span style={date}>{post.date}</span>
            </div>

            <p style={{ marginTop: "10px" }}>{post.content}</p>

            {/* COMMENT TOGGLE */}
            <div style={commentActions}>
              <span
                style={toggleBtn}
                onClick={() =>
                  setShowComments({
                    ...showComments,
                    [post.id]: !showComments[post.id]
                  })
                }
              >
                {post.comments.length} comments
              </span>
            </div>

            {/* COMMENTS SECTION */}
            {showComments[post.id] && (
              <div style={commentSection}>
                
                {/* EXISTING COMMENTS */}
                {post.comments.map((c, i) => (
                  <div key={i} style={commentItem}>
                    {c}
                  </div>
                ))}

                {/* INPUT */}
                <div style={commentInputWrapper}>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({
                        ...commentInputs,
                        [post.id]: e.target.value
                      })
                    }
                    style={commentInput}
                  />

                  <button
                    style={commentBtn}
                    onClick={() => handleAddComment(post.id)}
                  >
                    Post
                  </button>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Create Post</h3>

            <textarea
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={textarea}
            />

            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <button style={cancelBtn} onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button style={saveBtn} onClick={handleAddPost}>
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;

//
// 🎨 STYLES
//

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const addBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer"
};

const postList = {
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const postCard = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
};

const postHeader = {
  display: "flex",
  justifyContent: "space-between"
};

const date = {
  fontSize: "12px",
  color: "#6b7280"
};

const commentActions = {
  marginTop: "10px"
};

const toggleBtn = {
  fontSize: "12px",
  color: "#2563eb",
  cursor: "pointer"
};

const commentSection = {
  marginTop: "10px",
  borderTop: "1px solid #e5e7eb",
  paddingTop: "10px"
};

const commentItem = {
  background: "#f3f4f6",
  padding: "8px",
  borderRadius: "6px",
  marginBottom: "5px"
};

const commentInputWrapper = {
  display: "flex",
  gap: "10px",
  marginTop: "10px"
};

const commentInput = {
  flex: 1,
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const commentBtn = {
  padding: "8px 12px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px"
};

const textarea = {
  width: "100%",
  height: "100px",
  marginTop: "10px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const cancelBtn = {
  marginRight: "10px",
  padding: "8px 12px",
  background: "#9ca3af",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const saveBtn = {
  padding: "8px 12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};