
function App() {
  return (
    <div className="App">
      <video autoPlay muted disablePictureInPicture loop height='100%' width='100%'>
        <source src='/video' type='video/mp4'/>
        Video Tag is unsupported for this browser
      </video>
    </div>
  );
}

export default App;
