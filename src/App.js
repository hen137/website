import Main from './Components/Main/Main'
import Content from './Components/Content/Content'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <div className='landing-container size-control'>
        <video autoPlay muted disablePictureInPicture loop className='video-stream size-control' >
          <source src='/videoURL' type='video/mp4' />
          Video Tag is unsupported for this browser
        </video>
      <Main />
      </div>
      <Content />
    </div>
  );
};