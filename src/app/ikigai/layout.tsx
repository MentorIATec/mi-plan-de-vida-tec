
import { QuestionnaireProvider } from '@/lib/context/questionnaire-context';
import { Header } from '@/components/common/header';

export default function IkigaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuestionnaireProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </QuestionnaireProvider>
  );
}
