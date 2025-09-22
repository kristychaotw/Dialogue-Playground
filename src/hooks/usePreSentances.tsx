// src/hooks/usePreviousSentence.ts
import { useMemo, useState } from "react";
import { isHighTension } from "../logic/tension";

export type PreviousSource = "user" | "role-seed" | "topic-starter" | "blank";

export function usePreviousSentence(params: {
  userSentence: string | null; // 從外部抓到的上一句（可為 null）
  roleSeed: string; // 角色 seed_line
  topicStarter: string; // 從 getSentenceStarters(topicId,"respond")[0] 取一條
}) {
  const { userSentence, roleSeed, topicStarter } = params;
  const [source, setSource] = useState<PreviousSource>("user");

  const suggestedFlag = useMemo(() => {
    if (!userSentence) return false;
    return isHighTension(userSentence) || userSentence.length < 8;
  }, [userSentence]);

  const sentence = useMemo(() => {
    switch (source) {
      case "user":
        return userSentence ?? roleSeed;
      case "role-seed":
        return roleSeed;
      case "topic-starter":
        return topicStarter;
      case "blank":
        return "（本回合不使用上一句，請直接說你的一句）";
    }
  }, [source, userSentence, roleSeed, topicStarter]);

  const rollbackTo = (s: PreviousSource) => setSource(s);

  return { sentence, source, suggestedFlag, rollbackTo };
}
