import React from 'react';

const VideoDataContext = React.createContext();

export function VideoDataProvider({ children }) {
    const [videoData, setVideoData] = React.useState({});
    return (
        <VideoDataContext.Provider value={{ videoData, setVideoData }}>
            {children}
        </VideoDataContext.Provider>
    );
}

export function useVideoDataContext() {
    const context = React.useContext(VideoDataContext);
    if (!context)
        throw new Error("useVideoData deve estar dentro de um VideoDataProvider");
    return context;
}
