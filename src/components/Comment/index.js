import React, { useState } from "react";
import { Button, Icon, Comment, Avatar, Form, Input } from "antd";
import { timeDifference } from "../../helpers/utility";
import defaultAvatar from "../../images/default-avatar.svg";

export const SingleComment = ({
  _id,
  reply,
  content,
  like,
  dislike,
  user,
  createdAt,
  currentUser,
  loading,
  handleSubmit,
  handleAction,
  parent
}) => {
  const [isRep, setRep] = useState(false);

  const actions = [
    <span>
      <Icon
        type="like"
        theme={
          like && currentUser._id && like[currentUser._id]
            ? "filled"
            : "outlined"
        }
        onClick={() => handleAction("like", { data: like, parent, _id })}
      />
      <span style={{ paddingLeft: 8, cursor: "auto" }}>
        {like ? Object.keys(like).length : ""}
      </span>
    </span>,
    <span>
      <Icon
        type="dislike"
        theme={
          dislike && currentUser._id && dislike[currentUser._id]
            ? "filled"
            : "outlined"
        }
        onClick={() => handleAction("dislike", { data: dislike, parent, _id })}
      />
      <span style={{ paddingLeft: 8, cursor: "auto" }}>
        {dislike ? Object.keys(dislike).length : ""}
      </span>
    </span>
  ];

  if (reply) {
    actions.push(<span onClick={() => setRep(!isRep)}>Trả lời</span>);
  }

  return (
    <Comment
      actions={actions}
      author={user.fullName || user.username}
      avatar={<Avatar size={50} src={user.avatar || defaultAvatar} />}
      content={<p>{content}</p>}
      datetime={<span>{timeDifference(createdAt)}</span>}
    >
      {reply &&
        reply.length > 0 &&
        reply.map(d => (
          <SingleComment
            parent={_id}
            currentUser={currentUser}
            handleAction={handleAction}
            key={d._id}
            {...d}
          />
        ))}
      {isRep && (
        <Comment
          avatar={
            <Avatar size={50} src={currentUser.avatar || defaultAvatar} />
          }
          content={
            <Editor
              onCancel={() => setRep(false)}
              onSubmit={text => handleSubmit(text, _id)}
              loading={loading}
            />
          }
        />
      )}
    </Comment>
  );
};

export const Editor = ({ onCancel, onSubmit, loading }) => {
  const [text, setText] = useState("");

  return (
    <div>
      <Form.Item>
        <Input.TextArea
          placeholder="Nhập bình luận..."
          rows={3}
          onChange={e => setText(e.target.value)}
          value={text}
        />
      </Form.Item>
      <div className="text-right">
        <Button
          onClick={() => {
            setText("");
            onCancel && onCancel();
          }}
        >
          Hủy
        </Button>{" "}
        <Button
          disabled={!text}
          loading={loading}
          onClick={() => {
            onSubmit(text);
            setText("");
            onCancel && onCancel();
          }}
          type="primary"
        >
          Bình luận
        </Button>
      </div>
    </div>
  );
};
