import React from 'react'

const Languages = (lang, langChange) => {
  return (
    <select onChange={(e) => langChange(e.target.value)} value={lang}>
      <option>Select Language</option>
      <option value="af">Afrikaans</option>
      <option value="sq">Albanian - shqip</option>
      <option value="am">Amharic - አማርኛ</option>
      <option value="ar">Arabic - العربية</option>
      <option value="hy">Armenian - հայերեն</option>
      <option value="az">Azerbaijani - azərbaycan dili</option>
      <option value="eu">Basque - euskara</option>
      <option value="be">Belarusian - беларуская</option>
      <option value="bn">Bengali - বাংলা</option>
      <option value="bs">Bosnian - bosanski</option>
      <option value="br">Breton - brezhoneg</option>
      <option value="bg">Bulgarian - български</option>
      <option value="ca">Catalan - català</option>
      <option value="zh-CN">Chinese (Simplified) - 中文（简体）</option>
      <option value="zh-TW">Chinese (Traditional) - 中文（繁體）</option>
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
      <option value="el">Greek - Ελληνικά</option>
      <option value="gn">Guarani</option>
      <option value="gu">Gujarati - ગુજરાતી</option>
      <option value="ha">Hausa</option>
      <option value="haw">Hawaiian - ʻŌlelo Hawaiʻi</option>
      <option value="he">Hebrew - עברית</option>
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
      <option value="kk">Kazakh - қазақ тілі</option>
      <option value="km">Khmer - ខ្មែរ</option>
      <option value="ko">Korean - 한국어</option>
      <option value="ku">Kurdish - Kurdî</option>
      <option value="ky">Kyrgyz - кыргызча</option>
      <option value="lo">Lao - ລາວ</option>
      <option value="la">Latin</option>
      <option value="lv">Latvian - latviešu</option>

      <option value="lt">Lithuanian - lietuvių</option>
      <option value="lb">Lixembourgish</option>
      <option value="mk">Macedonian - македонски</option>
      <option value="mg">Malagasy</option>
      <option value="ms">Malay - Bahasa Melayu</option>
      <option value="ml">Malayalam - മലയാളം</option>
      <option value="mt">Maltese - Malti</option>
      <option value="mi">Maori</option>
      <option value="mr">Marathi - मराठी</option>
      <option value="mn">Mongolian - монгол</option>
      <option value="my">Myanmar</option>
      <option value="ne">Nepali - नेपाली</option>
      <option value="no">Norwegian - norsk</option>
      <option value="ps">Pashto - پښتو</option>
      <option value="fa">Persian - فارسی</option>
      <option value="pl">Polish - polski</option>
      <option value="pt">Portuguese - português</option>
      <option value="pa">Punjabi - ਪੰਜਾਬੀ</option>
      <option value="ro">Romanian - română</option>
      <option value="ru">Russian - русский</option>
      <option value="sm">Samoan</option>
      <option value="gd">Scottish Gaelic</option>
      <option value="sr">Serbian - српски</option>
      <option value="st">Sesotho</option>
      <option value="sn">Shona - chiShona</option>
      <option value="sd">Sindhi</option>
      <option value="si">Sinhala - සිංහල</option>
      <option value="sk">Slovak - slovenčina</option>
      <option value="sl">Slovenian - slovenščina</option>
      <option value="so">Somali - Soomaali</option>
      <option value="es">Spanish - español</option>
      <option value="su">Sundanese</option>
      <option value="sw">Swahili - Kiswahili</option>
      <option value="sv">Swedish - svenska</option>
      <option value="tg">Tajik - тоҷикӣ</option>
      <option value="ta">Tamil - தமிழ்</option>
      <option value="tt">Tatar</option>
      <option value="te">Telugu - తెలుగు</option>
      <option value="th">Thai - ไทย</option>
      <option value="tr">Turkish - Türkçe</option>
      <option value="uk">Ukrainian - українська</option>
      <option value="ur">Urdu - اردو</option>
      <option value="uz">Uzbek - o‘zbek</option>
      <option value="vi">Vietnamese - Tiếng Việt</option>
      <option value="wa">Walloon - wa</option>
      <option value="cy">Welsh - Cymraeg</option>
      <option value="xh">Xhosa</option>
      <option value="yi">Yiddish</option>
      <option value="yo">Yoruba - Èdè Yorùbá</option>
      <option value="zu">Zulu - isiZulu</option>
    </select>
  )
}

export default Languages
