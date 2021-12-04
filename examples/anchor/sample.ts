import { gov } from './index';

function fn(query: gov.QueryMsg.Poll): Promise<gov.PollResponse> {
  throw new Error('not implemented');
}

(async () => {
  const {
    id,
    description,
    creator,
    end_height,
    execute_data,
    link,
    no_votes,
    yes_votes,
  } = await fn({
    poll: {
      poll_id: 32,
    },
  });
})();
