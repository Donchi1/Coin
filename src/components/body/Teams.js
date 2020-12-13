import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import { backgroundcolor, itemColor } from '../navigation/NavBar'

function Teams() {
  return (
    <section
      className="container-fluid mt-3 mb-5 text-light  "
      style={{ backgroundColor: backgroundcolor }}
    >
      <h2 className="text-center text-light pt-5 pb-3">
        CRYTOGENUS TEAMS <span className="text-primary"> MEMBERS</span>
      </h2>
      <h5 className="text-center pb-3">
        Experienced leader dedicated to joint success with great skills. We are
        multi-talented, dynamic team in mining of all crypos. we are
        entrepreneurs, that doesn't miss opportunities to make our company and
        team grow. We are all committed to recruitment and our client
        satisfaction{' '}
      </h5>
      <div className="row mb-3 d-flex justify-content-around">
        <Card className=" text-light mt-3" style={{ width: '18rem' }}>
          <Card.Img
            src={require('../../assets/ceo.jpg')}
            alt="Member"
            style={{ width: '100%', height: '350px' }}
          />
          <Card.Body style={{ backgroundColor: itemColor }}>
            <Card.Title>lincon Jude</Card.Title>
            <Card.Subtitle>Ceo CryptoGenus Int</Card.Subtitle>
            <Card.Text>United States</Card.Text>
            <Card.Text>
              Lincon is a real genus in crypto. He is the best of all in Crypto.
              He advices banks on the standard way to handle crypto to have a
              top leveled bussiness
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="text-light mt-3" style={{ width: '18rem' }}>
          <Card.Img
            src={require('../../assets/teamguy.jpg')}
            alt="Member"
            style={{ width: '100%', height: '350px' }}
          />
          <Card.Body style={{ backgroundColor: itemColor }}>
            <Card.Title>Kelvin Leo</Card.Title>
            <Card.Subtitle>Manager CryptoGenus Int </Card.Subtitle>
            <Card.Text>Switzeland</Card.Text>
            <Card.Text>
              Kelvin a passionate and a genus in crypto. About 15 years
              experience in the financial sector. Lincon has contributed much to
              make crypogenus what it is tody{' '}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="text-light mt-3" style={{ width: '18rem' }}>
          <Card.Img
            src={require('../../assets/teamlady.jpg')}
            alt="Member"
            style={{ width: '100%', height: '350px' }}
          />
          <Card.Body style={{ backgroundColor: itemColor }}>
            <Card.Title>Lois Fred</Card.Title>
            <Card.Subtitle>Accountant</Card.Subtitle>
            <Card.Text>Canada</Card.Text>
            <Card.Text>
              Loise an enthuaistic,passionate and hard working woman with a
              10years experience in accounting.A real genus in crypto
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className=" mt-3 text-light" style={{ width: '18rem' }}>
          <Card.Img
            src={require('../../assets/acmanager.JPG')}
            alt="Member"
            style={{ width: '100%', height: '350px' }}
          />
          <Card.Body style={{ backgroundColor: itemColor }}>
            <Card.Title>Mr Fredric Anderson</Card.Title>
            <Card.Subtitle>Account Manager Crypogenus Int</Card.Subtitle>
            <Card.Text>United Kingdom</Card.Text>
            <Card.Text>
              Fredric a passionate, committed and hardworking man. A real genus
              in cryto, working to make cryptogenus a top company in the crypto
              market. Reaching out to our client at when due{' '}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  )
}

export default Teams
