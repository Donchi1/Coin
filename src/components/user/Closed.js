import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const options = {
  title: <p>Site Closed</p>,

  icon: 'info',
  customClass: {
    footer: 'text-light',
  },
  html: (
    <span className="text-warning">
      Ohh!! We are sorry. Our trading platform has been closed for the week
    </span>
  ),

  footer:
    'Contact our support team support@ultimatecoins.info for more information',
}
function Closed() {
  MySwal.fire(options).then(() => {
    return window.location.assign('/')
  })
  return <div></div>
}

export default Closed
