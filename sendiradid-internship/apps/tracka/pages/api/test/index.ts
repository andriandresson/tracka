import { getSession } from 'next-auth/react';
import axios from 'axios';

const Handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'unathorized' });
  }

  const accessToken = session.user['accessToken'];
  const teamID = session.user['defaultTeam'];
  const config = {
    headers: {
      Authorization: accessToken,
    },
  };
  const respons = await axios.get(
    `https://api.clickup.com/api/v2/list/187213015/task?archived=false`,
    config
  );
  const { data } = respons;
  res.status(200).json(data);
};

export default Handler;

// https://api.clickup.com/api/v2/team/${teamID}/space?archived=false
// https://api.clickup.com/api/v2/space/61301264/folder?archived=false
// https://api.clickup.com/api/v2/list/187213015/task?archived=false&page=&order_by=&reverse=&subtasks=&statuses%5B%5D=&include_closed=&assignees%5B%5D=&due_date_gt=&due_date_lt=&date_created_gt=&date_created_lt=&date_updated_gt=&date_updated_lt=&custom_fields%5B%5D=
