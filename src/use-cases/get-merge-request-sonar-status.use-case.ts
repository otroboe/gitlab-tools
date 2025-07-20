import { Camelize, DiscussionNoteSchema } from '@gitbeaker/rest';

import { fetchMergeRequestDiscussions } from '@/actions';
import { MergeRequest } from '@/common';

type Options = {
  token: string;
  mergeRequest: MergeRequest;
};

// Possible titles for Sonar messages in discussions
const sonarMessageTitles = ['SonarQube Cloud Code Analysis', 'SonarCloud Code Analysis'];
const sonarMessageSuccess = 'Quality Gate passed';

export const getMergeRequestSonarStatus = async (options: Options): Promise<boolean | null> => {
  const { token, mergeRequest } = options;
  const { iid, projectId } = mergeRequest;

  if (!token || !projectId || !iid) {
    console.error('🚨', 'Invalid options provided for computing merge request Sonar status', '\n');
    return null;
  }

  const discussions = await fetchMergeRequestDiscussions({ token, mergeRequest });

  // Extract Sonar notes from discussions
  const sonarNotes: Camelize<DiscussionNoteSchema>[] = discussions.reduce<Camelize<DiscussionNoteSchema>[]>(
    (result, discussion) => {
      const { notes } = discussion;

      if (!Array.isArray(notes) || notes.length === 0) {
        return result;
      }

      const found = notes.find((note) => !note.system && sonarMessageTitles.some((title) => note.body.includes(title)));

      return found ? result.concat(found) : result;
    },
    [],
  );

  if (sonarNotes.length === 0) {
    return null;
  }

  // Put recently created first
  const orderedSonarNotes = sonarNotes.toSorted((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  const lastNote = orderedSonarNotes.at(0);

  return lastNote !== undefined && lastNote.body.includes(sonarMessageSuccess);
};
