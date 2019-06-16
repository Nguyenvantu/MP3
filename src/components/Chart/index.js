import React from "react";
// import { Link } from "react-router-dom";
// import { Progress } from "antd";
// import { changeAlias } from "../../utils/func";
import WithBackgroundImage from "../WithBgImg";
// import LinksByComma from "../LinksByComma";
import { SongList } from "../HomePage/newSong.style";
import { Song } from "../HomePage/newSong";

import "./index.sass";

const Chart = props => {
  const { chart } = props;
  if (!chart) {
    return null;
  }
  return (
    <div className="chart">
      <WithBackgroundImage
        className="featured-image"
        src={chart[0] ? chart[0].thumbnail : ""}
      />
      <SongList>
        {chart.map((item, index) => {
          return (
            <Song
              className={index === 0 ? "first-chart" : ""}
              key={item.id}
              index={index + 1}
              {...props}
              {...item}
            />
          );
        })}
      </SongList>
    </div>
  );
};

// const ChartFirstItem = ({
//   name,
//   id,
//   artists,
//   thumbnail,
//   renderDropDown,
//   toggleTrackDropDown,
//   downloadProgress,
//   index,
//   download
// }) => {
//   const alias = changeAlias(name);
//   return (
//     <li className="chart-item">
//       <Link to={`/bai-hat/${alias}/${id}`}>
//         <div className="chart-item-order order-first">{index + 1}</div>
//       </Link>
//       <div className="chart-item-detail detail-first">
//         <div className="chart-item-detail-left">
//           <div className="chart-item-title ellipsis" title={name}>
//             <Link to={`/bat-hat/${alias}/${id}`}>{name}</Link>
//           </div>
//           <LinksByComma
//             className="chart-item-artist ellipsis"
//             data={artists}
//             // definePath={url => url.replace("nghe-si", "artist")}
//             // defineTitle={title =>
//             //   title.replace("Nhiều nghệ sĩ", "Various artists")
//             // }
//             pathEntry="link"
//             titleEntry="name"
//           />
//         </div>
//         <div className="chart-item-detail-right">
//           {typeof downloadProgress[id] !== "undefined" &&
//           downloadProgress[id] !== -1 ? (
//             <Progress type="circle" percent={downloadProgress[id]} />
//           ) : (
//             <button
//               className="sc-ir"
//               onClick={() =>
//                 download({
//                   songName: alias,
//                   id
//                 })
//               }
//             >
//               <i className="ion-android-download" title="download the track" />
//             </button>
//           )}
//           <button
//             className="sc-ir ignore-react-onclickoutside"
//             onClick={() => toggleTrackDropDown(id, "Chart")}
//           >
//             <i className="ion-more" />
//           </button>
//         </div>
//       </div>
//       {renderDropDown("Chart", { name, id, artists, thumbnail })}
//     </li>
//   );
// };

// ChartFirstItem.propTypes = {
//   renderDropDown: PropTypes.func.isRequired
// };

// const ChartItem = ({
//   name,
//   index,
//   id,
//   thumbnail,
//   artists,
//   renderDropDown,
//   toggleTrackDropDown,
//   downloadProgress,
//   download
// }) => {
//   const alias = changeAlias(name);
//   return (
//     <li className="chart-item">
//       <Link to={`/song/${alias}/${id}`}>
//         <div className="chart-item-thumb">
//           <img src={thumbnail} alt="" />
//         </div>
//       </Link>
//       <div className="chart-item-detail">
//         <div className="chart-item-detail-left">
//           <div className="chart-item-order">{index + 1}</div>
//           <div className="chart-item-info">
//             <div className="chart-item-title ellipsis" title={name}>
//               <Link to={`/song/${alias}/${id}`}>{name}</Link>
//             </div>
//             <LinksByComma
//               className="chart-item-artist ellipsis"
//               data={artists}
//               pathEntry="link"
//               titleEntry="name"
//               definePath={url => url.replace("nghe-si", "artist")}
//               defineTitle={title =>
//                 title.replace("Nhiều nghệ sĩ", "Various artists")
//               }
//             />
//           </div>
//         </div>
//         <div className="chart-item-detail-right">
//           {typeof downloadProgress[id] !== "undefined" &&
//           downloadProgress[id] !== -1 ? (
//             <Progress type="circle" percent={downloadProgress[id]} />
//           ) : (
//             <button
//               className="sc-ir"
//               onClick={() =>
//                 download({
//                   songName: alias,
//                   id
//                 })
//               }
//             >
//               <i className="ion-android-download" title="download the track" />
//             </button>
//           )}
//           <button
//             className="sc-ir ignore-react-onclickoutside"
//             onClick={() => toggleTrackDropDown(id, "Chart")}
//           >
//             <i className="ion-more" />
//           </button>
//         </div>
//       </div>
//       {renderDropDown("Chart", { name, id, artists, thumbnail })}
//     </li>
//   );
// };

// ChartItem.propTypes = {
//   renderDropDown: PropTypes.func.isRequired,
//   toggleTrackDropDown: PropTypes.func.isRequired
// };

export default Chart;
