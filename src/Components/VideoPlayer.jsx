import ReactPlayer from 'react-player';

export default function VideoPlayer({link, showPlayer}){
    return (
        <div className="video-player-backdrop" onClick={()=>showPlayer(prev=>!prev)}>
            <div className="video-player">
                <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${link.key}`} controls={true}
                width="100%"
                height="100%"
            />
            </div>        
        </div>
    )
}

