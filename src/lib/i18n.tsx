import { createContext, useContext, type ReactNode } from "react";

export type Language = "en" | "ur" | "bal";
const translations: Record<string, [string, string]> = {
  "Choose your language": ["اپنی زبان منتخب کریں", "وتی زبان گچین کن"],
  "Continue to directory": ["ڈائریکٹری میں جائیں", "ڈائریکٹریءَ روان بہ"],
  "You can change your language at any time.": [
    "آپ کسی بھی وقت زبان تبدیل کر سکتے ہیں۔",
    "تو ہر وھد وتی زبان بدل کنگءَ کنی۔",
  ],
  "Explore the people and traditions of Panjgur in your language.": [
    "پنجگور کے لوگوں اور روایات کو اپنی زبان میں دریافت کریں۔",
    "پنجگورءِ مردم ءُ رواجاں وتی زبانءَ بشناس۔",
  ],
  "Panjgur, Balochistan, Pakistan": ["پنجگور، بلوچستان، پاکستان", "پنجگور، بلوچستان، پاکستان"],
  "Rooted in place. Connected to people.": [
    "اپنی سرزمین سے جڑے، لوگوں سے قریب۔",
    "وتی سرزمینءَ پیوستہ، مردمءَ نزیک۔",
  ],
  Home: ["صفحۂ اول", "بنیادی صفحہ"],
  Dates: ["کھجور", "ہرمگ"],
  Crafts: ["دستکاری", "دستی کار"],
  "Add / Update Listing": ["اندراج شامل / تبدیل کریں", "اندراج گیش / بدل کن"],
  "Explore dates": ["کھجوریں دیکھیں", "ہرمگاں بچار"],
  "Explore crafts": ["دستکاری دیکھیں", "دستی کاراں بچار"],
  "Add a listing": ["اندراج شامل کریں", "اندراج گیش کن"],
  "A place to find the people keeping Panjgur’s dates and crafts alive.": [
    "پنجگور کی کھجوروں اور دستکاری کو زندہ رکھنے والے لوگوں سے ملنے کی جگہ۔",
    "پنجگورءِ ہرمگ ءُ دستی کاراں زندہ داروکیں مردمءَ پیدا کنگءِ جاگہ۔",
  ],
  "Made for local connection, not transactions.": [
    "مقامی رابطے کے لیے، خرید و فروخت کے لیے نہیں۔",
    "مقامی رابطگءِ واستا، سوداگریءِ واستا نہ۔",
  ],
  "THE PEOPLE & PLACES OF PANJGUR": ["پنجگور کے لوگ اور مقامات", "پنجگورءِ مردم ءُ جاگہاں"],
  "Discover Panjgur’s": ["پنجگور کے", "پنجگورءِ"],
  "Producers & Heritage Crafts": [
    "پیداوار اور روایتی دستکاری کو جانیں",
    "پیداوار کنگوک ءُ میراثی دستی کاراں بشناس",
  ],
  "A digital directory connecting buyers and visitors with local date growers, processors and traditional artisans in Panjgur.":
    [
      "ایک ڈیجیٹل ڈائریکٹری جو خریداروں اور آنے والوں کو پنجگور کے مقامی کھجور کاشتکاروں، پراسیسرز اور روایتی ہنرمندوں سے ملاتی ہے۔",
      "ڈیجیٹل ڈائریکٹری کہ خریدار ءُ مہماناں پنجگورءِ مقامی ہرمگ کشت کار، تیار کنگوک ءُ روایتی ہنرمنداں گوں پیوست کنت۔",
    ],
  "Explore the directory": ["ڈائریکٹری دیکھیں", "ڈائریکٹری بچار"],
  "EXPLORE THE DIRECTORY": ["ڈائریکٹری دریافت کریں", "ڈائریکٹری بچار"],
  "Find the people behind": ["ان لوگوں سے ملیں جو", "آ مردم بشناس کہ"],
  "the place.": ["اس خطے کی پہچان ہیں۔", "اے دیارءِ پہچان اَنت۔"],
  "Two traditions, one home. Start with what you’re looking for.": [
    "دو روایتیں، ایک گھر۔ اپنی دلچسپی سے آغاز کریں۔",
    "دو رواج، یک گھر۔ چے لوٹئے ھما جاہءَ شرو کن۔",
  ],
  "01 / AGRICULTURE": ["۰۱ / زراعت", "۰۱ / کشت ءُ کار"],
  "02 / HANDMADE HERITAGE": ["۰۲ / دست ساز ورثہ", "۰۲ / دستی میراث"],
  "Explore local date growers, processors and date products.": [
    "مقامی کھجور کاشتکاروں، پراسیسرز اور کھجور کی پیداوار کو جانیں۔",
    "مقامی ہرمگ کشت کاراں، تیار کنگوکاں ءُ ہرمگءِ پیداواراں بشناس۔",
  ],
  "Discover traditional embroidery, palm crafts and local workmanship.": [
    "روایتی کڑھائی، کھجور کے پتوں کی دستکاری اور مقامی ہنر دریافت کریں۔",
    "روایتی دوچ، ہرمگءِ پاتانی دستی کار ءُ مقامی ہنر بشناس۔",
  ],
  "ABOUT PANJGUR": ["پنجگور کے بارے میں", "پنجگورءِ باروا"],
  "An oasis of craft": ["ہنر اور کاشت کا", "ہنر ءُ کشتءِ"],
  "and cultivation.": ["ایک نخلستان۔", "یک آبادین جاگہ۔"],
  "Set in western Balochistan, Panjgur is known for its date agriculture and the skill of its makers. From palm groves to intricate handwork, local knowledge is passed between generations.":
    [
      "مغربی بلوچستان میں واقع پنجگور کھجور کی کاشت اور اپنے ہنرمندوں کے فن کے لیے جانا جاتا ہے۔ کھجور کے باغات سے لے کر باریک دستکاری تک، مقامی علم نسل در نسل منتقل ہوتا ہے۔",
      "روچ کَیگءِ بلوچستانءَ پنجگور وتی ہرمگ کشت ءُ ہنرمندانی کارءِ سببءَ نامدار اِنت۔ ہرمگءِ باغاں چہ باریک دستی کارءَ، مقامی دانست نسل پہ نسل رسیت۔",
    ],
  "This directory makes it easier to discover the people carrying these traditions forward — and reach them directly.":
    [
      "یہ ڈائریکٹری ان روایات کو آگے بڑھانے والے لوگوں کو دریافت کرنے اور ان سے براہِ راست رابطہ کرنے میں مدد دیتی ہے۔",
      "اے ڈائریکٹری ایں رواجاں برہنداریں مردمءَ پیدا کنگ ءُ راست راست رابطگءَ آسان کنت۔",
    ],
  "DATE AGRICULTURE": ["کھجور کی کاشت", "ہرمگءِ کشت"],
  "TRADITIONAL CRAFTS": ["روایتی دستکاری", "روایتی دستی کار"],
  "LOCAL CONNECTION": ["مقامی رابطہ", "مقامی رابطگ"],
  "FOR PANJGUR PRODUCERS": ["پنجگور کے پیداوار کنندگان کے لیے", "پنجگورءِ پیداوار کنگوکانی واستا"],
  "Want to be listed?": ["کیا آپ اندراج کروانا چاہتے ہیں؟", "وتی نام اندراج کنگ لوٹئے؟"],
  "Local producers and artisans can add or update their own directory information.": [
    "مقامی پیداوار کنندگان اور ہنرمند اپنی ڈائریکٹری معلومات شامل یا تبدیل کر سکتے ہیں۔",
    "مقامی پیداوار کنگوک ءُ ہنرمند وتی ڈائریکٹریءِ معلومات گیش یا بدل کنگءَ کننت۔",
  ],
  "Add / Update Your Listing": ["اپنا اندراج شامل / تبدیل کریں", "وتی اندراج گیش / بدل کن"],
  "DIRECTORY / DATES": ["ڈائریکٹری / کھجور", "ڈائریکٹری / ہرمگ"],
  "DIRECTORY / CRAFTS": ["ڈائریکٹری / دستکاری", "ڈائریکٹری / دستی کار"],
  "Panjgur Date Directory": ["پنجگور کھجور ڈائریکٹری", "پنجگورءِ ہرمگ ڈائریکٹری"],
  "Panjgur Crafts Directory": ["پنجگور دستکاری ڈائریکٹری", "پنجگورءِ دستی کار ڈائریکٹری"],
  "Discover local date growers, processors and suppliers.": [
    "مقامی کھجور کاشتکاروں، پراسیسرز اور سپلائرز کو جانیں۔",
    "مقامی ہرمگ کشت کاراں، تیار کنگوکاں ءُ رسدوکاں بشناس۔",
  ],
  "Discover local artisans and traditional workmanship.": [
    "مقامی ہنرمندوں اور روایتی کاریگری کو جانیں۔",
    "مقامی ہنرمنداں ءُ روایتی دستی کارءَ بشناس۔",
  ],
  "Refine your search": ["تلاش محدود کریں", "وتی پٹّگءَ محدود کن"],
  "SEARCH BY NAME": ["نام سے تلاش کریں", "نامءَ پٹّگ کن"],
  "Search producers": ["پیداوار کنندگان تلاش کریں", "پیداوار کنگوکاں پٹّگ کن"],
  LOCATION: ["مقام", "جاگہ"],
  "Village or area": ["گاؤں یا علاقہ", "گام یا علاقہ"],
  "DATE VARIETY": ["کھجور کی قسم", "ہرمگءِ قسم"],
  "CRAFT CATEGORY": ["دستکاری کی قسم", "دستی کارءِ قسم"],
  "All varieties": ["تمام اقسام", "درست قسم"],
  "All crafts": ["تمام دستکاریاں", "درست دستی کار"],
  "Traditional Embroidery": ["روایتی کڑھائی", "روایتی دوچ"],
  "Palm & Natural-Fiber Crafts": [
    "کھجور کے پتوں اور قدرتی ریشوں کی دستکاری",
    "ہرمگءِ پات ءُ قدرتی ریشگانی دستی کار",
  ],
  Woodwork: ["لکڑی کا کام", "دارءِ کار"],
  "Other verified local crafts": [
    "دیگر تصدیق شدہ مقامی دستکاریاں",
    "دگہ تصدیق بوتگیں مقامی دستی کار",
  ],
  TYPE: ["نوعیت", "قسم"],
  "Producer / Processor": ["کاشتکار / پراسیسر", "کشت کار / تیار کنگوک"],
  Producer: ["کاشتکار", "کشت کار"],
  Processor: ["پراسیسر", "تیار کنگوک"],
  "Clear filters": ["فلٹر صاف کریں", "فلٹر پاک کن"],
  "Listings are shown only after producer details are confirmed.": [
    "اندراجات صرف پیداوار کنندہ کی معلومات کی تصدیق کے بعد دکھائے جاتے ہیں۔",
    "اندراج فقط ھما وھد پہ دیم دارگ بنت کہ پیداوار کنگوکءِ معلومات تصدیق ببنت۔",
  ],
  "PEOPLE, NOT PRODUCTS": ["لوگ، مصنوعات نہیں", "مردم، چیز نہ"],
  "No matching listings yet": ["ابھی کوئی مماثل اندراج نہیں", "ھنوک ہمگوں اندراج نیست"],
  "Directory profiles": ["ڈائریکٹری پروفائلز", "ڈائریکٹریءِ پروفائل"],
  "0 MATCHES": ["۰ نتائج", "۰ نتیجہ"],
  "PREVIEW FORMAT": ["نمونہ شکل", "نمونہءِ شکل"],
  "No matching profiles yet.": ["ابھی کوئی مماثل پروفائل نہیں۔", "ھنوک ہمگوں پروفائل نیست۔"],
  "Try a different search, or check back as local producers join the directory.": [
    "دوبارہ تلاش کریں یا مقامی پیداوار کنندگان کے شامل ہونے پر واپس آئیں۔",
    "دگہ پٹّگ کن یا مقامی پیداوار کنگوکانی گیش بوھگءَ پد بیا۔",
  ],
  "This is a design preview. The format below shows how a verified date producer will appear. No producer names or phone numbers have been invented.":
    [
      "یہ ڈیزائن کا نمونہ ہے۔ نیچے تصدیق شدہ کھجور کاشتکار کی پروفائل کی شکل دکھائی گئی ہے۔ کوئی نام یا فون نمبر فرضی نہیں بنایا گیا۔",
      "اے ڈیزائنءِ نمونہ اِنت۔ جہلءَ تصدیق بوتگیں ہرمگ کشت کارءِ پروفائلءِ شکل پیش دارگ بیت۔ ھچ نام یا فون نمبر ساختگ نہ اِنت۔",
    ],
  "This is a design preview. The format below shows how a verified artisan will appear. No producer names or phone numbers have been invented.":
    [
      "یہ ڈیزائن کا نمونہ ہے۔ نیچے تصدیق شدہ ہنرمند کی پروفائل کی شکل دکھائی گئی ہے۔ کوئی نام یا فون نمبر فرضی نہیں بنایا گیا۔",
      "اے ڈیزائنءِ نمونہ اِنت۔ جہلءَ تصدیق بوتگیں ہنرمندءِ پروفائلءِ شکل پیش دارگ بیت۔ ھچ نام یا فون نمبر ساختگ نہ اِنت۔",
    ],
  "Are you a local date producer?": [
    "کیا آپ مقامی کھجور کاشتکار ہیں؟",
    "تو مقامی ہرمگ کشت کار ئے؟",
  ],
  "Are you a local artisan?": ["کیا آپ مقامی ہنرمند ہیں؟", "تو مقامی ہنرمند ئے؟"],
  "Share your work with people looking to connect directly.": [
    "اپنا کام براہِ راست رابطہ کرنے والے لوگوں تک پہنچائیں۔",
    "وتی کار ھما مردمءَ برسان کہ راست راست رابطگ لوٹنت۔",
  ],
  "Add your listing": ["اپنا اندراج شامل کریں", "وتی اندراج گیش کن"],
  "YOUR DRAFT": ["آپ کا مسودہ", "تئی مسودہ"],
  "PROFILE FORMAT PREVIEW": ["پروفائل کا نمونہ", "پروفائلءِ نمونہ"],
  "DATE PRODUCER / PROCESSOR": ["کھجور کاشتکار / پراسیسر", "ہرمگ کشت کار / تیار کنگوک"],
  "ARTISAN / CRAFT PRODUCER": ["ہنرمند / دستکاری پیداوار کنندہ", "ہنرمند / دستی کار کنگوک"],
  VARIETIES: ["اقسام", "قسم"],
  "CRAFT / TECHNIQUES": ["دستکاری / طریقے", "دستی کار / طریقہ"],
  "Phone added with verified listing": [
    "تصدیق شدہ اندراج کے ساتھ فون شامل ہوگا",
    "فون تصدیق بوتگیں اندراجءَ گیش بیت",
  ],
  "Pending review": ["جائزے کا منتظر", "جانچءِ منتظر"],
  "Not a live listing": ["یہ فعال اندراج نہیں", "اے زندگ اندراج نہ اِنت"],
  "Contact on WhatsApp": ["واٹس ایپ پر رابطہ کریں", "واٹس ایپءَ رابطگ کن"],
  "View profile": ["پروفائل دیکھیں", "پروفائل بچار"],
  "Date producer profile": ["کھجور کاشتکار کا پروفائل", "ہرمگ کشت کارءِ پروفائل"],
  "Craft producer profile": ["دستکاری ہنرمند کا پروفائل", "دستی کار کنگوکءِ پروفائل"],
  "Panjgur, Balochistan": ["پنجگور، بلوچستان", "پنجگور، بلوچستان"],
  "Muzafati · Begum Jangi · Sabzo": ["مضافاتی · بیگم جنگی · سبزو", "مضافاتی · بیگم جنگی · سبزو"],
  "Embroidery · Palm & natural-fiber crafts · Woodwork": [
    "کڑھائی · کھجور کے پتوں اور قدرتی ریشوں کی دستکاری · لکڑی کا کام",
    "دوچ · ہرمگءِ پات ءُ قدرتی ریشگانی دستی کار · دارءِ کار",
  ],
  "This is a profile-format preview. A producer’s name, orchard story, varieties and contact details will appear here after verification.":
    [
      "یہ پروفائل کا نمونہ ہے۔ تصدیق کے بعد کاشتکار کا نام، باغ کی کہانی، اقسام اور رابطہ معلومات یہاں دکھائی دیں گی۔",
      "اے پروفائلءِ نمونہ اِنت۔ تصدیقءَ پد کشت کارءِ نام، باغءِ قصہ، قسم ءُ رابطگءِ معلومات ادا پیش دارگ بنت۔",
    ],
  "This is a profile-format preview. An artisan’s name, techniques, work and contact details will appear here after verification.":
    [
      "یہ پروفائل کا نمونہ ہے۔ تصدیق کے بعد ہنرمند کا نام، طریقے، کام اور رابطہ معلومات یہاں دکھائی دیں گی۔",
      "اے پروفائلءِ نمونہ اِنت۔ تصدیقءَ پد ہنرمندءِ نام، طریقہ، کار ءُ رابطگءِ معلومات ادا پیش دارگ بنت۔",
    ],
  "Seasonal availability supplied by producer": [
    "موسمی دستیابی کاشتکار فراہم کرے گا",
    "موسمی دستیابی کشت کار دنت",
  ],
  "Availability supplied by artisan": ["دستیابی ہنرمند فراہم کرے گا", "دستیابی ہنرمند دنت"],
  "Dates directory": ["کھجور ڈائریکٹری", "ہرمگ ڈائریکٹری"],
  "Crafts directory": ["دستکاری ڈائریکٹری", "دستی کار ڈائریکٹری"],
  "Profile preview": ["پروفائل کا نمونہ", "پروفائلءِ نمونہ"],
  "This is your private session preview. Your listing has not been submitted or published.": [
    "یہ صرف آپ کے لیے عارضی نمونہ ہے۔ آپ کا اندراج جمع یا شائع نہیں ہوا۔",
    "اے فقط تئی عارضی نمونہ اِنت۔ تئی اندراج پیش یا شائع نہ بوتگ۔",
  ],
  "Profile layout preview — this is not a real producer. Verified names, photos and contact details will appear when listings are published.":
    [
      "پروفائل کی شکل کا نمونہ — یہ حقیقی کاشتکار نہیں ہے۔ اندراجات شائع ہونے پر تصدیق شدہ نام، تصاویر اور رابطہ معلومات دکھائی دیں گی۔",
      "پروفائلءِ شکلءِ نمونہ — اے راستیں پیداوار کنگوک نہ اِنت۔ اندراج شائع بوھگءَ تصدیق بوتگیں نام، عکس ءُ رابطگءِ معلومات پیش دارگ بنت۔",
    ],
  "01 / THE STORY": ["۰۱ / کہانی", "۰۱ / قصہ"],
  "About the producer": ["پیداوار کنندہ کے بارے میں", "پیداوار کنگوکءِ باروا"],
  "02 / WHAT THEY MAKE": ["۰۲ / ان کا کام", "۰۲ / آ چی سازنت"],
  "Date varieties": ["کھجور کی اقسام", "ہرمگءِ قسم"],
  "Products & techniques": ["مصنوعات اور طریقے", "چیز ءُ طریقہ"],
  "03 / WHEN TO REACH OUT": ["۰۳ / رابطے کا وقت", "۰۳ / رابطگءِ وھد"],
  Availability: ["دستیابی", "دستیابی"],
  "04 / A CLOSER LOOK": ["۰۴ / قریب سے دیکھیں", "۰۴ / نزیکءَ بچار"],
  "From Panjgur": ["پنجگور سے", "پنجگورءَ چہ"],
  "Back to Directory": ["ڈائریکٹری میں واپس", "ڈائریکٹریءَ پدا برو"],
  "DIRECT CONTACT": ["براہِ راست رابطہ", "راست راست رابطگ"],
  "Start a conversation": ["بات چیت شروع کریں", "گپ شرو کن"],
  "Contact the producer directly to ask about their work and availability.": [
    "ان کے کام اور دستیابی کے بارے میں براہِ راست پوچھیں۔",
    "آئیءِ کار ءُ دستیابیءِ باروا راست راست بپرس۔",
  ],
  "Phone shown with a verified listing": [
    "فون تصدیق شدہ اندراج کے ساتھ دکھایا جائے گا",
    "فون تصدیق بوتگیں اندراجءَ پیش دارگ بیت",
  ],
  "No payment or order is handled through this directory.": [
    "اس ڈائریکٹری میں ادائیگی یا آرڈر نہیں ہوتا۔",
    "اے ڈائریکٹریءَ پیسہ یا آرڈر نہ بیت۔",
  ],
  "JOIN THE DIRECTORY": ["ڈائریکٹری میں شامل ہوں", "ڈائریکٹریءَ گیش بہ"],
  "Add or Update Your Directory Listing": [
    "اپنا ڈائریکٹری اندراج شامل یا تبدیل کریں",
    "وتی ڈائریکٹری اندراج گیش یا بدل کن",
  ],
  "Are you a local producer or artisan in Panjgur? Add your information to the directory or update your existing listing.":
    [
      "کیا آپ پنجگور کے مقامی پیداوار کنندہ یا ہنرمند ہیں؟ ڈائریکٹری میں اپنی معلومات شامل کریں یا موجودہ اندراج تبدیل کریں۔",
      "تو پنجگورءِ مقامی پیداوار کنگوک یا ہنرمند ئے؟ وتی معلومات ڈائریکٹریءَ گیش کن یا پہلیں اندراج بدل کن۔",
    ],
  "PREVIEW SAVED": ["نمونہ محفوظ", "نمونہ بچ بوت"],
  "Your listing preview is ready.": [
    "آپ کے اندراج کا نمونہ تیار ہے۔",
    "تئی اندراجءِ نمونہ تیار اِنت۔",
  ],
  "This information is saved only for this browser session. It has not been submitted for review or published. Account creation and secure ownership are needed before real listings can go live.":
    [
      "یہ معلومات صرف اس براؤزر سیشن میں محفوظ ہیں۔ یہ جائزے کے لیے جمع یا شائع نہیں ہوئی۔ حقیقی اندراجات کے لیے اکاؤنٹ اور محفوظ ملکیت لازمی ہے۔",
      "اے معلومات فقط اِشی براؤزرءِ نشستءَ بچ اَنت۔ جانچءِ واستا پیش یا شائع نہ بوتگ۔ راستیں اندراجانی واستا اکاؤنٹ ءُ محفوظ مالکی لازم اِنت۔",
    ],
  "View my listing preview": ["اپنے اندراج کا نمونہ دیکھیں", "وتی اندراجءِ نمونہ بچار"],
  "START HERE": ["یہاں سے شروع کریں", "ادا شرو کن"],
  "What do you produce?": ["آپ کیا بناتے یا اگاتے ہیں؟", "تو چی سازئے یا کشت کنئے؟"],
  "Choose the directory that fits your work.": [
    "اپنے کام کے مطابق ڈائریکٹری منتخب کریں۔",
    "وتی کارءِ ھسابءَ ڈائریکٹری گچین کن۔",
  ],
  "Date Producer / Processor": ["کھجور کاشتکار / پراسیسر", "ہرمگ کشت کار / تیار کنگوک"],
  "Growers, processors and date suppliers": [
    "کاشتکار، پراسیسرز اور کھجور سپلائرز",
    "کشت کار، تیار کنگوک ءُ ہرمگ رسدوک",
  ],
  "Artisan / Craft Producer": ["ہنرمند / دستکاری پیداوار کنندہ", "ہنرمند / دستی کار کنگوک"],
  "Embroidery, palm crafts and handwork": [
    "کڑھائی، کھجور کے پتوں کی دستکاری اور ہاتھ کا کام",
    "دوچ، ہرمگءِ پاتانی دستی کار ءُ دستءِ کار",
  ],
  "YOUR DETAILS": ["آپ کی معلومات", "تئی معلومات"],
  "Tell us about your work.": ["اپنے کام کے بارے میں بتائیں۔", "وتی کارءِ باروا بگوش۔"],
  "Only share contact details you’re comfortable making public.": [
    "صرف وہ رابطہ معلومات دیں جو آپ عام کرنا چاہتے ہیں۔",
    "فقط ھما رابطگءِ معلومات بدئے کہ عام کنگءَ راضی ئے۔",
  ],
  "Name / Farm / Collective name": ["نام / فارم / گروہ کا نام", "نام / فارم / ٹولیءِ نام"],
  "Your name or collective": ["آپ کا نام یا گروہ", "تئی نام یا ٹولی"],
  Location: ["مقام", "جاگہ"],
  "Village or area in Panjgur": ["پنجگور کا گاؤں یا علاقہ", "پنجگورءِ گام یا علاقہ"],
  "Phone / WhatsApp": ["فون / واٹس ایپ", "فون / واٹس ایپ"],
  "Products / varieties": ["مصنوعات / اقسام", "چیز / قسم"],
  "Short description": ["مختصر تعارف", "کوٹاہ پجار"],
  "Tell visitors about your work and your connection to Panjgur": [
    "آنے والوں کو اپنے کام اور پنجگور سے تعلق کے بارے میں بتائیں",
    "مہماناں وتی کار ءُ پنجگور گوں وتی پیوستگیءِ باروا بگوش",
  ],
  Photos: ["تصاویر", "عکس"],
  "Choose photos": ["تصاویر منتخب کریں", "عکس گچین کن"],
  "Images stay on this device in the prototype": [
    "نمونے میں تصاویر اسی ڈیوائس پر رہتی ہیں",
    "نمونہءَ عکس ہمے دستگاہءَ ماننت",
  ],
  "photo selected": ["تصویر منتخب", "عکس گچین بوت"],
  "photos selected": ["تصاویر منتخب", "عکس گچین بوتگ"],
  "In the finished directory, an account will be required to submit or edit a listing. You’ll only be able to manage your own.":
    [
      "مکمل ڈائریکٹری میں اندراج جمع یا تبدیل کرنے کے لیے اکاؤنٹ درکار ہوگا۔ آپ صرف اپنا اندراج سنبھال سکیں گے۔",
      "پوری ڈائریکٹریءَ اندراج پیش یا بدل کنگءِ واستا اکاؤنٹ لازم بیت۔ تو فقط وتی اندراج سنبھال کنگءَ کنی۔",
    ],
  "Update My Preview": ["میرا نمونہ تبدیل کریں", "وتی نمونہ بدل کن"],
  "Preview My Listing": ["میرے اندراج کا نمونہ دیکھیں", "وتی اندراجءِ نمونہ بچار"],
  "Already have a listing?": ["پہلے سے اندراج ہے؟", "چہ پیش اندراج ھست؟"],
  "Account creation and login are shown as a future step in this prototype.": [
    "اس نمونے میں اکاؤنٹ بنانا اور لاگ ان مستقبل کا مرحلہ ہے۔",
    "اے نمونہءَ اکاؤنٹ جور کنگ ءُ لاگ ان آؤکی مرحلہ اِنت۔",
  ],
  "Create Account / Login": ["اکاؤنٹ بنائیں / لاگ ان", "اکاؤنٹ جور کن / لاگ ان"],
  "Form details are previewed in this session only; no data is sent to a public directory.": [
    "فارم کی معلومات صرف اس سیشن میں دکھائی جاتی ہیں؛ کوئی ڈیٹا عوامی ڈائریکٹری کو نہیں بھیجا جاتا۔",
    "فارمءِ معلومات فقط ہمے نشستءَ پیش دارگ بنت؛ ھچ ڈیٹا عام ڈائریکٹریءَ نہ شوت۔",
  ],
  "YOUR SPACE / CONCEPT PREVIEW": ["آپ کی جگہ / تصوراتی نمونہ", "تئی جاگہ / نمونہ"],
  "My Directory Listing": ["میرا ڈائریکٹری اندراج", "منی ڈائریکٹری اندراج"],
  "A focused place to review and manage only your own directory information.": [
    "صرف اپنی ڈائریکٹری معلومات دیکھنے اور سنبھالنے کی جگہ۔",
    "فقط وتی ڈائریکٹریءِ معلومات بچارگ ءُ سنبھال کنگءِ جاگہ۔",
  ],
  "This is a dashboard design preview, not an authenticated account. Secure sign-in and ownership checks are required before live editing is enabled.":
    [
      "یہ ڈیش بورڈ کا ڈیزائن نمونہ ہے، تصدیق شدہ اکاؤنٹ نہیں۔ حقیقی تبدیلی کے لیے محفوظ لاگ ان اور ملکیت کی تصدیق لازمی ہے۔",
      "اے ڈیش بورڈءِ ڈیزائن نمونہ اِنت، تصدیق بوتگیں اکاؤنٹ نہ۔ راستیں بدل کنگءِ واستا محفوظ لاگ ان ءُ مالکیءِ تصدیق لازم اِنت۔",
    ],
  "YOUR PROFILE PREVIEW": ["آپ کے پروفائل کا نمونہ", "تئی پروفائلءِ نمونہ"],
  "Pending Review · Preview": ["جائزے کا منتظر · نمونہ", "جانچءِ منتظر · نمونہ"],
  "Manage your listing": ["اپنا اندراج سنبھالیں", "وتی اندراج سنبھال کن"],
  "Your own details are the only information available here.": [
    "یہاں صرف آپ کی اپنی معلومات دستیاب ہیں۔",
    "ادا فقط تئی وتی معلومات دستیاب اَنت۔",
  ],
  "Edit Details": ["معلومات تبدیل کریں", "معلومات بدل کن"],
  "Update Photos": ["تصاویر تبدیل کریں", "عکس بدل کن"],
  "Update Contact Information": ["رابطہ معلومات تبدیل کریں", "رابطگءِ معلومات بدل کن"],
  "Clear Preview / Logout": ["نمونہ صاف کریں / باہر جائیں", "نمونہ پاک کن / در برو"],
  "No listing preview yet.": ["ابھی کوئی اندراج نمونہ نہیں۔", "ھنوک ھچ اندراجءِ نمونہ نیست۔"],
  "Start with your own details to see how your directory profile could appear.": [
    "اپنی معلومات درج کریں تاکہ دیکھ سکیں آپ کا پروفائل کیسا نظر آئے گا۔",
    "وتی معلومات گیش کن تا بچارئے تئی پروفائل چون پیش دارگ بیت۔",
  ],
  "PRIVATE ADMIN / CONCEPT ONLY": ["نجی انتظامیہ / صرف تصوراتی نمونہ", "نجی انتظام / فقط نمونہ"],
  "Directory administration": ["ڈائریکٹری انتظامیہ", "ڈائریکٹریءِ انتظام"],
  "A restrained preview of the tools needed to keep the directory accurate and locally accountable.":
    [
      "ڈائریکٹری کو درست اور مقامی طور پر جواب دہ رکھنے کے اوزاروں کا مختصر نمونہ۔",
      "ڈائریکٹریءَ درست ءُ مقامی جواب دہ دارگءِ اوزارانی کوٹاہ نمونہ۔",
    ],
  "Concept screen only. No admin actions or listing data are connected. A live version requires verified administrator access.":
    [
      "یہ صرف تصوراتی صفحہ ہے۔ انتظامی کارروائیاں یا اندراجات منسلک نہیں ہیں۔ حقیقی نظام کے لیے تصدیق شدہ انتظامی رسائی درکار ہے۔",
      "اے فقط نمونہءِ صفحہ اِنت۔ انتظامی کار یا اندراجانی ڈیٹا پیوستہ نہ اَنت۔ راستیں نسخہءَ تصدیق بوتگیں انتظامی رسائی لازم اِنت۔",
    ],
  "REVIEW QUEUE": ["جائزے کی قطار", "جانچءِ قطار"],
  "Pending listings": ["زیرِ جائزہ اندراجات", "جانچءِ منتظر اندراج"],
  "No submissions to review in this prototype.": [
    "اس نمونے میں جائزے کے لیے کوئی اندراج نہیں۔",
    "اے نمونہءَ جانچءِ واستا ھچ اندراج نیست۔",
  ],
  DIRECTORY: ["ڈائریکٹری", "ڈائریکٹری"],
  "Approved listings": ["منظور شدہ اندراجات", "منظور بوتگیں اندراج"],
  "Published producer and artisan profiles will appear here.": [
    "شائع شدہ کاشتکاروں اور ہنرمندوں کے پروفائل یہاں دکھائی دیں گے۔",
    "شائع بوتگیں کشت کار ءُ ہنرمندانی پروفائل ادا پیش دارگ بنت۔",
  ],
  TRUST: ["اعتماد", "باور"],
  "Verify producer": ["پیداوار کنندہ کی تصدیق", "پیداوار کنگوکءِ تصدیق"],
  "Confirm the identity and local connection behind each listing.": [
    "ہر اندراج کے پیچھے شخص کی شناخت اور مقامی تعلق کی تصدیق کریں۔",
    "ہر اندراجءِ مردمءِ پہچان ءُ مقامی پیوستگیءَ تصدیق کن۔",
  ],
  STRUCTURE: ["ترتیب", "بناوٹ"],
  "Manage categories": ["اقسام سنبھالیں", "قسم سنبھال کن"],
  "Keep date varieties and craft categories clear and useful.": [
    "کھجور کی اقسام اور دستکاری کی قسموں کو واضح اور مفید رکھیں۔",
    "ہرمگءِ قسم ءُ دستی کارءِ قسمان روشن ءُ کارآمد بدار۔",
  ],
  "Editing and removal would be available only to authenticated administrators.": [
    "تبدیلی اور حذف صرف تصدیق شدہ منتظمین کر سکیں گے۔",
    "بدل کنگ ءُ دور کنگ فقط تصدیق بوتگیں منتظم کنگءَ کننت۔",
  ],
  ACCOUNT: ["اکاؤنٹ", "اکاؤنٹ"],
  "You're already signed in": ["آپ پہلے سے لاگ ان ہیں", "تو اگے وھدا لاگ ان ئے"],
  "Signed in as": ["اس ای میل سے لاگ ان ہیں:", "اے ای میلءَ لاگ ان ئے:"],
  "You can manage your listing from your dashboard, or sign out below.": [
    "آپ اپنا اندراج ڈیش بورڈ سے سنبھال سکتے ہیں، یا نیچے لاگ آؤٹ کریں۔",
    "تو وتی اندراج ڈیش بورڈ چہ سنبھال کنگءَ کنی، یا ژیرا لاگ آؤٹ کن۔",
  ],
  "Go to my dashboard": ["میرے ڈیش بورڈ پر جائیں", "منی ڈیش بورڈءَ برو"],
  "Sign out": ["لاگ آؤٹ", "لاگ آؤٹ"],
  "Create your account": ["اپنا اکاؤنٹ بنائیں", "وتی اکاؤنٹ جور کن"],
  "Login to your account": ["اپنے اکاؤنٹ میں لاگ ان کریں", "وتی اکاؤنٹءَ لاگ ان کن"],
  "Producers and artisans need an account to add or update their directory listing.": [
    "پیداوار کنندگان اور ہنرمندوں کو اپنا اندراج شامل یا تبدیل کرنے کے لیے اکاؤنٹ درکار ہے۔",
    "پیداوار کنگوک ءُ ہنرمنداں وتی اندراج گیش یا بدل کنگءِ واستا اکاؤنٹ لازم اَنت۔",
  ],
  Email: ["ای میل", "ای میل"],
  Password: ["پاس ورڈ", "پاس ورڈ"],
  "At least 6 characters": ["کم از کم 6 حروف", "کم ازکم 6 اکھر"],
  "Please wait…": ["براہ کرم انتظار کریں…", "مہربانی بہ گوش دار…"],
  "Create account": ["اکاؤنٹ بنائیں", "اکاؤنٹ جور کن"],
  Login: ["لاگ ان", "لاگ ان"],
  "Already have an account?": ["پہلے سے اکاؤنٹ ہے؟", "چہ پیش اکاؤنٹ ھست؟"],
  "Login instead": ["اس کے بجائے لاگ ان کریں", "اوسیا لاگ ان کن"],
  "New producer or artisan?": ["نیا پیداوار کنندہ یا ہنرمند؟", "نوکیں پیداوار کنگوک یا ہنرمند؟"],
  "Create an account": ["اکاؤنٹ بنائیں", "اکاؤنٹ جور کن"],
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
};
const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: (text) => text,
});
export function useLanguage() {
  return useContext(LanguageContext);
}
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Language switching is disabled for now — the site is English-only.
  // Kept as a pass-through provider so components using useLanguage() / t()
  // keep working unchanged.
  const language: Language = "en";
  const setLanguage = (_next: Language) => {};
  const t = (text: string) => text;
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
