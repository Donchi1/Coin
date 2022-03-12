// import React, { useState, useEffect } from 'react'
// import Languages from './Languages'
// import axios from 'axios'

// function Translate() {
//   let text = document.body.innerText

//   const storedLang = localStorage.getItem('Lang') || 'en'

//   const [lang, setLang] = useState(storedLang)

//   const pageText = text.slice(0, 5000)
  

  

//   useEffect(() => {
//     axios
//       .post(`${process.env.REACT_APP_URL}/api/translate`, { lang, pageText })
//       .then((res) => {
//         console.log('success', res.data.message)
//         text = res.data.message
//       })
//       .catch((err) => {
//         console.log('error', err.response.data.message)
//       })
//   }, [lang])

//   return <Languages lang={lang} langChange={setLang} />
// }

// export default Translate
