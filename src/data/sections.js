import { Shapes, Languages } from 'lucide-react'
import analogyQuestions from './questions.json'
import englishQuestions from './english_questions.json'
import Question from '../components/Question.jsx'
import EnglishQuestion from '../components/EnglishQuestion.jsx'

// Registry of practice sections. Each entry is self-contained: its own question
// bank, its own progress storage key, its own question-screen component, and the
// two small render helpers Summary needs to show a generic review list. Adding a
// future section (e.g. Reading Comprehension) means adding one entry here — no
// changes to App/Home/Summary/useProgress.
export const SECTIONS = [
  {
    id: 'analogies',
    title: 'אנלוגיות',
    blurb: 'שאלות האנלוגיה מהוות כ־30% מציון הפרק המילולי בפסיכומטרי.',
    icon: Shapes,
    questions: analogyQuestions,
    QuestionComponent: Question,
    renderPrompt: (q) => `${q.word1} : ${q.word2}`,
    explanationLabel: 'משפט הקשר:',
    getExplanation: (q) => q.logical_connection,
  },
  {
    id: 'english',
    title: 'אנגלית',
    blurb: 'השלמת משפטים היא אחד המרכיבים המרכזיים בפרק האנגלית בפסיכומטרי.',
    icon: Languages,
    questions: englishQuestions,
    QuestionComponent: EnglishQuestion,
    renderPrompt: (q) => q.sentence,
    promptDir: 'ltr',
    explanationLabel: 'הסבר:',
    getExplanation: (q) => q.explanation,
  },
]
