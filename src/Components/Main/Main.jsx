import './Main.css'

export default function Landing() {
    return (
        <div className="main-container">
            <div className='header'>
                <h3 className='title invert'>HENRY ABRAMOVICH</h3>
                <div className='socials'>
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>
            <hr className='divider invert' />
            <div className='main-body'>
                <ul className='nav invert'>
                    <li>a little about me</li>
                    <li>portfolio</li>
                    <li>contact</li>
                </ul>
                <p className='quote invert'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ipsum consequat nisl vel pretium lectus quam. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere morbi. Purus sit amet volutpat consequat mauris nunc.</p>
            </div>
        </div>
    );
}