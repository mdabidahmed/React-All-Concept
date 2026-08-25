import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getTopicById, topics } from "../../data/topics";
import { ExplanationPanel } from "../../components/organisms/ExplanationPanel/ExplanationPanel";
import { ExampleViewer } from "../../components/organisms/ExampleViewer/ExampleViewer";
import { TopicFooterNav } from "../../components/molecules/TopicFooterNav/TopicFooterNav";
import styles from "./TopicPage.module.css";

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = getTopicById(topicId);

  useEffect(() => {
    document.getElementById("main-content")?.scrollTo({ top: 0 });
  }, [topicId]);

  if (!topic) return <Navigate to="/not-found" replace />;

  const index = topics.findIndex((t) => t.id === topic.id);
  const previous = index > 0 ? topics[index - 1] : null;
  const next = index < topics.length - 1 ? topics[index + 1] : null;

  return (
    <div className={styles.page} key={topic.id}>
      <ExplanationPanel topic={topic} />
      <ExampleViewer topic={topic} />
      <TopicFooterNav previous={previous} next={next} />
    </div>
  );
}
