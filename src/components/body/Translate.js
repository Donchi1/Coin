import React, { useState, useEffect } from 'react'
//import Languages from './Languages'
//import axios from 'axios'
//
//function Translate() {
//  let pageText = document.body.innerText
//
//  const storedLang = localStorage.getItem('Lang') || 'en'
//
//  const [lang, setLang] = useState(storedLang)
//
//  console.log(lang)
//
//  useEffect(() => {
//    axios
//      .post(`${process.env.REACT_APP_URL}/api/translate`, { lang, pageText })
//      .then((res) => {
//        console.log('success', res.data.message)
//        pageText = res.data.message
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
