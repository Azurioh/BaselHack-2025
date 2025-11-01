import '../../index.css';
import QuestionCard from '../../Components/QuestionCard';

export default function Questions() {
  return (
    <div className="bg-gray-50 min-h-screen p-5">
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
