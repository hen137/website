
function App() {
  return (
    <div className="App">
      <video disablePictureInPicture loop muted height='320' width='480'>
        <source src='/video' type='video/mp4'/>
        Video Tag is unsupported for this browser
      </video>
    </div>
  );
}

export default App;
