// import React, { useState, useEffect } from 'react'
// import Languages from './Languages'
// import axios from 'axios'

// function Translate() {
//   const parent = document.body
//   const element = parent.childNodes[0]
//   const sourceText = elements.map((element) => {
//     if (element) return element.nodeValue
//   })

//   console.log(sourceText)

//   const storedLang = localStorage.getItem('Lang') || 'en'

//   const [lang, setLang] = useState(storedLang)

//   useEffect(() => {
//     axios
//       .post(`${process.env.REACT_APP_URL}/api/translate`, {
//         lang,
//         sourceText,
//       })
//       .then((res) => {
//         console.log(res.data.message)
//       })
//       .catch((err) => {
//         console.log('error', err.response.data.message)
//       })
//   }, [lang])

//   return <Languages lang={lang} langChange={setLang} />
// }

// export default Translate
