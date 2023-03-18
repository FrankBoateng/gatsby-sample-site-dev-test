import * as React from "react"

const VideoList = ({ playlistId }) => {
  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    // Check if videos are cached in local storage
    const cachedVideos = localStorage.getItem(`videos-${playlistId}`);
    if (cachedVideos) {
      setVideos(JSON.parse(cachedVideos));
    }

    // Fetch videos from YouTube Data API
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=YOUR_API_KEY`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const videos = data.items.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
        }));
        setVideos(videos);
        localStorage.setItem(`videos-${playlistId}`, JSON.stringify(videos));
      })
      .catch(error => console.error(error));
  }, [playlistId]);

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleVideoEnd = () => {
    // Preload next few videos
    const preloadCount = 3;
    for (let i = 1; i <= preloadCount; i++) {
      const nextIndex = currentIndex + i;
      if (nextIndex < videos.length) {
        const video = videos[nextIndex];
        const preloadUrl = `https://www.youtube.com/embed/${video.id}?rel=0&autoplay=0&showinfo=0&modestbranding=1`;
        const preloadElement = document.createElement("link");
        preloadElement.rel = "preload";
        preloadElement.as = "iframe";
        preloadElement.href = preloadUrl;
        document.head.appendChild(preloadElement);
      }
    }

    // Set current video index to the next video
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={'https://www.youtube.com/embed/${videos[currentIndex]?.id}?rel=0&autoplay=1&showinfo=0&modestbranding=1'}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        onEnded={handleVideoEnd}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {videos.map(video => (
          <div key={video.id} style={{ width: "30%", margin: "1.5%" }}>
            <iframe
              width="100%"
              height="0"
              src={'https://www.youtube.com/embed/${video.id}?rel=0&autoplay=0&showinfo=0&modestbranding=1'}
              title={video.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
