export type Lesson = {
  id?: string;
  slug: string;
  title: string;
  type?: "video" | "document" | "text";
  src?: string;
  externalUrl?: string;
  duration?: string;
};

export type Module = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  accent: string;
  icon: string;
  category: "conversations" | "practice" | "grammar";
  lessons: Lesson[];
};

export const modules: Module[] = [
  {
    slug: "relatives",
    title: "Relative Circle",
    description: "Family conversations, expressions, and relationship vocabulary",
    accent: "from-pink-500 to-rose-500",
    icon: "users",
    category: "conversations",
    lessons: [
      { slug: "mother", title: "Mother", type: "video", src: "/videos/1_MOTHER.mp4", duration: "3:45" },
      { slug: "father", title: "Father", type: "video", src: "/videos/2_FATHER.mp4", duration: "4:10" },
      { slug: "elder-brother", title: "Elder Brother", type: "video", src: "/videos/3_ELDERBROTHER.mp4", duration: "3:20" },
      { slug: "younger-brother", title: "Younger Brother", type: "video", src: "/videos/4_YOUNGERBROTHER.mp4", duration: "3:15" },
      { slug: "elder-sister", title: "Elder Sister", type: "video", src: "/videos/5_ELDERSISTER.mp4", duration: "3:50" },
      { slug: "younger-sister", title: "Younger Sister", type: "video", src: "/videos/6_YOUNGERSISTER.mp4", duration: "3:30" },
      { slug: "grandpa", title: "Grandpa", type: "video", src: "/videos/7_GRANDFATHER.mp4", duration: "4:00" },
      { slug: "grandma", title: "Grandma", type: "video", src: "/videos/8_GRANDMOTHER.mp4", duration: "3:40" },
      { slug: "uncle", title: "Uncle", type: "video", src: "/videos/9_UNCLE.mp4", duration: "3:10" },
      { slug: "aunty", title: "Aunty", type: "video", src: "/videos/10_AUNTY.mp4", duration: "3:25" },
      { slug: "paternal-uncle", title: "Paternal Uncle", type: "video", src: "/videos/11_PATERNALUNCLE.mp4", duration: "3:15" },
      { slug: "cousin", title: "Cousin", type: "video", src: "/videos/12_COUSIN.mp4", duration: "2:55" },
      { slug: "niece", title: "Niece", type: "video", src: "/videos/13_NIECE.mp4", duration: "3:05" },
    ],
  },
  {
    slug: "personal",
    title: "Personal Circle",
    description: "Friends, classmates, neighbours, and casual daily chats",
    accent: "from-emerald-500 to-teal-500",
    icon: "user",
    category: "conversations",
    lessons: [
      { slug: "friend", title: "Friend", type: "video", src: "/videos/14_FRIEND.mp4", duration: "4:15" },
      { slug: "classmate", title: "Classmate", type: "video", src: "/videos/15_CLASSMATE.mp4", duration: "3:30" },
      { slug: "girlfriend", title: "Girl Friend", type: "video", src: "/videos/16_GIRLFRIEND.mp4", duration: "4:00" },
      { slug: "close-friend", title: "Close Friend", type: "video", src: "/videos/17_CLOSEFRIEND.mp4", duration: "3:45" },
      { slug: "birthday-girl", title: "Birthday Girl", type: "video", src: "/videos/18_BIRTHDAYGIRL.mp4", duration: "3:20" },
      { slug: "collegemate", title: "Collegemate", type: "video", src: "/videos/19_COLLEGEMATE.mp4", duration: "3:50" },
      { slug: "captain", title: "Cricket Captain", type: "video", src: "/videos/20_CAPTAIN.mp4", duration: "4:05" },
      { slug: "class-leader", title: "Class Leader", type: "video", src: "/videos/21_CLASSLEADER.mp4", duration: "3:15" },
      { slug: "neighbour", title: "Neighbour", type: "video", src: "/videos/22_NEIGHBOUR.mp4", duration: "3:40" },
      { slug: "co-passenger", title: "Co-Passenger", type: "video", src: "/videos/23_CO-PASSENGER.mp4", duration: "4:10" },
    ],
  },
  {
    slug: "official",
    title: "Official Circle",
    description: "Teachers, professors, interviews, and academic interactions",
    accent: "from-amber-500 to-yellow-500",
    icon: "briefcase",
    category: "conversations",
    lessons: [
      { slug: "teacher", title: "Class Teacher", type: "video", src: "/videos/24_TEACHER.mp4", duration: "4:30" },
      { slug: "tuition", title: "Tuition Master", type: "video", src: "/videos/25_TUITIONMASTER.mp4", duration: "3:45" },
      { slug: "headmaster", title: "Head Master", type: "video", src: "/videos/26_HEADMASTER.mp4", duration: "4:15" },
      { slug: "professor", title: "Professor", type: "video", src: "/videos/27_PROFESSOR.mp4", duration: "4:00" },
      { slug: "principal", title: "Principal", type: "video", src: "/videos/28_PRINCIPAL.mp4", duration: "4:20" },
      { slug: "librarian", title: "Librarian", type: "video", src: "/videos/29_LIBRARIAN.mp4", duration: "3:30" },
      { slug: "interviewer", title: "Interviewer", type: "video", src: "/videos/30_INTERVIEWER.mp4", duration: "5:00" },
    ],
  },
  {
    slug: "public",
    title: "Public Circle",
    description: "Banks, railways, medical centers, and public offices",
    accent: "from-sky-500 to-blue-500",
    icon: "globe",
    category: "conversations",
    lessons: [
      { slug: "bank", title: "Bank Manager", type: "video", src: "/videos/31_BANKMANAGER.mp4", duration: "4:45" },
      { slug: "postmaster", title: "Postmaster", type: "video", src: "/videos/32_POSTMASTER.mp4", duration: "3:50" },
      { slug: "railway", title: "Railway Booking Clerk", type: "video", src: "/videos/33_RAILWAYBOOKINGCLERK.mp4", duration: "4:10" },
      { slug: "tte", title: "TTE", type: "video", src: "/videos/34_TTE.mp4", duration: "3:35" },
      { slug: "receptionist", title: "Receptionist", type: "video", src: "/videos/35_RECEPTIONIST.mp4", duration: "3:45" },
      { slug: "doctor", title: "Doctor", type: "video", src: "/videos/36_DOCTOR.mp4", duration: "4:20" },
      { slug: "inspector", title: "Inspector", type: "video", src: "/videos/37_INSPECTOR.mp4", duration: "4:15" },
      { slug: "mla", title: "MLA", type: "video", src: "/videos/38_MLA.mp4", duration: "3:55" },
      { slug: "engineer", title: "Junior Engineer", type: "video", src: "/videos/39_JUNIORENGINEER.mp4", duration: "4:05" },
      { slug: "gm", title: "General Manager", type: "video", src: "/videos/40_GENERALMANAGER.mp4", duration: "4:30" },
    ],
  },
  {
    slug: "business",
    title: "Business Circle",
    description: "Shops, vendors, suppliers, couriers, and commercial dialogues",
    accent: "from-purple-500 to-indigo-500",
    icon: "trending-up",
    category: "conversations",
    lessons: [
      { slug: "bearer", title: "Bearer", type: "video", src: "/videos/41_BEARER.mp4", duration: "3:20" },
      { slug: "vendor", title: "Vendor", type: "video", src: "/videos/42_VENDOR.mp4", duration: "3:40" },
      { slug: "shopkeeper", title: "Shopkeeper", type: "video", src: "/videos/43_SHOPKEEPER.mp4", duration: "4:00" },
      { slug: "supplier", title: "Supplier", type: "video", src: "/videos/44_SUPPLIER.mp4", duration: "3:50" },
      { slug: "salesgirl", title: "Sales Girl", type: "video", src: "/videos/45_SALESGIRL.mp4", duration: "3:30" },
      { slug: "salesman", title: "Salesman", type: "video", src: "/videos/46_SALESMAN.mp4", duration: "3:45" },
      { slug: "courier", title: "Courier Manager", type: "video", src: "/videos/47_COURIERMANAGER.mp4", duration: "3:55" },
      { slug: "browsing", title: "Browsing Centre Incharge", type: "video", src: "/videos/48_BROWSINGCENTREINCHARGE.mp4", duration: "3:40" },
    ],
  },
  {
    slug: "fluency",
    title: "Fluency Practice",
    description: "Extended dialogue practice across real-life scenarios",
    accent: "from-teal-500 to-cyan-500",
    icon: "messages-square",
    category: "practice",
    lessons: [
      { slug: "friend", title: "Friend Dialogue", type: "video", src: "/videos/49_FRIEND.mp4", duration: "5:15" },
      { slug: "missed-call", title: "Missed Call Friend", type: "video", src: "/videos/50_MISSEDCALLFRIEND.mp4", duration: "4:30" },
      { slug: "heroine", title: "Heroine Dialogue", type: "video", src: "/videos/answer11.mp4", duration: "4:45" },
      { slug: "travel", title: "Travel Friend", type: "video", src: "/videos/52_TRAVELFRIEND.mp4", duration: "5:00" },
      { slug: "business", title: "Business Negotiation", type: "video", src: "/videos/business1.mp4", duration: "5:20" },
      { slug: "hero", title: "Hero Dialogue", type: "video", src: "/videos/54_HERO.mp4", duration: "4:10" },
      { slug: "politician", title: "Politician Discussion", type: "video", src: "/videos/55_POLITICIAN.mp4", duration: "4:50" },
      { slug: "interviewer", title: "Interviewer Session", type: "video", src: "/videos/56_INTERVIEWER.mp4", duration: "5:30" },
    ],
  },
  {
    slug: "question",
    title: "Question Practice",
    description: "Learn how to ask accurate WH, BE, DO, HAVE, and Modal questions",
    accent: "from-yellow-500 to-amber-500",
    icon: "circle-help",
    category: "practice",
    lessons: [
      { slug: "wh", title: "WH Questions", type: "video", src: "/videos/QUESTION11.mp4", duration: "4:10" },
      { slug: "be", title: "BE-FORM Questions", type: "video", src: "/videos/QUESTION 2.mp4", duration: "3:45" },
      { slug: "do", title: "DO-FORM Questions", type: "video", src: "/videos/QUESTION 3.mp4", duration: "3:50" },
      { slug: "have", title: "HAVE-FORM Questions", type: "video", src: "/videos/QUESTION 4.mp4", duration: "4:00" },
      { slug: "modals", title: "MODAL Auxiliary Questions", type: "video", src: "/videos/QUESTION 5.mp4", duration: "4:20" },
    ],
  },
  {
    slug: "answer",
    title: "Answer Practice",
    description: "Master quick, fluent, natural answers to any English question",
    accent: "from-orange-500 to-red-500",
    icon: "message-circle",
    category: "practice",
    lessons: [
      { slug: "wh", title: "Replying to WH Questions", type: "video", src: "/videos/answer_1.mp4", duration: "4:15" },
      { slug: "be", title: "Replying to BE-FORM", type: "video", src: "/videos/ANSWER 2.mp4", duration: "3:50" },
      { slug: "do", title: "Replying to DO-FORM", type: "video", src: "/videos/ANSWER 3.mp4", duration: "3:40" },
      { slug: "have", title: "Replying to HAVE-FORM", type: "video", src: "/videos/ANSWER 4.mp4", duration: "4:05" },
      { slug: "modals", title: "Replying to MODALS", type: "video", src: "/videos/ANSWER 5.mp4", duration: "4:15" },
    ],
  },
  {
    slug: "grammar",
    title: "Grammar & Tenses",
    description: "Core grammar foundation, parts of speech, and tenses made simple",
    accent: "from-pink-500 to-fuchsia-500",
    icon: "book-open",
    category: "grammar",
    lessons: [
      { slug: "starters", title: "Grammar Starters & Fundamentals", type: "video", src: "/videos/class1.mp4", duration: "6:10" },
      { slug: "speech", title: "Parts of Speech Explained", type: "video", src: "/videos/class2.mp4", duration: "7:00" },
      { slug: "tenses", title: "Mastering Tenses with Examples", type: "video", src: "/videos/class3.mp4", duration: "8:15" },
      { slug: "transformation", title: "Sentence Transformation Rules", type: "video", src: "/videos/class4.mp4", duration: "6:45" },
    ],
  },
  {
    slug: "spoken",
    title: "Spoken Keywords",
    description: "Essential vocabulary lists, action words, verb tables & notes",
    accent: "from-emerald-500 to-green-500",
    icon: "mic",
    category: "grammar",
    lessons: [
      {
        slug: "nouns",
        title: "Essential Noun Words List",
        type: "document",
        externalUrl: "https://drive.google.com/file/d/1V8VaAyQlid5MeuosV9V91kTmH-1i_W-n/view",
      },
      {
        slug: "correlation",
        title: "Correlation Words & Connectors",
        type: "document",
        externalUrl: "https://drive.google.com/file/d/1dJGAFqKpadBkUTis70SwWz6yCHN5rtTr/view",
      },
      {
        slug: "action",
        title: "Daily Action Words Vocabulary",
        type: "document",
        externalUrl: "https://drive.google.com/file/d/1xBmdNjiyrqX-Eo9FBKkzTqeQezOKxw_H/view",
      },
      {
        slug: "verbs",
        title: "Comprehensive Verb-Forms Table",
        type: "document",
        externalUrl: "https://drive.google.com/file/d/1hmmNcb5-V-twln-EMLqg0d59oFv5UZTN/view",
      },
      {
        slug: "grammar-notes",
        title: "Grammar & Tenses Study PDF",
        type: "document",
        externalUrl: "https://drive.google.com/file/d/1gCfnEwcyPnJyb3ILlCwaq3pNjx52LBrb/view",
      },
    ],
  },
  {
    slug: "pronunciation",
    title: "Pronunciation & Phonetics",
    description: "Vowel & consonant sounds, syllable stress, and speech clarity",
    accent: "from-amber-500 to-orange-500",
    icon: "volume-2",
    category: "grammar",
    lessons: [
      { slug: "a-l", title: "Pronunciation Guide (A to L)", type: "video", src: "/videos/pronoun1.mp4", duration: "5:20" },
      { slug: "m-z", title: "Pronunciation Guide (M to Z)", type: "video", src: "/videos/pronoun2.mp4", duration: "5:45" },
      { slug: "explanation", title: "Full Pronunciation Explanation", type: "video", src: "/videos/pronoun3.mp4", duration: "6:30" },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return modules.find((item) => item.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const course = getModule(moduleSlug);
  const lesson = course?.lessons.find((item) => item.slug === lessonSlug);
  if (!course || !lesson) return null;
  return { course, lesson };
}

export function getAllLessons(): { courseSlug: string; lesson: Lesson }[] {
  const result: { courseSlug: string; lesson: Lesson }[] = [];
  modules.forEach((mod) => {
    mod.lessons.forEach((les) => {
      result.push({ courseSlug: mod.slug, lesson: les });
    });
  });
  return result;
}
