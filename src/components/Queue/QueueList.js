import React from "react";
import { Link } from "react-router-dom";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { getSongUrl } from "../../utils/func";
import LazyloadImage from "../LazyloadImage";
import LinksByComma from "../LinksByComma";
import {
  SortableContainer,
  SortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";

const DragHandle = sortableHandle(() => (
  <div className="drag">
    <i className="ion-drag" />
  </div>
));

const SortableItem = SortableElement(
  ({
    name,
    id,
    thumbnail,
    alias,
    artists,
    removeSongFromQueue,
    fetchSong,
    songData
  }) => {
    const urlSong = getSongUrl(alias || name, id);
    return (
      // <CSSTransition classNames="queue-item" timeout={300}>
      <li className={`queue-li ${songData.data.id === id ? "playing" : ""}`}>
        <DragHandle />
        <Link to={urlSong}>
          <LazyloadImage
            src={thumbnail || "/images/default.jpg"}
            className={`queue-list-thumb ${
              songData.data.id === id ? "rotation" : ""
            } `}
          />
        </Link>
        <div className="queue-list-info">
          <div className="queue-track-title ellipsis" title={name}>
            <Link to={urlSong}>{name}</Link>
          </div>
          <LinksByComma
            className={`queue-track-artist ellipsis`}
            data={artists || []}
            titleEntry="name"
            pathEntry="link"
          />
        </div>
        <div className="queue-track-actions">
          {songData.data.id !== id ? (
            <i
              className="ion-play"
              onClick={() => fetchSong(name, id, false)}
              title="play"
            />
          ) : (
            <i
              className="ion-play"
              style={{ color: "transparent", cursor: "unset" }}
            />
          )}
          <i
            className="ion-trash-b"
            onClick={() => removeSongFromQueue(id)}
            title="remove from list"
          />
        </div>
      </li>
    );
  }
);

const SortableList = SortableContainer(({ songs, ...props }) => {
  return (
    <ul className="queue-list" id="queue">
      {/* <TransitionGroup> */}
      {songs.map((value, index) => (
        <SortableItem key={value.id} index={index} {...value} {...props} />
      ))}
      {/* </TransitionGroup> */}
    </ul>
  );
});

function QueueList(props) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    props.sortQueue({
      queue: arrayMove(props.songs || [], oldIndex, newIndex),
      ids: arrayMove(props.ids || [], oldIndex, newIndex)
    });
  };

  return (
    <SortableList
      // helperClass="hide"
      lockAxis="y"
      // helperContainer={document.getElementById("queue")}
      // useWindowAsScrollContainer
      lockToContainerEdges
      {...props}
      // hideSortableGhost={false}
      useDragHandle
      onSortEnd={onSortEnd}
    />
  );
}

export default QueueList;
