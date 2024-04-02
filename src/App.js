
function App() {
  return (
    <div className="App">
      <video disablePictureInPicture loop muted>
        <source src='/video' type='video/mp4'/>
        Video Tag is unsupported for this browser
      </video>
    </div>
  );
}

export default App;
