import React from 'react'

const Languages = ({ lang, langChange }) => {
  const handleLang = (e) => {
    langChange(e.target.value)
    return localStorage.setItem('Lang', lang)
  }
  return (
    <select
      onChange={handleLang}
      value={lang}
      style={{
        width: '120px',
        height: '30px',
        border: '1px solid #999',
        fontSize: '18px',
        color: 'orange',
        borderRadius: '5px',
      }}
    >
      <option>Select Language</option>
      <option value="af">Afrikaans</option>
      <option value="sq">Albanian</option>
      <option value="am">Amharic</option>
      <option value="ar">Arabic</option>
      <option value="hy">Armenian</option>
      <option value="az">Azerbaijani</option>
      <option value="eu">Basque </option>
      <option value="be">Belarusian</option>
      <option value="bn">Bengali</option>
      <option value="bs">Bosnian</option>
      <option value="br">Breton </option>
      <option value="bg">Bulgarian </option>
      <option value="ca">Catalan</option>
      <option value="zh-CN">Chinese</option>
      <option value="zh-TW">Chinese (Traditional) </option>
      <option value="co">Corsican</option>
      <option value="hr">Croatian - hrvatski</option>
      <option value="cs">Czech - čeština</option>
      <option value="da">Danish - dansk</option>
      <option value="nl">Dutch - Nederlands</option>
      <option value="en">English</option>
      <option value="eo">Esperanto - esperanto</option>
      <option value="et">Estonian - eesti</option>
      <option value="fy">Frisian</option>
      <option value="fil">Filipino</option>
      <option value="fi">Finnish - suomi</option>
      <option value="fr">French - français</option>

      <option value="gl">Galician - galego</option>
      <option value="ka">Georgian - ქართული</option>
      <option value="de">German - Deutsch</option>
      <option value="el">Greek </option>
      <option value="gn">Guarani</option>
      <option value="gu">Gujarati - ગુજરાતી</option>
      <option value="ha">Hausa</option>
      <option value="haw">Hawaiian </option>
      <option value="he">Hebrew </option>
      <option value="hi">Hindi - हिन्दी</option>
      <option value="hmn">Hmong</option>
      <option value="hu">Hungarian - magyar</option>
      <option value="is">Icelandic - íslenska</option>
      <option value="id">Indonesian - Indonesia</option>
      <option value="ig">Igbo</option>

      <option value="ga">Irish - Gaeilge</option>
      <option value="it">Italian - italiano</option>
      <option value="ja">Japanese - 日本語</option>
      <option value="jw">Javanese</option>
      <option value="kn">Kannada - ಕನ್ನಡ</option>
      <option value="kk">Kazakh </option>
      <option value="km">Khmer - ខ្មែរ</option>
      <option value="ko">Korean - 한국어</option>
      <option value="ku">Kurdish - Kurdî</option>
      <option value="ky">Kyrgyz </option>
      <option value="lo">Lao - ລາວ</option>
      <option value="la">Latin</option>
      <option value="lv">Latvian - latviešu</option>

      <option value="lt">Lithuanian - lietuvių</option>
      <option value="lb">Lixembourgish</option>
      <option value="mk">Macedonian </option>
      <option value="mg">Malagasy</option>
      <option value="ms">Malay - Bahasa Melayu</option>
      <option value="ml">Malayalam </option>
      <option value="mt">Maltese - Malti</option>
      <option value="mi">Maori</option>
      <option value="mr">Marathi - मराठी</option>
      <option value="mn">Mongolian </option>
      <option value="my">Myanmar</option>
      <option value="ne">Nepali - नेपाली</option>
      <option value="no">Norwegian - norsk</option>
      <option value="ps">Pashto - پښتو</option>
      <option value="fa">Persian </option>
      <option value="pl">Polish - polski</option>
      <option value="pt">Portuguese - português</option>
      <option value="pa">Punjabi - ਪੰਜਾਬੀ</option>
      <option value="ro">Romanian - română</option>
      <option value="ru">Russian </option>
      <option value="sm">Samoan</option>
      <option value="gd">Scottish Gaelic</option>
      <option value="sr">Serbian </option>
      <option value="st">Sesotho</option>
      <option value="sn">Shona - chiShona</option>
      <option value="sd">Sindhi</option>
      <option value="si">Sinhala</option>
      <option value="sk">Slovak - slovenčina</option>
      <option value="sl">Slovenian - slovenščina</option>
      <option value="so">Somali - Soomaali</option>
      <option value="es">Spanish - español</option>
      <option value="su">Sundanese</option>
      <option value="sw">Swahili </option>
      <option value="sv">Swedish </option>
      <option value="tg">Tajik </option>
      <option value="ta">Tamil </option>
      <option value="tt">Tatar</option>
      <option value="te">Telugu </option>
      <option value="th">Thai </option>
      <option value="tr">Turkish</option>
      <option value="uk">Ukrainian </option>
      <option value="ur">Urdu </option>
      <option value="uz">Uzbek </option>
      <option value="vi">Vietnamese</option>
      <option value="wa">Walloon</option>
      <option value="cy">Welsh </option>
      <option value="xh">Xhosa</option>
      <option value="yi">Yiddish</option>
      <option value="yo">Yoruba </option>
      <option value="zu">Zulu - isiZulu</option>
    </select>
  )
}

export default Languages
