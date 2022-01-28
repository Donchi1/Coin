import React from 'react'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const options = {
  title: <p>Account Disabled</p>,
  text: 'Ohh!! Sorry your account has been disabled. Contact our support team',

  icon: 'error',

  confirmButtonText: (
    <a href="/contacts" className="text-light">
      Contact Us
    </a>
  ),
  showConfirmButton: true,
  cancelButtonColor: 'red',
  showCancelButton: true,
  cancelButtonText: (
    <a href="/" className=" text-light">
      Cancel
    </a>
  ),
}
function Disable() {
  MySwal.fire(options).then(() => {
    window.location.assign('/')
  })

  return <div></div>
}

export default Disable
