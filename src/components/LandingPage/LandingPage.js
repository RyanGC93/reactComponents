import React from 'react'
import './LandingPage.css'
import Card from '../Card/Card'
import Map from '../Map/Map'
function LandingPage() {
  return (
    <div className="landing-page">
      <Map/>
      <header>
        <h1>Welcome to My Landing Page</h1>
        <p>This is a basic example of a React landing page.</p>
      </header>
          <Card/>
      <main>
        <section>
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vehicula velit nec tortor faucibus, ac vestibulum massa vestibulum.
          </p>
        </section>
        <section>
          <h2>Features</h2>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>Contact information goes here.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 My Landing Page</p>
      </footer>
    </div>
  )
}

export default LandingPage
