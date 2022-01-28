import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const options = {
  title: <p>Site Closed</p>,
  text: 'Ohh!! We are sorry. Our trading platform has been closed for the week',
  icon: 'info',
  footer:
    'Contact our support team support@ultimatecoins.info for more information',

  showCancelButton: true,
  cancelButtonText: 'OK',
}
function Closed() {
  MySwal.fire(options).then(() => {
    return window.location.assign('/')
  })
  return <div></div>
}

export default Closed
