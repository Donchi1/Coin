//import React, { useState, useEffect } from 'react'
//import Languages from './Languages'
//import axios from 'axios'
//
//function Translate() {
//  const pageText = document.body.innerText
//
//  const storedLang =
//    localStorage.getItem('Lang') || navigator?.languages[0].slice(0, 2) || 'en'
//
//  const [lang, setLang] = useState(storedLang)
//
//  useEffect(() => {
//    const data = { langTo: lang, text: pageText }
//    axios
//      .post(`${process.env.REACT_APP_URL}/api/translate`, data)
//      .then((res) => {
//        console.log('success', res.data())
//      })
//      .catch((err) => {
//        console.log('error', err.response.data.message)
//      })
//  }, [lang])
//
//  return <Languages lang={lang} langChange={setLang} />
//}
//
//export default Translate
