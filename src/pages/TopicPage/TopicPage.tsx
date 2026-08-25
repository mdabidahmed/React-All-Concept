import { Navigate, useParams } from "react-router-dom";
import { getTopicById } from "../../data/topics";
import { ExplanationPanel } from "../../components/organisms/ExplanationPanel/ExplanationPanel";
import { ExampleViewer } from "../../components/organisms/ExampleViewer/ExampleViewer";
import styles from "./TopicPage.module.css";

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = getTopicById(topicId);

  if (!topic) return <Navigate to="/not-found" replace />;

  return (
    <div className={styles.page} key={topic.id}>
      <ExplanationPanel topic={topic} />
      <ExampleViewer topic={topic} />
    </div>
  );
}
