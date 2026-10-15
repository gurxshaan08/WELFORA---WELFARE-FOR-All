import { useState } from 'react';
import PageTitle from '../components/PageTitle';

export default function AssistantPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const q = question.toLowerCase();
    if (q.includes('document')) {
      setAnswer(
        'Commonly requested documents may include identity proof, residence proof, income certificate, bank details, education records or category certificates. Requirements differ by scheme—check its official guidelines.'
      );
    } else if (q.includes('deadline')) {
      setAnswer(
        'Open the scheme’s official portal and check the latest notification. Deadlines can vary by state, institution and application round. Welfora’s dates are only demo examples.'
      );
    } else {
      setAnswer(
        'Start with Explore Schemes and filter by education, healthcare, housing or financial aid. Open a scheme to review its summary, eligibility notes and official verification reminder.'
      );
    }
  }

  return (
    <section className="page-content">
      <PageTitle
        eyebrow="WELFORA GUIDE"
        title="Ask about welfare schemes"
        subtitle="Get help understanding categories, documents and next steps using this local demo assistant."
      />

      <div className="assistant-wrap panel">
        <div className="assistant-head">
          <div className="assistant-orb">✦</div>
          <div>
            <h2>Welfora Assistant</h2>
            <p>Here to help you navigate public support.</p>
          </div>
          <span className="online-dot">● Online demo</span>
        </div>

        <div className="suggestions">
          <button
            type="button"
            onClick={() => setQuestion('I am a student. What should I explore?')}
          >
            🎓 I'm a student
          </button>
          <button
            type="button"
            onClick={() => setQuestion('What documents might I need?')}
          >
            ▤ Documents checklist
          </button>
          <button
            type="button"
            onClick={() => setQuestion('How do I check a scheme deadline?')}
          >
            ◷ Finding deadlines
          </button>
        </div>

        <form className="assistant-input" onSubmit={handleSubmit}>
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask a question about schemes..."
          />
          <button type="submit" className="primary-btn">
            Ask <span>→</span>
          </button>
        </form>

        {answer && (
          <div className="assistant-answer">
            <b>✦ Welfora Assistant</b>
            <p>{answer}</p>
          </div>
        )}

        <p className="disclaimer">
          Demo assistant: responses are predefined guidance, not AI-generated or official advice.
        </p>
      </div>
    </section>
  );
}
