# אגודת הסטודנטים - אתר מודרני ומתקדם

אתר אינטרנט חדש ומתקדם לאגודת הסטודנטים, בנוי עם React, TypeScript, ו-Supabase.

## תכונות עיקריות

- 🎨 **עיצוב מודרני ואטרקטיבי** - עיצוב נקי ומרשים עם אנימציות חלקות
- 📱 **רספונסיבי מלא** - תמיכה בכל סוגי המכשירים (מובייל, טאבלט, שולחני)
- ♿ **נגישות מלאה** - כלי נגישות מובנים (גודל גופן, ניגודיות, ניווט מקלדת)
- 🔐 **מערכת משתמשים** - הרשמה והתחברות מאובטחת
- 📰 **ניהול תוכן דינמי** - חדשות, גלריה, מוצרים וזכויות
- 💬 **פאנל יצירת קשר** - פאנל צד נגיש תמיד
- 🎯 **מחלקות אינטראקטיביות** - ניווט קל בין מחלקות האגודה

## טכנולוגיות

### Frontend
- **React 18** - ספריית UI מודרנית
- **TypeScript** - שפת תכנות עם typing חזק
- **Vite** - כלי build מהיר
- **Tailwind CSS** - framework עיצוב utility-first
- **React Router** - ניתוב בצד הלקוח
- **Lucide React** - אייקונים מודרניים

### Backend & Database
- **Supabase** - פלטפורמת Backend-as-a-Service
  - PostgreSQL database
  - אימות משתמשים
  - Real-time subscriptions
  - Row Level Security

## התקנה והפעלה

### דרישות מקדימות
- Node.js (גרסה 18 ומעלה)
- npm או yarn
- חשבון Supabase

### שלבי התקנה

1. **שיבוט הפרויקט**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **התקנת dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **הגדרת משתני סביבה**

   צור קובץ `.env` בתיקיית `frontend`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **הגדרת מסד הנתונים**

   הפעל את ה-migration ב-Supabase:
   - היכנס ל-Supabase Dashboard
   - עבור ל-SQL Editor
   - הרץ את הקובץ `supabase/migrations/20250110_create_student_union_schema.sql`

5. **הפעלת שרת הפיתוח**
   ```bash
   npm run dev
   ```

   האתר יהיה זמין בכתובת: `http://localhost:5173`

## בנייה לפרודקשן

```bash
npm run build
```

הקבצים הסטטיים ייבנו בתיקייה `frontend/dist/`.

## פריסה ל-Azure

### אפשרות 1: Azure Static Web Apps

1. צור Azure Static Web App חדש
2. חבר את ה-repository שלך
3. הגדר את הקונפיגורציה:
   - **Build preset**: Vite
   - **App location**: `/frontend`
   - **Output location**: `dist`

### אפשרות 2: Azure App Service

1. צור Azure App Service (Node.js)
2. הגדר deployment מ-GitHub/Azure DevOps
3. הוסף משתני סביבה בהגדרות App Service

## מבנה הפרויקט

```
project/
├── frontend/                 # אפליקציית React
│   ├── src/
│   │   ├── components/      # קומפוננטות משותפות
│   │   ├── contexts/        # React contexts
│   │   ├── lib/            # utilities ו-helpers
│   │   ├── pages/          # דפים ראשיים
│   │   ├── App.tsx         # קומפוננטת App ראשית
│   │   └── main.tsx        # נקודת כניסה
│   ├── public/             # קבצים סטטיים
│   └── package.json
├── supabase/
│   └── migrations/         # database migrations
└── README.md
```

## דפים ראשיים

- **דף הבית** (`/`) - מידע כללי, מחלקות, וחדשות
- **אודות** (`/about`) - אודות האגודה והצוות
- **גלריה** (`/gallery`) - תמונות מאירועים
- **חנות האגודה** (`/store`) - מוצרים ומרצ'נדייז
- **זכויות** (`/rights`) - זכויות סטודנטים
- **התחברות** (`/login`) - התחברות למערכת
- **הרשמה** (`/register`) - הרשמה חדשה

## תרומה לפרויקט

נשמח לקבל תרומות! אנא פתחו Pull Request או דווחו על בעיות דרך Issues.

## רישיון

MIT License - ראו קובץ LICENSE לפרטים נוספים.

## תמיכה

לשאלות ותמיכה, צרו קשר דרך:
- דוא"ל: info@studentunion.ac.il
- טלפון: 03-1234567

---

בנוי עם ❤️ על ידי צוות אגודת הסטודנטים
