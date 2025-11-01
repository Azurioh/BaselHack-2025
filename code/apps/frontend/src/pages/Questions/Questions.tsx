import '../../index.css';
import QuestionCard from '../../Components/QuestionCard';

export default function Questions() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <QuestionCard
        title="Ma Question"
        topic="Technology"
        isAnonymous={true}
        targetAudience="employees"
        createdAt="2h ago"
      >
        Description de la question...
      </QuestionCard>
    </div>
  )
}
