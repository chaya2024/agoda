# מדריך התחלה מהירה - אתר אגודת הסטודנטים

## 🚀 התחלה תוך 5 דקות

### שלב 1: הורד את הפרויקט
```bash
# אם הפרויקט ב-Git
git clone <repository-url>
cd project

# או פשוט פתח את תיקיית הפרויקט
cd project
```

### שלב 2: התקן תלויות
```bash
cd frontend
npm install
```

### שלב 3: הגדר Supabase

#### 3.1 צור פרויקט Supabase
1. היכנס ל-[Supabase](https://supabase.com)
2. לחץ על "New Project"
3. מלא את הפרטים וחכה לאתחול (כ-2 דקות)

#### 3.2 הרץ את ה-Migration
1. בדשבורד של Supabase, עבור ל-**SQL Editor**
2. לחץ על **New Query**
3. העתק את כל התוכן מ-`supabase/migrations/20250110_create_student_union_schema.sql`
4. הדבק ולחץ **Run**
5. אמת שהטבלאות נוצרו ב-**Table Editor**

#### 3.3 קבל את המפתחות
1. עבור ל-**Settings** > **API**
2. העתק את:
   - **Project URL** (משהו כמו `https://xxxxx.supabase.co`)
   - **anon public** key (מפתח ארוך)

### שלב 4: הגדר משתני סביבה
צור קובץ `.env` בתיקיית `frontend`:

```bash
cd frontend
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
EOF
```

**החלף** את הערכים במפתחות האמיתיים שלך!

### שלב 5: הפעל את האתר
```bash
npm run dev
```

🎉 **זהו!** האתר רץ ב-`http://localhost:5173`

---

## 🧪 בדיקה מהירה

פתח את הדפדפן ב-`http://localhost:5173` ובדוק:

- [ ] הדף הראשי נטען
- [ ] רואה 3 חדשות
- [ ] רואה 6 מחלקות
- [ ] לחיצה על מחלקה פותחת את התוכן
- [ ] הניווט עובד (עבור לדפים אחרים)
- [ ] פאנל הנגישות (כפתור בצד ימין) נפתח
- [ ] פאנל יצירת קשר (כפתור בפינה שמאל למטה) עובד

---

## 🔑 מערכת המשתמשים

### להירשם כמשתמש חדש:
1. לחץ על "התחברות" בניווט
2. לחץ על "הירשם עכשיו"
3. מלא את הפרטים
4. ✅ נרשמת בהצלחה!

### להתנתק:
- לחץ על האייקון של התנתקות בניווט

---

## 📦 בנייה לפרודקשן

```bash
npm run build
```

הקבצים ייצרו בתיקייה `dist/`.

---

## 🚀 פריסה מהירה

### Option A: Netlify (הכי פשוט)
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

אל תשכח להוסיף את משתני הסביבה ב-Netlify Dashboard!

### Option B: Vercel
```bash
npm install -g vercel
vercel --prod
```

אל תשכח להוסיף את משתני הסביבה ב-Vercel Dashboard!

### Option C: Azure Static Web Apps
עקוב אחרי `DEPLOYMENT.md` להוראות מפורטות.

---

## ❓ בעיות נפוצות

### "Cannot connect to Supabase"
- ✅ בדוק שה-URL וה-Key נכונים ב-`.env`
- ✅ בדוק שהמפתחות מתחילים ב-`VITE_`
- ✅ הפעל מחדש את שרת הפיתוח (`npm run dev`)

### "Tables not found"
- ✅ בדוק שהרצת את ה-migration ב-Supabase SQL Editor
- ✅ רענן את העמוד

### "Page not found on refresh"
- זה נורמלי בפיתוח
- בפרודקשן, הקובץ `_redirects` או `staticwebapp.config.json` פותר את זה

---

## 📚 תיעוד נוסף

- **README.md** - תיעוד מלא
- **DEPLOYMENT.md** - מדריך פריסה מפורט
- **PROJECT_SUMMARY.md** - סיכום הפרויקט

---

## 🎨 התאמה אישית

### שינוי צבעים
ערוך את `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#YOUR_COLOR',
    // ...
  }
}
```

### הוספת תוכן
כל התוכן ב-Supabase. ערוך דרך:
1. Supabase Dashboard > Table Editor
2. או SQL Editor
3. או בנה ממשק ניהול

---

## 🆘 תמיכה

נתקעת? צריך עזרה?
- 📧 info@studentunion.ac.il
- 📱 03-1234567
- 🐛 פתח issue ב-GitHub

---

✨ **בהצלחה עם האתר החדש!** ✨
