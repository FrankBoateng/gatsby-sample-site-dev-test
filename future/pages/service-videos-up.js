// import React, { useState, useEffect } from "react";
// import { graphql, useStaticQuery } from "gatsby";
// import ReactPlayer from "react-player";

// const ServiceVideos = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       allYouTubeVideo(filter: { playlistType: { eq: "service" } }) {
//         edges {
//           node {
//             id
//             title
//             description
//             thumbnail
//             publishedAt(formatString: "MMMM DD, YYYY")
//           }
//         }
//       }
//     }
//   `);

//   const videos = data.allYouTubeVideo.edges;
//   console.log(videos);
//   console.log(data);

//   return (
//     <div>
//       <h1>Service Videos</h1>
//       <ul>
//         {videos.map(({ node }) => (
//           <div>
//             {/* <li key={node.id}>
//               <img src={node.thumbnail} alt={node.title} />
//               <h2>{node.title}</h2>
//               <p>{node.publishedAt}</p>
//               <p>{node.description}</p>
//             </li> */}
//             <div key={node.id}>
//               <h2>{node.title}</h2>
//               {/* <ReactPlayer url={node.url} /> */}
//             </div>
//           </div>
          
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default ServiceVideos;
